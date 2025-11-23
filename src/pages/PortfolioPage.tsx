"use client";

import {
  Layout,
  Code2,
  Shield,
  MonitorPlay,
  Cpu,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Send,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/gradient-button";
import DarkVeil from "@/components/DarkVeil"; // added
import PixelCard from "@/components/PixelCard"; // PixelCard added

// ---- SAMPLE DATA ----
const projectCategories = [
  "All",
  "Web / SaaS",
  "UI/UX & Branding",
  "Cybersecurity",
  "3D & Motion",
  "Hardware / IoT",
];

const projects = [
  {
    title: "Next-Gen College Portal",
    category: "Web / SaaS",
    description:
      "Full-stack portal with student dashboards, faculty tools, and event workflows — built with a modern MERN stack and production-ready UI.",
    tags: ["MERN", "Role-based access", "Admin dashboards"],
    stats: "2k+ active users",
  },
  {
    title: "Zap Academy UI Kit",
    category: "UI/UX & Branding",
    description:
      "A reusable component library and design system for Zapsters education products, optimized for speed, clarity, and consistency.",
    tags: ["Design Systems", "Figma", "Component Library"],
    stats: "60+ reusable components",
  },
  {
    title: "Blue Team Lab Simulation",
    category: "Cybersecurity",
    description:
      "Hands-on defensive security lab with simulated attacks, logs, and response workflows used for student training.",
    tags: ["SOC", "SIEM", "Detection Lab"],
    stats: "100+ trainees",
  },
  {
    title: "3D Brand Launch Trailer",
    category: "3D & Motion",
    description:
      "Cinematic launch trailer combining 3D elements, motion graphics, and stylized typography for a tech brand.",
    tags: ["3D", "Motion Graphics", "Brand Launch"],
    stats: "Used in events & socials",
  },
  {
    title: "Smart IoT Energy Monitor",
    category: "Hardware / IoT",
    description:
      "IoT prototype to monitor lab / hostel power usage with live dashboards and alert thresholds.",
    tags: ["IoT", "ESP32", "Realtime dashboard"],
    stats: "Deployed as a pilot",
  },
];

const events = [
  {
    title: "Hands-on Web Dev Bootcamp",
    type: "Workshop",
    audience: "College students (IT / CSE / ECE)",
    location: "On-campus / Online",
    highlight: "Built & deployed a real project by Day 2",
  },
  {
    title: "Cybersecurity: Red vs Blue",
    type: "Live Demo Session",
    audience: "Students & tech clubs",
    location: "Hybrid",
    highlight: "Simulated attacks + live defense walkthrough",
  },
  {
    title: "3D & Motion for Tech Brands",
    type: "Creative Lab",
    audience: "Design clubs, startups",
    location: "Online",
    highlight: "From moodboards to motion-ready assets",
  },
];

const PortfolioPage = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: plug into your backend/email service
    alert("Portfolio / event request submitted. Connect this to your backend.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO with DarkVeil */}
      <section className="relative min-h-screen pt-32 pb-16 flex items-center justify-center overflow-hidden">
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
            <div className="animate-fade-in-up">
              <p className="text-xs tracking-[0.35em] uppercase text-accent mb-3">
                Portfolio · Zapsters
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                A lab of{" "}
                <span className="neon-text">projects, products,</span> and
                experiences.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                From web platforms and UI kits to cybersecurity labs, 3D
                intros, and hardware prototypes — Zapsters designs & ships
                things that make learning and building feel{" "}
                <span className="text-accent">real</span>.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Layout className="w-3 h-3 text-accent" />
                  <span>Web, UI/UX, and product builds</span>
                </div>
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Shield className="w-3 h-3 text-accent" />
                  <span>Cybersecurity & infra labs</span>
                </div>
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-accent" />
                  <span>Hardware & IoT projects</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton className="rounded-full flex items-center gap-2">
                  Request a project build
                  <ArrowRight className="w-4 h-4" />
                </GradientButton>

                <Button variant="glass" size="lg" className="rounded-full">
                  Invite us for a workshop
                </Button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="space-y-4 animate-fade-in-up">
              <Card className="glass-panel border-accent/25 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">
                  On-ground & on-screen
                </p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="glass-panel rounded-lg p-3">
                    <div className="text-xl font-bold text-accent mb-1">
                      17+
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Projects shipped
                    </p>
                  </div>
                  <div className="glass-panel rounded-lg p-3">
                    <div className="text-xl font-bold text-accent mb-1">
                      15+
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Colleges & clubs
                    </p>
                  </div>
                  <div className="glass-panel rounded-lg p-3">
                    <div className="text-xl font-bold text-accent mb-1">
                      200+
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Students impacted
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-panel border-accent/20 p-4 text-xs">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-1">
                  What this page is
                </p>
                <p className="text-muted-foreground">
                  A snapshot of what we&apos;ve built and the kind of events we
                  run — so you can imagine{" "}
                  <span className="text-foreground font-semibold">
                    how we can plug into your campus, startup, or product idea.
                  </span>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                Project <span className="neon-text">Showcase</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                A mix of internal labs, client work, and campus collaborations.
              </p>
            </div>
            {/* Category filter visual only */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  className="px-3 py-1 rounded-full glass-panel border border-accent/30 hover:border-accent/60 transition-colors"
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {projects.map((project, idx) => (
              <PixelCard
                key={project.title}
                variant="pink"
                className="group animate-fade-in-up cursor-pointer h-full"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="p-5 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-2xl glass-panel border border-accent/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Code2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-[11px] text-accent">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 text-[11px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full glass-panel border border-accent/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-accent/20">
                    <span>{project.stats}</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-accent hover:text-foreground transition-colors"
                    >
                      View details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS & WORKSHOPS */}
      <section className="pb-18 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                Events & <span className="neon-text">Workshops</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                We collaborate with colleges, tech clubs, and communities to
                run high-signal, hands-on sessions.
              </p>
            </div>
            <Button
              variant="glass"
              size="sm"
              className="rounded-full flex items-center gap-2"
            >
              Host a Zapsters event
              <MonitorPlay className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event.title}
                className="glass-panel border-accent/25 p-5 flex flex-col justify-between"
              >
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full glass-panel border border-accent/30 text-[10px]">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold">{event.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {event.highlight}
                  </p>
                </div>

                <div className="space-y-1 text-[11px] text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-accent" />
                    <span>{event.audience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-accent" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST / REGISTRATION FORM */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="glass-panel border-accent/30 p-6 md:p-8 relative overflow-hidden">
            {/* subtle overlays */}
            <div className="pointer-events-none absolute inset-0 border border-accent/25 rounded-2xl opacity-40" />
            <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(255,0,80,0.22),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_60%)]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-8">
              {/* Left: Copy + badges */}
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
                  Work with Zapsters
                </p>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Want a{" "}
                  <span className="neon-text">project build</span> or{" "}
                  <span className="neon-text">event</span> at your campus?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use this form to request:
                  <br />
                  <span className="text-foreground font-semibold">
                    1) A project / product build
                  </span>{" "}
                  (portfolio, startup MVP, tools)
                  <br />
                  <span className="text-foreground font-semibold">
                    2) An event / workshop / guest lecture
                  </span>{" "}
                  for your college, club, or company.
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30">
                    Includes certificate options for student events
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30">
                    Can tailor content to your syllabus / goals
                  </span>
                </div>
              </div>

              {/* Right: Form */}
              <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
                {/* Type toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex gap-2 items-center glass-panel border border-accent/40 rounded-xl px-3 py-2 cursor-pointer hover:border-accent/70">
                    <input
                      type="radio"
                      name="request-type"
                      value="project"
                      defaultChecked
                      className="accent-accent"
                    />
                    <div>
                      <p className="font-semibold text-[12px]">
                        Project / Product build
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Website, app, tool, or prototype.
                      </p>
                    </div>
                  </label>
                  <label className="flex gap-2 items-center glass-panel border border-accent/40 rounded-xl px-3 py-2 cursor-pointer hover:border-accent/70">
                    <input
                      type="radio"
                      name="request-type"
                      value="event"
                      className="accent-accent"
                    />
                    <div>
                      <p className="font-semibold text-[12px]">
                        Event / Workshop
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        For colleges, clubs, or teams.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      Full Name
                    </label>
                    <Input
                      required
                      placeholder="Your name"
                      className="glass-panel border-accent/30"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="glass-panel border-accent/30"
                    />
                  </div>
                </div>

                {/* Phone + Org */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      WhatsApp / Phone
                    </label>
                    <Input
                      placeholder="+91 ..."
                      className="glass-panel border-accent/30"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      College / Company / Club
                    </label>
                    <Input
                      placeholder="Institute / brand / club name"
                      className="glass-panel border-accent/30"
                    />
                  </div>
                </div>

                {/* Preferred date + mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground flex items-center gap-1">
                      Ideal date / start date
                      <Calendar className="w-3 h-3 text-accent" />
                    </label>
                    <Input
                      type="date"
                      className="glass-panel border-accent/30 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      Mode
                    </label>
                    <select className="w-full glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent text-[11px]">
                      <option>On-campus</option>
                      <option>Online</option>
                      <option>Hybrid</option>
                      <option>Not sure / flexible</option>
                    </select>
                  </div>
                </div>

                {/* Audience size + level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      Expected audience size / team size
                    </label>
                    <select className="w-full glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent text-[11px]">
                      <option>1–10</option>
                      <option>10–30</option>
                      <option>30–80</option>
                      <option>80–150</option>
                      <option>150+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] text-muted-foreground">
                      Skill level
                    </label>
                    <select className="w-full glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent text-[11px]">
                      <option>Beginner-friendly</option>
                      <option>Intermediate</option>
                      <option>Advanced / niche</option>
                      <option>Mixed audience</option>
                    </select>
                  </div>
                </div>

                {/* Topic / focus area */}
                <div>
                  <label className="block mb-1 text-[11px] text-muted-foreground">
                    Topic / focus area
                  </label>
                  <Input
                    placeholder="Web dev, UI/UX, cybersecurity, 3D, hardware, etc."
                    className="glass-panel border-accent/30 text-xs"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-1 text-[11px] text-muted-foreground">
                    Briefly describe what you need
                  </label>
                  <textarea
                    rows={4}
                    className="w-full glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent text-xs resize-none"
                    placeholder="Tell us about the project/event, outcomes you want, and any constraints (budget, dates, infra, etc.)."
                  />
                </div>

                {/* Links */}
                <div>
                  <label className="block mb-1 text-[11px] text-muted-foreground">
                    Any reference links? (optional)
                  </label>
                  <Input
                    placeholder="Existing site, drive doc, Figma, GitHub, event deck, etc."
                    className="glass-panel border-accent/30 text-xs"
                  />
                </div>

                {/* Consent */}
                <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-accent" />
                    <span>
                      I&apos;m okay with Zapsters contacting me on email /
                      WhatsApp for this request.
                    </span>
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <GradientButton className="rounded-full flex items-center gap-2">
                    Submit request
                    <Send className="w-4 h-4" />
                  </GradientButton>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
