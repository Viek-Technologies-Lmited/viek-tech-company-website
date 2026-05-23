"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Award,
  Globe,
  Rocket,
  CheckCircle,
  ArrowRight,
  Building,
  GraduationCap,
  Briefcase,
  Star,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const teamMembers = [
  // {
  //   name: "VIEK TEAM",
  //   role: "Founder & CEO",
  //   image: "/images/team-1.jpg",
  //   bio: "A visionary tech entrepreneur with over 10 years of experience in software development and tech education.",
  //   linkedin: "#",
  //   twitter: "#"
  // },
  // {
  //   name: "Amara Okonkwo",
  //   role: "Chief Technology Officer",
  //   image: "/images/team-2.jpg",
  //   bio: "Former Google engineer with expertise in cloud architecture and scalable systems.",
  //   linkedin: "#",
  //   twitter: "#"
  // },
  // {
  //   name: "David Adeyemi",
  //   role: "Head of Academy",
  //   image: "/images/team-3.jpg",
  //   bio: "Passionate educator with 8+ years experience training developers across Africa.",
  //   linkedin: "#",
  //   twitter: "#"
  // },
  // {
  //   name: "Grace Nnamdi",
  //   role: "Lead UX Designer",
  //   image: "/images/team-4.jpg",
  //   bio: "Award-winning designer focused on creating intuitive digital experiences.",
  //   linkedin: "#",
  //   twitter: "#"
  // }
];

const milestones = [
  {
    year: "Our Origin",
    title: "Engineering the Vision",
    description:
      "Viek Tech was established to challenge the status quo, creating a bridge between raw technical potential and high-level enterprise demand.",
  },
  {
    year: "The Foundation",
    title: "Defining the Standard",
    description:
      "We launched our inaugural training tracks, implementing a curriculum focused on real-world problem solving rather than purely theoretical instruction.",
  },
  {
    year: "The Pivot",
    title: "Borderless Innovation",
    description:
      "By transitioning to a digital-first ecosystem, we successfully unified a distributed community of technical talent across 15 global markets.",
  },
  {
    year: "The Expansion",
    title: "Architecting Solutions",
    description:
      "We evolved into a full-scale development studio, delivering robust, scalable software architectures for diverse business requirements.",
  },
  {
    year: "The Milestone",
    title: "Empowering 500+ Pioneers",
    description:
      "Celebrated a major achievement in our talent pipeline, with over 500 graduates now operating as high-impact professionals in the tech sector.",
  },
  {
    year: "The Hub",
    title: "Physical Innovation Center",
    description:
      "Inaugurated our dedicated tech facility, providing a physical anchor for our collaborative research and product engineering teams.",
  },
  {
    year: "The Outlook",
    title: "A Global Authority",
    description:
      "Now recognized as a key institutional pillar in technical excellence, driving innovation and setting benchmarks for the regional landscape.",
  },
];

const values = [
  {
    letter: "V",
    word: "Vision",
    description:
      "We see beyond the present, constantly innovating and pushing boundaries to shape the future of technology in Africa.",
    icon: Eye,
    color: "bg-blue-500",
  },
  {
    letter: "I",
    word: "Integrity",
    description:
      "We operate with transparency, honesty, and ethical practices in everything we do, building trust with our clients and students.",
    icon: Heart,
    color: "bg-green-500",
  },
  {
    letter: "E",
    word: "Excellence",
    description:
      "We pursue the highest standards in our work, never settling for mediocrity in our solutions or training programs.",
    icon: Award,
    color: "bg-amber-500",
  },
  {
    letter: "K",
    word: "Knowledge",
    description:
      "We believe in continuous learning and sharing knowledge to empower individuals and transform communities.",
    icon: Lightbulb,
    color: "bg-purple-500",
  },
];

const stats = [
  { number: "5+", label: "Students Trained", icon: GraduationCap },
  { number: "20+", label: "Projects Delivered", icon: Briefcase },
  { number: "50+", label: "Enterprise Clients", icon: Building },
  { number: "98%", label: "Job Placement Rate", icon: Star },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              About Viek Tech
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Innovating with Purpose,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Empowering Through Technology
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Viek Technologies is a dual-purpose tech hub and academy dedicated
              to building purposeful digital solutions for businesses while
              training the next generation of tech talent across Africa and
              beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
              >
                Join Academy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From a Vision to a Movement
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Viek Tech was founded in 2026 with a simple yet powerful
                  mission: to bridge the technology skills gap in Africa while
                  delivering world-class digital solutions to businesses
                  globally.
                </p>
                <p>
                  What started as a small training initiative in Lagos has grown
                  into a comprehensive tech hub serving clients across multiple
                  continents and training hundreds of developers who are now
                  working at leading tech companies worldwide.
                </p>
                <p>
                  Our founder, V-I-E-K, recognized that Africa had immense
                  untapped potential in the tech sector. By combining practical
                  training with real-world project experience, we have created a
                  unique ecosystem where learning meets industry application.
                </p>
                <p>
                  Today, we continue to innovate, expand our reach, and remain
                  committed to our core belief that technology, when used
                  purposefully, can transform lives and communities.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-office.jpeg"
                  alt="Viek Tech Office"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Since 2026</div>
                    <div className="text-sm text-gray-600">
                      Building the future
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To deliver innovative, purpose-driven digital solutions that
                    empower businesses to thrive in the digital age, while
                    nurturing and developing tech talent through comprehensive,
                    industry-aligned training programs that prepare individuals
                    for successful careers in technology.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Deliver excellence in every project",
                      "Train job-ready developers",
                      "Bridge the tech skills gap",
                      "Foster innovation and creativity",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-600 to-indigo-700 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    To become Africa&apos;s leading technology solutions
                    provider and training institution, recognized globally for
                    excellence in software development, innovation, and
                    producing world-class tech professionals who drive digital
                    transformation across industries.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Lead tech innovation in Africa",
                      "Global recognition for excellence",
                      "Shape the future of tech education",
                      "Create lasting impact through technology",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-white"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-200 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The V-I-E-K Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our name embodies our principles. Each letter represents a value
              that guides everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-20 h-20 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <span className="text-4xl font-bold text-white">
                        {value.letter}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.word}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Milestones That Define Us
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              From humble beginnings to becoming a leading tech institution,
              every step has shaped who we are.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500/30 hidden md:block" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                    <span className="text-blue-400 font-bold text-lg">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-blue-200">{milestone.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-blue-900" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether you need a digital solution for your business or want to
              start your tech career, we are here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8"
                >
                  Get In Touch
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
