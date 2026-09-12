"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Star,
  Users,
  ArrowRight,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import { courseList, type CourseListType } from "@/lib/course-list";
import { useState, useMemo } from "react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = {
  duration: 0.6,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const levels = ["All", "Beginner", "Beginner to Advanced", "Intermediate"];

const categories = [
  "All",
  "Development",
  "Design",
  "Data & AI",
  "Security",
  "Cloud & DevOps",
  "Business & Marketing",
  "Operations",
];

const getCategory = (course: CourseListType): string => {
  const name = course.name.toLowerCase();
  if (name.includes("software") || name.includes("cloud")) return "Development";
  if (name.includes("product design") || name.includes("graphic"))
    return "Design";
  if (name.includes("data") || name.includes("ai")) return "Data & AI";
  if (name.includes("cyber")) return "Security";
  if (name.includes("cloud")) return "Cloud & DevOps";
  if (
    name.includes("marketing") ||
    name.includes("project") ||
    name.includes("operations") ||
    name.includes("virtual")
  )
    return "Business & Marketing";
  if (name.includes("viek core")) return "Business & Marketing";
  return "Development";
};

export default function AllCoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const filteredCourses = useMemo(() => {
    return courseList.filter((course) => {
      const levelMatch =
        selectedLevel === "All" || course.level === selectedLevel;
      const categoryMatch =
        selectedCategory === "All" || getCategory(course) === selectedCategory;
      return levelMatch && categoryMatch;
    });
  }, [selectedLevel, selectedCategory]);

  const activeFilters =
    (selectedLevel !== "All" ? 1 : 0) + (selectedCategory !== "All" ? 1 : 0);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-linear-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="bg-primary text-primary-foreground inline-block px-4 py-2 rounded-full text-sm font-medium mb-6">
              All Courses
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground mb-4">
              Explore Our Complete{" "}
              <span className="text-primary">Course Catalog</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {courseList.length} expert-led programs designed to help you
              master in-demand tech skills and advance your career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Course Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="w-full sm:w-auto">
                <p className="text-sm font-medium text-foreground mb-3">
                  {filteredCourses.length} of {courseList.length} courses
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {/* Level Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowLevelDropdown(!showLevelDropdown);
                      setShowCategoryDropdown(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel !== "All"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-expanded={showLevelDropdown}
                    aria-haspopup="listbox"
                  >
                    <Filter className="h-4 w-4" />
                    <span>{selectedLevel}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showLevelDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showLevelDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                      role="listbox"
                    >
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => {
                            setSelectedLevel(level);
                            setShowLevelDropdown(false);
                          }}
                          role="option"
                          aria-selected={selectedLevel === level}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            selectedLevel === level
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowCategoryDropdown(!showCategoryDropdown);
                      setShowLevelDropdown(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory !== "All"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-expanded={showCategoryDropdown}
                    aria-haspopup="listbox"
                  >
                    <Filter className="h-4 w-4" />
                    <span>{selectedCategory}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showCategoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                      role="listbox"
                    >
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                          }}
                          role="option"
                          aria-selected={selectedCategory === category}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Clear Filters */}
                {activeFilters > 0 && (
                  <button
                    onClick={() => {
                      setSelectedLevel("All");
                      setSelectedCategory("All");
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Course Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCourses.map((course) => (
              <motion.article
                key={course.slug}
                variants={itemVariants}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <Link
                  href={`/academy/${course.slug}`}
                  className="block relative aspect-video overflow-hidden bg-gray-100"
                  aria-label={`View ${course.name} course details`}
                >
                  <Image
                    src={course.image}
                    alt={`${course.name} course`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 bg-white/90 text-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  {/* Level Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {course.level}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      {getCategory(course)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors capitalize">
                    {course.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        ₦{course.foundingCohortFee.toLocaleString()}
                      </span>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="px-4 py-2 text-sm font-medium"
                    >
                      <Link href={`/academy/${course.slug}`}>
                        Enroll Now
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}

            {filteredCourses.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more courses.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Still not sure where to start?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Take our quick assessment to find the perfect learning path for
              your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link href="/academy/viek-core">Start with Viek Core</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 border-primary text-primary hover:bg-primary/5"
              >
                <Link href="/contact">Contact Advisory</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
