import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import vinyasaClass from "@/assets/vinyasa-class.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";

const Blog = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock newsletter subscription for demo
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter.",
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };
  const blogPosts = [
    {
      id: 1,
      title: "5 Essential Poses for Beginner Yogis",
      excerpt: "Start your yoga journey with these foundational poses that build strength, flexibility, and confidence.",
      author: "Sarah Martinez",
      date: "March 15, 2024",
      category: "Beginner Tips",
      image: vinyasaClass,
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "The Science Behind Yoga and Mental Health",
      excerpt: "Explore how regular yoga practice can reduce anxiety, improve mood, and enhance overall mental well-being.",
      author: "David Thompson",
      date: "March 12, 2024",
      category: "Wellness",
      image: instructor1,
      readTime: "8 min read",
      featured: false,
    },
    {
      id: 3,
      title: "Creating Your Home Practice Space",
      excerpt: "Tips for designing a peaceful, inspiring space in your home for daily yoga and meditation practice.",
      author: "Sarah Martinez",
      date: "March 8, 2024",
      category: "Lifestyle",
      image: instructor2,
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 4,
      title: "Breathwork: The Foundation of Yoga",
      excerpt: "Learn the importance of pranayama and how conscious breathing can transform your practice and daily life.",
      author: "David Thompson",
      date: "March 5, 2024",
      category: "Technique",
      image: vinyasaClass,
      readTime: "7 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Yoga for Athletes: Enhancing Performance",
      excerpt: "Discover how yoga can improve athletic performance, prevent injuries, and speed up recovery time.",
      author: "Sarah Martinez",
      date: "March 1, 2024",
      category: "Fitness",
      image: instructor1,
      readTime: "9 min read",
      featured: false,
    },
    {
      id: 6,
      title: "Mindful Eating: Yoga Philosophy in the Kitchen",
      excerpt: "Bring yogic principles to your relationship with food through mindful eating practices and awareness.",
      author: "David Thompson",
      date: "February 28, 2024",
      category: "Nutrition",
      image: instructor2,
      readTime: "6 min read",
      featured: false,
    },
  ];

  const categories = ["All", "Beginner Tips", "Wellness", "Lifestyle", "Technique", "Fitness", "Nutrition"];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-secondary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Blog
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Insights, tips, and inspiration for your yoga journey and holistic wellness
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured <span className="text-primary">Article</span>
              </h2>
            </div>

            <Card className="overflow-hidden shadow-strong border-0 hover-lift">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Featured</span>
                  </div>
                  
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-3xl mb-4">{featuredPost.title}</CardTitle>
                    <CardDescription className="text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <Button variant="default" size="lg" className="group">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Latest <span className="text-primary">Articles</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our collection of wellness wisdom and yoga insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-medium hover-lift border-border/50 group">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="group">
                      Read More
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay <span className="text-primary">Inspired</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly wellness tips, yoga insights, and exclusive content from our instructors
          </p>
          
          <Card className="max-w-md mx-auto shadow-medium">
            <CardContent className="p-6">
              <form onSubmit={handleNewsletterSignup} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="default" size="lg" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Subscribe Now
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Practice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Transform your reading into action and join us on the mat
          </p>
          <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
            Book Your Class
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;