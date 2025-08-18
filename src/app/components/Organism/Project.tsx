"use client";   
import React, { useState, useMemo } from 'react';
import { Search, Grid, List, Cloud, Sun, Wind } from 'lucide-react';
import { Project, ProjectCategory, ProjectStatus, FilterCategory, FilterStatus, ViewMode } from '@/app/types/project/project.type';
import { ProjectCard } from '@/app/components/Molecules/Card/ProjectCard';
import { projectData } from '../../data/project/project';
import { PROJECT_STATUS_CONFIG } from '../../types/project/projectConfig';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const projects: Project[] = projectData;

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      
      // Handle category filtering - project.category is now an array
      const matchesCategory = categoryFilter === 'All' || project.categories.includes(categoryFilter as ProjectCategory);
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, searchTerm, statusFilter, categoryFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<FilterStatus, number> = {
      All: projects.length,
      [ProjectStatus.Active]: 0,
      [ProjectStatus.Legacy]: 0,
      [ProjectStatus.InProgress]: 0,
      [ProjectStatus.Completed]: 0
    };
    
    projects.forEach(project => {
      counts[project.status]++;
    });
    return counts;
  }, [projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-48 h-48 bg-cyan-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-indigo-400/20 backdrop-blur-sm border-b border-white/30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Cloud className="text-cyan-500 animate-bounce" size={48} />
              <Sun className="text-amber-400 animate-spin" size={40} style={{ animationDuration: '20s' }} />
              <Wind className="text-blue-500 animate-pulse" size={44} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent sm:text-6xl md:text-7xl mb-4">
              Troposphere
            </h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              My Project Collection
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
              Floating through layers of innovation • Where ideas meet the atmosphere of creativity
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Controls */}
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3">
                🔍 Search Projects
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title, description, or tech stack..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-cyan-200/50 rounded-2xl focus:ring-4 focus:ring-cyan-400/20 focus:border-cyan-400 bg-white/70 backdrop-blur-sm transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-3">
                📊 Status
              </label>
              <select
                id="status"
                className="w-full px-4 py-4 border-2 border-cyan-200/50 rounded-2xl focus:ring-4 focus:ring-cyan-400/20 focus:border-cyan-400 bg-white/70 backdrop-blur-sm transition-all duration-300"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              >
                <option value="All">All ({statusCounts.All})</option>
                {Object.values(ProjectStatus).map(status => (
                  <option key={status} value={status}>
                    {PROJECT_STATUS_CONFIG[status].label} ({statusCounts[status]})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-3">
                🏷️ Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-4 border-2 border-cyan-200/50 rounded-2xl focus:ring-4 focus:ring-cyan-400/20 focus:border-cyan-400 bg-white/70 backdrop-blur-sm transition-all duration-300"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
              >
                <option value="All">All Categories</option>
                {Object.values(ProjectCategory).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-cyan-200/30">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <span className="text-sm font-medium text-slate-600">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg' 
                    : 'bg-white/50 text-slate-600 hover:bg-white/80 hover:text-cyan-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg' 
                    : 'bg-white/50 text-slate-600 hover:bg-white/80 hover:text-cyan-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
            <p className="text-sm font-medium text-slate-600 bg-white/50 px-4 py-2 rounded-full">
              ☁️ Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-8">
              <Cloud className="mx-auto text-cyan-300" size={120} />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-4">No projects found in this layer</h3>
            <p className="text-slate-500 text-lg">
              Try adjusting your atmospheric filters to explore different layers.
            </p>
          </div>
        ) : (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
              : 'flex flex-col gap-8'
            }
          `}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={viewMode === 'list' ? 'max-w-4xl mx-auto w-full' : ''}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-white/60 via-cyan-50/60 to-blue-50/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Atmospheric Statistics
            </h3>
            <p className="text-slate-600">Current conditions in the project troposphere</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl font-bold">{projects.length}</span>
              </div>
              <div className="font-semibold text-slate-700">Total Projects</div>
              <div className="text-xs text-slate-500">Floating in space</div>
            </div>
            
            {Object.entries(PROJECT_STATUS_CONFIG).map(([status, config]) => (
              <div key={status} className="text-center group hover:scale-110 transition-transform duration-300">
                <div className={`bg-gradient-to-br ${config.color} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <span className="text-2xl font-bold">{statusCounts[status as ProjectStatus]}</span>
                </div>
                <div className="font-semibold text-slate-700">{config.label}</div>
                <div className="text-xs text-slate-500">{config.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;