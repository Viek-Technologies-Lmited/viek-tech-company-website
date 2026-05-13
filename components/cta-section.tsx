"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLThoLTJ2LTRoMnY0em0tOCA4aC0ydi00aDJ2NHptMC04aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ready to Transform Your Business or Career?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Let&apos;s Build Something Amazing Together
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            Whether you need a cutting-edge digital solution for your business or want to upskill with our academy programs, Viek Tech is here to help you succeed.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#contact">
              <Button size="lg" variant="secondary" className="gap-2 text-foreground">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#academy">
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Join the Academy
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-primary-foreground/60 mt-8">
            No commitment required. Get a free consultation today.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
