import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-accent/20 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 neon-text">ZAPSTERS</h3>
            <p className="text-muted-foreground text-sm">
              Building the future, one project at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="/#portfolio" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/#internships" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Internships
                </a>
              </li>
               <li>
                 <Link to="/blog" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                   Blog
                 </Link>
               </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Web Development</li>
              <li className="text-muted-foreground text-sm">UI/UX Design</li>
              <li className="text-muted-foreground text-sm">Cybersecurity</li>
              <li className="text-muted-foreground text-sm">3D Animation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://www.instagram.com/zapster_25?igsh=M2M1cG16cGJzOXF3" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass-panel glass-hover flex items-center justify-center">
                <Twitter className="w-5 h-5 text-foreground" />
              </a>
              <a href="http://linkedin.com/company/zapsters-inc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass-panel glass-hover flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-foreground" />
              </a>
              <a href="mailto:zapsters23@gmail.com" className="w-10 h-10 rounded-lg glass-panel glass-hover flex items-center justify-center">
                <Mail className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Zapsters. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
