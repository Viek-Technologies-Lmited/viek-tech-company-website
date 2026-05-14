"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lightbulb,
  CheckCircle,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Users2,
  Workflow,
  Search,
  ArrowRight,
} from "lucide-react";

const pricingCategories = [
  {
    name: "Strategic Audit",
    description:
      "Ideal for businesses needing a professional review of their current tech stack and roadmap.",
    features: [
      "Technical Debt Assessment",
      "Current Stack Optimization Audit",
      "Security & Vulnerability Review",
      "Performance Bottleneck Analysis",
      "Strategic Technology Roadmap",
      "Post-Audit Consultation Call",
    ],
    cta: "Schedule an Audit",
    premium: false,
  },
  {
    name: "Enterprise Transformation",
    description:
      "Ongoing partnership for full-scale digital transformation and technical leadership.",
    features: [
      "Fractional CTO Services",
      "Full Digital Transformation Strategy",
      "Cloud Infrastructure Migration",
      "Team Workflow & DevOps Training",
      "Enterprise Software Selection",
      "Custom Scalability Architecture",
      "Priority 24/7 Advisory Support",
    ],
    cta: "Request Transformation",
    premium: true,
  },
];

const consultingFeatures = [
  {
    title: "Digital Strategy",
    desc: "We align your technology investments with your business goals for maximum ROI.",
    icon: TrendingUp,
  },
  {
    title: "Infrastructure Audit",
    desc: "In-depth analysis of your servers, databases, and code for security and scale.",
    icon: Search,
  },
  {
    title: "Agile Workflows",
    desc: "Implementing modern development cultures that ship faster and with fewer bugs.",
    icon: Workflow,
  },
];

export default function TechConsultingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#f4f7fe] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-10 h-[2px] bg-indigo-600"></span>
                <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase">
                  Advisory Excellence
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Strategy That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Scales Ideas.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                Stop guessing and start growing. We provide the technical
                leadership and strategic clarity needed to navigate the complex
                digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white h-14 px-8 text-lg rounded-lg"
                  >
                    Book Strategy Session
                  </Button>
                </Link>
                <Link href="#tiers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  >
                    Consulting Packages
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
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340&auto=format&fit=crop"
                  alt="Tech Strategy Meeting"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-indigo-50">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-indigo-600 w-8 h-8" />
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase">
                      Growth Impact
                    </p>
                    <p className="text-2xl font-black text-gray-900">+120%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars of Consulting */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {consultingFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl transition-all duration-300 hover:bg-indigo-50/50"
              >
                <div className="w-16 h-16 bg-white shadow-lg text-indigo-600 rounded-2xl flex items-center justify-center mb-8 border border-indigo-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study / Impact Section */}
      <section className="py-24 bg-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Bridging the Gap Between <br />
              Code and Commerce.
            </h2>
            <p className="text-indigo-200 text-xl mb-12 leading-relaxed">
              Most digital projects fail not because of bad code, but because of
              poor strategy. At ViekTech, we ensure your tech stack is a
              competitive advantage, not a bottleneck.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Client ROI", val: "3.5x" },
                { label: "Efficiency", val: "60%" },
                { label: "Risk Mitigated", val: "High" },
                { label: "Success Rate", val: "98%" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10"
                >
                  <p className="text-3xl font-black text-white mb-1">
                    {stat.val}
                  </p>
                  <p className="text-indigo-300 text-sm uppercase font-bold tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="tiers" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Consulting Frameworks</h2>
            <p className="text-gray-600">
              Tailored advisory services for every stage of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingCategories.map((tier, index) => (
              <div
                key={index}
                className={`p-12 rounded-[2.5rem] flex flex-col transition-all duration-300 bg-white ${
                  tier.premium
                    ? "border-2 border-indigo-600 shadow-2xl scale-105 z-10"
                    : "border border-gray-100 shadow-sm"
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-3">{tier.name}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-5 mb-12 flex-grow">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle
                        className={`h-6 w-6 flex-shrink-0 ${tier.premium ? "text-indigo-600" : "text-gray-300"}`}
                      />
                      <span className="text-gray-700 font-semibold">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="mt-auto">
                  <Button
                    className={`w-full h-16 rounded-xl text-lg font-bold transition-all ${
                      tier.premium
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {tier.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Users2 className="w-12 h-12 text-indigo-200 mx-auto mb-8" />
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 italic mb-8">
              "ViekTech didn't just build our app; they fixed our entire
              development pipeline. Their strategic insight saved us months of
              wasted effort."
            </blockquote>
            <p className="font-bold text-gray-900">
              — Digital Director, New Era Ventures
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
