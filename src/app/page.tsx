"use client";
import { Suspense, ComponentType } from "react";
import About from "@/app/components/Organism/About";
import Skill from "@/app/components/Organism/Skill";
import Projects from "@/app/components/Organism/Project";
import Contacts from "@/app/components/Organism/Contact";
import ErrorBoundary from "@/app/components/Template/Error";
import LoadingSpinner from "@/app/components/Template/Loading";

interface SectionConfig {
  id: string;
  component: ComponentType;
  fullHeight?: boolean;
}

const sections: SectionConfig[] = [
  { id: "about", component: About, fullHeight: true },
  { id: "projects", component: Projects, fullHeight: true },
  { id: "skill", component: Skill, fullHeight: true },
];

function SectionWrapper({
  id,
  Component,
  fullHeight = true,
}: {
  id: string;
  Component: ComponentType;
  fullHeight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative w-full flex flex-col justify-center ${
        fullHeight ? "min-h-screen" : "py-24"
      }`}
    >
      <ErrorBoundary
        fallback={
          <div className="text-red-500 p-4">Section failed to load</div>
        }
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        {sections.map(({ id, component, fullHeight = true }) => (
          <SectionWrapper
            key={id}
            id={id}
            Component={component}
            fullHeight={fullHeight}
          />
        ))}
      </main>
      <Contacts />
    </>
  );
}
