import profile from "../../public/profile.json";

export const SITE_URL = profile.url;
export const SITE_NAME = profile.name;
export const SITE_TITLE =
  `${profile.name} — ${profile.role} | ${profile.githubUsername}`;
export const SITE_DESCRIPTION =
  `${profile.name} (${profile.githubUsername}), software developer focused on modern web applications, algorithms, and systems engineering. Explore projects, GitHub activity and contact.`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFILE_LINKS = Object.values(profile.profiles);

export function serializeJSONLD(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
