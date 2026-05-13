"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users, BookOpen, Trophy, Code, Database, Smartphone, Shield } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    title: "Full Stack Web Development",
    description: "Master modern web technologies from frontend to backend. Build real-world applications.",
    duration: "12 Weeks",
    level: "Beginner to Intermediate",
    icon: Code,
    topics: ["HTML/CSS/JS", "React", "Node.js", "MongoDB"],
    featured: true,
  },
  {
    title: "Mobile App Development",
    description: "Learn to build cross-platform mobile applications for iOS and Android.",
    duration: "10 Weeks",
    level: "Intermediate",
    icon: Smartphone,
    topics: ["React Native", "Flutter", "Firebase", "App Store"],
  },
  {
    title: "Data Science & Analytics",
    description: "Dive into data analysis, machine learning, and AI fundamentals.",
    duration: "8 Weeks",
    level: "Intermediate",
    icon: Database,
    topics: ["Python", "SQL", "Machine Learning", "Visualization"],
  },
  {
    title: "Cybersecurity Essentials",
    description: "Learn to protect systems and networks from cyber threats.",
    duration: "6 Weeks",
    level: "Beginner",
    icon: Shield,
    topics: ["Network Security", "Ethical Hacking", "Compliance", "Risk Management"],
  },
]

export function AcademySection() {
  return (
    <section id="academy" className="py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            VIEK TECH ACADEMY
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Launch Your Tech Career
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive training programs are designed to equip you with in-demand skills and prepare you for success in the tech industry.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: BookOpen, label: "Hands-on Projects", description: "Real-world experience" },
            { icon: Users, label: "Expert Instructors", description: "Industry professionals" },
            { icon: Clock, label: "Flexible Schedule", description: "Learn at your pace" },
            { icon: Trophy, label: "Certificate", description: "Industry recognized" },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{feature.label}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 group relative ${course.featured ? "ring-2 ring-primary/20" : ""}`}>
                {course.featured && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <course.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.topics.map((topic) => (
                      <span key={topic} className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span>{course.level}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="#contact">
            <Button size="lg" className="gap-2">
              Enroll Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
