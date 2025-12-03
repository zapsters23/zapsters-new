import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { GradientButton } from "@/components/ui/gradient-button";  // ⭐ NEW IMPORT

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Internships", href: "/internships" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-accent/10">
      <div className="container mx-auto px-2 lg:px-4">
        
        <div className="flex items-center justify-between h-16">

          {/* LEFT — Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Zapsters Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-contain translate-y-1"
            />
          </Link>

          {/* CENTER — Nav Links */}
          <ul className="hidden md:flex gap-10 text-lg">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT — CTA Button */}
          <div className="hidden md:flex">
            <Link to="/contact">
              <GradientButton className="rounded-full">
                Join Our Community
              </GradientButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-foreground hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* ⭐ Mobile CTA */}
              <Link to="/contact">
                <GradientButton className="w-full rounded-full">
                  Join Our Community
                </GradientButton>
              </Link>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navigation;
