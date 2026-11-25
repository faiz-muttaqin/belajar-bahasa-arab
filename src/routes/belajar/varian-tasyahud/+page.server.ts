import { tasyahudComparison, tasyahudQuestions } from '#lib/content/tasyahud-practice.js';

// Keep the full shalat catalog in the build process. The page receives only these two variants.
export const load = () => ({ comparisons: tasyahudComparison, questions: tasyahudQuestions });
