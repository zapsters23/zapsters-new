"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DarkVeil from "@/components/DarkVeil";
import ShinyText from "@/components/ShinyText";
import { GradientButton } from "@/components/ui/gradient-button"; // gradient CTA
import QuoteModal from "@/components/QuoteModal";

const Hero = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
      <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* DarkVeil ReactBits animation background */}
      <DarkVeil
        hueShift={246}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={1.5}
        scanlineFrequency={800.0}
        warpAmount={15.3}
        resolutionScale={1}
      />

      {/* Gradient overlay above DarkVeil */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content on top */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20 pt-2">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight mx-0 my-[2px] text-center">
            Everything Site for you
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:text-sm">
            <ShinyText
              text="Zapsters combines web engineering, UI/UX, cybersecurity and 3D to deliver production apps and career-ready interns."
              disabled={false}
              speed={3}
              className="text-muted-foreground"
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Gradient primary CTA, same style as other pages */}
            <Link to="/internships">
              <Button 
                variant="glass" 
                size="lg" 
                className="rounded-full"
              >
                Apply for Free Internship
              </Button>
            </Link>
            <Link to="/contact">
              <GradientButton className="group rounded-full">
                Join Our Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="glass-panel p-6 rounded-lg">
               <div className="text-3xl font-bold text-accent mb-2">17+</div>
              <div className="text-sm text-muted-foreground">
                Projects Delivered
              </div>
            </div>
            <div className="glass-panel p-6 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">200+</div>
              <div className="text-sm text-muted-foreground">
                Students Trained
              </div>
            </div>
            <div className="glass-panel p-6 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">12</div>
              <div className="text-sm text-muted-foreground">
                Core Services
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Hero;
