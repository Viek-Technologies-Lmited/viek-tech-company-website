"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckoutModal } from "@/components/checkout-modal";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  Code,
  Database,
  Shield,
  Palette,
  TrendingUp,
  Cloud,
  LayoutDashboard,
  BookUser,
  Sparkles,
} from "lucide-react";
import { courseList } from "@/lib/course-list";

const iconMap: Record<string, React.ElementType> = {
  "viek-core": BookUser,
  "ai-automation": Sparkles,
  "data-analytics": Database,
  cybersecurity: Shield,
  "software-development": Code,
  "cloud-engineering": Cloud,
  "product-design": Palette,
  "digital-marketing": TrendingUp,
  "project-management": LayoutDashboard,
  "digital-operations": Clock,
  "virtual-assistant": Users,
  "graphic-design-content": Award,
};

export default function CoursePage() {
  const params = useParams();

  const courseId = params.courseId as string;
  const course = courseList.find((c) => c.slug === courseId);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const IconComponent = useMemo(
    () => (course ? (iconMap[course.slug] ?? BookUser) : BookUser),
    [course],
  );

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

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

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-linear-to-br from-blue-50 via-white to-indigo-50">
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
                <span className="text-gray-600">{course.name}</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <IconComponent className="h-7 w-7 text-blue-600" />
                </div>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6 capitalize">
                {course.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {course.description}
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
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">{course.duration}</p>
                    <p className="text-sm text-gray-500">Duration</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">
                      {formatPrice(course.standardFee)}
                    </p>
                    <p className="text-sm text-gray-500">Standard Price</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg shadow-xl"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Enroll Now - {formatPrice(course.standardFee)}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative rounded-4xl overflow-hidden shadow-2xl group">
                <Image
                  src={course.image}
                  alt={course.name}
                  width={900}
                  height={600}
                  className="w-full h-130 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2 capitalize">
                    {course.name}
                  </h3>
                  <p className="text-sm opacity-90 line-clamp-2">
                    {course.practicalOutcome}
                  </p>
                </div>
                <div className="absolute top-5 right-5 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl">
                  ENROLL
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COURSE CONTENT SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left column: curriculum / modules */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What You&apos;ll Learn
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Core Modules
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.coreModules.map((module) => (
                    <li
                      key={module}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Practical Outcome
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {course.practicalOutcome}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Target Learners
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {course.targetLearners.map((learner) => (
                    <li
                      key={learner}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {learner}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column: course sidebar */}
            <div className="space-y-6">
              <Card className="border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Course Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-gray-900 font-medium">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Level</span>
                      <span className="text-gray-900 font-medium">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating</span>
                      <span className="text-gray-900 font-medium">
                        {course.rating} ({course.reviews})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Standard Fee</span>
                      <span className="text-gray-900 font-medium">
                        {formatPrice(course.standardFee)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-7 rounded-2xl text-lg font-semibold shadow-xl"
                onClick={() => setCheckoutOpen(true)}
              >
                Enroll Now
              </Button>
              <CheckoutModal
                courseSlug={course.slug}
                courseName={course.name}
                open={checkoutOpen}
                onOpenChange={setCheckoutOpen}
              >
                <span />
              </CheckoutModal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
