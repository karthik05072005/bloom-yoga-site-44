import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, Loader2 } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, isAfter, startOfDay } from 'date-fns';

interface YogaClass {
  id: string;
  title: string;
  description?: string;
  instructor_name: string;
  duration: number;
  level: string;
  category: string;
  price?: number;
  image_url?: string;
}

interface ClassSchedule {
  id: string;
  class_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  instructor_name: string;
  classes?: YogaClass;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData?: YogaClass;
  scheduleData?: ClassSchedule;
}

const BookingModal = ({ isOpen, onClose, classData, scheduleData }: BookingModalProps) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [availableSchedules, setAvailableSchedules] = useState<ClassSchedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ClassSchedule | null>(null);

  useEffect(() => {
    if (isOpen && classData) {
      fetchClassSchedules();
    }
  }, [isOpen, classData]);

  const fetchClassSchedules = async () => {
    if (!classData) return;

    const { data, error } = await supabase
      .from('class_schedules')
      .select('*, classes(*)')
      .eq('class_id', classData.id)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching schedules:', error);
      return;
    }

    setAvailableSchedules(data || []);
    if (scheduleData) {
      setSelectedSchedule(scheduleData);
    }
  };

  const getNextClassDate = (dayOfWeek: string): Date => {
    const today = startOfDay(new Date());
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDay = daysOfWeek.indexOf(dayOfWeek);
    const currentDay = today.getDay();
    
    let daysToAdd = targetDay - currentDay;
    if (daysToAdd <= 0) {
      daysToAdd += 7; // Next week
    }
    
    return addDays(today, daysToAdd);
  };

  const handleBookClass = async () => {
    if (!user || !selectedSchedule || !selectedDate) {
      toast({
        title: 'Missing Information',
        description: 'Please select a class and date.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('bookings').insert({
        user_id: user.id,
        class_id: selectedSchedule.class_id,
        schedule_id: selectedSchedule.id,
        booking_date: format(selectedDate, 'yyyy-MM-dd'),
        status: 'confirmed',
        payment_status: 'paid', // For demo purposes
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Booked',
            description: 'You have already booked this class for the selected date.',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Class Booked Successfully!',
          description: `Your ${classData?.title} class has been booked for ${format(selectedDate, 'EEEE, MMMM d')}.`,
        });
        onClose();
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking Failed',
        description: 'There was an error booking your class. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!classData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            Book Your Class
          </DialogTitle>
          <DialogDescription>
            Reserve your spot in this transformative yoga experience
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Class Information */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{classData.title}</CardTitle>
                <Badge variant="secondary">{classData.level}</Badge>
              </div>
              <CardDescription>{classData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                Instructor: {classData.instructor_name}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Duration: {classData.duration} minutes
              </div>
              {classData.price && (
                <div className="text-lg font-semibold text-primary">
                  ${classData.price}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Selection */}
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Available Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {availableSchedules.map((schedule) => {
                    const nextDate = getNextClassDate(schedule.day_of_week);
                    return (
                      <div
                        key={schedule.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedSchedule?.id === schedule.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setSelectedDate(nextDate);
                        }}
                      >
                        <div className="font-medium">{schedule.day_of_week}s</div>
                        <div className="text-sm text-muted-foreground">
                          {schedule.start_time} - {schedule.end_time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Next class: {format(nextDate, 'MMM d, yyyy')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {selectedSchedule && selectedDate && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="font-medium">{classData.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSchedule.start_time} - {selectedSchedule.end_time}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    with {selectedSchedule.instructor_name}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleBookClass} 
            disabled={!selectedSchedule || !selectedDate || loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;