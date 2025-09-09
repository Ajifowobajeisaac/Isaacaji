
import React, { useState, useEffect, useCallback } from "react";
import { Project } from "@/entities/Project";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar, Filter } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const filterProjects = useCallback(() => {
    if (selectedFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.status === selectedFilter));
    }
  }, [projects, selectedFilter]); // Dependencies for useCallback

  useEffect(() => {
    filterProjects();
  }, [filterProjects]); // Dependency for useEffect, depends on the memoized filterProjects

  const loadProjects = async () => {
    try {
      const data = await Project.list();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "live": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_development": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "planned": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in_development": return "In Development";
      case "completed": return "Completed";
      case "live": return "Live";
      case "planned": return "Planned";
      default: return status;
    }
  };

  const filterOptions = [
    { value: "all", label: "All Projects" },
    { value: "live", label: "Live" },
    { value: "completed", label: "Completed" },
    { value: "in_development", label: "In Development" },
    { value: "planned", label: "Planned" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded-lg max-w-md"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of innovative solutions, from AI-driven products to sustainability initiatives
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 mr-4">
            <Filter className="w-4 h-4" />
            Filter by status:
          </div>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(option.value)}
              className="rounded-full"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600">
              {selectedFilter === "all" 
                ? "Projects will appear here once they're added." 
                : `No projects with ${selectedFilter} status found.`
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {project.image_url && (
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <Badge className={`${getStatusColor(project.status)} border`}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.live_url && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-full"
                        asChild
                      >
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 rounded-full"
                        asChild
                      >
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20 py-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always looking for exciting projects and opportunities to create meaningful impact. 
            Let's discuss how we can work together.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
