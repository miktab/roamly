import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, MapPin, TrendingUp, Users, Clock, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Laptop,
      title: "Digital Skills Training",
      description: "Master in-demand online skills like freelancing, e-commerce, and digital marketing."
    },
    {
      icon: MapPin,
      title: "Location Independence",
      description: "Build income streams that work from anywhere in the world with just an internet connection."
    },
    {
      icon: TrendingUp,
      title: "Scalable Systems",
      description: "Create automated income systems that grow while you explore new destinations."
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with like-minded travelers and entrepreneurs from around the world."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work on your own terms and design a lifestyle that prioritizes experiences."
    },
    {
      icon: Shield,
      title: "Proven Methods",
      description: "Access battle-tested strategies used by successful digital nomads worldwide."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-darker">
            Everything You Need to Roam and Earn
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our comprehensive system gives you all the tools, knowledge, and support 
            to build a thriving online business while living your dream lifestyle.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;