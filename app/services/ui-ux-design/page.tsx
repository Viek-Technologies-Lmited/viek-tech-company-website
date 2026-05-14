"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Palette,
  CheckCircle,
  MousePointer2,
  Figma,
  Layers,
  Eye,
  Users,
  Lightbulb,
  Brush,
} from "lucide-react";

const pricingCategories = [
  {
    name: "Standard UI Kit",
    description:
      "Professional interface design for startups focusing on clean aesthetics and core usability.",
    features: [
      "Custom UI Style Guide",
      "High-Fidelity Wireframes",
      "Interactive Prototypes (Figma/XD)",
      "Up to 8 Essential Screens",
      "Standard User Flow Mapping",
      "Design-to-Dev Handoff Files",
    ],
    cta: "Start Design Project",
    premium: false,
  },
  {
    name: "Premium Experience Design",
    description:
      "Deep UX research and enterprise-level design systems built for complex user journeys.",
    features: [
      "Full User Research & Personas",
      "Comprehensive Design System",
      "Advanced Interaction Design",
      "Unlimited Screens & Revisions",
      "Usability Testing & Heatmaps",
      "Accessibility (WCAG) Audit",
      "Brand Identity & Logo Suite",
    ],
    cta: "Go Premium Experience",
    premium: true,
  },
];

const designFeatures = [
  {
    title: "User-Centered Research",
    desc: "We analyze user behavior to create interfaces that aren't just pretty, but actually work.",
    icon: Users,
  },
  {
    title: "Iterative Prototyping",
    desc: "Test the look and feel of your product before a single line of code is written.",
    icon: Eye,
  },
  {
    title: "Visual Brand Identity",
    desc: "Consistent color palettes, typography, and iconography that define your brand.",
    icon: Brush,
  },
];

export default function UIUXDesignPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#fff9f5] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-10 h-[2px] bg-orange-500"></span>
                <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">
                  Creative Strategy
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Design That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                  Resonates.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                We bridge the gap between business goals and user needs through
                intentional, data-driven design and pixel-perfect aesthetics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-black text-white h-14 px-8 text-lg rounded-xl"
                  >
                    Start a Design Audit
                  </Button>
                </Link>
                <Link href="#process">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-14 px-8 text-lg text-gray-600 hover:bg-orange-100/50"
                  >
                    Our Process
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/23fb21eaf38b9641b049695ed627f8cbfe9c8ed9"
                  alt="UI UX Design Process"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {designFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Blueprint Section */}
      <section
        id="process"
        className="py-24 bg-gray-900 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8">
                From Blueprint to <br />
                Beautiful Reality.
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Wireframing</h4>
                    <p className="text-gray-400">
                      Architectural layouts in Adobe XD or Figma to establish
                      structure and hierarchy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Visual Styling</h4>
                    <p className="text-gray-400">
                      Applying your brand's luxury aesthetic with high-fidelity
                      components and colors.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      Developer Handoff
                    </h4>
                    <p className="text-gray-400">
                      Exporting clean CSS, assets, and documentation to ensure
                      flawless implementation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <Image
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2340&auto=format&fit=crop"
                alt="Figma Design Interface"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Design Packages</h2>
            <p className="text-gray-600">
              Elevate your product with premium design services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingCategories.map((tier, index) => (
              <div
                key={index}
                className={`p-10 rounded-[2rem] border-t-8 flex flex-col transition-all duration-300 ${
                  tier.premium
                    ? "border-orange-500 bg-white shadow-2xl scale-105"
                    : "border-gray-200 bg-gray-50 shadow-sm"
                }`}
              >
                <h3 className="text-3xl font-bold mb-4">{tier.name}</h3>
                <p className="text-gray-600 mb-8">{tier.description}</p>

                <div className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle
                        className={`h-5 w-5 ${tier.premium ? "text-orange-500" : "text-gray-400"}`}
                      />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <Button
                    className={`w-full h-14 rounded-xl text-lg font-bold ${
                      tier.premium
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want to see our design system in action?
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            We offer a free 30-minute design consultation to audit your current
            product's user experience.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 rounded-full h-16 text-xl"
            >
              Book Free Consult
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
