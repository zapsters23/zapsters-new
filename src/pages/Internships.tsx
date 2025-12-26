"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitInternshipApplication } from "@/lib/internshipService";
import {
  Laptop2,
  Palette,
  Shield,
  Shapes,
  Cpu,
  Rocket,
  Users,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  Sparkles,
  Brain,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/gradient-button"; // gradient CTA
import DarkVeil from "@/components/DarkVeil"; // DarkVeil background
import PixelCard from "@/components/PixelCard"; // PixelCard added

type ModeType = "Remote" | "On-site" | "Hybrid";

type InternshipTrack = {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<any>;
  level: "Beginner Friendly" | "Intermediate" | "Advanced";
  mode: ModeType[];
  durationLabel: string;
  description: string;
  bullets: string[];
};

const tracks: InternshipTrack[] = [
  {
    id: "webdevelopment",
    title: "Web Development",
    badge: "Web · MERN · APIs",
    icon: Laptop2,
    level: "Intermediate",
    mode: ["Remote", "Hybrid"],
    durationLabel: "1–4 weeks",
    description:
      "Build production-like web apps using modern stacks — from UI to APIs and basic DevOps.",
    bullets: ["React / Next.js", "Node / Nest.js", "DB & API design"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    badge: "Blue Team · VAPT",
    icon: Shield,
    level: "Intermediate",
    mode: ["Remote", "On-site"],
    durationLabel: "1–4 weeks",
    description:
      "Hands-on exposure to securing systems, basic audits, and understanding attacker mindset.",
    bullets: ["Recon & basics", "Reporting", "Security best practices"],
  },
  {
    id: "uiux",
    title: "UI/UX Designing",
    badge: "Figma · Systems · Motion",
    icon: Palette,
    level: "Beginner Friendly",
    mode: ["Remote"],
    durationLabel: "1–4 weeks",
    description:
      "Craft neuromorphic, futuristic interfaces, design systems, and interactive prototypes.",
    bullets: ["Design systems", "Prototyping", "Design handoff"],
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    badge: "Python · LLMs · Agents",
    icon: Brain,
    level: "Advanced",
    mode: ["Remote", "Hybrid"],
    durationLabel: "4–8 weeks",
    description:
      "Train models, fine-tune LLMs, and build intelligent agents using modern AI stacks.",
    bullets: ["TensorFlow / PyTorch", "Generative AI", "Computer Vision"],
  },
  {
    id: "gamedevelopment",
    title: "Game Development",
    badge: "3D · Motion · Web",
    icon: Shapes,
    level: "Advanced",
    mode: ["Remote"],
    durationLabel: "1–4 weeks",
    description:
      "Blend 3D and web — from product mockups to hero animations using modern tools.",
    bullets: ["3D scenes", "Motion graphics", "Web integration"],
  },
];

const faqItems = [
  {
    q: "Is this a paid or unpaid internship?",
    a: "Depends on the track and engagement. Some are stipend-based, some are performance or project-linked, and some are strictly learning-focused.",
  },
  {
    q: "Do I get a certificate and project proof?",
    a: "Yes. You receive a performance-based certificate and a documented project or case-study you can showcase in your portfolio.",
  },
  {
    q: "Can I balance this with college / exams?",
    a: "We structure sprints to be flexible. Mention your constraints in the form and we’ll align expectations during onboarding.",
  },
];

const modes: ModeType[] = ["Remote", "On-site", "Hybrid"];

const durations = [
  "1 week",
  "2 weeks",
  "3 weeks",
  "4 weeks",
];

const InternshipsPage = () => {
  const { toast } = useToast();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedModeFilter, setSelectedModeFilter] = useState<ModeType | "All">(
    "All"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTracks = tracks.filter((track) =>
    selectedModeFilter === "All" ? true : track.mode.includes(selectedModeFilter)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO with DarkVeil */}
      <section className="relative min-h-screen pt-32 pb-12 flex items-center justify-center overflow-hidden">
        {/* DarkVeil animated background */}
        <DarkVeil
          hueShift={246}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={1.5}
          scanlineFrequency={800.0}
          warpAmount={17.3}
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
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1.1fr] gap-10 items-center">
            {/* Left */}
            <div className="animate-fade-in-up">
              <p className="text-xs tracking-[0.35em] uppercase text-accent mb-3">
                Internships · Zapsters
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Internships that{" "}
                <span className="neon-text">feel like</span>{" "}
                real projects.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Forget copy-paste labs. Our internship tracks plug you into{" "}
                live-like projects, squads, and reviews — across{" "}
                <span className="text-accent">web</span>,{" "}
                <span className="text-accent">UI/UX</span>,{" "}
                <span className="text-accent">cybersecurity</span>,{" "}
                <span className="text-accent">3D</span>,{" "}
                <span className="text-accent">IoT</span>, marketing and more.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Users className="w-3 h-3 text-accent" />
                  <span>Mentor-led squads · Weekly reviews</span>
                </div>
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Clock className="w-3 h-3 text-accent" />
                  <span>Flexible around college & exams</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton
                  className="rounded-full flex items-center gap-2"
                  onClick={() => {
                    const el = document.getElementById("internship-form");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Apply for Internship
                  <CalendarIcon className="w-4 h-4" />
                </GradientButton>

                <Button
                  variant="glass"
                  size="lg"
                  className="rounded-full"
                  onClick={() => {
                    const el = document.getElementById("internship-tracks");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Browse Tracks
                </Button>
              </div>
            </div>

            {/* Right: Highlights */}
            <div className="space-y-4 animate-fade-in-up">
              <Card className="glass-panel border-accent/30 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">
                  What you get
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    <span>Mentorship from practitioners, not just theory.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    <span>Portfolio-ready project or case-study.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    <span>Performance-based certificate and feedback.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    <span>Access to Zapsters community & future openings.</span>
                  </li>
                </ul>
              </Card>

              <Card className="glass-panel border-accent/20 p-4 text-xs">
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent mb-1">
                  Ideal profiles
                </p>
                <p className="text-muted-foreground">
                  Final-year students, early professionals, or self-taught
                  builders who want{" "}
                  <span className="text-foreground font-semibold">
                    serious hands-on experience
                  </span>{" "}
                  before interviews, startups, or freelancing.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS GRID */}
      <section id="internship-tracks" className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                Choose your <span className="neon-text">track</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                You can apply for one primary track and mention secondary interests
                in the form. We’ll match you to the best cohort.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] text-muted-foreground">
                Filter by mode:
              </span>
              <Button
                variant={selectedModeFilter === "All" ? "hero" : "glass"}
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setSelectedModeFilter("All")}
              >
                All
              </Button>
              {modes.map((mode) => (
                <Button
                  key={mode}
                  variant={selectedModeFilter === mode ? "hero" : "glass"}
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => setSelectedModeFilter(mode)}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredTracks.map((track, idx) => {
              const Icon = track.icon;
              const isSelected = selectedTrack === track.id;

              return (
                <PixelCard
                  key={track.id}
                  variant="pink"
                  className={`group animate-fade-in-up h-full ${isSelected
                    ? "ring-2 ring-accent/70 shadow-[0_0_25px_rgba(255,0,80,0.35)]"
                    : ""
                    }`}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  {/* Make the inner area clickable instead of PixelCard itself */}
                  <button
                    type="button"
                    className="p-6 flex flex-col h-full w-full text-left"
                    onClick={() =>
                      setSelectedTrack((prev) =>
                        prev === track.id ? null : track.id
                      )
                    }
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl glass-panel border border-accent/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-accent" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {track.title}
                          </h3>
                          <p className="text-[11px] uppercase tracking-wide text-accent">
                            {track.badge}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-[10px] bg-accent/10 text-accent border border-accent/40">
                        {track.level}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {track.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3 text-[10px]">
                      <span className="px-2 py-1 rounded-full glass-panel border border-accent/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{track.durationLabel}</span>
                      </span>
                      {track.mode.map((mode) => (
                        <span
                          key={mode}
                          className="px-2 py-1 rounded-full glass-panel border border-accent/20 text-muted-foreground"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>

                    <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                      {track.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isSelected ? "hero" : "glass"}
                      size="sm"
                      className="mt-auto w-fit rounded-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTrack(track.id);
                        const el = document.getElementById("internship-form");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Choose this track
                    </Button>
                  </button>
                </PixelCard>
              );
            })}
          </div>
        </div>
      </section>


      {/* REGISTRATION FORM */}
      <section id="internship-form" className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1.1fr] gap-10 items-stretch">
            {/* Left: Narrative */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                Internship <span className="neon-text">Application</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill this form carefully — it helps us decide your{" "}
                <span className="text-foreground font-semibold">track</span>,{" "}
                <span className="text-foreground font-semibold">cohort</span>, and{" "}
                <span className="text-foreground font-semibold">mentor</span>.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <Card className="glass-panel border-accent/20 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent mb-1">
                    Duration Options
                  </p>
                  <p className="text-muted-foreground">
                    4–12 weeks, flexible around exams. You can mention your exact
                    availability in the form.
                  </p>
                </Card>
                <Card className="glass-panel border-accent/20 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent mb-1">
                    Calendar Support
                  </p>
                  <p className="text-muted-foreground">
                    Pick your ideal start date using the{" "}
                    <span className="text-foreground font-semibold">
                      calendar input
                    </span>{" "}
                    in the form.
                  </p>
                </Card>
              </div>

              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>
                    We’ll reach out on email / WhatsApp with next steps and a short
                    intro call.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Shortlisted candidates may get a small task or quiz.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>No spam. Your details are only used for this process.</span>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <Card className="relative glass-panel border-accent/30 p-6 md:p-8 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 border border-accent/30 rounded-2xl opacity-40" />
              <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(255,0,80,0.22),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_60%)]" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-1">
                      Internship Registration
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pick your track, duration, and preferred start date.
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-muted-foreground">
                    <span className="font-mono text-accent">
                      • • • Flow: 01 → 03
                    </span>
                    <span>Form · Call · Cohort</span>
                  </div>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);

                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    try {
                      const applicationData = {
                        fullName: formData.get('fullName') as string,
                        email: formData.get('email') as string,
                        phone: formData.get('phone') as string || '',
                        organization: formData.get('organization') as string || '',
                        preferredTrack: formData.get('preferredTrack') as string || 'Not Specified',
                        preferredDuration: formData.get('preferredDuration') as string || 'Not Specified',
                        preferredMode: formData.get('preferredMode') as string || 'Remote',
                        currentLevel: formData.get('currentLevel') as string || 'Student',
                        motivation: formData.get('motivation') as string || '',
                        openToRelatedTracks: true, // Default to true or add checkbox
                        receiveUpdates: formData.get('receiveUpdates') === 'on',
                        // Optional fields if needed
                        currentSkills: '',
                        portfolioLinks: '',
                      };

                      await submitInternshipApplication(applicationData);

                      toast({
                        title: "Application submitted successfully!",
                        description: "We'll review your application and get back to you soon.",
                      });

                      // Reset form
                      form.reset();
                      setSelectedTrack(null);
                    } catch (error) {
                      console.error('Error submitting application:', error);
                      toast({
                        title: "Error submitting application",
                        description: "Please try again or contact us directly.",
                        variant: "destructive",
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Full Name
                      </label>
                      <Input
                        name="fullName"
                        required
                        placeholder="Your name"
                        className="glass-panel border-accent/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="glass-panel border-accent/30"
                      />
                    </div>
                  </div>

                  {/* Phone + College / Org */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        placeholder="+91 ..."
                        className="glass-panel border-accent/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        College Name
                      </label>
                      <Input
                        name="organization"
                        placeholder="Your college name"
                        className="glass-panel border-accent/30"
                      />
                    </div>
                  </div>

                  {/* Domain + Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Domain
                      </label>
                      <select name="preferredTrack" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        <option>Select a domain</option>
                        {tracks.map((t) => (
                          <option
                            key={t.id}
                            selected={selectedTrack === t.id}
                            value={t.title}
                          >
                            {t.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Duration
                      </label>
                      <select name="preferredDuration" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        {durations.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Mode + Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Preferred Mode
                      </label>
                      <select name="preferredMode" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Current Level
                      </label>
                      <select name="currentLevel" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        <option>Student / Beginner</option>
                        <option>Intermediate (Have built projects)</option>
                        <option>Advanced / Pro</option>
                      </select>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Why do you want to join? (Motivation)
                    </label>
                    <textarea
                      name="motivation"
                      rows={3}
                      placeholder="Tell us about your goals or past projects..."
                      className="w-full text-sm glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent resize-none"
                    />
                  </div>

                  {/* Updates Checkbox */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" name="receiveUpdates" className="accent-accent" />
                    <span>Receive updates about future opportunities</span>
                  </div>

                  <div className="flex justify-end pt-2">
                    <GradientButton
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full flex items-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      <Sparkles className="w-4 h-4" />
                    </GradientButton>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ / EXTRA INFO */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr,1fr] gap-10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Before you <span className="neon-text">apply</span>…
              </h3>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <Card
                    key={item.q}
                    className="glass-panel border-accent/20 p-4 text-sm"
                  >
                    <p className="font-semibold text-foreground mb-1">
                      {item.q}
                    </p>
                    <p className="text-muted-foreground text-xs">{item.a}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <Card className="glass-panel border-accent/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent mb-1">
                  Good to know
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Some tracks may have small entry tasks or quizzes.</li>
                  <li>Start dates may shift slightly based on cohort size.</li>
                  <li>We encourage you to treat this like a real job environment.</li>
                </ul>
              </Card>
              <Card className="glass-panel border-accent/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent mb-1">
                  Still confused?
                </p>
                <p>
                  You can always apply with “Not sure” in track/duration fields and
                  use the description box to explain your situation. We’ll guide you
                  to the right path.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternshipsPage;
