
//import { Button } from "./ui/ReactButton";
import {  Plus, Share, Folder } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Plus,
      title: "Add Content",
      description: "Simply paste links from Twitter, YouTube, or other platforms",
      color: "bg-blue-500"
    },
    {
      icon: Folder,
      title: "Organize",
      description: "Create collections and tag your content for easy discovery",
      color: "bg-purple-500"
    },
    {
      icon: Share,
      title: "Share & Collaborate",
      description: "Generate shareable links and collaborate with your team",
      color: "bg-green-500"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get started in minutes with our simple 3-step process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-10"></div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-blue-100 text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already organizing their digital content more efficiently.
          </p>
          {/* <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            Start Free Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
