import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, Star, Award, Clock, Flower2 } from "lucide-react";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";

const About = () => {
  const instructors = [
    {
      name: "Sarah Martinez",
      title: "Founder & Lead Instructor",
      experience: "15+ years",
      specialties: ["Vinyasa Flow", "Meditation", "Prenatal Yoga"],
      image: instructor1,
      bio: "Sarah discovered yoga during a stressful period in her corporate career and it completely transformed her life. She brings passion, wisdom, and gentle guidance to every class.",
    },
    {
      name: "David Thompson",
      title: "Senior Instructor",
      experience: "12+ years",
      specialties: ["Hatha Yoga", "Power Yoga", "Breathwork"],
      image: instructor2,
      bio: "David combines traditional yoga principles with modern alignment techniques. His classes are known for being both challenging and accessible to all levels.",
    },
  ];

  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description: "Sarah started teaching yoga in her living room to friends and neighbors",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      year: "2015",
      title: "First Studio",
      description: "Opened our first dedicated studio space in downtown",
      icon: <Flower2 className="w-6 h-6" />,
    },
    {
      year: "2018",
      title: "Community Growth",
      description: "Expanded to serve over 500 regular students",
      icon: <Users className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Recognition",
      description: "Voted 'Best Yoga Studio' by the local community",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const values = [
    {
      title: "Inclusivity",
      description: "Everyone is welcome regardless of age, body type, or experience level",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Mindfulness",
      description: "We cultivate present-moment awareness in every practice",
      icon: <Flower2 className="w-8 h-8" />,
    },
    {
      title: "Community",
      description: "Building connections and supporting each other's journey",
      icon: <Heart className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-secondary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Founded on the belief that yoga is for everyone, ZenFlow has been nurturing 
            minds, bodies, and spirits since 2010.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Philosophy</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              "Yoga is not about touching your toes. It is about what you learn on the way down." 
              - Judith Hanson Lasater
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-lift shadow-soft text-center border-border/50">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-primary">Instructors</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn from experienced, certified teachers who are passionate about yoga
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {instructors.map((instructor, index) => (
              <Card key={index} className="hover-lift shadow-medium border-0 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">{instructor.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {instructor.title}
                      </CardDescription>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {instructor.experience} experience
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {instructor.bio}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {instructor.specialties.map((specialty, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From humble beginnings to a thriving community
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-primary mr-4">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a supportive community dedicated to growth and wellness
          </p>
          <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;