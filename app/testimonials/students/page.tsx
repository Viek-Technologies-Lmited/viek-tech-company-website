"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Quote } from "lucide-react";

// Change this value for each page: "Student", "Client", etc.
const PAGE_TYPE = "Client";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO at TechFlow",
    content:
      "ViekTech delivered our mobile app ahead of schedule. The quality of the code and the UI/UX was world-class.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Product Manager",
    content:
      "Working with the team was a breeze. They understood our requirements perfectly and executed with precision.",
    rating: 5,
  },
];

export default function TestimonialSubPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/testimonials">
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" /> Back to All Testimonials
          </Button>
        </Link>

        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {PAGE_TYPE} <span className="text-primary">Success Stories</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Real feedback from the people and businesses we've collaborated
            with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10" />

              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg mb-6 relative z-10 italic">
                "{item.content}"
              </p>

              <div>
                <p className="font-bold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-12 rounded-3xl bg-primary text-primary-foreground text-center shadow-xl shadow-primary/20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start your own story?
          </h2>
          <p className="mb-8 opacity-90">
            Join our academy or hire our expert dev team today.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-bold">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
