import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
      <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex flex-col items-start space-y-4 lg:w-1/2">
          <Badge variant="secondary" className="animate-fade-in">
            Intelligent Solutions
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter animate-fade-in">
            Smart Answers for{" "}
            <span className="text-purple-600">Complex Questions</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl animate-fade-in opacity-90">
            Leverage our AI-powered platform to get instant, accurate responses
            to your most challenging queries.
          </p>
          <Button
            onClick={() => navigate("/chat")}
            size="lg"
            className="mt-6 animate-fade-in"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in">
          <Card className="p-6 shadow-lg bg-white/50 backdrop-blur-sm border-purple-100 dark:bg-gray-900/50">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  99.9% Accuracy Rate
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Trusted by 10k+ Users
                </span>
              </div>
              <div className="flex items-center gap-4">
                <ArrowRight className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Instant Response Time
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
