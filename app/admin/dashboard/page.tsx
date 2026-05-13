"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
  Mail
} from "lucide-react"
import { defaultContent, type SiteContent } from "@/lib/site-content"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState("")
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-authenticated")
    const user = sessionStorage.getItem("admin-user")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setAdminUser(user || "Admin")
      // Load saved content from localStorage
      const savedContent = localStorage.getItem("viek-site-content")
      if (savedContent) {
        setContent(JSON.parse(savedContent))
      }
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin-authenticated")
    sessionStorage.removeItem("admin-user")
    router.push("/admin/login")
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    localStorage.setItem("viek-site-content", JSON.stringify(content))
    setIsSaving(false)
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const updateHero = (field: keyof typeof content.hero, value: string) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }))
  }

  const updateStats = (field: keyof typeof content.stats, value: string) => {
    setContent((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: value },
    }))
  }

  const updateAbout = (field: keyof typeof content.about, value: string) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }))
  }

  const updateContact = (field: keyof typeof content.contact, value: string) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
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
            <Badge variant="secondary" className="hidden sm:inline-flex">Admin Dashboard</Badge>
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
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive">
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
                    <p className="text-2xl font-bold">{content.stats.projects}</p>
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
                    <p className="text-2xl font-bold">{content.stats.students}</p>
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
                    <p className="text-2xl font-bold">{content.stats.clients}</p>
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
                    <p className="text-2xl font-bold">{content.stats.successRate}</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
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
                  Content Editor
                </CardTitle>
                <CardDescription>Edit your website content below</CardDescription>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
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
                </TabsList>

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
                        onChange={(e) => updateHero("highlight", e.target.value)}
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
                      onChange={(e) => updateHero("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary CTA Text</Label>
                      <Input
                        value={content.hero.primaryCta}
                        onChange={(e) => updateHero("primaryCta", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary CTA Text</Label>
                      <Input
                        value={content.hero.secondaryCta}
                        onChange={(e) => updateHero("secondaryCta", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Projects Count</Label>
                      <Input
                        value={content.stats.projects}
                        onChange={(e) => updateStats("projects", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Students Count</Label>
                      <Input
                        value={content.stats.students}
                        onChange={(e) => updateStats("students", e.target.value)}
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
                        onChange={(e) => updateStats("successRate", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

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
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
