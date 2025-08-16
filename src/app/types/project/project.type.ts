export interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  githubURL: string | null;
  techStack: string[];
  tool: string | null;
  website: string | null;
  status: 'Active' | 'Legacy' | 'In-Progress';
  category: 'Full Stack' | 'Real-time App' | 'Backend' | 'AI/ML' | 'Notebook';
}

export type ViewMode = 'grid' | 'list';
export type FilterStatus = 'All' | 'Active' | 'Legacy' | 'In-Progress';
export type FilterCategory = 'All' | 'Full Stack' | 'Real-time App' | 'Backend' | 'AI/ML' | 'Notebook';