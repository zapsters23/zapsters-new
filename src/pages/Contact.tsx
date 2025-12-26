"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Globe,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/gradient-button";
import DarkVeil from "@/components/DarkVeil";
import { submitContactForm } from "@/lib/contactService";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addressText =
    "29, Silambu St, Senthil Nagar, Loganathan Nagar, Padmanabha Nagar, Choolaimedu, Chennai, Tamil Nadu 600094";

  const mapsQuery = encodeURIComponent(addressText);

  // View in Maps (for links)
  const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  // Directions (for links)
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  // Proper embed URL for iframe
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  const whatsappUrl = "https://wa.me/919080176830";
  const phoneUrl = "tel:+919342408432";
  const emailUrl = "mailto:zapsters23@gmail.com";

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const contactData = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || '',
        organization: formData.get('organization') as string || '',
        projectType: formData.get('projectType') as string,
        budget: formData.get('budget') as string,
        timeline: formData.get('timeline') as string,
        startDate: formData.get('startDate') as string || '',
        contactMethod: formData.get('contact-mode') as string || 'email',
        links: formData.get('links') as string || '',
        message: formData.get('message') as string,
        newsletter: formData.get('newsletter') === 'on',
        termsAccepted: formData.get('terms') === 'on',
      };

      await submitContactForm(contactData);

      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });

      // Reset form safely
      if (form) {
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error submitting form",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content on top */}
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1.1fr] gap-10 items-center">
            {/* Left copy */}
            <div className="animate-fade-in">
              <p className="text-xs tracking-[0.35em] uppercase text-accent mb-3">
                Contact · Zapsters
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Let&apos;s build something{" "}
                <span className="neon-text">bold</span> together.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Whether it&apos;s a{" "}
                <span className="text-accent">website</span>,{" "}
                <span className="text-accent">internship collab</span>,{" "}
                <span className="text-accent">workshop</span>, or a{" "}
                <span className="text-accent">full product</span> — tell us what
                you&apos;re dreaming about. We&apos;ll help you ship it.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Clock className="w-3 h-3 text-accent" />
                  <span>Typical response: 24–48 hours</span>
                </div>
                <div className="glass-panel rounded-full px-4 py-2 text-xs flex items-center gap-2">
                  <Globe className="w-3 h-3 text-accent" />
                  <span>Working with students & brands globally</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="glass-panel rounded-full px-3 py-1">
                  We don&apos;t share your details with anyone.
                </span>
                <span className="glass-panel rounded-full px-3 py-1">
                  Prefer WhatsApp? Mention it in the form.
                </span>
              </div>
            </div>

            {/* Right stats / quick info */}
            <div className="space-y-4 animate-fade-in-up">
              <Card className="glass-panel border-accent/25 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">
                  Quick channels
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-2xl glass-panel border border-accent/40 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-accent" />
                    </span>
                    <div>
                      <p className="font-medium">Official Email</p>
                      <a
                        href={emailUrl}
                        className="text-xs text-muted-foreground hover:text-accent transition-colors"
                      >
                        zapsters23@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-2xl glass-panel border border-accent/40 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-accent" />
                    </span>
                    <div>
                      <p className="font-medium">WhatsApp / Call</p>
                      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          WhatsApp: +91 90801 76830
                        </a>
                        <a
                          href={phoneUrl}
                          className="hover:text-accent transition-colors"
                        >
                          Call: +91 93424 08432
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-2xl glass-panel border border-accent/40 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-accent" />
                    </span>
                    <div>
                      <p className="font-medium">Working hours (IST)</p>
                      <p className="text-xs text-muted-foreground">
                        Mon–Sat · 10:00 AM – 7:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="glass-panel border-accent/20 p-4 text-xs">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-1">
                  Best way to get a quick reply?
                </p>
                <p className="text-muted-foreground">
                  Give us{" "}
                  <span className="text-foreground font-semibold">
                    context + links
                  </span>{" "}
                  in the form — Figma, GitHub, existing site, or just a short
                  Loom. The more clarity, the faster we can help.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,1.0fr] gap-10 items-stretch">
            {/* LEFT: Form */}
            <Card className="relative glass-panel border-accent/30 p-4 md:p-8 overflow-hidden">
              {/* subtle frame + glow */}
              <div className="pointer-events-none absolute inset-0 border border-accent/30 rounded-2xl opacity-40" />
              <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(255,0,80,0.22),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_60%)]" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-1">
                      Start a project / Say hi
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tell us what you&apos;re thinking. We&apos;ll review and
                      reply with next steps.
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-muted-foreground">
                    <span className="font-mono text-accent">
                      • • • Flow: 01 → 02
                    </span>
                    <span>Brief · Call</span>
                  </div>
                </div>

                {/* Project Type Chips */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-default">
                    Website / Portfolio
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-default">
                    Internship / College Collab
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-default">
                    Workshops / Training
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-default">
                    Product / Startup Build
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-default">
                    Something else
                  </span>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={handleFormSubmit}
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

                  {/* Phone + Org */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        WhatsApp / Phone
                      </label>
                      <Input
                        name="phone"
                        placeholder="+91 ..."
                        className="glass-panel border-accent/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        College / Company (optional)
                      </label>
                      <Input
                        name="organization"
                        placeholder="Your college / brand / studio"
                        className="glass-panel border-accent/30"
                      />
                    </div>
                  </div>

                  {/* Reason + Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        What are you looking for?
                      </label>
                      <select name="projectType" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        <option>Select one</option>
                        <option>Startups / MVP</option>
                        <option>Website / Product build</option>
                        <option>AI & ML Solutions</option>
                        <option>UI/UX & Branding</option>
                        <option>Internship / College tie-up</option>
                        <option>Workshop / Guest session</option>
                        <option>Security / Tech consultation</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Approx. budget / scale
                      </label>
                      <select name="budget" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        <option>Student / Low-budget project</option>
                        <option>₹10k – ₹25k</option>
                        <option>₹25k – ₹50k</option>
                        <option>₹50k – ₹1L</option>
                        <option>₹1L+</option>
                        <option>Not sure / need guidance</option>
                      </select>
                    </div>
                  </div>

                  {/* Timeline + Start date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Timeline preference
                      </label>
                      <select name="timeline" className="w-full text-xs glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent">
                        <option>As soon as possible</option>
                        <option>Within 2–4 weeks</option>
                        <option>Within 1–3 months</option>
                        <option>Just exploring / not urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1">
                        Ideal start date
                      </label>
                      {/* Native calendar picker */}
                      <Input
                        name="startDate"
                        type="date"
                        className="glass-panel border-accent/30 text-xs"
                      />
                    </div>
                  </div>

                  {/* Preferred contact + links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Preferred contact channel
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <label className="flex items-center gap-2 glass-panel border border-accent/30 rounded-full px-2 py-1 cursor-pointer hover:border-accent/60">
                          <input
                            type="radio"
                            name="contact-mode"
                            value="email"
                            className="accent-accent"
                            defaultChecked
                          />
                          <span>Email</span>
                        </label>
                        <label className="flex items-center gap-2 glass-panel border border-accent/30 rounded-full px-2 py-1 cursor-pointer hover:border-accent/60">
                          <input
                            type="radio"
                            name="contact-mode"
                            value="whatsapp"
                            className="accent-accent"
                          />
                          <span>WhatsApp</span>
                        </label>
                        <label className="flex items-center gap-2 glass-panel border border-accent/30 rounded-full px-2 py-1 cursor-pointer hover:border-accent/60">
                          <input
                            type="radio"
                            name="contact-mode"
                            value="call"
                            className="accent-accent"
                          />
                          <span>Call</span>
                        </label>
                        <label className="flex items-center gap-2 glass-panel border border-accent/30 rounded-full px-2 py-1 cursor-pointer hover:border-accent/60">
                          <input
                            type="radio"
                            name="contact-mode"
                            value="any"
                            className="accent-accent"
                          />
                          <span>Any is fine</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Relevant links (optional)
                      </label>
                      <Input
                        name="links"
                        placeholder="Existing site, Figma, GitHub, Notion, etc."
                        className="glass-panel border-accent/30 text-xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Tell us a bit about your idea / requirement
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Describe the problem, goals, audience, or anything you'd like us to know..."
                      className="w-full text-sm glass-panel border border-accent/30 rounded-xl bg-background/60 px-3 py-2 outline-none focus:border-accent resize-none"
                    />
                  </div>

                  {/* Newsletter / updates */}
                  <div className="flex flex-col gap-2 text-[11px] text-muted-foreground">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input name="newsletter" type="checkbox" className="accent-accent" />
                      <span>
                        Keep me posted about Zapsters internships, workshops &
                        launches.
                      </span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input name="terms" type="checkbox" className="accent-accent" />
                      <span>
                        I understand this is not a spam list and I can opt-out
                        anytime.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-end pt-2">
                    {/* Gradient submit button like other pages */}
                    <GradientButton
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full flex items-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                      <Send className="w-4 h-4" />
                    </GradientButton>
                  </div>
                </form>
              </div>
            </Card>

            {/* RIGHT: Contact / Locations / Social */}
            <div className="space-y-6">
              <Card className="glass-panel border-accent/25 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold">Talk to us</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  For quick things, you can also ping us directly:
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Email</p>
                    <a
                      href={emailUrl}
                      className="font-mono text-[13px] hover:text-accent transition-colors"
                    >
                      zapsters23@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[13px] hover:text-accent transition-colors"
                    >
                      +91 90801 76830
                    </a>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Phone</p>
                    <a
                      href={phoneUrl}
                      className="font-mono text-[13px] hover:text-accent transition-colors"
                    >
                      +91 93424 08432
                    </a>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30">
                    Ideal for: projects & partnerships
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30">
                    Response window: 24–48 hours
                  </span>
                </div>
              </Card>

              <Card className="glass-panel border-accent/25 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold">Where we operate</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  We&apos;re primarily based in{" "}
                  <span className="text-foreground font-semibold">
                    Chennai, India (IST)
                  </span>{" "}
                  but collaborate with students & teams across time zones.
                </p>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p>Remote-first, project-based teams.</p>
                  <p>Open to college / campus collaborations.</p>
                  <p>Comfortable with async global communication.</p>
                </div>
              </Card>

              <Card className="glass-panel border-accent/25 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold">Social & updates</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Follow Zapsters for internship drops, behind-the-scenes, and
                  launches.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <a href="https://www.instagram.com/zapster_25?igsh=M2M1cG16cGJzOXF3" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full glass-panel border border-accent/30 hover:border-accent/60 transition-colors">
                    Instagram
                  </a>
                  <a href="http://linkedin.com/company/zapsters-inc" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full glass-panel border border-accent/30 hover:border-accent/60 transition-colors">
                    LinkedIn
                  </a>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-pointer">
                    Discord / Community
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel border border-accent/30 cursor-pointer">
                    YouTube (future)
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* MAP / VIRTUAL PRESENCE */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="glass-panel border-accent/20 p-6 md:p-8 flex flex-col md:flex-row items-stretch gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                A digital-first studio,{" "}
                <span className="neon-text">everywhere</span>.
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Most of our work happens online — but we&apos;re open to{" "}
                <span className="text-foreground font-semibold">
                  on-ground sessions, college events, and workshops
                </span>{" "}
                whenever possible.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Virtual meetings via Google Meet / Zoom / Discord.</li>
                <li>• Shared Notion / Figma / GitHub spaces for projects.</li>
                <li>• Clear timelines, milestones, and communication.</li>
              </ul>

              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">
                  Zapsters Studio Address
                </p>
                <p>{addressText}</p>
              </div>

              {/* Quick map actions */}
              {/* Quick map actions */}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">

                <GradientButton
                  className="rounded-full text-[11px] px-4 py-2"
                  onClick={() => window.open(mapsPlaceUrl, "_blank")}
                >
                  Open in Google Maps
                </GradientButton>

                <GradientButton
                  className="rounded-full text-[11px] px-4 py-2"
                  onClick={() => window.open(mapsDirectionsUrl, "_blank")}
                >
                  Get Directions
                </GradientButton>

              </div>

            </div>

            {/* Map block with address */}
            <div className="flex-1 min-h-[220px] glass-panel border border-accent/25 rounded-2xl flex items-center justify-center text-xs text-muted-foreground relative overflow-hidden">
              {/* Map iframe */}
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <iframe
                  title="Zapsters Location"
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-56 md:h-full border-0"
                />
              </div>

              {/* Subtle overlay label */}
              <div className="pointer-events-none absolute top-3 right-3 text-[10px] px-3 py-1 rounded-full glass-panel bg-background/70 border border-accent/40">
                Chennai · IST · India
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
