/**
 * G-02 rule metadata. A rule is a teachable statement with a stable ID. Prerequisites point at
 * other G-02 rules and at competencies already in the learning map (`competencies.ts`);
 * this is deliberately not a second graph.
 */
export type RulePrerequisites = {
	/** IDs of G-02 rules that should be understood first (same ID space as `ruleId`). */
	rules: readonly string[];
	/** IDs from `competencies.ts` (CB-xx, CR-xx) that the rule builds on. */
	competencies: readonly string[];
};

/** Stable rule ID: `g02.` followed by lowercase ASCII words joined by hyphens. */
export const G02_RULE_ID = /^g02\.[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function rulePrerequisites(
	rules: readonly string[] = [],
	competencies: readonly string[] = []
): RulePrerequisites {
	return { rules, competencies };
}
