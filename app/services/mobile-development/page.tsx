"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Smartphone,
  CheckCircle,
  ArrowRight,
  Zap,
  Layers,
  Layout,
  Globe,
  Lock,
} from "lucide-react";

const pricingCategories = [
  {
    name: "Standard Cross-Platform",
    description:
      "Highly efficient apps built with React Native or Flutter for both iOS and Android.",
    features: [
      "Single Codebase for iOS & Android",
      "Core Feature Development",
      "Standard UI/UX Components",
      "API & Database Integration",
      "App Store & Play Store Submission",
      "3 Months Technical Support",
    ],
    cta: "Start Mobile Project",
    premium: false,
  },
  {
    name: "Premium Native Experience",
    description:
      "Maximum performance native apps (Swift/Kotlin) with complex animations and offline logic.",
    features: [
      "Native iOS & Android Development",
      "Advanced Custom Animations",
      "Offline Data Synchronization",
      "Biometric Security Integration",
      "Payment Gateway & In-App Purchases",
      "Real-time Push Notifications",
      "Priority Maintenance & Scaling",
    ],
    cta: "Go Premium Native",
    premium: true,
  },
];

const mobileFeatures = [
  {
    title: "User-Centric UX",
    desc: "We design intuitive mobile journeys that keep users engaged and coming back.",
    icon: Layout,
  },
  {
    title: "High Performance",
    desc: "Zero-lag interfaces optimized for battery efficiency and high-speed interaction.",
    icon: Zap,
  },
  {
    title: "Secure Architecture",
    desc: "End-to-end encryption and secure data handling to protect user privacy.",
    icon: Lock,
  },
];

export default function MobileDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/30">
                Native & Hybrid Solutions
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Apps That Define <br />
                <span className="text-blue-500">The Future.</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                From concept to the App Store, we build mobile experiences that
                reside on the home screens of your users and at the heart of
                your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-full"
                  >
                    Consult Our Experts
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg rounded-full border-gray-700 hover:bg-white/5"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex justify-center"
            >
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2340&auto=format&fit=crop"
                alt="Mobile App Interface Design"
                width={500}
                height={700}
                className="rounded-[3rem] shadow-2xl border-[12px] border-gray-800"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {mobileFeatures.map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <f.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mobile Development Tiers
            </h2>
            <p className="text-gray-600 text-lg">
              Engineered for performance, designed for people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {pricingCategories.map((tier, index) => (
              <div
                key={index}
                className={`p-10 rounded-[2.5rem] bg-white transition-all duration-500 flex flex-col h-full ${
                  tier.premium
                    ? "ring-4 ring-blue-600 shadow-2xl scale-105 z-10"
                    : "border border-gray-200 shadow-xl"
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-black mb-2">{tier.name}</h3>
                  <p className="text-gray-500 font-medium">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-4 mb-12 flex-grow">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className={`p-1 rounded-full ${tier.premium ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-semibold">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="mt-auto">
                  <Button
                    className={`w-full h-14 rounded-2xl text-lg font-bold transition-transform hover:scale-[1.02] ${
                      tier.premium
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900"
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

      {/* Industrial Application */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-[#f0f4ff] rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                Cross-Platform <br />
                Efficiency.
              </h2>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                We specialize in frameworks like React Native and Flutter,
                allowing you to reach 100% of your mobile audience with a single
                codebase. This reduces development costs by up to 40% while
                maintaining native-level speed.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                  <p className="text-blue-600 font-bold text-2xl">40%</p>
                  <p className="text-gray-500 text-sm">Faster Deployment</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                  <p className="text-blue-600 font-bold text-2xl">99.9%</p>
                  <p className="text-gray-500 text-sm">Crash-Free Sessions</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2148&auto=format&fit=crop"
                alt="App Interface"
                width={600}
                height={400}
                className="rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
