/**
 * Shared, non-persistent choice for every word-role explorer on the page. Resets on reload on
 * purpose: persisting a setting needs a schema version and export/import (AGENTS.md), which is
 * out of scope for VP-02. Only ever changed from a click, never during prerender.
 */
export const roleColourPrefs = $state({ noColour: false });
