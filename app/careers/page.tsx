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
import { Card, CardContent } from "@/components/ui/card";
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
  loadSiteContent,
  saveSiteContent,
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
    loadSiteContent().then(setContent);
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
      coverLetter: formData.coverLetter || undefined,
      timestamp: Date.now(),
      status: "Pending",
    };

    const updatedApplications = [
      ...(content.applications || []),
      newApplication,
    ];
    const updatedContent = { ...content, applications: updatedApplications };
    setContent(updatedContent);
    await saveSiteContent(updatedContent);

    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("jobTitle", selectedJob.title);
      fd.append("portfolioUrl", formData.portfolioUrl);
      fd.append("coverLetter", formData.coverLetter);

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
      }
    } catch (emailError) {
      console.error("Error sending notification email:", emailError);
    }

    setIsSubmitting(false);
    setIsApplyOpen(false);

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
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      <Toaster />

      <div className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatePresence mode="wait">
            {!selectedJob ? (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* ── Hero ── */}
                <div className="text-center max-w-4xl mx-auto mb-20 pt-8">
                  <p className="text-lg font-bold uppercase tracking-[0.18em] text-blue-600 mb-3">
                    We are hiring
                  </p>
                  {/* <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5">
                
                  </h1> */}
                  <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                    The foundation of every solution we build and every success
                    we achieve. Join a high-performance team dedicated to
                    developing cutting-edge solutions and mentoring the next
                    generation of digital builders.
                  </p>
                  <p className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email us at{" "}
                    <a
                      href="mailto:jobs@viektech.com"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      jobs@viektech.com
                    </a>
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="#open-roles"
                      className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View open roles
                    </a>
                    <a
                      href="#why-join-us"
                      className="rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300"
                    >
                      Pecks & Benefits
                    </a>
                  </div>
                </div>

                {/* ── Why join us ── */}
                <section id="why-join-us" className="mb-20">
                  <p className="text-center text-lg font-bold uppercase tracking-[0.18em] text-blue-600 mb-2">
                    Why join us
                  </p>
                  <h2 className="text-center text-2xl font-bold text-slate-900 mb-2">
                    More than a job title
                  </h2>
                  <p className="text-center text-sm text-slate-500 max-w-md mx-auto mb-10">
                    A dual-purpose tech hub means your work shows up in two
                    places: production and the classroom.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      {
                        title: "Competitive Pay",
                        body: "We offer market-leading salaries and equity for every full-time employee.",
                      },
                      {
                        title: "Remote-friendly",
                        body: "Work from anywhere. We sync where it actually counts.",
                      },
                      {
                        title: "Continuous Learning",
                        body: "Training, mentorship, and certifications built into your role.",
                      },
                      {
                        title: "Collaborative Teams",
                        body: "Designers, engineers, and product managers work closely together.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-200 p-6"
                      >
                        <h3 className="text-base font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ── Benefits ── */}
                <section className="mb-20">
                  <h2 className="text-center text-2xl font-bold text-slate-900 mb-10">
                    Employee Benefits
                  </h2>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {[
                      { label: "Paid Learning" },
                      { label: "Paid Time Off" },
                      { label: "Healthcare" },
                      { label: "Remote Work" },
                    ].map((b) => (
                      <div
                        key={b.label}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                          <Briefcase className="w-7 h-7" />
                        </div>
                        <span className="text-sm font-semibold text-slate-900 text-center">
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ── Open Roles ── */}
                <section id="open-roles" className="mb-20">
                  <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 mb-2">
                    Open roles
                  </p>
                  <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 mb-10">
                    Roles open ({activeJobs.length})
                  </h2>

                  {activeJobs.length > 0 ? (
                    <div className="space-y-5">
                      {activeJobs.map((job) => (
                        <div
                          key={job.id}
                          onClick={() => setSelectedJob(job)}
                          className="group flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md cursor-pointer sm:flex-row sm:items-center sm:gap-6 sm:p-8"
                        >
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                            <Building2 className="w-8 h-8" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <p className="mt-1 flex items-center gap-2 text-base font-medium text-slate-500">
                              <span>{job.department}</span>
                              <span className="text-slate-300">/</span>
                              <span>{job.location}</span>
                              <span className="text-slate-300">/</span>
                              <span>{job.type}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-4 sm:shrink-0">
                            <span className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">
                              {job.type}
                            </span>
                            <span className="flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                              <ChevronRight className="w-6 h-6 transition group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center">
                      <p className="text-sm text-slate-500">
                        No active roles right now. Check back soon or email{" "}
                        <a
                          href="mailto:jobs@viektech.com"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          jobs@viektech.com
                        </a>
                      </p>
                    </div>
                  )}
                </section>

                {/* ── Hiring Process ── */}
                <section className="mb-20">
                  <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 mb-2">
                    Our hiring process
                  </p>
                  <h2 className="text-center text-2xl font-bold text-slate-900 mb-14">
                    What to expect
                  </h2>
                  <div className="relative">
                    <div
                      className="absolute left-0 right-0 top-5 hidden h-px bg-slate-200 md:block"
                      aria-hidden
                    />
                    <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
                      {[
                        {
                          n: 1,
                          title: "Apply",
                          body: "Submit your application and tell us about yourself.",
                        },
                        {
                          n: 2,
                          title: "Resume Review",
                          body: "We review your background and experience.",
                        },
                        {
                          n: 3,
                          title: "Recruiter Call",
                          body: "A friendly call to learn more about you and the role.",
                        },
                        {
                          n: 4,
                          title: "Technical Interview",
                          body: "Showcase your skills and problem-solving approach.",
                        },
                        {
                          n: 5,
                          title: "Offer",
                          body: "We make you an offer and celebrate together.",
                        },
                      ].map((step) => (
                        <li
                          key={step.n}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-white text-sm font-bold text-blue-600">
                            {step.n}
                          </div>
                          <h3 className="mt-4 text-sm font-bold text-slate-900">
                            {step.title}
                          </h3>
                          <p className="mt-1 max-w-[12rem] text-xs text-slate-500">
                            {step.body}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>

                {/* ── Don't see your role ── */}
                <section>
                  <div className="rounded-3xl border border-slate-200 px-6 py-16 text-center">
                    <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                      Don&rsquo;t see your role?
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
                      We&rsquo;re growing faster than this list. Send us your
                      portfolio anyway.
                    </p>
                    <a
                      href="mailto:jobs@viektech.com"
                      className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Apply now
                    </a>
                  </div>
                </section>
              </motion.div>
            ) : (
              /* ── Job detail view — unchanged logic, restyled ── */
              <motion.div
                key="details-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <button
                  onClick={() => setSelectedJob(null)}
                  className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to open roles
                </button>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 space-y-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="space-y-3">
                      <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        {selectedJob.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                          {selectedJob.department}
                        </span>
                        <span className="rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-semibold">
                          {selectedJob.type}
                        </span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {selectedJob.location}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsApplyOpen(true)}
                      className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shrink-0"
                    >
                      Apply Now
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Role Description
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">
                      Core Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setIsApplyOpen(true)}
                      className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Apply Dialog — unchanged logic, restyled ── */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Apply for {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Complete the fields below to submit your profile directly to our
              hiring team.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="fullName"
                className="text-sm font-semibold text-slate-700"
              >
                Full Name *
              </Label>
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
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address *
                </Label>
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
                <Label
                  htmlFor="phone"
                  className="text-sm font-semibold text-slate-700"
                >
                  Phone Number *
                </Label>
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
              <Label
                htmlFor="portfolioUrl"
                className="text-sm font-semibold text-slate-700"
              >
                Portfolio or GitHub URL
              </Label>
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
              <Label className="text-sm font-semibold text-slate-700">
                Upload Resume (PDF, Word) *
              </Label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 relative group transition">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!resumeFile}
                />
                <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400 group-hover:text-blue-600 transition" />
                <p className="text-sm font-medium text-slate-700">
                  {resumeName || "Click to choose a file"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Max file size: 2MB
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="coverLetter"
                className="text-sm font-semibold text-slate-700"
              >
                Brief Pitch / Cover Letter
              </Label>
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
              <button
                type="button"
                onClick={() => setIsApplyOpen(false)}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 min-w-[120px]"
              >
                {isSubmitting ? "Submitting..." : "Submit Profile"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
      <CookieConsent />
    </main>
  );
}
