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
} from "lucide-react";
import {
  defaultContent,
  type SiteContent,
  type ContactMessage,
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

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-authenticated");
    const user = sessionStorage.getItem("admin-user");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      setAdminUser(user || "Admin");
      // Load saved content from localStorage
      const savedContent = localStorage.getItem("viek-site-content");
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin-authenticated");
    sessionStorage.removeItem("admin-user");
    router.push("/admin/login");
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.setItem("viek-site-content", JSON.stringify(content));
    setIsSaving(false);
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = content.messages.filter((msg) => msg.id !== id);
    setContent((prev) => ({
      ...prev,
      messages: updatedMessages,
    }));
    localStorage.setItem(
      "viek-site-content",
      JSON.stringify({
        ...content,
        messages: updatedMessages,
      }),
    );
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully.",
    });
  };

  const handleMarkAsRead = (id: string) => {
    const updatedMessages = content.messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg,
    );
    setContent((prev) => ({
      ...prev,
      messages: updatedMessages,
    }));
    localStorage.setItem(
      "viek-site-content",
      JSON.stringify({
        ...content,
        messages: updatedMessages,
      }),
    );
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

  const unreadCount = content?.messages?.filter((msg) => !msg.read).length;

  const updateHero = (field: keyof typeof content.hero, value: string) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
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
      {/* Header */}
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
              Admin Dashboard
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              {adminUser}
            </div>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dashboard Stats */}
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
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {content.stats.students}
                    </p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {content.stats.clients}
                    </p>
                    <p className="text-xs text-muted-foreground">Clients</p>
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
                    <p className="text-2xl font-bold">
                      {content.stats.successRate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Content & Messages
                </CardTitle>
                <CardDescription>
                  Manage your website content and client messages
                </CardDescription>
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hero">
                <TabsList className="mb-6 flex-wrap h-auto gap-1">
                  <TabsTrigger value="hero" className="gap-1">
                    <Home className="w-4 h-4" />
                    Hero
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="gap-1">
                    <LayoutDashboard className="w-4 h-4" />
                    Stats
                  </TabsTrigger>
                  <TabsTrigger value="about" className="gap-1">
                    <FileText className="w-4 h-4" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="gap-1">
                    <Settings className="w-4 h-4" />
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="gap-1 relative">
                    <Mail className="w-4 h-4" />
                    Messages
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                {/* Hero Tab */}
                <TabsContent value="hero" className="space-y-4">
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

                {/* Stats Tab */}
                <TabsContent value="stats" className="space-y-4">
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

                {/* About Tab */}
                <TabsContent value="about" className="space-y-4">
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

                {/* Contact Tab */}
                <TabsContent value="contact" className="space-y-4">
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

                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-4">
                  {content.messages && content.messages.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            {content.messages.length} Message
                            {content.messages.length !== 1 ? "s" : ""}
                          </h3>
                          {unreadCount > 0 && (
                            <p className="text-sm text-muted-foreground">
                              {unreadCount} unread
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {content.messages
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map((message) => (
                            <div
                              key={message.id}
                              className={`border rounded-lg p-4 transition-colors ${
                                !message.read
                                  ? "bg-blue-50 border-blue-200"
                                  : "bg-white border-gray-200"
                              } hover:bg-gray-50`}
                            >
                              <div
                                className="cursor-pointer"
                                onClick={() => {
                                  setExpandedMessage(
                                    expandedMessage === message.id
                                      ? null
                                      : message.id,
                                  );
                                  if (!message.read) {
                                    handleMarkAsRead(message.id);
                                  }
                                }}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-gray-900 truncate">
                                        {message.name}
                                      </h4>
                                      {!message.read && (
                                        <Badge
                                          variant="default"
                                          className="shrink-0"
                                        >
                                          New
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">
                                      {message.email}
                                    </p>
                                    <p className="font-medium text-gray-900 mb-1">
                                      {message.subject}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                      {message.message}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Clock className="w-3 h-3" />
                                      {formatDate(message.timestamp)}
                                    </div>
                                    <ChevronDown
                                      className={`w-5 h-5 text-gray-400 transition-transform ${
                                        expandedMessage === message.id
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Expanded Message */}
                              {expandedMessage === message.id && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <div className="mb-4">
                                    <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                      Full Message
                                    </h5>
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                      {message.message}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteMessage(message.id)
                                      }
                                      className="gap-2 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No messages yet</p>
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
