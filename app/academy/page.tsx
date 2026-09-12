"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MoveRight,
  UserLock,
  Cog,
  Forklift,
  UsersRound,
  CircleUserRound,
  UserStar,
  Target,
  StarIcon,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  BookUser,
  MonitorPlay,
  Ribbon,
  Check,
  DivideCircle,
} from "lucide-react";
import landingMain from "@/public/images/heroLanding.png";
import LearningPathsSlider from "@/components/ui/course-slider";
import { courseList } from "@/lib/course-list";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = {
  duration: 0.6,
};

const testimonialVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const testimonialTransition = {
  duration: 0.4,
};

// const courses = [
//   {
//     id: "course-UI/UX Design",
//     title: "UI/UX Design",
//     image: "/images/uiux.png",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦150,000",
//   },
//   {
//     id: "course-cyber-security",
//     title: "Cyber Security",
//     image: "/images/cybersecurity.jpeg",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦400,000",
//   },
//   {
//     id: "course-web-development",
//     title: "Web Development",
//     image: "/images/full-stack-development.png",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦350,000",
//   },
//   {
//     id: "course-cloud-engineering",
//     title: "Cloud Engineering",
//     image: "/images/web-development.jpeg",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦500,000",
//   },
//   {
//     id: "course-data-engineering",
//     title: "Data Engineering",
//     image: "/images/data-analysis.jpeg",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦300,000",
//   },
//   {
//     id: "course-virtual-assistant",
//     title: "Virtual Assistant",
//     image: "/images/web-development.jpeg",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦80,000",
//   },
//   {
//     id: "course-project-management",
//     title: "Project Management",
//     image: "/images/web-development.jpeg",
//     level: "Beginner to Advanced",
//     rating: "4.9",
//     reviews: "450+",
//     price: "₦100,000",
//   },
// ];

const courses = courseList;
const testimonySlides = [
  {
    id: "emeka-d",
    name: "Emeka Daniel",
    role: "Web Developer",
    description:
      "Viek Technologies transformed my career. The practical approach and mentors were amazing!",
  },
  {
    id: "aisha-b",
    name: "Aisha Bello",
    role: "UI/UX Designer",
    description:
      "The best learning experience! The projects and live classes helped me build real confidence.",
  },
  {
    id: "daniel-o",
    name: "Daniel Okoro",
    role: "Data Analyst",
    description:
      "I loved the flexibility of learning online while equally enjoying the in-person sessions.",
  },
];

export default function AcademyPage() {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () =>
    setSlideIndex((current) =>
      current === 0 ? testimonySlides.length - 1 : current - 1,
    );

  const nextSlide = () =>
    setSlideIndex((current) =>
      current === testimonySlides.length - 1 ? 0 : current + 1,
    );

  const activeSlide = testimonySlides[slideIndex];

  const scrollToCourses = () => {
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className=" bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20  bg-linear-to-br from-[#F3F4F6] to-indigo-50">
        <div className="container mx-auto px-4 relative z-10 ">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition}
            className="lg:grid grid-cols-2"
          >
            <div className="">
              {" "}
              <span className="bg-primary text-primary-foreground inline-block px-4 py-2 rounded-full text-sm font-medium mb-6">
                Welcome to Viek Technolgies Academy
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground">
                  Learn. Build. Succeed with{" "}
                  <span className="text-primary">Confidence.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Your all-in-one learning platform to master tech skills
                  through expert-led courses, hands-on-projects, and industry
                  recognized certifications
                </p>
              </div>
              <div className="hidden my-6 md:flex gap-x-3">
                <div className="flex items-center border border-primary rounded-4xl p-2">
                  <div className="bg-primary rounded-full p-1">
                    <UserLock className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 text-sm">Expert Instructors</span>
                </div>

                <div className="flex items-center border border-primary rounded-4xl p-2">
                  <div className="bg-primary rounded-full p-1">
                    <Cog className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 text-sm">Hands-On-Projects</span>
                </div>

                <div className="flex items-center border border-primary rounded-4xl p-2">
                  <div className="bg-primary rounded-full p-1">
                    <Forklift className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 text-sm">Industry Recognized</span>
                </div>
              </div>
              {/* Buttons - Added asChild and Pointer-Events check */}
              <div className="flex flex-wrap gap-4 items-center relative z-30">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm transition-all duration-300 group cursor-pointer"
                  onClick={scrollToCourses}
                >
                  <div>
                    Start Learning Now
                    <MoveRight className="ml-2  group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm border border-primary text-primary hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer bg-transparent"
                  onClick={scrollToCourses}
                >
                  <div>
                    Explore Courses
                    <MoveRight className="ml-2  group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </div>
              <div className="flex items-center gap-x-2 my-6">
                <div className="flex gap-x-0.5">
                  <div className="w-4 h-4 bg-primary rounded-full" />
                  <div className="w-4 h-4 bg-[#0D1448] rounded-full" />
                  <div className="w-4 h-4 bg-[#85A6D6] rounded-full" />
                </div>
                <span>Virtual Classes Available</span>
              </div>
            </div>

            <div className="">
              {" "}
              <Image
                src={landingMain}
                alt="Hero Image"
                className=" object-contain w-full h-full"
              />
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block mx-auto w-full absolute -bottom-15">
          <div className="container mx-auto relative w-full rounded-xl bg-linear-to-l from-[#D7E9FD] to-[#D7E9FD] flex items-center xl:gap-x-32 px-8 py-6">
            <div
              className="absolute left-[15%] top-1/2 h-12 w-[70%] -translate-y-1/2
           bg-linear-to-r from-transparent via-white/10 to-transparent"
            />
            <div className="flex gap-x-4">
              <div className="flex gap-x-2">
                <div className="inline-flex items-center justify-center w-11 h-11 bg-[#D4E3F6] rounded-full">
                  <UsersRound className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <span className="text-gray-600 text-xs">
                    Students Enrolled
                  </span>
                </div>
              </div>

              <div className="flex gap-x-2">
                <div className="inline-flex items-center justify-center w-11 h-11 bg-[#D4E3F6] rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">200+</div>
                  <span className="text-gray-600 text-xs">Courses</span>
                </div>
              </div>

              <div className="flex gap-x-2">
                <div className="inline-flex items-center justify-center w-11 h-11 bg-[#D4E3F6] rounded-full">
                  <CircleUserRound className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <span className="text-gray-600 text-xs">
                    Expert Instructors
                  </span>
                </div>
              </div>

              <div className="flex gap-x-2">
                <div className="inline-flex items-center justify-center w-11 h-11 bg-[#D4E3F6] rounded-full">
                  <UserStar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <span className="text-gray-600 text-xs">Success Rate</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-primary">
                Trusted by learners & partners worldwide
              </p>
              <div className=" flex gap-x-8 my-3">
                <Image
                  src="/images/Google_Logo.png"
                  alt="Google"
                  width={80}
                  height={50}
                  className="object-contain"
                />
                <Image
                  src="/images/Microsoft_Logo.png"
                  alt="Google"
                  width={80}
                  height={50}
                  className="object-contain"
                />
                <Image
                  src="/images/Aws_Logo.png"
                  alt="Google"
                  width={30}
                  height={30}
                  className="object-contain"
                />
                <Image
                  src="/images/Github_Logo.png"
                  alt="Google"
                  width={30}
                  height={30}
                  className="object-contain"
                />
                <Image
                  src="/images/Hp_Logo.png"
                  alt="Google"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative mt-20 py-20 bg-linear-to-br from-[#F3F4F6]  to-indigo-50 "
        id="courses"
      >
        <div className="container mx-auto px-4 relative z-10 ">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition}
          >
            <div className="md:flex gap-x-6">
              <div className="w-3xs">
                <p className="text-primary text-sm font-bold flex gap-x-2 items-center">
                  <Target className="h-4 w-4" />
                  <span>EXPLORE.</span>
                  <span>LEARN.</span>
                  <span>EXCEL.</span>
                </p>
                <h4 className=" font-semibold text-2xl my-3">
                  Top Learning Paths For Every Goal
                </h4>
                <p className="text-xs">
                  Every course is crafted to help you gain real skills and
                  achieve real results.
                </p>
                <Button
                  asChild
                  size="lg"
                  className=" px-8 text-sm transition-all duration-300 group cursor-pointer my-6"
                >
                  <div>
                    View all Courses
                    <MoveRight className="ml-2  group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </div>

              <div className="flex-1 min-w-0">
                <LearningPathsSlider courses={courseList} />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center my-8 py-10">
              <span className="inline-block font-medium text-sm mb-2">
                HOW IT WORKS
              </span>
              <h5 className="font-semibold">
                Your Learning Journey in 4 Simple Steps
              </h5>

              <div className="md:flex items-center gap-x-4 mt-6 space-y-8 md:space-y-0">
                <div className="flex items-center gap-x-3">
                  <div className=" bg-white rounded-full p-4">
                    <UserPlus className="h-10 w-10 text-primary flex items-center justify-center" />
                  </div>
                  <div>
                    <span className="font-bold">1</span>
                    <h6 className="font-bold text-sm">Sign Up</h6>
                    <span className="text-xs">
                      Create your account in minutes
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-x-3">
                  <div className=" bg-white rounded-full p-4">
                    <BookUser className="h-10 w-10 text-primary flex items-center justify-center" />
                  </div>
                  <div>
                    <span className="font-bold">2</span>
                    <h6 className="font-bold text-sm">Choose a Course</h6>
                    <span className="text-xs">
                      Pick a course that matches your goals.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-x-3">
                  <div className=" bg-white rounded-full p-4">
                    <MonitorPlay className="h-10 w-10 text-primary flex items-center justify-center" />
                  </div>
                  <div>
                    <span className="font-bold">3</span>
                    <h6 className="font-bold text-sm">Learn & Practice</h6>
                    <span className="text-xs">
                      Learn with videos, Live classes, & projects.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-x-3">
                  <div className=" bg-white rounded-full p-4">
                    <Ribbon className="h-10 w-10 text-primary flex items-center justify-center" />
                  </div>
                  <div>
                    <span className="font-bold">4</span>
                    <h6 className="font-bold text-sm">Get Certified</h6>
                    <span className="text-xs">
                      Earn a certificate and boost your career.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className=" mx-auto w-full ">
          <div className="container mx-auto relative w-full lg:flex justify-center items-center gap-x-4 px-4 lg:px-8 py-6 space-y-6 lg:space-y-0">
            <div className="w-75">
              <span className="text-primary text-[10px] font-semibold">
                FLEXIBLE LEARNING
              </span>{" "}
              <h5 className="font-bold my-2">Your Way, Your Pace</h5>
              <p className="text-[10px] my-1">
                Learn from anywhere in the world with our interactive online
                classes or join us in person at our modern training centers.
              </p>
            </div>
            <div className=" w-full rounded-2xl bg-[url('/images/E-learn.jpeg')] bg-cover bg-center text-white p-4 md:min-w-100">
              <div>
                <h5 className=" font-bold">Virtual Interactive Sessions</h5>
                <div>
                  <ul>
                    <li className=" text-sm font-medium">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Live Instructor-Led Classes
                    </li>
                    <li className=" text-sm font-medium my-1">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Real-Time Q&A & Support
                    </li>
                    <li className=" text-sm font-medium my-1">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Access to Global Cohorts
                    </li>
                    <li className=" text-sm font-medium">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Full Project Portfolio Building
                    </li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className=" px-4 text-sm transition-all duration-300 group cursor-pointer my-2"
                    onClick={scrollToCourses}
                  >
                    <div>Learn Online</div>
                  </Button>
                </div>
              </div>
            </div>

            <div className=" w-full rounded-2xl bg-[url('/images/Physical_Class.jpeg')] bg-cover bg-center text-black p-4 md:min-w-100">
              <div className=" text-[#0fb3ff]">
                <h5 className=" font-bold">Self-Paced Tech Tracks</h5>
                <div>
                  <ul>
                    <li className=" text-sm font-medium my-1">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Comprehensive Video Library
                    </li>
                    <li className=" text-sm font-medium my-1">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Structured Learning Modules
                    </li>
                    <li className=" text-sm font-medium">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Hands-On Projects & Assignments
                    </li>
                    <li className=" text-sm font-medium">
                      {" "}
                      <Check className="h-3 w-3 text-green-500 inline-block mr-1" />
                      Dedicated Mentorship Support
                    </li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className=" px-4 text-sm transition-all duration-300 group cursor-pointer my-2"
                    onClick={scrollToCourses}
                  >
                    <div>Learn Online</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-5 py-20 bg-linear-to-br from-[#F3F4F6]  to-indigo-50 ">
        <div className="container mx-auto px-4 relative z-10 ">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition}
          >
            <div className="flex flex-col justify-center items-center">
              <span className="inline-block font-medium text-sm text-primary mb-2 uppercase">
                The Viek Impact
              </span>
              <h5 className="font-semibold">
                Real stories of professional transformation
              </h5>
            </div>
          </motion.div>
        </div>

        <div className=" mx-auto w-full ">
          <div className="container mx-auto relative w-full px-4 lg:px-8 py-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600"></div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:bg-slate-100"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:bg-slate-100"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-100 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="text-primary text-[10px] font-semibold">
                    FLEXIBLE LEARNING
                  </span>
                  <h5 className="font-bold my-2">Join Our Alumni</h5>
                  <p className="text-[10px] my-1">
                    See how students are transforming their careers through our
                    programs. Join a global community of learners who are
                    turning passion into profession.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    variants={testimonialVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={testimonialTransition}
                    className="relative w-full overflow-hidden rounded-2xl bg-[#DDECFD] p-4 shadow-lg flex  gap-x-4"
                  >
                    <div className=" flex flex-col justify-between gap-3">
                      <div className="bg-primary rounded-full flex items-center justify-center">
                        <CircleUserRound className="h-30 w-30 text-white" />
                      </div>
                      <div className="flex items-center gap-x-1 justify-center">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>

                    <div className=" space-y-3">
                      <h5 className={`font-bold text-sm`}>
                        {activeSlide.name}
                      </h5>
                      <h6 className={` text-sm `}>{activeSlide.role}</h6>
                      <div className="">
                        <p className="text-xs">{activeSlide.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-2">
                {testimonySlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to ${slide.name} slide`}
                    onClick={() => setSlideIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      index === slideIndex ? "bg-primary" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-5 py-20 bg-linear-to-br from-[#F3F4F6] to-indigo-50 ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className=" w-full rounded-2xl bg-[url('/images/e-learning.jpeg')] bg-cover bg-center text-white p-4 md:min-w-100 mt-10 md:flex justify-center items-center gap-x-6 py-8 space-y-6 md:space-y-0">
            <div>
              <h5 className="text-xl font-bold">
                Ready to Start Your <br />
                Tech Journey?
              </h5>
              <p className="text-sm mt-2">
                Join thousands of learners building their future with Viek
                Technologies Ltd.
              </p>
            </div>
            <div className=" flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className=" px-4 text-sm transition-all duration-300 group cursor-pointer"
              >
                <div onClick={scrollToCourses}>Start Learning Now</div>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className=" px-4 text-sm border border-white text-white cursor-pointer bg-transparent"
              >
                <div onClick={scrollToCourses}>
                  Join Our Academy
                  <MoveRight className="ml-2  group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
