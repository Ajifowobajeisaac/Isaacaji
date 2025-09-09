
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, FileText, Code, Leaf, User, Mail, ExternalLink } from "lucide-react";
import { Project } from "@/entities/Project";
import { BlogPost } from "@/entities/BlogPost";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    loadFeaturedProjects();
    loadRecentPosts();
  }, []);

  const loadFeaturedProjects = async () => {
    try {
      const projects = await Project.list();
      const featured = projects.filter(project => project.featured === true);
      setFeaturedProjects(featured);
    } catch (error) {
      console.error("Error loading featured projects:", error);
    }
  };

  const loadRecentPosts = async () => {
    try {
      const posts = await BlogPost.list();
      const published = posts.filter(post => post.published === true);
      // Get the 2 most recent posts
      const recent = published.slice(0, 2);
      setRecentPosts(recent);
    } catch (error) {
      console.error("Error loading recent posts:", error);
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Isaac Ajifowobaje
            </h1>
            <div className="text-xl md:text-2xl text-blue-600 font-medium mb-8">
              Business Analyst | Data Analytics | SQL & Power BI | Technical Product Development
            </div>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transforming complex challenges into actionable solutions through strategic analysis, data-driven insights, and a commitment to sustainable innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
                asChild
              >
                <Link to={createPageUrl("Projects")}>
                  <Briefcase className="w-5 h-5 mr-2" />
                  View Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 text-lg rounded-full transition-all duration-200"
                asChild
              >
                <Link to={createPageUrl("Contact")}>
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What I Bring
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining analytical thinking with technical expertise to drive meaningful impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <User className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Strategic Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  MSc Management with distinction and DWP experience in transforming complex business requirements into actionable insights.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                  <Code className="w-8 h-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">AI Product Engineering</h3>
                <p className="text-gray-600 leading-relaxed">
                  Building intelligent solutions that bridge technical capability with real-world applications and user needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <Leaf className="w-8 h-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Sustainability Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  Passionate about creating technology solutions that contribute to environmental sustainability and positive impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600">
                Recent work showcasing innovation and impact
              </p>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <Link to={createPageUrl("Projects")}>
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 rounded-full"
                      asChild
                    >
                      <Link to={createPageUrl("Projects")}>
                        View All
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Insights
              </h2>
              <p className="text-lg text-gray-600">
                Technical writing and productivity thoughts
              </p>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <Link to={createPageUrl("Blog")}>
                <FileText className="w-4 h-4 mr-2" />
                View Blog
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    {post.tags && post.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
