"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, X, Youtube } from "lucide-react";

const videoTestimonials = [
  {
    title: "Building New Era Ventures: A Founder's Journey",
    duration: "05:20",
    category: "Case Study",
    // Using high-quality stock URLs so they show up immediately
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
  },
  {
    title: "From Student to Full-Stack Engineer",
    duration: "03:45",
    category: "Academy",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Client Spotlight: Corporate Branding Results",
    duration: "04:12",
    category: "Services",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
];

export default function VideoStoriesPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/testimonials">
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" /> Back to Testimonials
          </Button>
        </Link>

        {/* Header - Styled to match image_1e9a02.png */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">
            Video <span className="text-primary not-italic">Stories</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Experience the ViekTech impact through the lens of our community.
            Real people, real projects, and real results captured on film.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoTestimonials.map((video, index) => (
            <div
              key={index}
              onClick={() => setActiveVideo(video.videoUrl)}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                {/* Play Button - Centered as seen in image_1e9a02.png */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-white fill-current ml-1" />
                  </div>
                </div>

                <span className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 rounded font-mono">
                  {video.duration}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    {video.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={`${activeVideo}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
