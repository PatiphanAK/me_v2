export enum ProjectStatus {
  Active = 'Active',
  Legacy = 'Legacy',
  InProgress = 'In-Progress',
  Completed = 'Completed',
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  githubURL: string | null;
  techStack: string[];
  tool: string | null;
  website: string | null;
  status: ProjectStatus;
  categories: ProjectCategory[];
}

export enum ProjectCategory {
  FullStack = 'Full Stack',
  RealTimeApp = 'Real-time App',
  Backend = 'Backend',
  AIML = 'AI/ML',
  Notebook = 'Notebook',
  NLP = 'NLP',
  CV = 'CV',
}

export type ViewMode = 'grid' | 'list';
export type FilterStatus = 'All' | ProjectStatus;
export type FilterCategory = 'All' | ProjectCategory;