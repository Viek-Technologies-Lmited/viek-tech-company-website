"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight } from "lucide-react";

// Updated with reliable, high-resolution Unsplash production URLs
const blogPosts = [
  {
    title: "The Future of Web Development in 2024",
    excerpt:
      "Exploring the shift towards AI-integrated workflows, the rise of edge computing, and how React Server Components are changing the game.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    category: "Technology",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "How to Land Your First Dev Role",
    excerpt:
      "Practical tips for junior developers navigating the current job market, from portfolio building to acing the technical interview.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    category: "Career",
    date: "Oct 10, 2023",
    readTime: "8 min read",
  },
  {
    title: "Mastering Modern UI/UX Design",
    excerpt:
      "Why accessibility and motion design are no longer optional in creating world-class digital products for a global audience.",
    image:
      "https://cdn.dribbble.com/userupload/41505217/file/original-67e6a497c042e3e5028704313e0738c1.png?resize=1024x768&vertical=center",
    category: "Design",
    date: "Oct 08, 2023",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tech Insights & Updates
          </h1>
          <p className="text-xl text-gray-600">
            Deep dives into software engineering, career growth, and the African
            tech ecosystem.
          </p>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-72 lg:h-full min-h-[350px] bg-gray-200">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {blogPosts[0].readTime}
                  </span>
                </div>
                <Button className="w-fit bg-blue-600 hover:bg-blue-700">
                  Read Article <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all bg-white overflow-hidden">
                <div className="relative h-56 bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href="#"
                    className="text-blue-600 font-semibold text-sm flex items-center group"
                  >
                    Read More{" "}
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
