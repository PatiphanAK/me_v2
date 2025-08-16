export interface AcademicBackgroundProps {
  icon: React.ReactNode | string;
  title: string;
  institution: string;
  track: string;
  description: string;
  borderColorClass: string;
}

export interface ProfilePhotoProps {
  imageUrl?: string;
  alt?: string;
}