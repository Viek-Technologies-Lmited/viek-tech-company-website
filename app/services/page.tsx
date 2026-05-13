"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Code, 
  Smartphone, 
  Palette, 
  Cloud, 
  Shield, 
  Database,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Settings,
  LineChart,
  Layers,
  Monitor,
  Server,
  Cpu
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const services = [
  {
    id: "web-development",
    icon: Code,
    title: "Web Development",
    shortDesc: "Custom websites and web applications built with modern technologies.",
    fullDesc: "We build high-performance, scalable web applications using the latest technologies including React, Next.js, Node.js, and more. Our solutions are designed to grow with your business.",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "Content Management Systems",
      "Performance Optimization"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
    image: "/images/service-web.jpg"
  },
  {
    id: "mobile-development",
    icon: Smartphone,
    title: "Mobile App Development",
    shortDesc: "Native and cross-platform mobile applications for iOS and Android.",
    fullDesc: "Create powerful mobile experiences that your users will love. We develop native and cross-platform apps that deliver exceptional performance and user experience.",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Solutions",
      "App Store Optimization",
      "Mobile UI/UX Design",
      "App Maintenance & Support"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"],
    image: "/images/service-mobile.jpg"
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    shortDesc: "User-centered design that creates engaging digital experiences.",
    fullDesc: "Our design team creates intuitive, beautiful interfaces that delight users and drive conversions. We focus on user research, prototyping, and iterative design.",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
      "Usability Testing",
      "Interaction Design"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer"],
    image: "/images/service-design.jpg"
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    title: "Cloud Solutions",
    shortDesc: "Scalable cloud infrastructure and DevOps services.",
    fullDesc: "Leverage the power of cloud computing with our comprehensive cloud solutions. We help businesses migrate, optimize, and manage their cloud infrastructure.",
    features: [
      "Cloud Migration",
      "Infrastructure as Code",
      "DevOps Implementation",
      "Cloud Security",
      "Cost Optimization",
      "24/7 Monitoring"
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
    image: "/images/service-cloud.jpg"
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    shortDesc: "Protect your digital assets with comprehensive security solutions.",
    fullDesc: "In today's digital landscape, security is paramount. Our cybersecurity services help protect your business from threats and ensure compliance with industry standards.",
    features: [
      "Security Audits",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Security Training",
      "Incident Response",
      "Compliance Consulting"
    ],
    technologies: ["OWASP", "ISO 27001", "SOC 2", "GDPR", "PCI DSS", "NIST"],
    image: "/images/service-security.jpg"
  },
  {
    id: "data-analytics",
    icon: Database,
    title: "Data Analytics",
    shortDesc: "Turn your data into actionable insights for better decisions.",
    fullDesc: "Unlock the value in your data with our analytics services. We help businesses collect, process, and analyze data to drive informed decision-making.",
    features: [
      "Data Strategy Consulting",
      "Business Intelligence",
      "Data Visualization",
      "Predictive Analytics",
      "Machine Learning Solutions",
      "Data Pipeline Development"
    ],
    technologies: ["Python", "TensorFlow", "Power BI", "Tableau", "Apache Spark", "BigQuery"],
    image: "/images/service-data.jpg"
  }
]

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We begin by understanding your business, goals, and challenges through in-depth consultation."
  },
  {
    step: "02",
    title: "Planning",
    description: "Our team creates a detailed project plan, including timeline, milestones, and deliverables."
  },
  {
    step: "03",
    title: "Design",
    description: "We design intuitive user interfaces and create prototypes for your approval."
  },
  {
    step: "04",
    title: "Development",
    description: "Our developers build your solution using agile methodology with regular updates."
  },
  {
    step: "05",
    title: "Testing",
    description: "Rigorous quality assurance ensures your product is bug-free and performs optimally."
  },
  {
    step: "06",
    title: "Launch & Support",
    description: "We deploy your solution and provide ongoing maintenance and support."
  }
]

const industries = [
  { name: "Healthcare", icon: "🏥" },
  { name: "Finance", icon: "💰" },
  { name: "E-commerce", icon: "🛒" },
  { name: "Education", icon: "📚" },
  { name: "Real Estate", icon: "🏠" },
  { name: "Logistics", icon: "🚚" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Agriculture", icon: "🌾" }
]

export default function ServicesPage() {
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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Comprehensive Tech Solutions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                For Your Business
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From web development to cybersecurity, we offer end-to-end technology services 
              designed to help your business thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a full spectrum of technology services to meet your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <service.icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                    <Link 
                      href={`#${service.id}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                  <service.icon className="h-4 w-4" />
                  {service.title}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.fullDesc}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Technologies We Use
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Our Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors h-full">
                  <span className="text-5xl font-bold text-blue-500/30">{item.step}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-blue-200">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Industries We Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expertise Across Sectors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We have experience delivering solutions for diverse industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <span className="font-semibold text-gray-900">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let&apos;s discuss how our services can help you achieve your goals. 
              Get in touch for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                  Start a Project
                </Button>
              </Link>
              <Link href="/academy">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Explore Academy
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
