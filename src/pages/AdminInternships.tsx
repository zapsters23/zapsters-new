"use client";

import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getInternshipApplications, InternshipApplication } from "@/lib/internshipService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminNav from "@/components/AdminNav";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Target, 
  Eye, 
  UserCheck, 
  UserX,
  Building,
  Link as LinkIcon,
  MessageSquare,
  Settings,
  Award
} from "lucide-react";

const AdminInternships = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      const apps = await getInternshipApplications();
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching internship applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: InternshipApplication["status"]) => {
    setUpdatingStatus(id);
    try {
      await updateDoc(doc(db, "internshipApplications", id), {
        status: newStatus
      });
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusColor = (status: InternshipApplication["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "reviewed":
        return "bg-blue-500/20 text-blue-500";
      case "shortlisted":
        return "bg-purple-500/20 text-purple-500";
      case "accepted":
        return "bg-green-500/20 text-green-500";
      case "rejected":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getStatusIcon = (status: InternshipApplication["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "reviewed":
        return <Eye className="w-4 h-4" />;
      case "shortlisted":
        return <Target className="w-4 h-4" />;
      case "accepted":
        return <UserCheck className="w-4 h-4" />;
      case "rejected":
        return <UserX className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="container mx-auto px-4 pt-16 pb-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading internship applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="container mx-auto px-4 pt-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Internship Applications Admin</h1>
            <p className="text-muted-foreground">
              Manage internship applications from your website ({applications.length} total)
            </p>
          </div>

          <div className="grid gap-6">
            {applications.length === 0 ? (
              <Card className="glass-panel border-accent/20 p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground">
                  Internship applications will appear here when users submit the form.
                </p>
              </Card>
            ) : (
              applications.map((application) => (
                <Card key={application.id} className="glass-panel border-accent/20 p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Basic Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-accent" />
                          <h3 className="font-semibold text-lg">{application.fullName}</h3>
                        </div>
                        <Badge className={`${getStatusColor(application.status)} border-none`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status}
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{application.email}</span>
                        </div>
                        
                        {application.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{application.phone}</span>
                          </div>
                        )}
                        
                        {application.organization && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{application.organization}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(application.submittedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - Application Details */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Track</p>
                          <p className="font-medium">{application.preferredTrack}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-medium">{application.preferredDuration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Mode</p>
                          <p className="font-medium">{application.preferredMode}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Level</p>
                          <p className="font-medium">{application.currentLevel}</p>
                        </div>
                      </div>

                      {application.startDate && (
                        <div>
                          <p className="text-xs text-muted-foreground">Preferred Start</p>
                          <p className="text-sm font-medium">{new Date(application.startDate).toLocaleDateString()}</p>
                        </div>
                      )}

                      {application.dailyTimeCommitment && (
                        <div>
                          <p className="text-xs text-muted-foreground">Time Commitment</p>
                          <p className="text-sm">{application.dailyTimeCommitment}</p>
                        </div>
                      )}

                      {application.currentSkills && (
                        <div>
                          <p className="text-xs text-muted-foreground">Skills</p>
                          <p className="text-sm">{application.currentSkills}</p>
                        </div>
                      )}

                      {application.portfolioLinks && (
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <LinkIcon className="w-3 h-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Portfolio/Links</p>
                          </div>
                          <p className="text-sm break-all">{application.portfolioLinks}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Motivation & Actions */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Motivation</p>
                        </div>
                        <div className="glass-panel border-accent/20 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">{application.motivation}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        {application.openToRelatedTracks && (
                          <Badge variant="outline" className="text-xs">
                            <Settings className="w-3 h-3 mr-1" />
                            Open to related tracks
                          </Badge>
                        )}
                        {application.receiveUpdates && (
                          <Badge variant="outline" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Wants updates
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {application.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(application.id!, "reviewed")}
                            disabled={updatingStatus === application.id}
                            className="glass-panel border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                          >
                            Mark Reviewed
                          </Button>
                        )}
                        
                        {(application.status === "pending" || application.status === "reviewed") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(application.id!, "shortlisted")}
                            disabled={updatingStatus === application.id}
                            className="glass-panel border-purple-500/20 text-purple-500 hover:bg-purple-500/10"
                          >
                            Shortlist
                          </Button>
                        )}
                        
                        {application.status !== "accepted" && application.status !== "rejected" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id!, "accepted")}
                              disabled={updatingStatus === application.id}
                              className="glass-panel border-green-500/20 text-green-500 hover:bg-green-500/10"
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id!, "rejected")}
                              disabled={updatingStatus === application.id}
                              className="glass-panel border-red-500/20 text-red-500 hover:bg-red-500/10"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInternships;