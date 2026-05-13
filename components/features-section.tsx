"use client"

import { motion } from "framer-motion"
import { Code, GraduationCap, Briefcase, TrendingUp, Globe, Smartphone, Palette, BookOpen } from "lucide-react"
import type { SiteContent } from "@/lib/site-content"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Globe,
  Smartphone,
  Palette,
  BookOpen,
}

interface FeaturesSectionProps {
  content: SiteContent
}

export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Code
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
