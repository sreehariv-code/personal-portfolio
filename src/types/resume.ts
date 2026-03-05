export interface Basics {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location?: string;
  summary: string;
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  techStack: string[];
}

export interface Education {
  institution: string;
  location?: string;
  degree: string;
  field?: string;
  cgpa?: string;
  startYear?: number;
  endYear: number;
}

export type ProjectCategory = "web" | "mobile" | "ai" | "fullstack";

export interface Project {
  name: string;
  tech: string[];
  description: string;
  link: string;
  category?: ProjectCategory;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  stateManagement: string[];
  databases: string[];
  devOps: string[];
  cloudHosting: string[];
  aiAutomation: string[];
  other: string[];
}

export interface Resume {
  basics: Basics;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
}
