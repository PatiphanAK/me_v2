export interface SkillDetail {
  name: string;
  link?: string;
}

export interface TheorySkillProps {
  title: string;
  skills: SkillDetail[];
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  link?: string;
}

export interface PracticalSkillProps {
  id: number;
  name: string;
  logoUrl: string;
  color: string;
  description?: string;
  tags?: string[];
}
