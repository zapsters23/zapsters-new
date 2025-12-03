"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminNav from "@/components/AdminNav";
import { Phone, User, Calendar, CheckCircle, Clock, X } from "lucide-react";

interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  timestamp: any;
  status: "pending" | "contacted" | "completed" | "cancelled";
}

const Admin = () => {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchQuoteRequests = async () => {
    try {
      const q = query(
        collection(db, "quote-requests"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const requests: QuoteRequest[] = [];
      
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...doc.data()
        } as QuoteRequest);
      });
      
      setQuoteRequests(requests);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, newStatus: QuoteRequest["status"]) => {
    setUpdatingStatus(id);
    try {
      await updateDoc(doc(db, "quote-requests", id), {
        status: newStatus
      });
      
      // Update local state
      setQuoteRequests(prev => 
        prev.map(request => 
          request.id === id ? { ...request, status: newStatus } : request
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
    fetchQuoteRequests();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown";
    
    let date: Date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusColor = (status: QuoteRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "contacted":
        return "bg-blue-500/20 text-blue-500";
      case "completed":
        return "bg-green-500/20 text-green-500";
      case "cancelled":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getStatusIcon = (status: QuoteRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "contacted":
        return <Phone className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
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
            <p className="mt-4 text-muted-foreground">Loading quote requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="container mx-auto px-4 pt-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Quote Requests Admin</h1>
            <p className="text-muted-foreground">
              Manage quote requests from your website ({quoteRequests.length} total)
            </p>
          </div>

          <div className="grid gap-6">
            {quoteRequests.length === 0 ? (
              <Card className="glass-panel border-accent/20 p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No Quote Requests Yet</h3>
                <p className="text-muted-foreground">
                  Quote requests will appear here when users submit the form.
                </p>
              </Card>
            ) : (
              quoteRequests.map((request) => (
                <Card key={request.id} className="glass-panel border-accent/20 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-accent" />
                          <h3 className="font-semibold text-lg">{request.name}</h3>
                        </div>
                        <Badge className={`${getStatusColor(request.status)} border-none`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status}
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{request.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(request.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {request.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, "contacted")}
                          disabled={updatingStatus === request.id}
                          className="glass-panel border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                        >
                          Mark as Contacted
                        </Button>
                      )}
                      
                      {(request.status === "pending" || request.status === "contacted") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, "completed")}
                          disabled={updatingStatus === request.id}
                          className="glass-panel border-green-500/20 text-green-500 hover:bg-green-500/10"
                        >
                          Mark as Completed
                        </Button>
                      )}
                      
                      {request.status !== "cancelled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, "cancelled")}
                          disabled={updatingStatus === request.id}
                          className="glass-panel border-red-500/20 text-red-500 hover:bg-red-500/10"
                        >
                          Cancel
                        </Button>
                      )}
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

export default Admin;