"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Save,
  User,
  Home,
  Eye,
  Edit3,
  Users,
  FolderKanban,
  MessageSquare,
  Mail,
  Trash2,
  ChevronDown,
  Clock,
  Briefcase,
  UserCheck,
  Plus,
  FileDown,
  Globe,
  MapPin,
} from "lucide-react";
import {
  defaultContent,
  loadSiteContent,
  saveSiteContent,
  type SiteContent,
  type JobListing,
  type JobApplication,
} from "@/lib/site-content";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<string | null>(
    null,
  );

  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time" as JobListing["type"],
    description: "",
    requirements: "",
    responsibilities: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-authenticated");
    const user = sessionStorage.getItem("admin-user");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      setAdminUser(user || "Admin");
      loadSiteContent().then(setContent);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin-authenticated");
    sessionStorage.removeItem("admin-user");
    router.push("/admin/login");
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveSiteContent(content);
    setIsSaving(false);
    toast({
      title: success ? "Changes Saved" : "Save Failed",
      description: success
        ? "Your changes are now live for everyone, on every device."
        : "Something went wrong while saving — please try again.",
      variant: success ? undefined : "destructive",
    });
  };

  const handleDeleteMessage = async (id: string) => {
    const updatedMessages = (content.messages || []).filter(
      (msg) => msg.id !== id,
    );
    const updatedContent = { ...content, messages: updatedMessages };
    setContent(updatedContent);
    await saveSiteContent(updatedContent);
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully.",
    });
  };

  const handleMarkAsRead = async (id: string) => {
    const updatedMessages = (content.messages || []).map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg,
    );
    const updatedContent = { ...content, messages: updatedMessages };
    setContent(updatedContent);
    await saveSiteContent(updatedContent);
  };

  const handleToggleJobStatus = (id: string) => {
    const updatedJobs = (content.jobs || []).map((job) =>
      job.id === id ? { ...job, isOpen: !job.isOpen } : job,
    );
    setContent((prev) => ({ ...prev, jobs: updatedJobs }));
  };

  const handleDeleteJob = (id: string) => {
    const updatedJobs = (content.jobs || []).filter((job) => job.id !== id);
    setContent((prev) => ({ ...prev, jobs: updatedJobs }));
    toast({
      title: "Job Listing Removed",
      description: "The role has been permanently scrubbed.",
    });
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.department) {
      toast({
        title: "Validation Error",
        description: "Title and Department are required fields.",
        variant: "destructive",
      });
      return;
    }

    const createdListing: JobListing = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      department: newJob.department,
      location: newJob.location || "Remote",
      type: newJob.type,
      description: newJob.description,
      requirements: newJob.requirements
        .split("\n")
        .filter((r) => r.trim() !== ""),
      responsibilities: newJob.responsibilities
        .split("\n")
        .filter((r) => r.trim() !== ""),
      isOpen: true,
    };

    setContent((prev) => ({
      ...prev,
      jobs: [...(prev.jobs || []), createdListing],
    }));

    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: "",
      responsibilities: "",
    });

    toast({
      title: "Job Created!",
      description:
        "Position added — click Commit Global Save to publish it live.",
    });
  };

  const handleUpdateApplicationStatus = (
    id: string,
    status: "Pending" | "Reviewed" | "Rejected",
  ) => {
    const updatedApps = (content.applications || []).map((app) =>
      app.id === id ? { ...app, status } : app,
    );
    boxLayoutSync(updatedApps);
  };

  const boxLayoutSync = (updatedApps: JobApplication[]) => {
    setContent((prev) => ({ ...prev, applications: updatedApps }));
    toast({
      title: "Status Synchronized",
      description: `Applicant classification status safely tracked.`,
    });
  };

  const handleDeleteApplication = (id: string) => {
    const updatedApps = (content.applications || []).filter(
      (app) => app.id !== id,
    );
    setContent((prev) => ({ ...prev, applications: updatedApps }));
    toast({
      title: "Profile Dismissed",
      description: "Application submission records have been cleared.",
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080)
      return `${Math.floor(diffInMinutes / 1440)}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const unreadMessagesCount =
    content?.messages?.filter((msg) => !msg.read).length || 0;
  const pendingApplicationsCount =
    content?.applications?.filter((app) => app.status === "Pending").length ||
    0;
  const totalJobsCount = content?.jobs?.length || 0;

  const updateHero = (field: keyof typeof content.hero, value: string) => {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };
  const updateStats = (field: keyof typeof content.stats, value: string) => {
    setContent((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: value },
    }));
  };
  const updateAbout = (field: keyof typeof content.about, value: string) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  };
  const updateContact = (
    field: keyof typeof content.contact,
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Toaster />

      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">V</span>
              </div>
              <span className="font-bold text-foreground">ViekTech</span>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Admin Portal
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              {adminUser}
            </div>
            <Link href="/careers" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-primary/20 hover:bg-primary/5"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span>Careers Page</span>
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {content.stats.projects}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Core Projects
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalJobsCount}</p>
                    <p className="text-xs text-muted-foreground">
                      Configured Roles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {(content.applications || []).length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Applications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unreadMessagesCount}</p>
                    <p className="text-xs text-muted-foreground">
                      Unread Messages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6 mb-6">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Edit3 className="w-5 h-5 text-primary" />
                  Global Workspace Manager
                </CardTitle>
                <CardDescription>
                  Modify landing content assets, manage job board positions, and
                  review user interactions.
                </CardDescription>
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2 w-full sm:w-auto shadow-sm font-semibold"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Commit Global Save"}
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hero">
                <TabsList className="mb-6 flex-wrap h-auto p-1 bg-muted gap-1">
                  <TabsTrigger value="hero" className="gap-1.5">
                    <Home className="w-4 h-4" />
                    Hero
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="gap-1.5">
                    <LayoutDashboard className="w-4 h-4" />
                    Metrics
                  </TabsTrigger>
                  <TabsTrigger value="about" className="gap-1.5">
                    <FileText className="w-4 h-4" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="gap-1.5">
                    <Settings className="w-4 h-4" />
                    Contact
                  </TabsTrigger>

                  <TabsTrigger value="jobs" className="gap-1.5 relative">
                    <Briefcase className="w-4 h-4" />
                    Manage Jobs
                    {totalJobsCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1.5 bg-background text-foreground text-[10px] px-1.5 py-0"
                      >
                        {totalJobsCount}
                      </Badge>
                    )}
                  </TabsTrigger>

                  <TabsTrigger
                    value="applications"
                    className="gap-1.5 relative"
                  >
                    <UserCheck className="w-4 h-4" />
                    Talent Applications
                    {pendingApplicationsCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1.5 text-[10px] px-1.5 py-0 animate-pulse"
                      >
                        {pendingApplicationsCount}
                      </Badge>
                    )}
                  </TabsTrigger>

                  <TabsTrigger value="messages" className="gap-1.5 relative">
                    <Mail className="w-4 h-4" />
                    Messages
                    {unreadMessagesCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1.5 text-[10px] px-1.5 py-0"
                      >
                        {unreadMessagesCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hero" className="space-y-4 outline-none">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Badge Text</Label>
                      <Input
                        value={content.hero.badge}
                        onChange={(e) => updateHero("badge", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Highlight Word</Label>
                      <Input
                        value={content.hero.highlight}
                        onChange={(e) =>
                          updateHero("highlight", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={content.hero.title}
                      onChange={(e) => updateHero("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={content.hero.description}
                      onChange={(e) =>
                        updateHero("description", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary CTA Text</Label>
                      <Input
                        value={content.hero.primaryCta}
                        onChange={(e) =>
                          updateHero("primaryCta", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary CTA Text</Label>
                      <Input
                        value={content.hero.secondaryCta}
                        onChange={(e) =>
                          updateHero("secondaryCta", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4 outline-none">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Projects Count</Label>
                      <Input
                        value={content.stats.projects}
                        onChange={(e) =>
                          updateStats("projects", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Students Count</Label>
                      <Input
                        value={content.stats.students}
                        onChange={(e) =>
                          updateStats("students", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Clients Count</Label>
                      <Input
                        value={content.stats.clients}
                        onChange={(e) => updateStats("clients", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Success Rate</Label>
                      <Input
                        value={content.stats.successRate}
                        onChange={(e) =>
                          updateStats("successRate", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="about" className="space-y-4 outline-none">
                  <div className="space-y-2">
                    <Label>Mission Statement</Label>
                    <Textarea
                      value={content.about.mission}
                      onChange={(e) => updateAbout("mission", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vision Statement</Label>
                    <Textarea
                      value={content.about.vision}
                      onChange={(e) => updateAbout("vision", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pitch Statement</Label>
                    <Textarea
                      value={content.about.pitch}
                      onChange={(e) => updateAbout("pitch", e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 outline-none">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        value={content.contact.email}
                        onChange={(e) => updateContact("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        value={content.contact.phone}
                        onChange={(e) => updateContact("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={content.contact.address}
                      onChange={(e) => updateContact("address", e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="jobs" className="space-y-6 outline-none">
                  <div className="grid lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-2 border border-border rounded-xl p-4 bg-muted/20 space-y-4 h-fit">
                      <h3 className="font-bold text-sm flex items-center gap-1.5 tracking-tight text-foreground uppercase">
                        <Plus className="w-4 h-4 text-primary" /> Add New
                        Position
                      </h3>
                      <form onSubmit={handleCreateJob} className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="jobTitle" className="text-xs">
                            Job Title
                          </Label>
                          <Input
                            id="jobTitle"
                            placeholder="Senior Frontend Engineer"
                            value={newJob.title}
                            onChange={(e) =>
                              setNewJob((p) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="jobDept" className="text-xs">
                              Department
                            </Label>
                            <Input
                              id="jobDept"
                              placeholder="Engineering"
                              value={newJob.department}
                              onChange={(e) =>
                                setNewJob((p) => ({
                                  ...p,
                                  department: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="jobLoc" className="text-xs">
                              Location
                            </Label>
                            <Input
                              id="jobLoc"
                              placeholder="Remote / Lagos"
                              value={newJob.location}
                              onChange={(e) =>
                                setNewJob((p) => ({
                                  ...p,
                                  location: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Job Type</Label>
                          <select
                            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                            value={newJob.type}
                            onChange={(e) =>
                              setNewJob((p) => ({
                                ...p,
                                type: e.target.value as JobListing["type"],
                              }))
                            }
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="jobDesc" className="text-xs">
                            Description
                          </Label>
                          <Textarea
                            id="jobDesc"
                            rows={2}
                            placeholder="Provide an explicit operational overview..."
                            value={newJob.description}
                            onChange={(e) =>
                              setNewJob((p) => ({
                                ...p,
                                description: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="jobReqs" className="text-xs">
                            Requirements (One item per line)
                          </Label>
                          <Textarea
                            id="jobReqs"
                            rows={2}
                            placeholder="5+ Years React Frameworks&#10;TypeScript Proficiency"
                            value={newJob.requirements}
                            onChange={(e) =>
                              setNewJob((p) => ({
                                ...p,
                                requirements: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="jobResps" className="text-xs">
                            Responsibilities (One item per line)
                          </Label>
                          <Textarea
                            id="jobResps"
                            rows={2}
                            placeholder="Maintain layout components&#10;Optimize edge runtime performance"
                            value={newJob.responsibilities}
                            onChange={(e) =>
                              setNewJob((p) => ({
                                ...p,
                                responsibilities: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <Button
                          type="submit"
                          size="sm"
                          className="w-full font-semibold gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Launch Position
                        </Button>
                      </form>
                    </div>

                    <div className="lg:col-span-3 space-y-3">
                      <h3 className="font-bold text-sm tracking-tight uppercase text-muted-foreground px-1">
                        Active Directories ({totalJobsCount})
                      </h3>
                      {content.jobs && content.jobs.length > 0 ? (
                        <div className="space-y-2.5">
                          {content.jobs.map((job) => (
                            <div
                              key={job.id}
                              className="border border-border bg-card rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm"
                            >
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-bold text-base tracking-tight text-foreground truncate">
                                    {job.title}
                                  </h4>
                                  <Badge
                                    variant={
                                      job.isOpen ? "default" : "secondary"
                                    }
                                    className="text-[10px] py-0 px-1.5"
                                  >
                                    {job.isOpen ? "Active Listing" : "Closed"}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                                  <span>{job.department}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-0.5">
                                    <MapPin className="w-3 h-3" />{" "}
                                    {job.location}
                                  </span>
                                  <span>•</span>
                                  <span>{job.type}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs text-muted-foreground hidden sm:inline">
                                    Status Portal
                                  </span>
                                  <Switch
                                    checked={job.isOpen}
                                    onCheckedChange={() =>
                                      handleToggleJobStatus(job.id)
                                    }
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                  onClick={() => handleDeleteJob(job.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border border-dashed p-12 text-center rounded-xl bg-muted/10">
                          <Briefcase className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No configured job opportunities found.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="applications"
                  className="space-y-4 outline-none"
                >
                  {content.applications && content.applications.length > 0 ? (
                    <div className="space-y-3">
                      <h3 className="font-bold text-sm tracking-tight uppercase text-muted-foreground px-1">
                        Candidate Intake Pipeline (
                        {(content.applications || []).length})
                      </h3>
                      <div className="space-y-2">
                        {[...(content.applications || [])]
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map((app) => (
                            <div
                              key={app.id}
                              className={`border rounded-xl p-4 transition-all shadow-sm ${
                                app.status === "Pending"
                                  ? "bg-orange-50/40 border-orange-200"
                                  : "bg-card border-border"
                              }`}
                            >
                              <div
                                className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                onClick={() =>
                                  setExpandedApplication(
                                    expandedApplication === app.id
                                      ? null
                                      : app.id,
                                  )
                                }
                              >
                                <div className="space-y-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-bold text-base tracking-tight text-foreground">
                                      {app.fullName}
                                    </h4>
                                    <Badge
                                      variant={
                                        app.status === "Pending"
                                          ? "outline"
                                          : "default"
                                      }
                                      className={`text-[10px] py-0 px-2 font-semibold ${
                                        app.status === "Pending"
                                          ? "bg-amber-500 text-white hover:bg-amber-600 border-transparent"
                                          : app.status === "Reviewed"
                                            ? "bg-emerald-600 text-white hover:bg-emerald-700 border-transparent"
                                            : "bg-destructive text-destructive-foreground"
                                      }`}
                                    >
                                      {app.status}
                                    </Badge>
                                  </div>
                                  <p className="text-xs font-semibold text-primary truncate">
                                    Target Position: {app.jobTitle}
                                  </p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Submitted{" "}
                                    {formatDate(app.timestamp)}
                                  </p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                  <div className="text-xs text-muted-foreground">
                                    {app.email}
                                  </div>
                                  <ChevronDown
                                    className={`w-4 h-4 text-muted-foreground transition-transform ${expandedApplication === app.id ? "rotate-180" : ""}`}
                                  />
                                </div>
                              </div>

                              {expandedApplication === app.id && (
                                <div className="mt-4 pt-4 border-t border-border grid md:grid-cols-3 gap-6 animate-fadeIn">
                                  <div className="md:col-span-2 space-y-3.5">
                                    <div className="grid sm:grid-cols-2 gap-2 text-sm bg-muted/40 rounded-lg p-3">
                                      <div>
                                        <span className="text-xs text-muted-foreground block">
                                          Email
                                        </span>{" "}
                                        <span className="font-medium">
                                          {app.email}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground block">
                                          Phone
                                        </span>{" "}
                                        <span className="font-medium">
                                          {app.phone}
                                        </span>
                                      </div>
                                      {app.portfolioUrl && (
                                        <div className="sm:col-span-2 mt-1">
                                          <span className="text-xs text-muted-foreground block">
                                            Portfolio Link / GitHub
                                          </span>
                                          <a
                                            href={app.portfolioUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary font-medium hover:underline break-all"
                                          >
                                            {app.portfolioUrl}
                                          </a>
                                        </div>
                                      )}
                                    </div>

                                    <div>
                                      <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                                        Pitch Summary
                                      </h5>
                                      <p className="text-sm bg-card p-3 rounded-lg border border-border whitespace-pre-wrap leading-relaxed text-foreground">
                                        {app.coverLetter ||
                                          "Applicant did not attach a customized cover pitch statement."}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-4 flex flex-col justify-between">
                                    <div className="space-y-2">
                                      <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        Application State Route
                                      </h5>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        <Button
                                          size="sm"
                                          variant={
                                            app.status === "Pending"
                                              ? "default"
                                              : "outline"
                                          }
                                          className={`text-xs py-1 ${app.status === "Pending" ? "bg-amber-600 text-white hover:bg-amber-700 border-transparent" : ""}`}
                                          onClick={() =>
                                            handleUpdateApplicationStatus(
                                              app.id,
                                              "Pending",
                                            )
                                          }
                                        >
                                          Pending
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant={
                                            app.status === "Reviewed"
                                              ? "default"
                                              : "outline"
                                          }
                                          className={`text-xs py-1 ${app.status === "Reviewed" ? "bg-emerald-600 text-white hover:bg-emerald-700 border-transparent" : ""}`}
                                          onClick={() =>
                                            handleUpdateApplicationStatus(
                                              app.id,
                                              "Reviewed",
                                            )
                                          }
                                        >
                                          Review
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant={
                                            app.status === "Rejected"
                                              ? "destructive"
                                              : "outline"
                                          }
                                          className="text-xs py-1"
                                          onClick={() =>
                                            handleUpdateApplicationStatus(
                                              app.id,
                                              "Rejected",
                                            )
                                          }
                                        >
                                          Reject
                                        </Button>
                                      </div>
                                    </div>

                                    {app.resumeUrl && (
                                      <div className="space-y-1.5">
                                        <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                          Attached Materials
                                        </h5>
                                        <a
                                          href={app.resumeUrl}
                                          download={`Resume_${app.fullName.replace(/\s+/g, "_")}.pdf`}
                                          className="block w-full"
                                        >
                                          <Button
                                            size="sm"
                                            className="w-full gap-2 font-semibold"
                                          >
                                            <FileDown className="w-4 h-4" />{" "}
                                            Download Resume Document
                                          </Button>
                                        </a>
                                      </div>
                                    )}

                                    <div className="pt-2 border-t border-border/60 flex justify-end">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1 text-destructive hover:bg-destructive/10"
                                        onClick={() =>
                                          handleDeleteApplication(app.id)
                                        }
                                      >
                                        <Trash2 className="w-3.5 h-3.5" /> Purge
                                        Submission Record
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed rounded-xl bg-muted/5">
                      <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        The candidate submission directory is empty.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="messages"
                  className="space-y-4 outline-none"
                >
                  {content.messages && content.messages.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-tight">
                          Inbound Channels Directory ({content.messages.length})
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {[...(content.messages || [])]
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map((message) => (
                            <div
                              key={message.id}
                              className={`border rounded-xl p-4 transition-colors shadow-sm ${
                                !message.read
                                  ? "bg-blue-50/40 border-blue-200"
                                  : "bg-card border-border"
                              } hover:bg-muted/10`}
                            >
                              <div
                                className="cursor-pointer"
                                onClick={() => {
                                  setExpandedMessage(
                                    expandedMessage === message.id
                                      ? null
                                      : message.id,
                                  );
                                  if (!message.read)
                                    handleMarkAsRead(message.id);
                                }}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-bold text-base tracking-tight text-foreground truncate">
                                        {message.name}
                                      </h4>
                                      {!message.read && (
                                        <Badge
                                          variant="default"
                                          className="text-[10px] py-0 px-1.5 animate-pulse"
                                        >
                                          New
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-1.5">
                                      {message.email}
                                    </p>
                                    <p className="font-semibold text-sm text-foreground mb-1">
                                      {message.subject}
                                    </p>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {message.message}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(message.timestamp)}
                                    <ChevronDown
                                      className={`w-4 h-4 text-muted-foreground transition-transform ${expandedMessage === message.id ? "rotate-180" : ""}`}
                                    />
                                  </div>
                                </div>
                              </div>

                              {expandedMessage === message.id && (
                                <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fadeIn">
                                  <div>
                                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                                      Message Core Body
                                    </h5>
                                    <p className="text-sm text-foreground bg-muted/40 p-3 rounded-lg border border-border whitespace-pre-wrap leading-relaxed">
                                      {message.message}
                                    </p>
                                  </div>
                                  <div className="flex justify-end">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteMessage(message.id)
                                      }
                                      className="gap-1 text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                      Message Thread
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed rounded-xl bg-muted/5">
                      <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No client messages logged in the database.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
