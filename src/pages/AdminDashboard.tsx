import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminNav from "@/components/AdminNav";
import { getBlogPosts } from "@/lib/blogService";
import { getContactSubmissions } from "@/lib/contactService";
import { Eye, Edit, Trash2, Users, MessageSquare, Calendar, Mail } from "lucide-react";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactSearchQuery, setContactSearchQuery] = useState("");

  const { data: blogPosts = [], isLoading: blogLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
  });

  const { data: contactSubmissions = [], isLoading: contactLoading } = useQuery({
    queryKey: ['contactSubmissions'],
    queryFn: getContactSubmissions,
  });

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contactSubmissions.filter(contact =>
    contact.fullName.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    contact.projectType.toLowerCase().includes(contactSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <section className="pt-16 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-panel p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{blogPosts.length}</p>
                    <p className="text-sm text-muted-foreground">Blog Posts</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-panel p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{contactSubmissions.length}</p>
                    <p className="text-sm text-muted-foreground">Contact Forms</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-panel p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{contactSubmissions.filter(c => c.newsletter).length}</p>
                    <p className="text-sm text-muted-foreground">Newsletter Subs</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-panel p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {contactSubmissions.filter(c => 
                        new Date(c.submittedAt).toDateString() === new Date().toDateString()
                      ).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Today's Forms</p>
                  </div>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="blog" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
              </TabsList>

              <TabsContent value="blog" className="mt-6">
                <Card className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Blog Posts Management</h2>
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-md"
                    />
                  </div>

                  {blogLoading ? (
                    <div className="text-center py-8">
                      <p>Loading posts...</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Published</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{post.author.name}</TableCell>
                            <TableCell>
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="contacts" className="mt-6">
                <Card className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Contact Form Submissions</h2>
                    <Input
                      type="text"
                      placeholder="Search submissions..."
                      value={contactSearchQuery}
                      onChange={(e) => setContactSearchQuery(e.target.value)}
                      className="max-w-md"
                    />
                  </div>

                  {contactLoading ? (
                    <div className="text-center py-8">
                      <p>Loading submissions...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Project Type</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Timeline</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredContacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell className="font-medium">{contact.fullName}</TableCell>
                              <TableCell>{contact.email}</TableCell>
                              <TableCell>{contact.projectType}</TableCell>
                              <TableCell>{contact.budget}</TableCell>
                              <TableCell>{contact.timeline}</TableCell>
                              <TableCell>
                                {new Date(contact.submittedAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" title="View Details">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" title="Reply">
                                    <Mail className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;