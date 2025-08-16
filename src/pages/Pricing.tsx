import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Heart, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "Free",
      period: "7 days",
      description: "Perfect for beginners to explore our community",
      features: [
        "2 classes included",
        "Access to beginner classes",
        "Studio facility access",
        "Basic meditation resources",
        "Community support"
      ],
      icon: <Heart className="w-6 h-6" />,
      color: "border-accent/50",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Monthly Unlimited",
      price: "$89",
      period: "per month",
      description: "Unlimited access to all classes and amenities",
      features: [
        "Unlimited classes",
        "All class types included",
        "Priority booking",
        "Guest passes (2/month)",
        "Workshops & events",
        "Meditation library access",
        "Wellness consultations"
      ],
      icon: <Star className="w-6 h-6" />,
      color: "border-primary ring-2 ring-primary/20",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Annual Premium",
      price: "$799",
      period: "per year",
      originalPrice: "$1,068",
      description: "Best value with exclusive premium benefits",
      features: [
        "Everything in Monthly plan",
        "Save $269 annually",
        "Private sessions (2/year)",
        "Retreat discounts (20%)",
        "Premium workshops",
        "Nutrition consultations",
        "Exclusive member events",
        "Personal yoga gear kit"
      ],
      icon: <Crown className="w-6 h-6" />,
      color: "border-secondary ring-2 ring-secondary/20",
      buttonVariant: "secondary" as const,
      popular: false,
    },
  ];

  const additionalServices = [
    {
      title: "Private Sessions",
      price: "$75",
      duration: "60 minutes",
      description: "One-on-one personalized yoga instruction"
    },
    {
      title: "Small Group (2-4 people)",
      price: "$45",
      duration: "60 minutes per person",
      description: "Semi-private sessions with friends or family"
    },
    {
      title: "Corporate Classes",
      price: "Contact us",
      duration: "Flexible",
      description: "On-site yoga classes for your workplace"
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-secondary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Choose Your Path
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Flexible pricing options designed to support your yoga journey at every stage
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Membership <span className="text-primary">Plans</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with our free trial and discover the transformative power of yoga
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`hover-lift shadow-medium border-2 ${plan.color} relative overflow-hidden ${
                  plan.popular ? 'transform md:scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {plan.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="text-center mb-4">
                    {plan.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}/year
                      </p>
                    )}
                    <div className="text-4xl font-bold text-primary mb-1">
                      {plan.price}
                    </div>
                    <p className="text-muted-foreground">{plan.period}</p>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.buttonVariant} 
                    className="w-full"
                    size="lg"
                  >
                    {plan.name === "Free Trial" ? "Start Free Trial" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Additional <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Personalized options for a more tailored yoga experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover-lift shadow-soft text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {service.price}
                  </div>
                  <CardDescription className="text-sm text-muted-foreground mb-2">
                    {service.duration}
                  </CardDescription>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">What's included in the free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Your 7-day free trial includes access to 2 classes of your choice, full studio facility access, 
                  and our basic meditation resource library. No credit card required to start.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Can I freeze or cancel my membership?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Yes! You can freeze your membership for up to 2 months per year or cancel with 30 days notice. 
                  We understand life happens and want to be flexible with your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Are there any additional fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  No hidden fees! The only additional costs are for optional services like private sessions, 
                  specialized workshops, or retail items in our boutique.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards a healthier, more balanced you
          </p>
          <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
            Begin Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;