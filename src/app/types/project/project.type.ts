export enum ProjectStatus {
  Active = "Active",
  Legacy = "Legacy",
  InProgress = "In-Progress",
  Completed = "Completed",
}

export interface ProjectStack {
  frontend?: string[];
  backend?: string[];
  ml?: string[];
  data?: string[];
  infra?: string[];
  devops?: string[];
  pipeline?: string[];
}

export interface Project {
  id: number;
  title: string;

  description: string;
  highlights: string[];

  image: string | null;

  links: {
    github?: string | null;
    demo?: string | null;
    docs?: string | null;
  };
  stack: ProjectStack;
  status: ProjectStatus;
  categories: ProjectCategory[];
  type?:
    | "ml-system"
    | "backend"
    | "fullstack"
    | "realtime"
    | "notebook"
    | "data";
  metrics?: Record<string, string>;
}

export enum ProjectCategory {
  FullStack = "Full Stack",
  RealTimeApp = "Real-time App",
  Backend = "Backend",
  AIML = "AI/ML",
  Notebook = "Notebook",
  NLP = "NLP",
  CV = "CV",
}

export type ViewMode = "grid" | "list";
export type FilterStatus = "All" | ProjectStatus;
export type FilterCategory = "All" | ProjectCategory;
