"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/site-content";

interface HeroSectionProps {
  content: SiteContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      {/* Background Pattern - Lowered Z-Index to 0 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 z-20"
          >
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20"
            >
              {content.hero.badge}
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground">
                {content.hero.title}{" "}
                <span className="text-primary">{content.hero.highlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {content.hero.description}
              </p>
            </div>

            {/* Buttons - Added asChild and Pointer-Events check */}
            <div className="flex flex-wrap gap-4 items-center relative z-30">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 group cursor-pointer"
              >
                <Link href="/services">
                  {content.hero.primaryCta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base font-semibold border-2 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
              >
                <Link href="/about">
                  <Play className="mr-2 w-4 h-4 fill-current" />
                  {content.hero.secondaryCta}
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-primary">
                      {i}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.9/5 from 500+ reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Viek Tech - Building Digital Solutions"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-4 top-1/4 bg-background rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {content.stats.projects}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Projects Delivered
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -right-4 top-8 bg-background rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {content.stats.students}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Students Trained
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -right-4 bottom-1/4 bg-background rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {content.stats.successRate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Success Rate
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
