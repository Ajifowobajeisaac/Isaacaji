
import React, { useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/entities/BlogPost";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Filter, BookOpen, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await BlogPost.list();
      // Filter for published posts only
      const publishedPosts = data.filter(post => post.published === true);
      setPosts(publishedPosts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = useCallback(() => {
    if (selectedTag === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => 
        post.tags && post.tags.includes(selectedTag)
      ));
    }
  }, [posts, selectedTag]);
  
  useEffect(() => {
    filterPosts();
  }, [filterPosts]); // Now depends on the memoized filterPosts

  const getAllTags = () => {
    const tagSet = new Set();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  };

  const getTagColor = (tag) => {
    const colors = {
      "Technical": "bg-blue-100 text-blue-800 border-blue-200",
      "Productivity": "bg-green-100 text-green-800 border-green-200", 
      "AI": "bg-purple-100 text-purple-800 border-purple-200",
      "Business": "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[tag] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded-lg max-w-md"></div>
            <div className="space-y-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allTags = getAllTags();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technical deep-dives, productivity insights, and thoughts on building better products
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-600 mr-4">
              <Filter className="w-4 h-4" />
              Filter by topic:
            </div>
            <Button
              variant={selectedTag === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag("all")}
              className="rounded-full"
            >
              All Posts
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        )}

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
            <p className="text-gray-600">
              {selectedTag === "all" 
                ? "Blog posts will appear here once they're published." 
                : `No posts tagged with "${selectedTag}" found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags && post.tags.map((tag, index) => (
                      <Badge key={index} className={`${getTagColor(tag)} border`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    {post.external_url && (
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(post.created_date), "MMMM d, yyyy")}
                    </div>
                    {post.reading_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.reading_time} min read
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full group-hover:shadow-lg transition-all duration-200"
                    onClick={() => {
                      if (post.external_url) {
                        window.open(post.external_url, '_blank', 'noopener,noreferrer');
                      } else {
                        // Handle local post routing here if needed
                        console.log('Navigate to local post:', post.slug);
                      }
                    }}
                  >
                    {post.platform ? `Read on ${post.platform}` : 'Read Full Post'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 py-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get notified when I publish new insights about technology, productivity, and building better products.
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-600 text-white hover:bg-yellow-700 px-8 py-4 rounded-full font-medium"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}
