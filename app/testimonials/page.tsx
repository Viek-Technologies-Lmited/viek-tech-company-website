"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Fullstack Developer at Paystack",
    content:
      "The academy didn't just teach me how to code; they taught me how to think like an engineer. The mentorship is world-class.",
    rating: 5,
    type: "Student",
  },
  {
    name: "Michael Chen",
    role: "CEO, TechFlow Solutions",
    content:
      "Viek Tech delivered our enterprise platform two weeks ahead of schedule. Their attention to detail is unmatched in the region.",
    rating: 5,
    type: "Client",
  },
  // Add more testimonials...
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Hear from the students we've trained and the businesses we've helped
            transform.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card className="break-inside-avoid bg-gray-50 border-0 shadow-sm p-6">
                <CardContent className="p-0">
                  <Quote className="w-10 h-10 text-blue-200 mb-4" />
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
