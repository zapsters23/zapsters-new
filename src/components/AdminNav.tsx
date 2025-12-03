import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminNav = () => {
  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Internships", href: "/admin/internships" },
    { label: "Quotes", href: "/admin/quotes" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin" className="text-lg font-semibold">
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
