import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown, GraduationCap, Briefcase, Target, Award, Globe, Calculator, Wrench} from "lucide-react";
import headshotImage from "@/assets/isaac-headshot.png";

export default function AboutPage() {
  const navigate = useNavigate();
  const highlights = [
    {
      icon: GraduationCap,
      title: "MSc Management - Distinction",
      description: "Advanced strategic thinking and business analysis skills with academic excellence"
    },
    {
      icon: Briefcase,
      title: "Government & Private Sector Experience", 
      description: "Real-world application of analytical skills in government and private sector transformation projects"
    },
    {
      icon: Globe,
      title: "Sustainability Focus",
      description: "Passionate advocate for environmentally conscious technology solutions"
    },
    {
      icon: Wrench,
      title: "Technical Delivery",
      description: "Built SonusShare, a full-stack web app handling API integrations and complex data workflows."
    },
    {
      icon: Calculator,
      title: "Finacial Awareness",
      description: "integrating financial modeling (FMVA) into BA practice for more robust decision support."
    }
  ];

  const skills = [
    "Business Analysis", "Data Analytics (SQL, Power BI, Excel)", "Financial & Strategic Analysis", "Strategic Planning",
    "Stakeholder Management",  "Process Optimization",
    "Sustainability Consulting", "Technical Writing", "Product Management"
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-xl border-4 border-white">
            <img 
              src={headshotImage} 
              alt="Isaac Ajifowobaje" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Isaac
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Business Analyst with a strong technical foundation and a focus on driving business value through data and collaboration.
          </p>
        </div>

        {/* Professional Summary */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Professional Mission</h2>
              </div>
              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                I'm a Business Analyst with a strong technical edge.  
                I bridge strategy, data, and technology to deliver products that work.
                </p>
                <p>
                With a Distinction in MSc Management and hands-on experience in software engineering,  
                I combine analytical skills with technical know-how in SQL, Power BI, and full-stack development.  
                </p>
                <p>
                I focus on data insights and stakeholder collaboration to drive better decisions.  
                I've built SonusShare, a cross-platform playlist conversion app, and I'm committed to continuous growth —  
                from BCS certifications to future financial modeling (FMVA).  
                </p>
                <p>
                  Whether I'm analyzing complex business requirements, developing AI product strategies, 
                  or writing about productivity and technical concepts, I bring a holistic approach that 
                  considers both immediate objectives and long-term implications.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Career Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Career Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <highlight.icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Skills & Expertise
          </h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 text-gray-700 rounded-full border border-blue-100 hover:border-blue-300 transition-colors duration-200 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Values */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">My Vision</h2>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                "To bridge the gap between complex business challenges and data-driven solutions,
                 empowering organizations to make smarter decisions. I believe in harnessing technology 
                 responsibly — from analytics to product innovation — to create sustainable, long-term
                impact for both businesses and society. "
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, 
            and how we can create meaningful impact together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-lg"
            >
              <FileDown className="w-5 h-5 mr-2" />
              Download CV
            </Button> */}
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-full"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
