import React from "react";
import {
  ExternalLink,
  Award,
  Calendar,
  User,
  CheckCircle,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";
import {
  CredlyCardProps,
  CredlyProfileProps,
  CredlyCertification,
  CredlySectionProps,
  OtherCertCardProps,
  OtherCertification,
  OtherCertificationsSectionProps,
  Participation,
  ParticipationCardProps,
  ParticipationsSectionProps,
  Achievement,
  AchievementCardProps,
  AchievementsSectionProps,
  Stats,
  StatsMuseumProps,
} from "../types/cert/cert.type";

// Header Component - Enhanced Responsive Design
const DinoHeader: React.FC = () => (
  <header className="text-center mb-8 lg:mb-12 relative px-4">
    <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
        🦕 DINO-SAURUS ACHIEVEMENTS 🦖
      </h1>
    </div>
    <div className="text-lg sm:text-xl md:text-2xl mb-4 text-slate-700 font-semibold">
      ⚡ PREHISTORIC PORTFOLIO ⚡
    </div>
    <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-xs sm:max-w-md lg:max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4 lg:p-6 rounded-xl border border-slate-200 shadow-lg backdrop-blur-sm">
      Journey through the Mesozoic Era of Professional Development!
      <br className="hidden sm:block" />
      <span className="block sm:inline">
        🌿 Collecting achievements like fossils since the dawn of code 🌿
      </span>
    </p>
  </header>
);

// Credly Profile Component - Modern & Responsive
const CredlyProfile: React.FC<CredlyProfileProps> = ({ credlyLink }) => (
  <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-zinc-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8 lg:mb-10 border border-slate-200 relative overflow-hidden backdrop-blur-sm">
    <div className="absolute top-2 right-2 text-2xl sm:text-3xl animate-spin opacity-70">
      🌟
    </div>
    <div className="absolute bottom-2 left-2 text-2xl sm:text-4xl opacity-30">
      🦴
    </div>
    <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 relative z-10">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-4 rounded-full border border-orange-200 shadow-lg">
          <Image
            src="https://www.svgrepo.com/show/331358/credly.svg"
            alt="Credly Logo"
            width={80}
            height={80}
            className="object-contain sm:w-[100px] sm:h-[100px]"
          />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            🏆 CREDLY FOSSIL COLLECTION 🏆
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Verified digital badges from the ancient archives!
          </p>
        </div>
      </div>
      <a
        href={credlyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg border border-white text-base sm:text-lg font-bold w-full sm:w-auto justify-center"
      >
        <span className="text-sm sm:text-base">🔍 EXCAVATE CREDLY</span>
        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
      </a>
    </div>
  </div>
);

// Individual Certificate Card - Enhanced Responsive
const CertCard: React.FC<CredlyCardProps> = ({ cert }) => (
  <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-emerald-200 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group">
    {/* Main content - clean and focused */}
    <div className="relative z-10">
      <div className="text-center sm:text-left">
        <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-2 leading-tight">
          {cert.title}
        </h3>
        <p className="text-slate-600 font-semibold mb-3 text-sm sm:text-base">
          {cert.issuer}
        </p>
        <div className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-slate-500 mb-3">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          Era: {cert.date}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="inline-flex items-center px-3 py-2 rounded-full text-xs sm:text-sm font-bold bg-yellow-200 text-slate-700 border border-yellow-300">
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            🦴 FOSSIL VERIFIED
          </span>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-full text-xs sm:text-sm font-bold bg-blue-100 text-slate-700 border border-blue-300 hover:bg-blue-200 transition-colors"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              VIEW
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Credly Section Component
const CredlySection: React.FC<CredlySectionProps> = ({ certifications }) => (
  <section className="mb-8 lg:mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 lg:mb-8 flex items-center justify-center bg-gradient-to-r from-emerald-100 to-teal-100 p-3 sm:p-4 rounded-xl border border-emerald-200 mx-4 sm:mx-0">
      <Shield className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-emerald-600" />
      <span className="text-center">🦖 VERIFIED DINO BADGES 🦕</span>
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
      {certifications.map((cert: CredlyCertification, index: number) => (
        <CertCard key={index} cert={cert} />
      ))}
    </div>
  </section>
);

// Individual Other Certificate Card - Modern Design
const OtherCertCard: React.FC<OtherCertCardProps> = ({ cert }) => (
  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 rounded-2xl shadow-xl p-4 sm:p-6 border border-blue-200 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group">
    <div className="absolute top-2 right-2 text-xl sm:text-2xl animate-pulse opacity-70 group-hover:opacity-100 transition-opacity">
      {cert.dinoType.split(" ")[0]}
    </div>
    <div className="absolute bottom-2 left-2 text-base sm:text-lg opacity-30">
      🌋
    </div>
    <div className="mb-4 relative z-10">
      <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-3 sm:p-4 rounded-full w-fit mb-4 border border-cyan-300 shadow-lg mx-auto sm:mx-0">
        <Award className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-700" />
      </div>
      <div className="text-base sm:text-lg font-bold text-slate-700 mb-2 text-center sm:text-left">
        {cert.dinoType}
      </div>
      <h3 className="font-bold text-sm sm:text-lg text-slate-800 mb-2 leading-tight text-center sm:text-left">
        {cert.title}
      </h3>
      <p className="text-slate-600 font-semibold text-sm sm:text-base text-center sm:text-left">
        {cert.issuer}
      </p>
    </div>
    <div className="space-y-3 relative z-10">
      <div className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-slate-500">
        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
        Discovered: {cert.date}
      </div>
      <div className="text-xs sm:text-sm text-slate-700 bg-white/70 backdrop-blur-sm p-2 sm:p-3 rounded border border-slate-200">
        {cert.description}
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
        <span className="inline-block px-3 py-2 rounded-full text-xs font-bold bg-purple-100 text-slate-700 border border-purple-300">
          📜 {cert.type}
        </span>
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-full text-xs font-bold bg-green-100 text-slate-700 border border-green-300 hover:bg-green-200 transition-colors"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            VIEW
          </a>
        )}
      </div>
    </div>
  </div>
);

// Other Certifications Section - Enhanced Responsive Grid
const LearningJourneys: React.FC<OtherCertificationsSectionProps> = ({
  certifications,
}) => (
  <section className="mb-8 lg:mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 lg:mb-8 flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-3 sm:p-4 rounded-xl border border-blue-200 mx-4 sm:mx-0">
      <Zap className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-600" />
      <span className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
        🧩 Learning Side-Quests (Completed Courses)
      </span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
      {certifications.map((cert: OtherCertification, index: number) => (
        <OtherCertCard key={index} cert={cert} />
      ))}
    </div>
  </section>
);

// Individual Achievement Card - Modern Responsive Design
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => (
  <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-purple-200 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group">
    <div className="absolute top-2 right-2 text-2xl sm:text-3xl animate-bounce opacity-70 group-hover:opacity-100 transition-opacity">
      {achievement.dinoType.split(" ")[0]}
    </div>
    <div className="absolute bottom-2 left-2 text-xl sm:text-2xl opacity-30">
      ⚡
    </div>
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
      <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-3 sm:p-4 rounded-full border border-yellow-300 shadow-lg mx-auto sm:mx-0">
        <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-700" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <div className="text-lg sm:text-xl font-bold text-slate-700 mb-1">
          {achievement.dinoType}
        </div>
        <h3 className="font-bold text-base sm:text-xl text-slate-800 mb-2 leading-tight">
          {achievement.title}
        </h3>
        <p className="text-slate-600 font-semibold mb-3 text-sm sm:text-lg">
          {achievement.event}
        </p>
        <p className="text-slate-600 text-xs sm:text-sm mb-4 bg-white/70 backdrop-blur-sm p-2 sm:p-3 rounded border border-slate-200">
          {achievement.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center text-xs sm:text-sm text-slate-500">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Victory Date: {achievement.date}
          </div>
          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-full text-xs sm:text-sm font-bold bg-yellow-100 text-slate-700 border border-yellow-300 hover:bg-yellow-200 transition-colors"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              PROOF
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Achievements Section
const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
}) => (
  <section className="mb-8 lg:mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 lg:mb-8 flex items-center justify-center bg-gradient-to-r from-purple-100 to-violet-100 p-3 sm:p-4 rounded-xl border border-purple-200 mx-4 sm:mx-0">
      <Award className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-purple-600" />
      <span className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
        🏔️ DINO ODYSSEY: RISE OF THE CHALLENGER
      </span>
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
      {achievements.map((achievement: Achievement, index: number) => (
        <AchievementCard key={index} achievement={achievement} />
      ))}
    </div>
  </section>
);

// Individual Participation Card
// const ParticipationCard: React.FC<ParticipationCardProps> = ({
//   participation,
// }) => (
//   <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl shadow-xl p-4 sm:p-6 border border-orange-200 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group">
//     <div className="absolute top-2 right-2 text-xl sm:text-2xl animate-pulse opacity-70 group-hover:opacity-100 transition-opacity">
//       {participation.dinoType.split(" ")[0]}
//     </div>
//     <div className="absolute bottom-2 left-2 text-base sm:text-lg opacity-30">
//       🥚
//     </div>
//     <div className="mb-4 relative z-10">
//       <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 sm:p-4 rounded-full w-fit mb-4 border border-emerald-300 shadow-lg mx-auto sm:mx-0">
//         <User className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-700" />
//       </div>
//       <div className="text-base sm:text-lg font-bold text-slate-700 mb-2 text-center sm:text-left">
//         {participation.dinoType}
//       </div>
//       <h3 className="font-bold text-sm sm:text-lg text-slate-800 mb-2 text-center sm:text-left">
//         {participation.event}
//       </h3>
//       <span className="inline-block px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-red-100 text-slate-700 mb-3 border border-red-300">
//         🎯 {participation.role}
//       </span>
//     </div>
//     <div className="space-y-3 relative z-10">
//       <div className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-slate-500">
//         <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
//         Expedition: {participation.date}
//       </div>
//       <p className="text-xs sm:text-sm text-slate-700 bg-white/70 backdrop-blur-sm p-2 sm:p-3 rounded border border-slate-200">
//         {participation.description}
//       </p>
//       {participation.link && (
//         <a
//           href={participation.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center px-3 py-2 rounded-full text-xs sm:text-sm font-bold bg-emerald-100 text-slate-700 border border-emerald-300 hover:bg-emerald-200 transition-colors"
//         >
//           <ExternalLink className="h-3 w-3 mr-1" />
//           DETAILS
//         </a>
//       )}
//     </div>
//   </div>
// );

// Participations Section
// const ParticipationsSection: React.FC<ParticipationsSectionProps> = ({
//   participations,
// }) => (
//   <section className="mb-8 lg:mb-12">
//     <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 lg:mb-8 flex items-center justify-center bg-gradient-to-r from-orange-100 to-amber-100 p-3 sm:p-4 rounded-xl border border-orange-200 mx-4 sm:mx-0">
//       <User className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-orange-600" />
//       <span className="text-center">🌿 DINO HERD ADVENTURES 🦕</span>
//     </h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
//       {participations.map((participation: Participation, index: number) => (
//         <ParticipationCard key={index} participation={participation} />
//       ))}
//     </div>
//   </section>
// );

// Background Decorations Component - Responsive
const BackgroundDecorations: React.FC = () => (
  <>
    <div className="absolute top-5 left-5 sm:top-10 sm:left-10 text-4xl sm:text-6xl opacity-10 animate-bounce">
      🦴
    </div>
    <div className="absolute top-10 right-8 sm:top-20 sm:right-16 text-3xl sm:text-5xl opacity-10 animate-pulse">
      🌿
    </div>
    <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 text-5xl sm:text-7xl opacity-10 animate-bounce">
      🦖
    </div>
    <div className="absolute bottom-16 right-5 sm:bottom-32 sm:right-10 text-3xl sm:text-4xl opacity-10 animate-pulse">
      🥚
    </div>
    <div className="absolute top-1/2 left-2 sm:left-5 text-3xl sm:text-5xl opacity-10 animate-bounce">
      🌋
    </div>
  </>
);

// Main Page Component
const Page: React.FC = () => {
  const credlyLink: string =
    "https://www.credly.com/users/patiphan-akkahadsri.41c7b44d/badges#credly";

  const credlyCertifications: CredlyCertification[] = [
    {
      title: "AWS Educate Machine Learning Foundations",
      issuer: "Amazon Web Services",
      date: "2025",
      link: "https://www.credly.com/badges/9f8bd627-2ef3-419a-8b33-438e44e79d2d",
    },
    {
      title: "Google Cloud Computing Foundations Certificate",
      issuer: "Google Cloud",
      date: "2024",
      link: "https://www.credly.com/badges/6c5c39a3-11aa-49ba-a8e4-a20ccdecd5e2",
    },
    {
      title: "Foundation AI (Theory)",
      issuer: "Artificial Intelligence Association of Thailand",
      date: "2025",
      link: "https://assessment.aiat.or.th/certificate/8423c48f-5c49-4569-87e3-d03f3ab2e66f",
    },
    {
      title: "Gemini Certified Educator",
      issuer: "Google for Education",
      date: "2025",
      link: "https://edu.google.accredible.com/e624c8f3-8c86-4316-8a45-17e2e982f336#acc.biZv90Pp",
    },
  ];

  const otherCertifications: OtherCertification[] = [
    {
      title: "Certificate of Principle of Communication",
      issuer: "KLIX - KMITL Learning Intelligence X",
      date: "2022",
      type: "Course Completion",
      description: `Covered fundamental concepts of communication systems,
      including Fourier analysis/transform, modulation techniques (AM, FM, PM),
      sampling and quantization, pulse modulation (PAM, PWM, PPM),
      and basics of digital/data communications.`,
      dinoType: "",
      link: "https://klix.kmitl.ac.th/certificate/92162/",
    },
    {
      title: "OpenCV Bootcamp",
      issuer: "OpenCV University",
      date: "2024",
      type: "Course Completion",
      description: `This course provides a comprehensive journey
      through computer vision, starting with image basics and fundamental manipulations,
      progressing to techniques like histograms, color segmentation, contour and shape analysis,
      and extending into video processing and human–computer interaction through simple games.
      Learners will explore advanced applications such as image registration, ArUco marker–based augmented reality,
      and deep learning with OpenCV for tasks like face and landmark detection, object detection, tracking, and human pose estimation.
      The course also emphasizes practical deployment by building interactive web apps with Streamlit, blending theory
      with hands-on projects to bridge vision algorithms and real-world applications`,
      dinoType: "",
      link: "https://courses.opencv.org/certificates/1750eb1c8e30410f9518b601b527553a",
    },
    // {
    //   title: "Certificate of Mathematics For Finding Area And Volume",
    //   issuer: "KLIX - KMITL Learning Intelligence X",
    //   date: "2022",
    //   type: "Course Completion",
    //   description: `Explored mathematical techniques for analyzing and graphing functions in 2D and 3D spaces.
    //   Covered graph properties, constructing 1-variable functions,
    //   3D graphs, quadric surfaces, and methods for calculating areas and volumes,
    //   including multiple integrals.`,
    //   dinoType: "🦴 Velociraptor",
    //   link: "https://klix.kmitl.ac.th/certificate/92162/",
    // },
  ];

  const achievements: Achievement[] = [
    {
      title: "Paticipation in Finalist",
      event: "Agentic AI For Healthcare <Hackathon>",
      date: "July 31, 2025",
      description: "2nd place in the Kaggle track",
      dinoType: "🦖 Challenger",
      link: "https://github.com/PatiphanAK/cmkl-med-hackathon",
    },
  ];

  // const participations: Participation[] = [];

  // const stats: Stats = {
  //   credlyCount: credlyCertifications.length,
  //   otherCertCount: otherCertifications.length,
  //   achievementsCount: achievements.length,
  //   participationsCount: participations.length,
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-3 sm:p-4 lg:p-6 relative overflow-hidden">
      <BackgroundDecorations />
      <div className="max-w-7xl mx-auto relative z-10">
        <DinoHeader />
        <CredlyProfile credlyLink={credlyLink} />
        <CredlySection certifications={credlyCertifications} />
        <LearningJourneys certifications={otherCertifications} />
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  );
};
export default Page;
