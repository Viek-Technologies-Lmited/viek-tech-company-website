"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Clock, 
  Users, 
  Award, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Star,
  BookOpen,
  Play,
  Download,
  MessageCircle,
  Globe,
  Laptop,
  Code,
  Smartphone,
  Database,
  Shield,
  Palette,
  TrendingUp
} from "lucide-react"

const coursesData: Record<string, {
  icon: React.ElementType
  title: string
  duration: string
  level: string
  price: string
  rating: number
  students: number
  image: string
  description: string
  longDescription: string
  highlights: string[]
  outcomes: string[]
  curriculum: { week: string; title: string; topics: string[] }[]
  instructors: { name: string; role: string; image: string; bio: string }[]
  tools: string[]
}> = {
  fullstack: {
    icon: Code,
    title: "Full Stack Web Development",
    duration: "16 Weeks",
    level: "Beginner to Advanced",
    price: "₦350,000",
    rating: 4.9,
    students: 450,
    image: "/images/course-fullstack.jpg",
    description: "Master both frontend and backend development with modern technologies.",
    longDescription: "This comprehensive program takes you from complete beginner to job-ready full stack developer. You will learn to build modern web applications using React for the frontend and Node.js for the backend, with real databases and cloud deployment. By the end, you will have a portfolio of production-quality projects and the skills employers are looking for.",
    highlights: [
      "HTML, CSS, JavaScript fundamentals",
      "React.js & Next.js framework",
      "Node.js & Express backend",
      "Database design with PostgreSQL & MongoDB",
      "API development & integration",
      "Git version control",
      "Deployment & DevOps basics",
      "Testing & debugging"
    ],
    outcomes: [
      "Build complete web applications from scratch",
      "Work as a Full Stack Developer at top companies",
      "Create and monetize your own SaaS products",
      "Contribute to open source projects",
      "Freelance as a web developer",
      "Lead development teams"
    ],
    curriculum: [
      { week: "Week 1-2", title: "Web Fundamentals", topics: ["HTML5 structure & semantics", "CSS3 styling & Flexbox/Grid", "JavaScript basics", "DOM manipulation"] },
      { week: "Week 3-4", title: "Advanced JavaScript", topics: ["ES6+ features", "Async/Await & Promises", "Object-oriented programming", "Functional programming"] },
      { week: "Week 5-7", title: "React.js", topics: ["Components & JSX", "State & Props", "Hooks (useState, useEffect, etc.)", "React Router", "State management"] },
      { week: "Week 8-9", title: "Next.js", topics: ["Server-side rendering", "API routes", "Static generation", "Dynamic routing", "Deployment"] },
      { week: "Week 10-12", title: "Backend Development", topics: ["Node.js fundamentals", "Express.js framework", "RESTful API design", "Authentication & authorization", "Error handling"] },
      { week: "Week 13-14", title: "Databases", topics: ["SQL with PostgreSQL", "NoSQL with MongoDB", "ORM (Prisma)", "Database design", "Query optimization"] },
      { week: "Week 15-16", title: "Capstone & Career", topics: ["Full stack project", "Code review", "Portfolio building", "Interview preparation", "Job search strategies"] }
    ],
    instructors: [
      { name: "David Adeyemi", role: "Lead Instructor", image: "/images/instructor-1.jpg", bio: "10+ years experience building web applications. Former senior developer at Andela." },
      { name: "Chioma Eze", role: "Teaching Assistant", image: "/images/instructor-2.jpg", bio: "Full stack developer and Viek Tech graduate. Passionate about teaching." }
    ],
    tools: ["VS Code", "Git/GitHub", "Chrome DevTools", "Postman", "Figma", "Vercel", "MongoDB Atlas", "PostgreSQL"]
  },
  mobile: {
    icon: Smartphone,
    title: "Mobile App Development",
    duration: "14 Weeks",
    level: "Intermediate",
    price: "₦300,000",
    rating: 4.8,
    students: 280,
    image: "/images/course-mobile.jpg",
    description: "Build native and cross-platform mobile apps for iOS and Android.",
    longDescription: "Learn to create beautiful, high-performance mobile applications that work on both iOS and Android. This course covers React Native and Flutter, giving you flexibility in your career. You will build several real apps and publish them to the app stores.",
    highlights: [
      "React Native fundamentals",
      "Flutter development",
      "Mobile UI/UX principles",
      "State management with Redux",
      "Native device features (camera, GPS, etc.)",
      "Push notifications",
      "App store deployment",
      "Performance optimization"
    ],
    outcomes: [
      "Create cross-platform mobile apps",
      "Work as a Mobile Developer",
      "Launch apps on App Store & Play Store",
      "Build mobile-first businesses",
      "Freelance as a mobile developer"
    ],
    curriculum: [
      { week: "Week 1-2", title: "Mobile Fundamentals", topics: ["Mobile development overview", "React Native setup", "Core components", "Styling in React Native"] },
      { week: "Week 3-5", title: "React Native Deep Dive", topics: ["Navigation", "State management", "Native modules", "Animations"] },
      { week: "Week 6-8", title: "Flutter Development", topics: ["Dart programming", "Flutter widgets", "State management", "Platform channels"] },
      { week: "Week 9-11", title: "Advanced Features", topics: ["Device APIs", "Push notifications", "Offline storage", "Maps & location"] },
      { week: "Week 12-14", title: "Deployment & Career", topics: ["App store guidelines", "CI/CD for mobile", "Analytics", "Portfolio & job prep"] }
    ],
    instructors: [
      { name: "Emmanuel Obi", role: "Lead Instructor", image: "/images/instructor-3.jpg", bio: "Mobile developer with apps used by millions. Former iOS developer at Paystack." }
    ],
    tools: ["VS Code", "Android Studio", "Xcode", "Expo", "Firebase", "Fastlane"]
  },
  "data-science": {
    icon: Database,
    title: "Data Science & Analytics",
    duration: "12 Weeks",
    level: "Intermediate",
    price: "₦280,000",
    rating: 4.7,
    students: 195,
    image: "/images/course-data.jpg",
    description: "Learn to analyze data and build predictive models using Python.",
    longDescription: "Transform raw data into actionable insights. This course covers the entire data science pipeline from data collection to visualization and machine learning. You will work with real datasets and build models that solve actual business problems.",
    highlights: [
      "Python programming",
      "Data analysis with Pandas",
      "Data visualization with Matplotlib/Seaborn",
      "Machine learning basics",
      "Statistical analysis",
      "SQL for data analysis",
      "Real-world projects"
    ],
    outcomes: [
      "Analyze complex datasets",
      "Build predictive models",
      "Work as a Data Analyst or Data Scientist",
      "Make data-driven business decisions"
    ],
    curriculum: [
      { week: "Week 1-2", title: "Python Foundations", topics: ["Python basics", "Data structures", "Functions", "Libraries"] },
      { week: "Week 3-5", title: "Data Analysis", topics: ["Pandas", "NumPy", "Data cleaning", "Exploratory analysis"] },
      { week: "Week 6-8", title: "Visualization & Statistics", topics: ["Matplotlib", "Seaborn", "Statistical methods", "Hypothesis testing"] },
      { week: "Week 9-11", title: "Machine Learning", topics: ["Scikit-learn", "Regression", "Classification", "Model evaluation"] },
      { week: "Week 12", title: "Capstone", topics: ["End-to-end project", "Presentation", "Portfolio building"] }
    ],
    instructors: [
      { name: "Fatima Hassan", role: "Lead Instructor", image: "/images/instructor-4.jpg", bio: "Data scientist with experience at MTN and Sterling Bank. PhD in Statistics." }
    ],
    tools: ["Python", "Jupyter", "Pandas", "Scikit-learn", "Tableau", "SQL"]
  },
  cybersecurity: {
    icon: Shield,
    title: "Cybersecurity Fundamentals",
    duration: "10 Weeks",
    level: "Beginner",
    price: "₦250,000",
    rating: 4.8,
    students: 165,
    image: "/images/course-security.jpg",
    description: "Protect systems and networks from cyber threats.",
    longDescription: "Cybersecurity is one of the fastest-growing fields in tech. This course gives you the foundational skills to identify vulnerabilities, implement security measures, and respond to incidents. Prepare for industry certifications and a rewarding career.",
    highlights: [
      "Network security basics",
      "Ethical hacking fundamentals",
      "Security tools & frameworks",
      "Vulnerability assessment",
      "Incident response",
      "Security certifications prep (CompTIA Security+)"
    ],
    outcomes: [
      "Identify security vulnerabilities",
      "Implement security measures",
      "Work as a Security Analyst",
      "Protect digital assets",
      "Prepare for security certifications"
    ],
    curriculum: [
      { week: "Week 1-2", title: "Security Fundamentals", topics: ["Security concepts", "Threat landscape", "Security policies", "Risk management"] },
      { week: "Week 3-4", title: "Network Security", topics: ["Network protocols", "Firewalls", "VPNs", "IDS/IPS"] },
      { week: "Week 5-7", title: "Offensive Security", topics: ["Reconnaissance", "Vulnerability scanning", "Penetration testing", "Social engineering"] },
      { week: "Week 8-10", title: "Defense & Response", topics: ["Security operations", "Incident response", "Forensics basics", "Certification prep"] }
    ],
    instructors: [
      { name: "Olumide Johnson", role: "Lead Instructor", image: "/images/instructor-5.jpg", bio: "Certified ethical hacker with 8+ years in cybersecurity. Former security consultant at Deloitte." }
    ],
    tools: ["Kali Linux", "Wireshark", "Nmap", "Metasploit", "Burp Suite"]
  },
  "ui-ux": {
    icon: Palette,
    title: "UI/UX Design",
    duration: "10 Weeks",
    level: "Beginner",
    price: "₦220,000",
    rating: 4.9,
    students: 320,
    image: "/images/course-design.jpg",
    description: "Create beautiful, user-centered digital experiences.",
    longDescription: "Great design is the difference between a good product and a great one. Learn the entire design process from user research to high-fidelity prototypes. Master industry-standard tools and build a portfolio that gets you hired.",
    highlights: [
      "Design thinking process",
      "User research methods",
      "Wireframing & prototyping",
      "Figma mastery",
      "Design systems",
      "Usability testing",
      "Portfolio development"
    ],
    outcomes: [
      "Design intuitive interfaces",
      "Work as a UI/UX Designer",
      "Create and maintain design systems",
      "Lead design projects",
      "Freelance as a designer"
    ],
    curriculum: [
      { week: "Week 1-2", title: "Design Foundations", topics: ["Design principles", "Color theory", "Typography", "Layout"] },
      { week: "Week 3-4", title: "User Research", topics: ["User interviews", "Personas", "Journey mapping", "Competitive analysis"] },
      { week: "Week 5-7", title: "Design Execution", topics: ["Wireframing", "Prototyping in Figma", "Interaction design", "Design systems"] },
      { week: "Week 8-10", title: "Testing & Portfolio", topics: ["Usability testing", "Design iteration", "Portfolio building", "Career preparation"] }
    ],
    instructors: [
      { name: "Grace Nnamdi", role: "Lead Instructor", image: "/images/instructor-6.jpg", bio: "Award-winning designer. Former design lead at Flutterwave. Featured in Awwwards." }
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "Principle", "Maze", "Notion"]
  },
  "digital-marketing": {
    icon: TrendingUp,
    title: "Digital Marketing",
    duration: "8 Weeks",
    level: "Beginner",
    price: "₦180,000",
    rating: 4.6,
    students: 210,
    image: "/images/course-marketing.jpg",
    description: "Master online marketing strategies and tools.",
    longDescription: "Learn to drive growth through digital channels. This course covers SEO, social media, paid advertising, and more. You will create real campaigns and learn to measure results. Perfect for entrepreneurs and aspiring marketers.",
    highlights: [
      "SEO & content marketing",
      "Social media marketing",
      "Google Ads & PPC",
      "Email marketing",
      "Analytics & reporting",
      "Marketing automation"
    ],
    outcomes: [
      "Create effective marketing campaigns",
      "Drive online growth for businesses",
      "Work as a Digital Marketer",
      "Build and monetize a personal brand"
    ],
    curriculum: [
      { week: "Week 1-2", title: "Marketing Fundamentals", topics: ["Digital marketing overview", "Marketing strategy", "Customer journey", "Content strategy"] },
      { week: "Week 3-4", title: "SEO & Content", topics: ["Search engine optimization", "Keyword research", "Content creation", "Link building"] },
      { week: "Week 5-6", title: "Paid & Social", topics: ["Google Ads", "Facebook/Instagram ads", "Social media strategy", "Influencer marketing"] },
      { week: "Week 7-8", title: "Analytics & Growth", topics: ["Google Analytics", "A/B testing", "Email marketing", "Growth hacking"] }
    ],
    instructors: [
      { name: "Adaeze Okoro", role: "Lead Instructor", image: "/images/instructor-7.jpg", bio: "Growth marketer who scaled multiple startups. Former Head of Marketing at a leading fintech." }
    ],
    tools: ["Google Analytics", "SEMrush", "Mailchimp", "Hootsuite", "Canva", "Google Ads"]
  }
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = coursesData[courseId]

  if (!course) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you are looking for does not exist.</p>
          <Link href="/academy">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Browse All Courses
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const IconComponent = course.icon

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Link href="/academy" className="text-blue-600 hover:underline">Academy</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{course.title}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {course.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-500">rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">{course.students}</span>
                  <span className="text-gray-500">students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">{course.duration}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Enroll Now - {course.price}
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Download className="mr-2 h-5 w-5" /> Download Syllabus
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {course.highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((module, index) => (
                <Card key={index} className="bg-white border border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-32">
                        <span className="text-sm font-semibold text-blue-600">{module.week}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tools You Will Master</h2>
            <div className="flex flex-wrap gap-4">
              {course.tools.map((tool, index) => (
                <div key={index} className="px-6 py-3 bg-gray-100 rounded-lg font-medium text-gray-700">
                  {tool}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Instructors</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {course.instructors.map((instructor, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6 flex gap-6">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{instructor.role}</p>
                      <p className="text-gray-600 text-sm">{instructor.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Career Outcomes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                  <Award className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0 overflow-hidden">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our next cohort and transform your career. Limited seats available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                  Enroll Now - {course.price}
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                    <MessageCircle className="mr-2 h-5 w-5" /> Ask a Question
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
