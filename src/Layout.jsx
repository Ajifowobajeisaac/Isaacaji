import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigationItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "About", path: createPageUrl("About") },
    { name: "Projects", path: createPageUrl("Projects") },
    { name: "Blog", path: createPageUrl("Blog") },
    { name: "Contact", path: createPageUrl("Contact") }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to={createPageUrl("Home")} 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Isaac Aji.
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-full ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <Button 
                size="sm"
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 shadow-sm"
                asChild
              >
                <Link to={createPageUrl("Contact")}>
                  <Mail className="w-4 h-4 mr-2" />
                  Hire Me
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Button 
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  asChild
                >
                  <Link to={createPageUrl("Contact")}>
                    <Mail className="w-4 h-4 mr-2" />
                    Hire Me
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Isaac Ajifowobaje</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
              Business Analyst | Data Analytics | SQL & Power BI | Bridging strategy, technology, and sustainable solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navigationItems.slice(1).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <a href="https://linkedin.com/in/isaac-ajifowobaje" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/isaacaji" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                  GitHub  
                </a>
                <a href="mailto:isaac@isaacaji.com" className="block text-gray-300 hover:text-white text-sm transition-colors">
                  isaac@isaacaji.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Isaac Ajifowobaje. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
