// Reject stale, partial, or copied snapshots before replacing public README data.
export function validateActivity(data, username, { today, allowHistorical = false } = {}) {
  const date = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  const calendar = data?.calendar;
  const repositories = data?.repositories;
  if (!calendar || !repositories || (!allowHistorical && (data.errors?.calendar !== false || data.errors?.repositories !== false)))
    throw new Error("Public activity is incomplete; keeping the previous snapshot.");
  if (data.githubUsername && data.githubUsername !== username)
    throw new Error("Activity belongs to another GitHub account.");
  if (!date(calendar.from) || !date(calendar.to) || Date.parse(calendar.to) - Date.parse(calendar.from) !== 364 * 86400000 || !Array.isArray(calendar.days) || calendar.days.length !== 365)
    throw new Error("Invalid calendar range.");
  if (!allowHistorical && calendar.to !== today)
    throw new Error("Public calendar is stale; keeping the previous snapshot.");
  for (let i = 0; i < calendar.days.length; i++) {
    const day = calendar.days[i];
    if (!day || !date(day.date) || Date.parse(day.date) !== Date.parse(calendar.from) + i * 86400000 || !Number.isSafeInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4)
      throw new Error("Invalid calendar day.");
  }
  for (const source of [calendar, repositories])
    if (typeof source.fetchedAt !== "string" || !Number.isFinite(Date.parse(source.fetchedAt)))
      throw new Error("Invalid source timestamp.");
  if (repositories.scope !== "all-time" || repositories.source !== "github-default-branches" || !Array.isArray(repositories.repos))
    throw new Error("Invalid repository scope.");
  const names = new Set();
  for (const [index, repo] of repositories.repos.entries()) {
    if (!repo || typeof repo.name !== "string" || !/^[\w.-]+$/.test(repo.name) || !Number.isSafeInteger(repo.count) || repo.count < 1 || typeof repo.href !== "string" || repo.href.toLowerCase() !== `https://github.com/${username}/${repo.name}`.toLowerCase() || names.has(repo.name.toLowerCase()) || (index && repo.count > repositories.repos[index - 1].count))
      throw new Error("Invalid repository ranking or owner.");
    names.add(repo.name.toLowerCase());
  }
}

export function validateLanguages(languages, username) {
  if (!languages?.lines || !Array.isArray(languages.repositories) || languages.scope !== "public-non-fork-default-branches" || !Number.isFinite(Date.parse(languages.fetchedAt)))
    throw new Error("Invalid source line snapshot.");
  for (const repo of languages.repositories) {
    const prefix = `${username.toLowerCase()}/`;
    if (typeof repo.repository !== "string" || !repo.repository.toLowerCase().startsWith(prefix) || !/^[\w.-]+\/[\w.-]+$/.test(repo.repository))
      throw new Error("Source lines belong to another GitHub account.");
  }
  const counts = Object.values(languages.lines);
  if (!counts.length || counts.some(count => !Number.isSafeInteger(count) || count < 0) || counts.reduce((sum, count) => sum + count, 0) <= 0)
    throw new Error("Invalid code line totals.");
}
