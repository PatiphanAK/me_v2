import React from 'react';
import { ExternalLink, Award, Calendar, User, CheckCircle, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

interface CredlyCertification {
  title: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  dinoType: string;
  link?: string;
}

interface OtherCertification {
  title: string;
  issuer: string;
  date: string;
  type: string;
  description: string;
  dinoType: string;
  link?: string;
}

interface Achievement {
  title: string;
  event: string;
  date: string;
  description: string;
  dinoType: string;
  link?: string;
}

interface Participation {
  event: string;
  role: string;
  date: string;
  description: string;
  dinoType: string;
  link?: string;
}

interface Stats {
  credlyCount: number;
  otherCertCount: number;
  achievementsCount: number;
  participationsCount: number;
}

interface CredlyProfileProps {
  credlyLink: string;
}

interface CredlyCardProps {
  cert: CredlyCertification;
}

interface CredlySectionProps {
  certifications: CredlyCertification[];
}

interface OtherCertCardProps {
  cert: OtherCertification;
}

interface OtherCertificationsSectionProps {
  certifications: OtherCertification[];
}

interface AchievementCardProps {
  achievement: Achievement;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

interface ParticipationCardProps {
  participation: Participation;
}

interface ParticipationsSectionProps {
  participations: Participation[];
}

interface StatsMuseumProps {
  stats: Stats;
}

// Header Component
const DinoHeader: React.FC = () => (
  <header className="text-center mb-12 relative">
    <div className="bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent mb-4">
      <h1 className="text-5xl font-bold mb-2">
        🦕 DINO-SAURUS ACHIEVEMENTS 🦖
      </h1>
    </div>
    <div className="text-2xl mb-4">⚡ PREHISTORIC PORTFOLIO ⚡</div>
    <p className="text-lg text-gray-700 max-w-2xl mx-auto bg-amber-100 p-4 rounded-xl border-4 border-amber-300 shadow-lg">
      Journey through the Mesozoic Era of Professional Development! 
      <br />🌿 Collecting achievements like fossils since the dawn of code 🌿
    </p>
  </header>
);

// Credly Profile Component
const CredlyProfile: React.FC<CredlyProfileProps> = ({ credlyLink }) => (
  <div className="bg-gradient-to-r from-amber-200 to-yellow-200 rounded-2xl shadow-xl p-8 mb-10 border-4 border-amber-400 relative overflow-hidden">
    <div className="absolute top-2 right-2 text-3xl animate-spin">🌟</div>
    <div className="absolute bottom-2 left-2 text-4xl">🦴</div>
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center space-x-6">
        <div className="bg-orange-300 p-4 rounded-full border-4 border-orange-500 shadow-lg">
          <Image
              src="https://www.svgrepo.com/show/331358/credly.svg"
              alt="Credly Logo"
              width={100}
              height={100}
              className="object-contain"
            />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">🏆 CREDLY FOSSIL COLLECTION 🏆</h2>
          <p className="text-amber-800 text-lg">Verified digital badges from the ancient archives!</p>
        </div>
      </div>
      <a 
        href={credlyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg border-2 border-white text-lg font-bold"
      >
        <span>🔍 EXCAVATE CREDLY</span>
        <ExternalLink className="h-5 w-5" />
      </a>
    </div>
  </div>
);

// Individual Credly Certificate Card
const CredlyCard: React.FC<CredlyCardProps> = ({ cert }) => (
  <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl shadow-xl p-8 border-4 border-green-400 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden">
    <div className="absolute top-2 right-2 text-2xl animate-bounce">{cert.dinoType.split(' ')[0]}</div>
    <div className="absolute bottom-2 left-2 text-lg opacity-60">🌿</div>
    <div className="flex items-start space-x-6 relative z-10">
      <div className="relative">
        <img 
          src={cert.badgeUrl} 
          alt={cert.title}
          className="w-20 h-20 rounded-full border-4 border-green-500 shadow-lg"
        />
        <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 border-2 border-yellow-600">
          <CheckCircle className="h-4 w-4 text-green-700" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-xl font-bold text-green-900 mb-1">{cert.dinoType}</div>
        <h3 className="font-bold text-lg text-green-800 mb-2">{cert.title}</h3>
        <p className="text-green-700 font-semibold mb-3">{cert.issuer}</p>
        <div className="flex items-center text-sm text-green-600 mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          Era: {cert.date}
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-yellow-300 text-green-800 border-2 border-yellow-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            🦴 FOSSIL VERIFIED
          </span>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-blue-300 text-green-800 border-2 border-blue-500 hover:bg-blue-400 transition-colors"
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
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center justify-center bg-green-200 p-4 rounded-xl border-4 border-green-400">
      <Shield className="h-8 w-8 mr-3 text-green-700" />
      🦖 VERIFIED DINO BADGES 🦕
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      {certifications.map((cert: CredlyCertification, index: number) => (
        <CredlyCard key={index} cert={cert} />
      ))}
    </div>
  </section>
);

// Individual Other Certificate Card
const OtherCertCard: React.FC<OtherCertCardProps> = ({ cert }) => (
  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-xl p-6 border-4 border-blue-400 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden">
    <div className="absolute top-2 right-2 text-2xl animate-pulse">{cert.dinoType.split(' ')[0]}</div>
    <div className="absolute bottom-2 left-2 text-lg opacity-60">🌋</div>
    <div className="mb-4 relative z-10">
      <div className="bg-cyan-300 p-4 rounded-full w-fit mb-4 border-4 border-cyan-500 shadow-lg">
        <Award className="h-8 w-8 text-cyan-700" />
      </div>
      <div className="text-lg font-bold text-blue-900 mb-2">{cert.dinoType}</div>
      <h3 className="font-bold text-lg text-blue-800 mb-2">{cert.title}</h3>
      <p className="text-blue-700 font-semibold">{cert.issuer}</p>
    </div>
    <div className="space-y-3 relative z-10">
      <div className="flex items-center text-sm text-blue-600">
        <Calendar className="h-4 w-4 mr-2" />
        Discovered: {cert.date}
      </div>
      <div className="text-sm text-blue-700 bg-white p-2 rounded border-2 border-blue-300">{cert.description}</div>
      <div className="flex items-center space-x-3">
        <span className="inline-block px-3 py-2 rounded-full text-xs font-bold bg-purple-200 text-blue-800 border-2 border-purple-400">
          📜 {cert.type}
        </span>
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-full text-xs font-bold bg-green-200 text-blue-800 border-2 border-green-400 hover:bg-green-300 transition-colors"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            VIEW
          </a>
        )}
      </div>
    </div>
  </div>
);

// Other Certifications Section
const LearningJourneys: React.FC<OtherCertificationsSectionProps> = ({ certifications }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center justify-center bg-blue-200 p-4 rounded-xl border-4 border-blue-400">
      <Zap className="h-8 w-8 mr-3 text-blue-700" />
      🧩 Learning Side-Quests (Completed Courses)
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certifications.map((cert: OtherCertification, index: number) => (
        <OtherCertCard key={index} cert={cert} />
      ))}
    </div>
  </section>
);

// Individual Achievement Card
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => (
  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 border-4 border-purple-400 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden">
    <div className="absolute top-2 right-2 text-3xl animate-bounce">{achievement.dinoType.split(' ')[0]}</div>
    <div className="absolute bottom-2 left-2 text-2xl opacity-60">⚡</div>
    <div className="flex items-start space-x-6 relative z-10">
      <div className="bg-yellow-300 p-4 rounded-full border-4 border-yellow-500 shadow-lg">
        <Award className="h-8 w-8 text-yellow-700" />
      </div>
      <div className="flex-1">
        <div className="text-xl font-bold text-purple-900 mb-1">{achievement.dinoType}</div>
        <h3 className="font-bold text-xl text-purple-800 mb-2">{achievement.title}</h3>
        <p className="text-purple-700 font-semibold mb-3 text-lg">{achievement.event}</p>
        <p className="text-purple-600 text-sm mb-4 bg-white p-3 rounded border-2 border-purple-300">{achievement.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-purple-600">
            <Calendar className="h-4 w-4 mr-2" />
            Victory Date: {achievement.date}
          </div>
          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-yellow-200 text-purple-800 border-2 border-yellow-400 hover:bg-yellow-300 transition-colors"
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
const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-purple-800 mb-8 flex items-center justify-center bg-purple-200 p-4 rounded-xl border-4 border-purple-400">
      <Award className="h-8 w-8 mr-3 text-purple-700" />
      🏔️ DINO ODYSSEY: RISE OF THE CHALLENGER
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      {achievements.map((achievement: Achievement, index: number) => (
        <AchievementCard key={index} achievement={achievement} />
      ))}
    </div>
  </section>
);

// Individual Participation Card
const ParticipationCard: React.FC<ParticipationCardProps> = ({ participation }) => (
  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-xl p-6 border-4 border-orange-400 hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden">
    <div className="absolute top-2 right-2 text-2xl animate-pulse">{participation.dinoType.split(' ')[0]}</div>
    <div className="absolute bottom-2 left-2 text-lg opacity-60">🥚</div>
    <div className="mb-4 relative z-10">
      <div className="bg-emerald-300 p-4 rounded-full w-fit mb-4 border-4 border-emerald-500 shadow-lg">
        <User className="h-8 w-8 text-emerald-700" />
      </div>
      <div className="text-lg font-bold text-orange-900 mb-2">{participation.dinoType}</div>
      <h3 className="font-bold text-lg text-orange-800 mb-2">{participation.event}</h3>
      <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-red-200 text-orange-800 mb-3 border-2 border-red-400">
        🎯 {participation.role}
      </span>
    </div>
    <div className="space-y-3 relative z-10">
      <div className="flex items-center text-sm text-orange-600">
        <Calendar className="h-4 w-4 mr-2" />
        Expedition: {participation.date}
      </div>
      <p className="text-sm text-orange-700 bg-white p-3 rounded border-2 border-orange-300">{participation.description}</p>
      {participation.link && (
        <a
          href={participation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-emerald-200 text-orange-800 border-2 border-emerald-400 hover:bg-emerald-300 transition-colors"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          DETAILS
        </a>
      )}
    </div>
  </div>
);

// Participations Section
const ParticipationsSection: React.FC<ParticipationsSectionProps> = ({ participations }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-orange-800 mb-8 flex items-center justify-center bg-orange-200 p-4 rounded-xl border-4 border-orange-400">
      <User className="h-8 w-8 mr-3 text-orange-700" />
      🌿 DINO HERD ADVENTURES 🦕
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {participations.map((participation: Participation, index: number) => (
        <ParticipationCard key={index} participation={participation} />
      ))}
    </div>
  </section>
);

// Stats Summary Component
// const StatsMuseum: React.FC<StatsMuseumProps> = ({ stats }) => (
//   <div className="bg-gradient-to-r from-emerald-200 via-green-200 to-lime-200 rounded-2xl shadow-2xl p-10 border-4 border-green-500 relative overflow-hidden">
//     <div className="absolute top-2 left-2 text-4xl animate-spin">🌟</div>
//     <div className="absolute top-2 right-2 text-4xl animate-bounce">🦖</div>
//     <div className="absolute bottom-2 left-2 text-3xl animate-pulse">🌋</div>
//     <div className="absolute bottom-2 right-2 text-3xl animate-bounce">🦴</div>
    
//     <h2 className="text-4xl font-bold text-green-800 mb-8 text-center relative z-10">
//       🏛️ PREHISTORIC STATISTICS MUSEUM 📊
//     </h2>
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
//       <div className="text-center bg-blue-100 p-6 rounded-xl border-4 border-blue-400 transform hover:scale-110 transition-all">
//         <div className="text-5xl font-bold text-blue-700 mb-3">{stats.credlyCount}</div>
//         <div className="text-blue-600 font-bold text-lg">🦖 Credly Fossils</div>
//       </div>
//       <div className="text-center bg-green-100 p-6 rounded-xl border-4 border-green-400 transform hover:scale-110 transition-all">
//         <div className="text-5xl font-bold text-green-700 mb-3">{stats.otherCertCount}</div>
//         <div className="text-green-600 font-bold text-lg">📜 Ancient Scrolls</div>
//       </div>
//       <div className="text-center bg-purple-100 p-6 rounded-xl border-4 border-purple-400 transform hover:scale-110 transition-all">
//         <div className="text-5xl font-bold text-purple-700 mb-3">{stats.achievementsCount}</div>
//         <div className="text-purple-600 font-bold text-lg">👑 Epic Victories</div>
//       </div>
//       <div className="text-center bg-orange-100 p-6 rounded-xl border-4 border-orange-400 transform hover:scale-110 transition-all">
//         <div className="text-5xl font-bold text-orange-700 mb-3">{stats.participationsCount}</div>
//         <div className="text-orange-600 font-bold text-lg">🌿 Herd Adventures</div>
//       </div>
//     </div>
    
//     <div className="text-center mt-8 relative z-10">
//       <p className="text-2xl font-bold text-green-800 bg-yellow-200 p-4 rounded-full border-4 border-yellow-400 inline-block">
//         🎉 ROAR-SOME COLLECTION COMPLETE! 🎉
//       </p>
//     </div>
//   </div>
// );

// Background Decorations Component
const BackgroundDecorations: React.FC = () => (
  <>
    <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🦴</div>
    <div className="absolute top-20 right-16 text-5xl opacity-20 animate-pulse">🌿</div>
    <div className="absolute bottom-20 left-20 text-7xl opacity-20 animate-bounce">🦖</div>
    <div className="absolute bottom-32 right-10 text-4xl opacity-20 animate-pulse">🥚</div>
    <div className="absolute top-1/2 left-5 text-5xl opacity-20 animate-bounce">🌋</div>
  </>
);

// Main Page Component
const Page: React.FC = () => {
  const credlyLink: string = "https://www.credly.com/users/patiphan-akkahadsri.41c7b44d/badges#credly";

  const credlyCertifications: CredlyCertification[] = [
    {
      title: "AWS Educate Machine Learning Foundations",
      issuer: "Amazon Web Services",
      date: "2025",
      badgeUrl: "https://images.credly.com/size/340x340/images/51984979-f759-49f0-8bb3-5310d364fdbe/image.png",
      dinoType: "🦕 Brontosaurus",
      link: "https://www.credly.com/badges/9f8bd627-2ef3-419a-8b33-438e44e79d2d"
    },
    {
      title: "Google Cloud Computing Foundations Certificate",
      issuer: "Google Cloud",
      date: "2024",
      badgeUrl: "https://images.credly.com/size/340x340/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png",
      dinoType: "🦖 T-Rex",
      link: "https://www.credly.com/badges/6c5c39a3-11aa-49ba-a8e4-a20ccdecd5e2"
    },
    {
      title: "Foundation AI (Theory)",
      issuer: "Artificial Intelligence Association of Thailand",
      date: "2025",
      badgeUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxhJdAu90a8f2RB7wi22tSHV7mNVq1An6MA&s",
      dinoType: "🦖 T-Rex",
      link: "https://assessment.aiat.or.th/certificate/8423c48f-5c49-4569-87e3-d03f3ab2e66f"
    }
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
      dinoType: "🦴 Velociraptor",
      link: "https://klix.kmitl.ac.th/certificate/92162/"
    },
    {
      title: "Certificate of Mathematics For Finding Area And Volume",
      issuer: "KLIX - KMITL Learning Intelligence X",
      date: "2022",
      type: "Course Completion",
      description: `Explored mathematical techniques for analyzing and graphing functions in 2D and 3D spaces. 
      Covered graph properties, constructing 1-variable functions, 
      3D graphs, quadric surfaces, and methods for calculating areas and volumes, 
      including multiple integrals.`,
      dinoType: "🦴 Velociraptor",
      link: "https://klix.kmitl.ac.th/certificate/92162/"
    },
  ];

  const achievements: Achievement[] = [
    {
      title: "Finalist",
      event: "Agentic AI For Healthcare <Hackathon>",
      date: "July 31, 2025",
      description: "2nd place in the Kaggle track",
      dinoType: "🦖 Challenger",
      link: "https://github.com/PatiphanAK/cmkl-med-hackathon"
    },
  ];

  const participations: Participation[] = [
  ];

  const stats: Stats = {
    credlyCount: credlyCertifications.length,
    otherCertCount: otherCertifications.length,
    achievementsCount: achievements.length,
    participationsCount: participations.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 p-6 relative overflow-hidden">
      <BackgroundDecorations />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <DinoHeader />
        <CredlyProfile credlyLink={credlyLink} />
        <CredlySection certifications={credlyCertifications} />
        <LearningJourneys certifications={otherCertifications} />
        <AchievementsSection achievements={achievements} />
        {/* <ParticipationsSection participations={participations} /> */}
        {/* <StatsMuseum stats={stats} /> */}
      </div>
    </div>
  );
};

export default Page;