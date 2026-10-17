import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateActivity, validateLanguages } from "../scripts/readme-snapshot.mjs";
const saved = JSON.parse(await readFile(new URL("../assets/readme/activity.json", import.meta.url)));
const user = "SujalKumarShah";
const fresh = () => ({ ...structuredClone(saved), errors: { calendar: false, repositories: false } });
test("refresh accepts a complete snapshot from the intended account", () => {
  assert.doesNotThrow(() => validateActivity(fresh(), user, { today: saved.calendar.to }));
  assert.doesNotThrow(() => validateLanguages(saved.languages, user));
});
test("refresh rejects partial, stale, shifted and copied statistics", () => {
  const partial = fresh(); partial.errors.calendar = true;
  assert.throws(() => validateActivity(partial, user, { today: saved.calendar.to }), /incomplete/);
  assert.throws(() => validateActivity(fresh(), user, { today: "2099-01-01" }), /stale/);
  const shifted = fresh(); shifted.calendar.days[0].date = "2000-01-01";
  assert.throws(() => validateActivity(shifted, user, { today: saved.calendar.to }), /calendar day/);
  const copied = fresh(); copied.repositories.repos[0].href = "https://github.com/another-user/repo";
  assert.throws(() => validateActivity(copied, user, { today: saved.calendar.to }), /ranking or owner/);
  const languages = structuredClone(saved.languages); languages.repositories[0].repository = "another-user/repo";
  assert.throws(() => validateLanguages(languages, user), /another GitHub account/);
});
test("render-only refresh accepts a historical snapshot without claiming freshness", () => {
  assert.doesNotThrow(() => validateActivity(saved, user, { today: "2099-01-01", allowHistorical: true }));
});
