
import { Card, CardContent } from "./ui/Reactcard";
import { Share2, Bookmark, Zap, Shield, Search, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bookmark,
      title: "Multi-Platform Aggregation",
      description: "Seamlessly collect content from Twitter, YouTube in one centralized location.",
      color: "bg-blue-500"
    },
    {
      icon: Share2,
      title: "Instant Sharing",
      description: "Share your curated collections with unique shareable links. Perfect for teams and collaborations.",
      color: "bg-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern React.js and optimized for speed. Access your content instantly, anywhere.",
      color: "bg-yellow-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your content is safely stored with enterprise-grade security and reliable MongoDB backend.",
      color: "bg-green-500"
    },
    {
      icon: Search,
      title: "Smart Organization",
      description: "Intuitive tagging and search features help you find exactly what you need, when you need it.",
      color: "bg-red-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share collections with team members and collaborate on content curation effortlessly.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"> Organize Content</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to make content aggregation and sharing effortless and intuitive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/70 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
