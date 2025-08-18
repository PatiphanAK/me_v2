"use client";

import React from 'react';
import { useId, useState, useEffect } from "react";
import { Brain,Layers, Cpu, BookOpen, ExternalLink } from 'lucide-react';
import { TheorySkillProps, PracticalSkillProps } from '../../types/skill/skill.interface';
import programmingLanguagesRaw from "../../data/skill/programing.json"
import backendFrameworksRaw from "../../data/skill/back.json"
import frontendFrameworksRaw from "../../data/skill/front.json"
import aiMlToolsRaw from "../../data/skill/data.json"
import devToolsRaw from "../../data/skill/devtool.json"
import infrastructureRaw from "../../data/skill/infra.json"
import theoreticalSkillsRaw from "../../data/skill/theory.json"
import databaseRaw from "../../data/skill/db.json"
import { SpaceObjects } from '../Molecules/props/SpaceObject';
import { TechLogo } from '../Molecules/Card/SkillLogo';

const generateSkillsWithIds = (skills: Omit<PracticalSkillProps, 'id'>[], startId: number = 1): PracticalSkillProps[] => {
  return skills.map((skill, index) => ({
    id: startId + index,
    ...skill
  }));
};

const iconMap: Record<'Brain' | 'Cpu' | 'BookOpen' | 'Layers' | 'Math', React.ReactNode> = {
  Brain: <Brain className="text-white" size={24} />,
  Cpu: <Cpu className="text-white" size={24} />,
  BookOpen: <BookOpen className="text-white" size={24} />,
  Layers: <Layers className="text-white" size={24} />,
  Math: <span className="text-white text-lg font-bold">∑</span>
};

const SkillCategory: React.FC<TheorySkillProps> = ({ title, skills, icon, color, bgGradient, link }) => (
  <div className={`relative p-6 rounded-2xl backdrop-blur-md border border-opacity-20 hover:border-opacity-40 transition-all duration-500 transform hover:scale-105 ${bgGradient} shadow-xl group`}>
    <div className="flex items-start space-x-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-300 hover:text-blue-200"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0 animate-pulse"></div>
              {skill.link ? (
                <a 
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 text-sm leading-relaxed hover:text-blue-300 transition-colors duration-200 underline decoration-dotted"
                >
                  {skill.name}
                </a>
              ) : (
                <p className="text-gray-200 text-sm leading-relaxed">{skill.name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PracticalSkillsSection: React.FC<{ title: string; skills: PracticalSkillProps[]; subtitle: string }> = ({ title, skills, subtitle }) => (
  <div className="mb-16">
    <div className="text-center mb-10">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-blue-300 text-sm">{subtitle}</p>
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      {skills.map((tech, index) => (
        <TechLogo
          key={tech.id || index}
          id={tech.id}
          name={tech.name}
          logoUrl={tech.logoUrl}
          color={tech.color}
          description={tech.description}
          tags={tech.tags}
        />
      ))}
    </div>
  </div>
);

const PracticalBlock = () => {
  const practicalSections = [
    {
      title: "Programming Languages",
      skills: generateSkillsWithIds(programmingLanguagesRaw, 1),
      subtitle: "Foundation • Core Languages • System Programming"
    },
    {
      title: "Backend Frameworks",
      skills: generateSkillsWithIds(backendFrameworksRaw, 10),
      subtitle: "Server-side • API Development • Backend Architecture"
    },
    {
      title: "Database & Caching",
      skills: generateSkillsWithIds(databaseRaw, 20),
      subtitle: "Relational • NoSQL • In-memory • Data Management"
    },
    {
      title: "Frontend Frameworks",
      skills: generateSkillsWithIds(frontendFrameworksRaw, 13),
      subtitle: "User Interface • Web Applications • Client-side"
    },
    {
      title: "AI/ML & Computer Vision",
      skills: generateSkillsWithIds(aiMlToolsRaw, 15),
      subtitle: "Artificial Intelligence • Machine Learning • Data Science"
    },
    {
      title: "Development Tools",
      skills: generateSkillsWithIds(devToolsRaw, 20),
      subtitle: "IDE • Version Control • Development Environment"
    },
    {
      title: "Infrastructure & Cloud",
      skills: generateSkillsWithIds(infrastructureRaw, 23),
      subtitle: "DevOps • Cloud Platforms • Container Orchestration"
    }
  ];

  return (
    <div className="space-y-20">
      {practicalSections.map((section, index) => (
        <PracticalSkillsSection
          key={section.title}
          title={section.title}
          skills={section.skills}
          subtitle={section.subtitle}
        />
      ))}
    </div>
  );
};

// Fixed AtmosphericParticles component to avoid hydration mismatch
const AtmosphericParticles = () => {
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate particles on client side only
    const particleData = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }));
    setParticles(particleData);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-60 animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  );
};

// Fixed CloudLayer component to ensure consistent IDs
const CloudLayer = ({ className = "", opacity = 0.1, index }: { className?: string; opacity?: number; index: number }) => {
  // Use a deterministic ID based on index to avoid hydration mismatch
  const id = `cloud-layer-${index}`;
  
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="100%" height="200" className="opacity-30">
        <defs>
          <filter id={`blur-${id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        <ellipse
          cx="15%" cy="40" rx="120" ry="35"
          fill="white" opacity={opacity}
          filter={`url(#blur-${id})`}
        />
        <ellipse
          cx="45%" cy="80" rx="140" ry="25"
          fill="white" opacity={opacity * 0.8}
          filter={`url(#blur-${id})`}
        />
        <ellipse
          cx="75%" cy="50" rx="100" ry="40"
          fill="white" opacity={opacity * 0.6}
          filter={`url(#blur-${id})`}
        />
        <ellipse
          cx="90%" cy="30" rx="80" ry="20"
          fill="white" opacity={opacity * 0.7}
          filter={`url(#blur-${id})`}
        />
      </svg>
    </div>
  );
};

export default function Skill() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const theoreticalSkills = theoreticalSkillsRaw.map(skill => ({
    ...skill,
    icon: iconMap[skill.icon as keyof typeof iconMap] || <Brain className="text-white" size={24} />
  }));

  // Show loading state during hydration to prevent mismatch
  if (!isMounted) {
    return (
      <section className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 via-blue-900 via-indigo-800 via-purple-700 via-blue-600 to-cyan-400"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-20 bg-gray-700/50 rounded-lg mb-8 mx-auto w-96"></div>
              <div className="h-6 bg-gray-700/30 rounded mb-4 mx-auto w-64"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 via-blue-900 via-indigo-800 via-purple-700 via-blue-600 to-cyan-400"></div>
      
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-purple-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-transparent to-cyan-600/20"></div>
      
      <CloudLayer className="top-0" opacity={0.15} index={0} />
      <CloudLayer className="top-40" opacity={0.12} index={1} />
      <CloudLayer className="top-80" opacity={0.18} index={2} />
      <CloudLayer className="bottom-40" opacity={0.20} index={3} />
      <CloudLayer className="bottom-0" opacity={0.10} index={4} />
      
      <AtmosphericParticles />
      <SpaceObjects />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-emerald-400/30 via-blue-400/25 via-purple-400/20 to-pink-400/25 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-cyan-400/20 via-blue-500/15 to-indigo-500/20 blur-2xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent mb-8">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-4">
            Journey through the stratosphere of knowledge, from theoretical foundations to practical implementations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Theoretical Foundation
            </h2>
            <p className="text-lg text-cyan-300">Upper Atmosphere • Stratosphere • 50,000+ feet</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {theoreticalSkills.map((skill, index) => (
              <SkillCategory
                key={index}
                title={skill.title}
                skills={skill.skills}
                icon={skill.icon}
                color={skill.color}
                bgGradient={skill.bgGradient}
                link={skill.link}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Practical Implementation
            </h2>
            <p className="text-lg text-emerald-300">Lower Atmosphere • Earth Surface • Implementation Layer</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mt-4 rounded-full"></div>
          </div>
          <PracticalBlock />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-15px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(-8px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) rotate(270deg); opacity: 0.7; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}