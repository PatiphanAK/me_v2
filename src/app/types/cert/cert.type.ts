export interface CredlyCertification {
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface OtherCertification {
  title: string;
  issuer: string;
  date: string;
  type: string;
  description: string;
  dinoType: string;
  link?: string;
}

export interface Achievement {
  title: string;
  event: string;
  date: string;
  description: string;
  dinoType: string;
  link?: string;
}

export interface Participation {
  event: string;
  role: string;
  date: string;
  description: string;
  dinoType: string;
  link?: string;
}

export interface Stats {
  credlyCount: number;
  otherCertCount: number;
  achievementsCount: number;
  participationsCount: number;
}

export interface CredlyProfileProps {
  credlyLink: string;
}

export interface CredlyCardProps {
  cert: CredlyCertification;
}

export interface CredlySectionProps {
  certifications: CredlyCertification[];
}

export interface OtherCertCardProps {
  cert: OtherCertification;
}

export interface OtherCertificationsSectionProps {
  certifications: OtherCertification[];
}

export interface AchievementCardProps {
  achievement: Achievement;
}

export interface AchievementsSectionProps {
  achievements: Achievement[];
}

export interface ParticipationCardProps {
  participation: Participation;
}

export interface ParticipationsSectionProps {
  participations: Participation[];
}

export interface StatsMuseumProps {
  stats: Stats;
}
