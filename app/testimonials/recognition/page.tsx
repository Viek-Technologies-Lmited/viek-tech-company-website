"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Medal, Trophy, Star } from "lucide-react";

const awards = [
  {
    title: "Best Performance in Software Development",
    organization: "ViekTech Academy",
    year: "2026",
    description:
      "Awarded for exceptional project architecture and technical presentation excellence.",
    icon: Trophy,
  },
  {
    title: "Certified Full-Stack Developer",
    organization: "Tech Hub Nigeria",
    year: "2025",
    description:
      "Professional certification covering advanced React, Django, and System Design.",
    icon: Medal,
  },
  {
    title: "Innovation Excellence Award",
    organization: "New Era Ventures",
    year: "2026",
    description:
      "Recognized for the development of modular enterprise-level tech platforms.",
    icon: Award,
  },
];

export default function RecognitionPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/testimonials">
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" /> Back to Testimonials
          </Button>
        </Link>

        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Industry <span className="text-primary">Recognition</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our commitment to excellence has earned us recognition across the
            tech ecosystem. From academic achievements to professional
            certifications.
          </p>
        </div>

        {/* Awards List */}
        <div className="grid gap-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-border bg-card hover:border-primary/30 hover:bg-accent/5 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <award.icon className="h-8 w-8 text-primary" />
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {award.title}
                  </h3>
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full w-fit mt-2 md:mt-0">
                    {award.year}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {award.organization}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Badge Section */}
        <div className="mt-20 p-10 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Star className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Verified Excellence</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every project delivered by ViekTech undergoes rigorous testing to
            ensure it meets modern software engineering standards and client
            expectations.
          </p>
        </div>
      </div>
    </main>
  );
}
