"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Building2,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  defaultContent,
  type SiteContent,
  type JobListing,
  type JobApplication,
} from "@/lib/site-content";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function CareersPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<string>("");
  const [resumeName, setResumeName] = useState<string>("");

  useEffect(() => {
    const savedContent = localStorage.getItem("viek-site-content");
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Error synchronizing state schema", e);
        setContent(defaultContent);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a resume smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);

    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      portfolioUrl: formData.portfolioUrl || undefined,
      resumeUrl: resumeFile || undefined,
      coverLetter: formData.coverLetter || undefined,
      timestamp: Date.now(),
      status: "Pending",
    };

    // Save to localStorage (keeps existing behavior)
    setContent((prev) => {
      const updatedApplications = [
        ...(prev.applications || []),
        newApplication,
      ];
      const updatedContent = { ...prev, applications: updatedApplications };
      localStorage.setItem("viek-site-content", JSON.stringify(updatedContent));
      return updatedContent;
    });

    // Send email notification via API route
    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("jobTitle", selectedJob.title);
      fd.append("portfolioUrl", formData.portfolioUrl);
      fd.append("coverLetter", formData.coverLetter);

      // Reconstruct the File from the data URL if it exists
      if (resumeFile && resumeName) {
        const response = await fetch(resumeFile);
        const blob = await response.blob();
        fd.append("resume", blob, resumeName);
      }

      const emailResponse = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      });

      if (!emailResponse.ok) {
        console.error("Email notification failed:", emailResponse.statusText);
        // Don't fail the submission if email fails — the application is still saved
      }
    } catch (emailError) {
      console.error("Error sending notification email:", emailError);
      // Continue anyway — application is already saved locally
    }

    setIsSubmitting(false);
    setIsApplyOpen(false);

    // Reset form fields
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolioUrl: "",
      coverLetter: "",
    });
    setResumeFile("");
    setResumeName("");

    toast({
      title: "Application Submitted!",
      description: `Thank you for applying for the ${selectedJob.title} position.`,
    });
  };

  const activeJobs = (content.jobs || []).filter((job) => job.isOpen);

  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />
      <Toaster />

      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            {!selectedJob ? (
              // Main Open Positions View
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <Badge
                    variant="outline"
                    className="mb-4 border-primary text-primary px-3 py-1"
                  >
                    WE ARE HIRING
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Build the Future of Tech With Us
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Join a high-performance team dedicated to developing
                    cutting-edge software solutions and mentoring the next
                    generation of digital builders.
                  </p>
                  <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    Email us at{" "}
                    <a
                      href="mailto:jobs@viektech.com"
                      className="font-medium text-primary hover:underline"
                    >
                      jobs@viektech.com
                    </a>
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-foreground px-1">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Open Roles ({activeJobs.length})
                  </h2>

                  {activeJobs.length > 0 ? (
                    <div className="grid gap-4">
                      {activeJobs.map((job) => (
                        <Card
                          key={job.id}
                          className="hover:border-primary/40 transition-all cursor-pointer group"
                          onClick={() => setSelectedJob(job)}
                        >
                          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />{" "}
                                  {job.department}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" /> {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" /> {job.type}
                                </span>
                              </div>
                            </div>
                            <Button className="shrink-0 group-hover:translate-x-1 transition-transform gap-1">
                              View Details
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center border-dashed">
                      <p className="text-muted-foreground">
                        No active roles listed at the moment. Check back soon or
                        email us at{" "}
                        <a
                          href="mailto:jobs@viektech.com"
                          className="font-medium text-primary hover:underline"
                        >
                          jobs@viektech.com
                        </a>
                        .
                      </p>
                    </Card>
                  )}
                </div>
              </motion.div>
            ) : (
              // Job Details Extended View
              <motion.div
                key="details-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedJob(null)}
                  className="mb-6 gap-2 hover:bg-muted"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to open roles
                </Button>

                <div className="border border-border rounded-xl bg-card p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black tracking-tight">
                        {selectedJob.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Badge variant="secondary">
                          {selectedJob.department}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/10"
                        >
                          {selectedJob.type}
                        </Badge>
                        <span className="text-muted-foreground flex items-center gap-1 ml-1">
                          <MapPin className="w-4 h-4" /> {selectedJob.location}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      onClick={() => setIsApplyOpen(true)}
                      className="px-8 font-semibold"
                    >
                      Apply Now
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Role Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">
                      Core Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border flex justify-end">
                    <Button
                      size="lg"
                      onClick={() => setIsApplyOpen(true)}
                      className="px-8 font-semibold"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Application Form Dialog Popup */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Apply for {selectedJob?.title}
            </DialogTitle>
            <DialogDescription>
              Complete the fields below to submit your profile directly to our
              hiring team.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+234..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="portfolioUrl">Portfolio or GitHub URL</Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                placeholder="https://myportfolio.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Upload Resume (PDF, Word) *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/40 relative group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!resumeFile}
                />
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium text-foreground">
                  {resumeName || "Click to choose a file"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 2MB
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="coverLetter">Brief Pitch / Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us why you are a great fit for this position..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplyOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? "Submitting..." : "Submit Profile"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
      <CookieConsent />
    </main>
  );
}
