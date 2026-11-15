import { lessonProgressData } from '#lib/content/lessons/index.js';
import { roadmap } from '#lib/content/roadmap.js';

export function load() {
	return { ...lessonProgressData(), roadmap };
}
