import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Calendar, Heart, Flower, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import heroImage from "@/assets/hero-yoga.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import vinyasaClass from "@/assets/vinyasa-class.jpg";

const Home = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const handleStartJourney = () => {
    if (user) {
      // Navigate to classes
      window.location.href = '/classes';
    } else {
      setAuthModalTab('signup');
      setAuthModalOpen(true);
    }
  };

  const handleExploreClasses = () => {
    window.location.href = '/classes';
  };
  const classes = [
    {
      title: "Vinyasa Flow",
      description: "Dynamic sequences linking breath with movement",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-gradient-primary",
    },
    {
      title: "Hatha Yoga",
      description: "Gentle poses with focus on alignment and relaxation",
      icon: <Flower className="w-6 h-6" />,
      color: "bg-gradient-secondary",
    },
    {
      title: "Power Yoga",
      description: "Strength-building practices for athletic development",
      icon: <Heart className="w-6 h-6" />,
      color: "bg-accent",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "ZenFlow has transformed my life. The instructors are amazing and the community is so welcoming!",
      avatar: instructor1,
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "I've been practicing here for 2 years. Best decision I ever made for my physical and mental health.",
      avatar: instructor1,
    },
    {
      name: "Emma Davis",
      rating: 5,
      text: "The variety of classes and skilled teachers make this the perfect yoga studio for everyone.",
      avatar: instructor1,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Embrace Balance, <br />
            <span className="text-primary-light">Strength & Peace</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Discover your inner harmony through mindful movement and breath
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button variant="hero" size="xl" className="group" onClick={handleStartJourney}>
              Start Your Journey
              <Heart className="w-5 h-5 ml-2 group-hover:animate-float" />
            </Button>
            <Button variant="yoga" size="xl" onClick={handleExploreClasses}>
              Explore Classes
            </Button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Welcome to <span className="text-primary">ZenFlow</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Our studio is a sanctuary where ancient wisdom meets modern wellness. 
            Join our community of mindful practitioners and discover the transformative power of yoga.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">Join a supportive community of like-minded individuals</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-muted-foreground">Classes available throughout the day to fit your lifestyle</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Holistic Wellness</h3>
              <p className="text-muted-foreground">Nurture your body, mind, and spirit in perfect harmony</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Popular <span className="text-primary">Classes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved classes designed for all levels of experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((cls, index) => (
              <Card key={index} className="hover-lift bg-gradient-card border-0 shadow-soft overflow-hidden group">
                <div className="relative h-48">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${vinyasaClass})` }}
                  />
                  <div className={`absolute inset-0 ${cls.color} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      {cls.icon}
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{cls.title}</CardTitle>
                  <CardDescription className="text-base">
                    {cls.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button variant="yoga" className="w-full" onClick={handleExploreClasses}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-primary">Students Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from our amazing community members
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift shadow-soft border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have transformed their lives through yoga
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90" onClick={handleStartJourney}>
              Start Free Trial
            </Button>
            <Button variant="yoga" size="xl" className="bg-white/20 text-white border-white/30" onClick={handleExploreClasses}>
              View Schedule
            </Button>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Home;