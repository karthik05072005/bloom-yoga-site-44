import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ZoomIn } from "lucide-react";
import vinyasaClass from "@/assets/vinyasa-class.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: vinyasaClass,
      alt: "Vinyasa flow class in session",
      category: "Classes"
    },
    {
      src: instructor1,
      alt: "Peaceful meditation pose",
      category: "Meditation"
    },
    {
      src: instructor2,
      alt: "Advanced yoga pose demonstration",
      category: "Advanced"
    },
    {
      src: vinyasaClass,
      alt: "Group yoga session",
      category: "Classes"
    },
    {
      src: instructor1,
      alt: "Sunrise yoga practice",
      category: "Outdoor"
    },
    {
      src: instructor2,
      alt: "Power yoga sequence",
      category: "Power"
    },
    {
      src: vinyasaClass,
      alt: "Restorative yoga with props",
      category: "Restorative"
    },
    {
      src: instructor1,
      alt: "Prenatal yoga class",
      category: "Prenatal"
    },
    {
      src: instructor2,
      alt: "Yoga teacher training",
      category: "Training"
    },
    {
      src: vinyasaClass,
      alt: "Community event",
      category: "Events"
    },
    {
      src: instructor1,
      alt: "Workshop session",
      category: "Workshops"
    },
    {
      src: instructor2,
      alt: "Outdoor retreat practice",
      category: "Retreats"
    },
  ];

  const categories = ["All", "Classes", "Meditation", "Outdoor", "Events"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-secondary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Glimpses of our vibrant yoga community, transformative practices, and peaceful moments
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-soft hover-lift cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                    <p className="text-white/80 text-xs">{image.category}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Community</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Numbers that tell our story of growth and connection
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <p className="text-muted-foreground">Happy Students</p>
            </div>
            
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                25+
              </div>
              <p className="text-muted-foreground">Classes per Week</p>
            </div>
            
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                13+
              </div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                10k+
              </div>
              <p className="text-muted-foreground">Hours of Practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and create your own beautiful yoga journey
          </p>
          <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;