"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Check, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  defaultContent,
  type SiteContent,
  type ContactMessage,
} from "@/lib/site-content";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Get existing content from localStorage
      const savedContent = localStorage.getItem("viek-site-content");
      let content: SiteContent = savedContent
        ? JSON.parse(savedContent)
        : defaultContent;

      // Create new message
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: Date.now(),
        read: false,
      };

      // Add message to content
      if (!content.messages) {
        content.messages = [];
      }
      content.messages.push(newMessage);

      // Save updated content to localStorage
      localStorage.setItem("viek-site-content", JSON.stringify(content));

      // Success feedback
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      toast({
        title: "Message Sent!",
        description:
          "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Toaster />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info Side */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Let's Build Something Great
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Have a project in mind or want to join our next cohort? Reach
                out and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email Us", val: "hello@viektech.com" },
                  { icon: Phone, label: "Call Us", val: "+234 800 000 0000" },
                  {
                    icon: MapPin,
                    label: "Visit Us",
                    val: "Lekki Phase 1, Lagos, Nigeria",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.label}</h4>
                      <p className="text-gray-600">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="youremail@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    name="subject"
                    placeholder="Project Inquiry / Academy Question"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us more about how we can help..."
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                  disabled={isSubmitting || submitSuccess}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : submitSuccess ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Message Sent
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
