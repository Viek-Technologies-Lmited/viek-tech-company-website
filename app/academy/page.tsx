"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  GraduationCap, 
  Users, 
  Award, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  BookOpen,
  Laptop,
  Calendar,
  Globe,
  Briefcase,
  Play,
  Code,
  Smartphone,
  Database,
  Shield,
  TrendingUp,
  Palette
} from "lucide-react"

const courses = [
  {
    id: "fullstack",
    icon: Code,
    title: "Full Stack Web Development",
    duration: "16 Weeks",
    level: "Beginner to Advanced",
    price: "₦350,000",
    rating: 4.9,
    students: 450,
    image: "/images/course-fullstack.jpg",
    description: "Master both frontend and backend development with modern technologies.",
    highlights: [
      "HTML, CSS, JavaScript fundamentals",
      "React.js & Next.js framework",
      "Node.js & Express backend",
      "Database design with PostgreSQL & MongoDB",
      "API development & integration",
      "Deployment & DevOps basics"
    ],
    outcomes: [
      "Build complete web applications",
      "Work as a Full Stack Developer",
      "Create your own SaaS products",
      "Contribute to open source projects"
    ]
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    duration: "14 Weeks",
    level: "Intermediate",
    price: "₦300,000",
    rating: 4.8,
    students: 280,
    image: "/images/course-mobile.jpg",
    description: "Build native and cross-platform mobile apps for iOS and Android.",
    highlights: [
      "React Native fundamentals",
      "Flutter development",
      "Mobile UI/UX principles",
      "State management",
      "Native device features",
      "App store deployment"
    ],
    outcomes: [
      "Create cross-platform mobile apps",
      "Work as a Mobile Developer",
      "Launch apps on App Store & Play Store",
      "Build mobile-first businesses"
    ]
  },
  {
    id: "data-science",
    icon: Database,
    title: "Data Science & Analytics",
    duration: "12 Weeks",
    level: "Intermediate",
    price: "₦280,000",
    rating: 4.7,
    students: 195,
    image: "/images/course-data.jpg",
    description: "Learn to analyze data and build predictive models using Python.",
    highlights: [
      "Python programming",
      "Data analysis with Pandas",
      "Data visualization",
      "Machine learning basics",
      "Statistical analysis",
      "Real-world projects"
    ],
    outcomes: [
      "Analyze complex datasets",
      "Build predictive models",
      "Work as a Data Analyst",
      "Make data-driven decisions"
    ]
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity Fundamentals",
    duration: "10 Weeks",
    level: "Beginner",
    price: "₦250,000",
    rating: 4.8,
    students: 165,
    image: "/images/course-security.jpg",
    description: "Protect systems and networks from cyber threats.",
    highlights: [
      "Network security basics",
      "Ethical hacking fundamentals",
      "Security tools & frameworks",
      "Vulnerability assessment",
      "Incident response",
      "Security certifications prep"
    ],
    outcomes: [
      "Identify security vulnerabilities",
      "Implement security measures",
      "Work as a Security Analyst",
      "Protect digital assets"
    ]
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX Design",
    duration: "10 Weeks",
    level: "Beginner",
    price: "₦220,000",
    rating: 4.9,
    students: 320,
    image: "/images/course-design.jpg",
    description: "Create beautiful, user-centered digital experiences.",
    highlights: [
      "Design thinking process",
      "User research methods",
      "Wireframing & prototyping",
      "Figma mastery",
      "Design systems",
      "Portfolio development"
    ],
    outcomes: [
      "Design intuitive interfaces",
      "Work as a UI/UX Designer",
      "Create design systems",
      "Lead design projects"
    ]
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    duration: "8 Weeks",
    level: "Beginner",
    price: "₦180,000",
    rating: 4.6,
    students: 210,
    image: "/images/course-marketing.jpg",
    description: "Master online marketing strategies and tools.",
    highlights: [
      "SEO & content marketing",
      "Social media marketing",
      "Google Ads & PPC",
      "Email marketing",
      "Analytics & reporting",
      "Marketing automation"
    ],
    outcomes: [
      "Create marketing campaigns",
      "Drive online growth",
      "Work as a Digital Marketer",
      "Build personal brand"
    ]
  }
]

const stats = [
  { number: "500+", label: "Graduates", icon: GraduationCap },
  { number: "98%", label: "Job Placement", icon: Briefcase },
  { number: "50+", label: "Hiring Partners", icon: Users },
  { number: "4.8/5", label: "Student Rating", icon: Star }
]

const benefits = [
  {
    icon: Laptop,
    title: "Hands-on Learning",
    description: "Work on real projects from day one. Our curriculum is 80% practical, 20% theory."
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience."
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Get resume reviews, interview prep, and direct connections to hiring partners."
  },
  {
    icon: Globe,
    title: "Flexible Learning",
    description: "Choose between in-person, hybrid, or fully online learning options."
  },
  {
    icon: Award,
    title: "Recognized Certificate",
    description: "Earn a certificate that is recognized by employers across Africa and globally."
  },
  {
    icon: BookOpen,
    title: "Lifetime Access",
    description: "Get lifetime access to course materials, updates, and alumni community."
  }
]

const faqs = [
  {
    question: "Do I need prior experience to join?",
    answer: "Most of our courses are designed for beginners with no prior experience. We start from the fundamentals and progressively build your skills. Some advanced courses may have prerequisites."
  },
  {
    question: "What is the class schedule like?",
    answer: "We offer flexible schedules including weekday (Mon-Fri 10am-2pm), weekend (Sat-Sun 10am-4pm), and evening (Mon-Fri 6pm-9pm) options. Online students can learn at their own pace with weekly live sessions."
  },
  {
    question: "Is there a payment plan available?",
    answer: "Yes! We offer flexible payment plans. You can pay 50% upfront and the remaining 50% over 2-3 months. We also have scholarships available for exceptional candidates."
  },
  {
    question: "What happens after I complete the course?",
    answer: "Upon completion, you will receive a certificate, portfolio of projects, and access to our career services including job placement assistance, resume reviews, and interview preparation."
  },
  {
    question: "Can I get a refund if the course is not right for me?",
    answer: "We offer a 7-day money-back guarantee. If you are not satisfied within the first week, we will provide a full refund, no questions asked."
  }
]

export default function AcademyPage() {
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
              Viek Tech Academy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Launch Your Tech Career{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                With Industry-Ready Skills
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of successful graduates who transformed their careers through our 
              comprehensive, hands-on tech training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#courses">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                <Play className="mr-2 h-5 w-5" /> Watch Video
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Viek Tech Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We do not just teach tech - we prepare you for a successful career.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Ready Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of comprehensive programs designed with industry input.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <course.icon className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-500">{course.students} students</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Next Cohort
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                      <Link href={`/academy/${course.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
              Your Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Beginner to Professional
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Our structured learning path takes you from zero to job-ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Enroll", desc: "Choose your course and start your journey" },
              { step: "2", title: "Learn", desc: "Master skills through hands-on projects" },
              { step: "3", title: "Build", desc: "Create a portfolio of real projects" },
              { step: "4", title: "Launch", desc: "Get hired or start your own venture" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-blue-200">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-blue-500/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-50 border-0">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
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
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our next cohort and transform your career. Limited seats available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                  Apply Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Request Info
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
