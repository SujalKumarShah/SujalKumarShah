import rawProjects from "@/data/projects.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  programmingLanguages: string[];
  year: string;
  image: string;
  coverLines?: string[];
  coverLabel?: string;
  github: string;
  live: string | null;
  credit?: string;
};

export const projects: Project[] = rawProjects as Project[];
