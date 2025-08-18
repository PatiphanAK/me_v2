import { Suspense, ComponentType } from 'react';
import About from '@/app/components/Organism/About';
import Contacts from './components/Organism/Contact';
import Skill from '@/app/components/Organism/Skill';
import Projects from './components/Organism/Project';
import ErrorBoundary from "@/app/components/Template/Error"
import LoadingSpinner from '@/app/components/Template/Loading';

interface SectionConfig {
  id: string;
  title: string;
  component: ComponentType;
  className?: string;
  containerClassName?: string;
  isLazy?: boolean;
}

const sectionConfigs: SectionConfig[] = [
  { 
    id: "about", 
    title: "About Me",
    component: About,
    className: "min-h-screen",
    containerClassName: ""
  },
  {
    id: "skill",
    title: "Skill",
    component: Skill,
    className: "min-h-screen",
    containerClassName: ""
  },
  {
    id: "projects",
    title: "Projects",
    component: Projects,
    className: "min-h-screen",
    containerClassName: ""
  },
];

export default function Home() {
  return (
    <>
      <main className="scroll-smooth">
        {sectionConfigs.map(({ 
          id, 
          component: Component, 
          className, 
          containerClassName 
        }) => (
          <section key={id} id={id} className={className}>
            <div className={containerClassName}>
              <ErrorBoundary fallback={<div>Section failed to load</div>}>
                <Suspense fallback={<LoadingSpinner />}>
                  <Component />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>
        ))}
      </main>
      
      {/* Contact as footer */}
      <footer id="contact">
        <ErrorBoundary fallback={<div>Contact section failed to load</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <Contacts />
          </Suspense>
        </ErrorBoundary>
      </footer>
    </>
  );
}