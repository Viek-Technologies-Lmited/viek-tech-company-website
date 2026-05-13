"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="youremail@gmail.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Project Inquiry / Academy Question" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us more about how we can help..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                  Send Message
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
