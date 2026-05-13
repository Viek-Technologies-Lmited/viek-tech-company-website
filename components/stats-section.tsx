"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Users, FolderKanban, Award, TrendingUp } from "lucide-react"
import type { SiteContent } from "@/lib/site-content"

interface StatsSectionProps {
  content: SiteContent
}

export function StatsSection({ content }: StatsSectionProps) {
  const stats = [
    {
      icon: FolderKanban,
      value: content.stats.projects,
      label: "Projects Delivered",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Users,
      value: content.stats.students,
      label: "Students Trained",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Award,
      value: content.stats.clients,
      label: "Happy Clients",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      icon: TrendingUp,
      value: content.stats.successRate,
      label: "Success Rate",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
