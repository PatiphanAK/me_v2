'use client';

import { Star, Sparkles} from "lucide-react";
import { AcademicBackgroundProps, ProfilePhotoProps } from "@/app/types/about/about.types";
import TypingText from "@/app/components/Atomic/typingtext";
import Image from "next/image";

const ACADEMIC_DATA: AcademicBackgroundProps[] = [
  {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wx9ytkWpaORplO5wMqeYtEtP23Wb3bSigw&s",
    title: "BSc Information Technology",
    institution: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    track: "Software Development Track",
    description: "Focus on requirement analysis, system design, scaling, functional and non-functional aspects of software development.",
    borderColorClass: "border-purple-500/20",
  },
  {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2Oym_1FfF1KGvRNpVn0nV8lAUpGAwzMuGg&s",
    title: "BSc Physics",
    institution: "Ramkhamhaeng University (RU)",
    track: "Wave Theory Track",
    description: "Focus on wave-like signal processing including image processing, speech processing, noise reduction, and fundamentals of Lie groups.",
    borderColorClass: "border-blue-500/20",
  },
  {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1BCNsH4LsHt6Z4TSTzWw289dRUO3up6n6Dg&s",
    title: "School",
    institution: "42 École (42Bangkok | KMITL)",
    track: "System Programming",
    description: "Focus on system programming on Unix-based systems and edge device development. Intensive peer-to-peer learning environment.",
    borderColorClass: "border-green-500/20",
  },
];

const STARS = [
  { cx: "20", cy: "40", r: "1.5", opacity: "0.7" },
  { cx: "80", cy: "120", r: "1", opacity: "0.5" },
  { cx: "200", cy: "60", r: "1.2", opacity: "0.8" },
  { cx: "300", cy: "180", r: "1.7", opacity: "0.6" },
  { cx: "500", cy: "100", r: "1.3", opacity: "0.7" },
  { cx: "150", cy: "300", r: "1.1", opacity: "0.6" },
  { cx: "400", cy: "250", r: "1.4", opacity: "0.8" },
  { cx: "600", cy: "80", r: "1", opacity: "0.5" },
  { cx: "750", cy: "200", r: "1.3", opacity: "0.7" },
  { cx: "100", cy: "500", r: "1.2", opacity: "0.6" },
];

const ABOUT_CONTENT = [
  `Hi! I'm Patiphan Akkahadsri, a lifelong learner passionate about Image Processing, Computer Vision, and Backend Development. I love exploring new technologies, frameworks, and tools—from abstract concepts to real-world applications.
  I thrive on hands-on projects, building end-to-end solutions for image analysis, backend systems, and data pipelines. Comfortable with Linux and open-source tools, I enjoy optimizing workflows and continuously learning new techniques to stay at the forefront of technology.
  For me, learning never stops. I see challenges as opportunities to innovate, grow, and create meaningful solutions that make a difference.`
];


const AcademicBackground: React.FC<AcademicBackgroundProps> = ({
  icon, title, institution, track, description, borderColorClass
}) => (
  <div className={`bg-gray-800/50 backdrop-blur-sm border ${borderColorClass} rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300`}>
    <div className="flex items-start space-x-3 sm:space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 overflow-hidden">
          {typeof icon === "string" ? (
            <Image src={icon} alt={title} width={48} height={48} className="w-full h-full object-cover" />
          ) : (
            icon
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 break-words">{title}</h3>
        <p className="text-purple-400 font-medium mb-1 sm:mb-2 text-sm sm:text-base break-words">{institution}</p>
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
          <strong className="block sm:inline">{track}</strong>
          <span className="hidden sm:inline"> - </span>
          <span className="block sm:inline mt-1 sm:mt-0">{description}</span>
        </p>
      </div>
    </div>
  </div>
);

const StarField = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <svg width="100%" height="100%" className="absolute inset-0">
      {STARS.map((star, index) => (
        <circle
          key={index}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="#fff"
          opacity={star.opacity}
        />
      ))}
    </svg>
  </div>
);

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ imageUrl, alt }) => (
  <div className="relative mx-auto">
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-20 scale-110 animate-pulse"></div>
    <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 p-1 shadow-2xl">
      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={alt ?? "Profile Photo"} width={160} height={160} className="object-cover w-full h-full rounded-full" />
        ) : (
          <div className="text-2xl sm:text-3xl lg:text-4xl text-purple-400">👨‍🚀</div>
        )}
      </div>
      <div className="hidden lg:block">
        <TypingText/>
      </div>
    </div>
    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-yellow-400 animate-bounce">
      <Star className="w-3 h-3 sm:w-4 sm:h-4" />
    </div>
    <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-blue-400 animate-pulse">
      <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
    </div>
  </div>
);

const AcademicSection: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`space-y-4 sm:space-y-6 ${className}`}>
    <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 text-center sm:text-left lg:text-left">
      Academic Journey
    </h2>
    <div className="grid gap-4 sm:gap-6">
      {ACADEMIC_DATA.map((item, index) => (
        <AcademicBackground key={index} {...item} />
      ))}
    </div>
  </div>
);

const PageTitle: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <>
  <h1 className={`font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 sm:mb-6 ${
    isMobile ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-6xl xl:text-7xl'
  }`}>
    About Me
  </h1>
  <p className="text-white text-sm sm:text-base">{ABOUT_CONTENT}</p>
  </>
);

// Main Component
const About: React.FC = () => (
  <section className="min-h-screen bg-black relative overflow-hidden">
    <StarField />
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-16 sm:pb-20 lg:pb-24">
      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden min-h-screen py-8 space-y-8">
        <div className="flex justify-center pt-4">
          <ProfilePhoto imageUrl="/assets/me/me.png" alt="Profile Photo" />
        </div>
        
        <div className="space-y-6 sm:space-y-8 pb-12">
          <div className="text-center sm:text-left">
            <PageTitle isMobile />
          </div>
          <AcademicSection />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-1/5 flex items-center justify-center pr-8">
          <ProfilePhoto imageUrl="/assets/me/me.png" alt="Profile Photo" />
        </div>
        
        <div className="w-4/5 flex items-center">
          <div className="space-y-8 max-w-4xl pb-16">
            <div>
              <PageTitle />
              <Image 
                src="/assets/props/star1.png" 
                alt="Star" 
                width={112} 
                height={112} 
                className="absolute top-4 right-4 opacity-80 z-0 pointer-events-auto transition-transform duration-300 ease-in-out hover:scale-125 hover:animate-shake"
              />
              
              <AcademicSection className="mt-12 mb-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;