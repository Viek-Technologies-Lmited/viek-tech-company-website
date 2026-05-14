"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Play,
  MessageCircle,
  Code,
  Smartphone,
  Database,
  Shield,
  Palette,
  TrendingUp,
  Crown,
  X,
  Volume2,
  Sparkles,
} from "lucide-react";

const coursesData: Record<
  string,
  {
    icon: React.ElementType;
    title: string;
    duration: string;
    level: string;
    price: string;
    rating: number;
    students: number;
    image: string;
    previewVideo: string;
    adVideo: string;
    adHeadline: string;
    adText: string;
    adBenefits: string[];
    description: string;
    longDescription: string;
    highlights: string[];
    outcomes: string[];
    curriculum: { week: string; title: string; topics: string[] }[];
    tools: string[];
  }
> = {
  fullstack: {
    icon: Code,
    title: "Full Stack Web Development",
    duration: "16 Weeks",
    level: "Beginner to Advanced",
    price: "₦350,000",
    rating: 4.9,
    students: 450,
    image: "/images/web-development.jpeg",
    // 10s clip showing code/web
    previewVideo: "https://www.w3schools.com/nhtml/mov_bbb.mp4",
    adVideo:
      "https://res.cloudinary.com/dms99719p/vmideo/upload/v1691146114/samples/elephants.mp4",
    adHeadline: "Become a Professional Full Stack Developer",
    adText: "SUBSCRIBE TO CONTINUE.",
    adBenefits: [
      "React & Next.js",
      "Backend APIs",
      "Database Systems",
      "Real Client Projects",
    ],
    description: "Master frontend and backend development.",
    longDescription:
      "This course takes you from beginner to advanced full stack engineer with practical projects and deployment experience.",
    highlights: [
      "HTML, CSS & JavaScript",
      "React.js & Next.js",
      "Node.js & APIs",
      "MongoDB & PostgreSQL",
    ],
    outcomes: [
      "Become a Full Stack Developer",
      "Build SaaS products",
      "Freelance professionally",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "Frontend Foundations",
        topics: ["HTML", "CSS", "JavaScript"],
      },
    ],
    tools: ["VS Code", "GitHub", "Postman"],
  },

  mobile: {
    icon: Smartphone,
    title: "Mobile App Development",
    duration: "14 Weeks",
    level: "Intermediate",
    price: "₦300,000",
    rating: 4.8,
    students: 280,
    image: "/images/app-development.jpeg",
    previewVideo: "https://www.w3schools.com/ mhtml/movie.mp4",
    adVideo: "https://www.w3schools.com/html/mmov_bbb.mp4",
    adHeadline: "Build Powerful Mobile Apps",
    adText: "SUBSCRIBE TO CONTINUE.",
    adBenefits: [
      "Android & iOS",
      "React Native",
      "Flutter",
      "Play Store Publishing",
    ],
    description: "Build modern mobile applications.",
    longDescription:
      "Master cross-platform mobile app development and publish apps professionally.",
    highlights: [
      "React Native",
      "Flutter",
      "Push Notifications",
      "Mobile UI/UX",
    ],
    outcomes: ["Become a Mobile Developer", "Launch mobile startups"],
    curriculum: [
      {
        week: "Week 1",
        title: "Mobile Basics",
        topics: ["Setup", "Components"],
      },
    ],
    tools: ["Expo", "Android Studio"],
  },

  "data-science": {
    icon: Database,
    title: "Data Science & Analytics",
    duration: "12 Weeks",
    level: "Intermediate",
    price: "₦280,000",
    rating: 4.7,
    students: 195,
    image: "/images/data-analysis.jpeg",
    previewVideo: "https://www.w3schools.com/mhtml/mov_bbb.mp4",
    adVideo:
      "https://res.cloudinary.com/dms99719p/vimdeo/upload/v1691146114/samples/elephants.mp4",
    adHeadline: "Master Data Science & AI",
    adText: "SUBSCRIBE TO CONTINUE.",
    adBenefits: [
      "Python Programming",
      "Machine Learning",
      "Analytics Dashboards",
      "Real Data Projects",
    ],
    description: "Analyze data and build ML models.",
    longDescription:
      "Learn Python, analytics, AI and machine learning using real-world datasets.",
    highlights: ["Python", "Pandas", "Machine Learning", "Visualization"],
    outcomes: ["Become a Data Scientist", "Analyze business data"],
    curriculum: [
      {
        week: "Week 1",
        title: "Python Basics",
        topics: ["Variables", "Functions"],
      },
    ],
    tools: ["Python", "Pandas"],
  },

  cybersecurity: {
    icon: Shield,
    title: "Cybersecurity Fundamentals",
    duration: "10 Weeks",
    level: "Beginner",
    price: "₦250,000",
    rating: 4.8,
    students: 165,
    image: "/images/cybersecurity.jpeg",
    previewVideo: "https://www.w3schools.comm/html/movie.mp4",
    adVideo: "https://www.w3schools.com/html/ mmov_bbb.mp4",
    adHeadline: "Protect Systems From Cyber Threats",
    adText: "SUBSCRIBE TO CONTINUE.",
    adBenefits: [
      "Ethical Hacking",
      "Network Security",
      "Security Testing",
      "Cyber Defense",
    ],
    description: "Protect systems from cyber attacks.",
    longDescription:
      "Learn practical cybersecurity skills and ethical hacking fundamentals.",
    highlights: ["Ethical Hacking", "Security Tools", "Network Defense"],
    outcomes: ["Become a Security Analyst", "Protect organizations"],
    curriculum: [
      {
        week: "Week 1",
        title: "Security Intro",
        topics: ["Threats", "Networks"],
      },
    ],
    tools: ["Kali Linux", "Wireshark"],
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
    previewVideo: "https://www.w3schoolsm.com/html/mov_bbb.mp4",
    adVideo: "https://www.w3schools.com/mhtml/movie.mp4",
    adHeadline: "Design Stunning User Experiences",
    adText:
      "Master modern UI/UX design using Figma, prototyping and real-world design systems.",
    adBenefits: [
      "Figma Mastery",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
    description: "Design modern interfaces.",
    longDescription:
      "Learn UI/UX design from beginner to professional level with practical projects.",
    highlights: ["Figma", "Wireframing", "Typography", "Prototyping"],
    outcomes: ["Become a UI/UX Designer", "Build portfolios"],
    curriculum: [
      {
        week: "Week 1",
        title: "Design Basics",
        topics: ["Colors", "Typography"],
      },
    ],
    tools: ["Figma", "Adobe XD"],
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
    previewVideo: "https://www.w3schoolsm.com/html/movie.mp4",
    adVideo: "https://www.w3schools.com/hmtml/mov_bbb.mp4",
    adHeadline: "Grow Brands With Digital Marketing",
    adText:
      "Learn SEO, paid ads, analytics and social media growth strategies used by top businesses.",
    adBenefits: ["SEO", "Google Ads", "Social Media Growth", "Analytics"],
    description: "Master digital marketing.",
    longDescription:
      "Learn modern digital marketing strategies and tools for business growth.",
    highlights: ["SEO", "Social Media Marketing", "Google Ads", "Analytics"],
    outcomes: ["Become a Digital Marketer", "Run ad campaigns"],
    curriculum: [
      { week: "Week 1", title: "Marketing Intro", topics: ["SEO", "Ads"] },
    ],
    tools: ["Google Analytics"],
  },
};

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.courseId as string;
  const course = coursesData[courseId];

  const adVideoRef = useRef<HTMLVideoElement>(null);
  const courseVideoRef = useRef<HTMLVideoElement>(null);

  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlayingAd, setIsPlayingAd] = useState(true);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);

  const IconComponent = useMemo(() => course?.icon, [course]);

  if (!course) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h1>
          <Link href="/academy">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Browse Courses
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const openPlayer = () => {
    setShowPlayer(true);
    setIsPlayingAd(true);
    setShowSubscribePopup(false);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setIsPlayingAd(true);
    setShowSubscribePopup(false);
  };

  const handleAdFinished = () => {
    setIsPlayingAd(false);
    setTimeout(() => {
      courseVideoRef.current?.play();
    }, 300);
  };

  const handleCourseFinished = () => {
    setShowSubscribePopup(true);
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-black rounded-[32px] overflow-hidden shadow-2xl"
            >
              <button
                onClick={closePlayer}
                className="absolute top-5 right-5 z-50 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition"
              >
                <X className="h-5 w-5" />
              </button>

              {isPlayingAd ? (
                <div className="relative">
                  <video
                    ref={adVideoRef}
                    autoPlay
                    playsInline
                    onEnded={handleAdFinished}
                    className="w-full h-[75vh] object-cover"
                  >
                    <source src={course.adVideo} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                    <div className="absolute top-5 left-5 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                      <Volume2 className="h-4 w-4" /> Sponsored Ad
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                      <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-sm text-white mb-5">
                          <Sparkles className="h-4 w-4" /> {course.title}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
                          {course.adHeadline}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                          {course.adText}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {course.adBenefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="bg-white/15 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium"
                            >
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <video
                    ref={courseVideoRef}
                    controls
                    autoPlay
                    playsInline
                    onEnded={handleCourseFinished}
                    className="w-full h-[75vh] object-cover"
                  >
                    <source src={course.previewVideo} type="video/mp4" />
                  </video>
                  <div className="absolute top-5 left-5 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl">
                    Free 10 Seconds Preview
                  </div>
                </div>
              )}

              <AnimatePresence>
                {showSubscribePopup && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-white rounded-[32px] max-w-xl w-full p-8 md:p-10 text-center shadow-2xl"
                    >
                      <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
                        <Crown className="h-12 w-12 text-blue-600" />
                      </div>
                      <h2 className="text-4xl font-black text-gray-900 mb-4">
                        Subscribe To Unlock Full Materials
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Get access to full course videos, downloadable
                        resources, assignments, premium mentorship,
                        certifications and career support.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => router.push("/contact")}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-2xl text-lg"
                        >
                          Subscribe Now
                        </Button>
                        <Button
                          variant="outline"
                          onClick={closePlayer}
                          className="rounded-2xl py-6 text-lg"
                        >
                          Close
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-5 text-sm">
                <Link href="/academy" className="text-blue-600 hover:underline">
                  Academy
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{course.title}</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <IconComponent className="h-7 w-7 text-blue-600" />
                </div>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {course.longDescription}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <div>
                    <p className="font-bold text-gray-900">{course.rating}</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">{course.students}</p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">{course.duration}</p>
                    <p className="text-sm text-gray-500">Duration</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg shadow-xl"
                >
                  Enroll Now - {course.price}
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-7 rounded-2xl text-lg"
                  >
                    <Crown className="mr-2 h-5 w-5" /> Subscribe Premium
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl group">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={900}
                  height={600}
                  className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <button onClick={openPlayer} className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                    <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
                      <Play className="h-10 w-10 text-blue-600 ml-1" />
                    </div>
                  </button>
                  <h3 className="text-white text-3xl font-bold mt-6">
                    Watch Course Preview
                  </h3>
                  <p className="text-gray-200 mt-2 text-lg">
                    Course ad first • 10s free preview
                  </p>
                </div>
                <div className="absolute top-5 right-5 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl">
                  FREE PREVIEW
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
