import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, Heart, Flower2, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import BookingModal from "@/components/booking/BookingModal";
import vinyasaClass from "@/assets/vinyasa-class.jpg";

interface YogaClass {
  id: string;
  title: string;
  description?: string;
  instructor_name: string;
  duration: number;
  level: string;
  category: string;
  max_capacity?: number;
  price?: number;
  image_url?: string;
  created_at?: string;
}

interface ClassSchedule {
  id: string;
  class_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  instructor_name: string;
  is_active?: boolean;
  created_at?: string;
  classes?: YogaClass;
}

const Classes = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<YogaClass[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<YogaClass | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ClassSchedule | null>(null);

  // Mock data for demo purposes
  const mockClasses = [
    {
      id: '1',
      title: 'Vinyasa Flow',
      description: 'Dynamic sequences linking breath with movement',
      instructor_name: 'Sarah Johnson',
      duration: 60,
      level: 'Intermediate',
      category: 'vinyasa',
      price: 25,
      image_url: vinyasaClass,
    },
    {
      id: '2',
      title: 'Hatha Yoga',
      description: 'Gentle poses with focus on alignment and relaxation',
      instructor_name: 'Michael Chen',
      duration: 75,
      level: 'Beginner',
      category: 'hatha',
      price: 20,
      image_url: vinyasaClass,
    },
    {
      id: '3',
      title: 'Power Yoga',
      description: 'Strength-building practices for athletic development',
      instructor_name: 'Emma Davis',
      duration: 50,
      level: 'Advanced',
      category: 'power',
      price: 30,
      image_url: vinyasaClass,
    },
  ];

  const mockSchedules = [
    { id: '1', class_id: '1', day_of_week: 'Monday', start_time: '08:00', end_time: '09:00', instructor_name: 'Sarah Johnson', classes: mockClasses[0] },
    { id: '2', class_id: '1', day_of_week: 'Wednesday', start_time: '18:30', end_time: '19:30', instructor_name: 'Sarah Johnson', classes: mockClasses[0] },
    { id: '3', class_id: '2', day_of_week: 'Tuesday', start_time: '10:00', end_time: '11:15', instructor_name: 'Michael Chen', classes: mockClasses[1] },
    { id: '4', class_id: '2', day_of_week: 'Friday', start_time: '16:00', end_time: '17:15', instructor_name: 'Michael Chen', classes: mockClasses[1] },
    { id: '5', class_id: '3', day_of_week: 'Thursday', start_time: '09:00', end_time: '09:50', instructor_name: 'Emma Davis', classes: mockClasses[2] },
  ];

  useEffect(() => {
    // Set mock data instead of fetching from Supabase
    setClasses(mockClasses);
    setSchedules(mockSchedules);
    setLoading(false);
  }, []);

  const handleBookClass = (yogaClass: YogaClass, schedule?: ClassSchedule) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    setSelectedClass(yogaClass);
    setSelectedSchedule(schedule || null);
    setBookingModalOpen(true);
  };

  const getClassIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vinyasa': return <Zap className="w-6 h-6" />;
      case 'hatha': return <Flower2 className="w-6 h-6" />;
      case 'power': return <Flame className="w-6 h-6" />;
      case 'meditation': return <Heart className="w-6 h-6" />;
      default: return <Flower2 className="w-6 h-6" />;
    }
  };

  const getClassColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vinyasa': return 'bg-gradient-primary';
      case 'hatha': return 'bg-gradient-secondary';
      case 'power': return 'bg-accent';
      case 'meditation': return 'bg-sky';
      case 'prenatal': return 'bg-primary-light';
      case 'restorative': return 'bg-secondary-light';
      default: return 'bg-gradient-primary';
    }
  };

  // Group schedules by day
  const schedulesByDay = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.day_of_week]) {
      acc[schedule.day_of_week] = [];
    }
    acc[schedule.day_of_week].push(schedule);
    return acc;
  }, {} as Record<string, ClassSchedule[]>);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-secondary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Classes
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover the perfect practice for your body, mind, and spirit with our diverse range of classes
          </p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your <span className="text-primary">Perfect Practice</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From gentle flows to power practices, we offer something for every body and every level
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((cls, index) => (
              <Card key={index} className="hover-lift shadow-medium border-0 overflow-hidden group">
                <div className="relative h-48">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${cls.image_url || vinyasaClass})` }}
                  />
                  <div className={`absolute inset-0 ${getClassColor(cls.category)} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 text-white">
                      {getClassIcon(cls.category)}
                    </div>
                  </div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-foreground text-sm rounded-full font-medium">
                      {cls.level}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{cls.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {cls.description}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {cls.duration} mins
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {cls.level}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => handleBookClass(cls)}
                  >
                    Book This Class
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Weekly <span className="text-primary">Schedule</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect time that fits your schedule
            </p>
          </div>

          <Tabs defaultValue="Monday" className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-8">
              {weekDays.map((day) => (
                <TabsTrigger key={day} value={day} className="text-sm">
                  {day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>

            {weekDays.map((day) => (
              <TabsContent key={day} value={day}>
                <div className="space-y-4">
                  {schedulesByDay[day]?.map((schedule) => (
                    <Card key={schedule.id} className="hover-lift shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="text-2xl font-bold text-primary">
                              {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{schedule.classes?.title}</h3>
                              <p className="text-muted-foreground">with {schedule.instructor_name}</p>
                              {schedule.classes?.price && (
                                <p className="text-sm text-primary font-medium">${schedule.classes.price}</p>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="default"
                            onClick={() => schedule.classes && handleBookClass(schedule.classes, schedule)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )) || (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No classes scheduled for {day}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Practice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us for a transformative yoga experience that nurtures your entire being
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => !user ? setAuthModalOpen(true) : null}
            >
              Book Your First Class
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultTab="signup"
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        classData={selectedClass}
        scheduleData={selectedSchedule}
      />
    </div>
  );
};

export default Classes;