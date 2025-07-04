
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/ReactButton";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Now Available - Organize Your Digital Life
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
            Brainly
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Your Second Brain
            </span>
          </h1>
  
          <p className="text-xl lg:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Aggregate content from Twitter, YouTube, and more into one centralized hub. 
            Organize, share, and never lose track of important content again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {/* <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button> */}
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <div className="text-blue-400 text-sm font-mono mb-2">Twitter Thread</div>
                    <div className="text-white/80 text-sm">Amazing insights on web development...</div>
                  </div>
                  <div className="bg-red-500/20 rounded-lg p-4">
                    <div className="text-red-400 text-sm font-mono mb-2">YouTube Video</div>
                    <div className="text-white/80 text-sm">React Tutorial: Advanced Patterns...</div>
                  </div>
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <div className="text-purple-400 text-sm font-mono mb-2">Shared Collection</div>
                    <div className="text-white/80 text-sm">Frontend Resources 2024...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
