/**
 * Static evaluator for the JavaScript data files of `arabic-grammar`
 * (`window.X = (function () { const …; return { … }; })();`).
 *
 * The source is untrusted. It is parsed with the TypeScript compiler API and only a closed set
 * of literal node kinds is evaluated: object and array literals (with spreads), strings,
 * template literals, numbers, booleans, null, unary minus, string and number `+`, references
 * to the wrapper's own `const` declarations, and calls to its local arrow helpers (for
 * example `S(book, lesson, pages)`), whose bodies are substituted. There is no `eval`,
 * `Function`, `vm` or `import()` of source code, and nothing outside this list is ever run:
 * an unsupported node throws with its line number.
 */
import ts from 'typescript';

export class StaticEvalError extends Error {}

export type Data = string | number | boolean | null | undefined | Data[] | { [key: string]: Data };

type Env = {
	source: ts.SourceFile;
	consts: Map<string, ts.Expression>;
	cache: Map<string, Data>;
	resolving: Set<string>;
};

function where(node: ts.Node, env: Env): string {
	const { line } = env.source.getLineAndCharacterOfPosition(node.getStart(env.source));
	return `line ${line + 1}`;
}

function unsupported(node: ts.Node, env: Env, why = ''): never {
	throw new StaticEvalError(
		`unsupported ${ts.SyntaxKind[node.kind]} at ${where(node, env)}${why ? `: ${why}` : ''}`
	);
}

function propertyName(name: ts.PropertyName, env: Env, scope: Scope): string {
	if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
		return name.text;
	}
	if (ts.isComputedPropertyName(name)) {
		const key = evaluate(name.expression, env, scope);
		if (typeof key === 'string' || typeof key === 'number') return String(key);
	}
	return unsupported(name, env, 'property name');
}

type Scope = Map<string, Data>;

function evaluate(node: ts.Node, env: Env, scope: Scope): Data {
	if (ts.isParenthesizedExpression(node)) return evaluate(node.expression, env, scope);
	if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
		return evaluate(node.expression, env, scope);
	}
	if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
	if (ts.isNumericLiteral(node)) return Number(node.text);
	if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
	if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
	if (node.kind === ts.SyntaxKind.NullKeyword) return null;

	if (ts.isTemplateExpression(node)) {
		let text = node.head.text;
		for (const span of node.templateSpans) {
			const value = evaluate(span.expression, env, scope);
			if (typeof value !== 'string' && typeof value !== 'number') {
				unsupported(span.expression, env, 'template expression is not a string or number');
			}
			text += String(value) + span.literal.text;
		}
		return text;
	}

	if (ts.isPrefixUnaryExpression(node)) {
		const value = evaluate(node.operand, env, scope);
		if (typeof value === 'number') {
			if (node.operator === ts.SyntaxKind.MinusToken) return -value;
			if (node.operator === ts.SyntaxKind.PlusToken) return value;
		}
		return unsupported(node, env);
	}

	if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
		const left = evaluate(node.left, env, scope);
		const right = evaluate(node.right, env, scope);
		if (
			(typeof left === 'string' || typeof left === 'number') &&
			(typeof right === 'string' || typeof right === 'number')
		) {
			return (left as string) + (right as string);
		}
		return unsupported(node, env, 'only string or number addition');
	}

	if (ts.isArrayLiteralExpression(node)) {
		const out: Data[] = [];
		for (const element of node.elements) {
			if (ts.isSpreadElement(element)) {
				const spread = evaluate(element.expression, env, scope);
				if (!Array.isArray(spread)) unsupported(element, env, 'spread of a non-array');
				out.push(...(spread as Data[]));
			} else if (ts.isOmittedExpression(element)) {
				out.push(undefined);
			} else {
				out.push(evaluate(element, env, scope));
			}
		}
		return out;
	}

	if (ts.isObjectLiteralExpression(node)) {
		const out: { [key: string]: Data } = {};
		for (const prop of node.properties) {
			if (ts.isPropertyAssignment(prop)) {
				out[propertyName(prop.name, env, scope)] = evaluate(prop.initializer, env, scope);
			} else if (ts.isShorthandPropertyAssignment(prop)) {
				out[prop.name.text] = evaluate(prop.name, env, scope);
			} else if (ts.isSpreadAssignment(prop)) {
				const spread = evaluate(prop.expression, env, scope);
				if (spread === null || typeof spread !== 'object' || Array.isArray(spread)) {
					unsupported(prop, env, 'spread of a non-object');
				}
				Object.assign(out, spread as { [key: string]: Data });
			} else {
				unsupported(prop, env, 'method or accessor');
			}
		}
		return out;
	}

	// Data lookups such as `PARTICLE_SETS.inna.items`: read a key of an already-evaluated value.
	if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
		const target = evaluate(node.expression, env, scope);
		const key = ts.isPropertyAccessExpression(node)
			? node.name.text
			: evaluate(node.argumentExpression, env, scope);
		if (
			target !== null &&
			typeof target === 'object' &&
			(typeof key === 'string' || typeof key === 'number') &&
			Object.hasOwn(target, key)
		) {
			return (target as { [key: string]: Data })[String(key)];
		}
		return unsupported(node, env, 'lookup of a missing key');
	}

	if (ts.isIdentifier(node)) {
		if (scope.has(node.text)) return scope.get(node.text);
		if (node.text === 'undefined') return undefined;
		const cached = env.cache.get(node.text);
		if (cached !== undefined) return cached;
		const init = env.consts.get(node.text);
		if (!init) return unsupported(node, env, `unknown identifier ${node.text}`);
		if (ts.isArrowFunction(init)) return unsupported(node, env, 'function used as a value');
		if (env.resolving.has(node.text)) return unsupported(node, env, 'circular reference');
		env.resolving.add(node.text);
		const value = evaluate(init, env, new Map());
		env.resolving.delete(node.text);
		env.cache.set(node.text, value);
		return value;
	}

	// `<array>.map(item => <expression>)`: the one array method the data files use, with a
	// plain or array-destructured parameter and an expression body. Evaluated by this module,
	// element by element; the source arrow function is never run.
	if (
		ts.isCallExpression(node) &&
		ts.isPropertyAccessExpression(node.expression) &&
		node.expression.name.text === 'map' &&
		node.arguments.length === 1
	) {
		const list = evaluate(node.expression.expression, env, scope);
		const fn = node.arguments[0]!;
		if (!Array.isArray(list)) return unsupported(node, env, 'map on a non-array');
		if (!ts.isArrowFunction(fn) || ts.isBlock(fn.body) || fn.parameters.length !== 1) {
			return unsupported(fn, env, 'map callback must be a one-parameter expression arrow');
		}
		const param = fn.parameters[0]!.name;
		return (list as Data[]).map((item) => {
			const inner: Scope = new Map(scope);
			if (ts.isIdentifier(param)) {
				inner.set(param.text, item);
			} else if (ts.isArrayBindingPattern(param) && Array.isArray(item)) {
				param.elements.forEach((el, i) => {
					if (ts.isOmittedExpression(el) || !ts.isIdentifier(el.name)) {
						unsupported(el, env, 'binding pattern');
					} else {
						inner.set(el.name.text, (item as Data[])[i]);
					}
				});
			} else {
				unsupported(param, env, 'map parameter');
			}
			return evaluate(fn.body, env, inner);
		});
	}

	if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
		const helper = env.consts.get(node.expression.text);
		if (helper && ts.isArrowFunction(helper)) {
			const inner: Scope = new Map();
			helper.parameters.forEach((param, i) => {
				if (!ts.isIdentifier(param.name)) unsupported(param, env, 'destructured parameter');
				const arg = node.arguments[i];
				inner.set((param.name as ts.Identifier).text, arg ? evaluate(arg, env, scope) : undefined);
			});
			if (ts.isBlock(helper.body)) unsupported(helper, env, 'helper with a block body');
			return evaluate(helper.body, env, inner);
		}
	}

	return unsupported(node, env);
}

/**
 * Evaluate `window.<name> = (function () { …; return { … }; })();` in `sourceText` and return
 * the returned object. The file is never executed.
 */
export function evaluateWindowModule(sourceText: string, fileName: string): Record<string, Data> {
	const source = ts.createSourceFile(
		fileName,
		sourceText,
		ts.ScriptTarget.ES2022,
		true,
		ts.ScriptKind.JS
	);
	let factory: ts.FunctionExpression | ts.ArrowFunction | undefined;
	for (const statement of source.statements) {
		if (!ts.isExpressionStatement(statement)) continue;
		const expr = statement.expression;
		if (!ts.isBinaryExpression(expr) || expr.operatorToken.kind !== ts.SyntaxKind.EqualsToken)
			continue;
		let call = expr.right;
		while (ts.isParenthesizedExpression(call)) call = call.expression;
		if (!ts.isCallExpression(call)) continue;
		let callee: ts.Expression = call.expression;
		while (ts.isParenthesizedExpression(callee)) callee = callee.expression;
		if (ts.isFunctionExpression(callee) || ts.isArrowFunction(callee)) factory = callee;
	}
	if (!factory) throw new StaticEvalError(`${fileName}: no "window.X = (function () {…})()" found`);
	if (!ts.isBlock(factory.body))
		throw new StaticEvalError(`${fileName}: factory has no block body`);

	const env: Env = { source, consts: new Map(), cache: new Map(), resolving: new Set() };
	let returned: ts.Expression | undefined;
	for (const statement of factory.body.statements) {
		if (ts.isVariableStatement(statement)) {
			for (const decl of statement.declarationList.declarations) {
				if (ts.isIdentifier(decl.name) && decl.initializer) {
					env.consts.set(decl.name.text, decl.initializer);
				}
			}
		} else if (ts.isReturnStatement(statement) && statement.expression) {
			returned = statement.expression;
		} else if (!ts.isEmptyStatement(statement)) {
			// Anything else (calls, loops) would be code, not data: refuse it.
			throw new StaticEvalError(
				`${fileName}: unexpected ${ts.SyntaxKind[statement.kind]} at ${where(statement, env)}`
			);
		}
	}
	if (!returned) throw new StaticEvalError(`${fileName}: factory returns nothing`);
	const value = evaluate(returned, env, new Map());
	if (value === null || typeof value !== 'object' || Array.isArray(value)) {
		throw new StaticEvalError(`${fileName}: factory does not return an object`);
	}
	return value as Record<string, Data>;
}
