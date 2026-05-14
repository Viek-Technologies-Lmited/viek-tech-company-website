"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Terminal,
  Cpu,
  MousePointer2,
} from "lucide-react";

const pricingCategories = [
  {
    name: "Standard Solutions",
    description:
      "Ideal for startups and professional portfolios requiring a high-speed, modern presence.",
    features: [
      "Responsive React/Next.js Landing Pages",
      "SEO & Meta-tag Optimization",
      "CMS Integration (Sanity/Payload)",
      "Contact & Lead Generation Forms",
      "Social Media & Analytics Setup",
      "1 Month Post-Launch Support",
    ],
    cta: "Start Standard Project",
    premium: false,
  },
  {
    name: "Premium Enterprise",
    description:
      "Complex web applications with custom architecture, high security, and deep integrations.",
    features: [
      "Custom Full-Stack Web Apps",
      "Secure E-commerce Systems",
      "Advanced API & CRM Integration",
      "User Roles & Authentication",
      "Database Architecture Design",
      "Enterprise Cloud Hosting (AWS/GCP)",
      "Dedicated Support & Maintenance",
    ],
    cta: "Start Premium Project",
    premium: true,
  },
];

const webFeatures = [
  {
    title: "Modern Stack",
    desc: "We use Next.js 14+, TypeScript, and Tailwind CSS for scalable, type-safe development.",
    icon: Terminal,
  },
  {
    title: "Optimized Performance",
    desc: "Perfect 100 Lighthouse scores for speed, accessibility, and best practices.",
    icon: Zap,
  },
  {
    title: "Scalable Infrastructure",
    desc: "Deployment on Vercel or AWS to ensure your app stays up as your traffic grows.",
    icon: Cpu,
  },
];

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-10 h-[2px] bg-blue-600"></span>
                <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">
                  Web Engineering
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1]">
                Scalable Web <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Architectures.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                ViekTech delivers high-performance web applications that convert
                users into customers. Using industry-leading tech to build your
                future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg"
                  >
                    Get Started <MousePointer2 className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg border-gray-200"
                  >
                    Explore Packages
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                  alt="Modern Web Analytics Dashboard"
                  width={800}
                  height={600}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Core Web Vitals
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      99.9% Score
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {webFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="mb-6 inline-block p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Image Breakdown */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2344&auto=format&fit=crop"
                alt="Web Coding Process"
                width={700}
                height={500}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">
                Our Development Philosophy
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                We don't just write code; we solve business problems. Every line
                of JavaScript and every CSS rule is written with your user's
                experience and your business goals in mind.
              </p>
              <ul className="space-y-4">
                {[
                  "Clean, Modular Codebase",
                  "Mobile-First Responsiveness",
                  "Accessibility Compliance (WCAG)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-semibold text-gray-800"
                  >
                    <CheckCircle className="text-blue-600 h-5 w-5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Tiers Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Flexible Service Tiers
            </h2>
            <p className="text-gray-600 text-lg">
              Choose a plan that scales with your ambition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {pricingCategories.map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden flex flex-col transition-all duration-300 ${
                  tier.premium
                    ? "border-blue-600 border-2 shadow-2xl scale-105"
                    : "border-gray-100 shadow-lg hover:border-blue-200"
                }`}
              >
                {tier.premium && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold uppercase tracking-widest">
                    Most Popular for Enterprises
                  </div>
                )}
                <CardContent className="p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-bold mb-4">{tier.name}</h3>
                  <p className="text-gray-600 mb-8 min-h-[50px]">
                    {tier.description}
                  </p>

                  <div className="space-y-5 mb-10 flex-grow">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle
                          className={`h-6 w-6 mt-0.5 ${tier.premium ? "text-blue-600" : "text-green-500"}`}
                        />
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="w-full">
                    <Button
                      className={`w-full h-14 text-lg font-bold ${
                        tier.premium
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-900 hover:bg-black text-white"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <h2 className="text-4xl font-bold mb-6 relative z-10">
              Ready to build something extraordinary?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto relative z-10">
              Join 500+ businesses that trust ViekTech for their digital
              transformation.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 h-16 px-10 text-xl font-bold rounded-full"
              >
                Get a Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
