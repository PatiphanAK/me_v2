import Image from "next/image";
import { Project } from "@/app/types/project/project.type";
import { isValidImageUrl } from "@/app/helpers/helper";

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 overflow-hidden hover:shadow-2xl hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
    <div className="relative h-48 overflow-hidden">
      {isValidImageUrl(project.image) ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-200"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
        </>
      )}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
          project.status === 'Active' ? 'bg-emerald-100/90 text-emerald-700' :
          project.status === 'In-Progress' ? 'bg-amber-100/90 text-amber-700' :
          'bg-slate-100/90 text-slate-700'
        }`}>
          {project.status}
        </span>
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-cyan-700">
          {project.category}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-600 mb-4 line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 4).map((tech, index) => (
          <span key={index} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-lg text-xs font-medium">
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>
      
      <div className="flex gap-3">
        {project.website && (
          <a href={project.website} className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
            View Live
          </a>
        )}
        {project.githubURL && (
          <a href={project.githubURL} className="flex-1 border-2 border-cyan-400 text-cyan-600 px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-cyan-400 hover:text-white transition-all duration-300">
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);