"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ChevronDown,
  GraduationCap,
  Code,
  Smartphone,
  Database,
  Shield,
  BookOpen,
  Users,
  Star,
  MessageSquare,
  Briefcase,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const academyCourses = [
  {
    title: "Full Stack Web Development",
    href: "/academy/fullstack",
    description:
      "Master frontend and backend technologies to build complete web applications.",
    icon: Code,
    duration: "16 Weeks",
    level: "Beginner to Advanced",
  },
  {
    title: "Mobile App Development",
    href: "/academy/mobile",
    description:
      "Build cross-platform mobile apps using React Native and Flutter.",
    icon: Smartphone,
    duration: "12 Weeks",
    level: "Intermediate",
  },
  {
    title: "Data Science & Analytics",
    href: "/academy/data-science",
    description:
      "Learn Python, machine learning, and data visualization techniques.",
    icon: Database,
    duration: "14 Weeks",
    level: "Intermediate",
  },
  {
    title: "Cybersecurity Fundamentals",
    href: "/academy/cybersecurity",
    description:
      "Protect systems and networks from digital threats and attacks.",
    icon: Shield,
    duration: "10 Weeks",
    level: "Beginner",
  },
];

const testimonialLinks = [
  {
    title: "Student Success Stories",
    href: "/testimonials/students",
    description:
      "Hear from graduates who transformed their careers through our academy.",
    icon: GraduationCap,
  },
  {
    title: "Client Reviews",
    href: "/testimonials/clients",
    description:
      "See what businesses say about our software development services.",
    icon: Briefcase,
  },
  {
    title: "Industry Recognition",
    href: "/testimonials/recognition",
    description: "Awards and recognition from the tech industry.",
    icon: Star,
  },
  {
    title: "Video Testimonials",
    href: "/testimonials/videos",
    description: "Watch real stories from our community members.",
    icon: MessageSquare,
  },
];

const servicesLinks = [
  {
    title: "Web Development",
    href: "/services/web-development",
    description:
      "Custom websites and web applications built with modern technologies.",
  },
  {
    title: "Mobile App Development",
    href: "/services/mobile-development",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
  },
  {
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    description:
      "User-centered design solutions that enhance digital experiences.",
  },
  {
    title: "Tech Consulting",
    href: "/services/consulting",
    description: "Strategic technology guidance for digital transformation.",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyles =
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white",
      )}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg shadow-primary/25">
            <Image
              src="/images/logo2.jpeg"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl text-foreground leading-tight">
              Viek<span className="text-primary">Tech</span>
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground">
              Innovating with Purpose
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navLinkStyles}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navLinkStyles}>
                  <Link href="/about">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {servicesLinks.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {service.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services"
                          className="flex w-full select-none items-center justify-center rounded-md bg-primary/10 p-3 text-sm font-medium text-primary no-underline outline-none transition-colors hover:bg-primary/20"
                        >
                          View All Services
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Academy
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    {academyCourses.map((course) => (
                      <li key={course.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={course.href}
                            className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-2 rounded-lg bg-primary/10">
                                <course.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm font-medium leading-none">
                                  {course.title}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {course.description}
                                </p>
                                <div className="flex gap-2 pt-1">
                                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                    {course.duration}
                                  </span>
                                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                    {course.level}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/academy"
                          className="flex w-full select-none items-center justify-center rounded-md bg-primary/10 p-3 text-sm font-medium text-primary no-underline outline-none transition-colors hover:bg-primary/20"
                        >
                          Explore All Courses
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Testimonials
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {testimonialLinks.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-2 rounded-lg bg-primary/10">
                                <item.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/testimonials"
                          className="flex w-full select-none items-center justify-center rounded-md bg-primary/10 p-3 text-sm font-medium text-primary no-underline outline-none transition-colors hover:bg-primary/20"
                        >
                          View All Testimonials
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navLinkStyles}>
                  <Link href="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navLinkStyles}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact">
            <Button size="sm" className="shadow-lg shadow-primary/25">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Menu className="h-6 w-6 text-foreground" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-[400px] p-0 flex flex-col"
          >
            {/* ACCESSIBILITY HEADER */}
            <SheetHeader className="p-6 border-b border-border text-left">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                  <Image
                    src="/images/logo2.jpeg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <SheetTitle className="font-bold text-lg">
                  Viek<span className="text-primary">Tech</span>
                </SheetTitle>
              </div>
              <SheetDescription className="text-xs text-muted-foreground">
                Innovating with Purpose. Navigate through our services, academy,
                and stories.
              </SheetDescription>
            </SheetHeader>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-col gap-1">
                <MobileNavLink
                  href="/"
                  icon={Home}
                  label="Home"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  href="/about"
                  icon={Users}
                  label="About Us"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  href="/blog"
                  icon={BookOpen}
                  label="Blog"
                  onClick={() => setIsOpen(false)}
                />

                {/* SERVICES SECTION */}
                <div className="mt-4 mb-2 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Our Services
                </div>
                <div className="grid gap-1 border-l-2 border-muted ml-4 pl-2">
                  {servicesLinks.map((s) => (
                    <MobileNavLink
                      key={s.title}
                      href={s.href}
                      label={s.title}
                      onClick={() => setIsOpen(false)}
                      isSubLink
                    />
                  ))}
                </div>

                {/* ACADEMY SECTION */}
                <div className="mt-4 mb-2 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Academy Courses
                </div>
                <div className="grid gap-1 border-l-2 border-muted ml-4 pl-2">
                  {academyCourses.map((c) => (
                    <MobileNavLink
                      key={c.title}
                      href={c.href}
                      label={c.title}
                      onClick={() => setIsOpen(false)}
                      isSubLink
                    />
                  ))}
                </div>

                {/* NEW: TESTIMONIALS SECTION (From image_873e95.png) */}
                <div className="mt-4 mb-2 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Testimonials & Reviews
                </div>
                <div className="grid grid-cols-1 gap-1 border-l-2 border-muted ml-4 pl-2">
                  {testimonialLinks.map((t) => (
                    <MobileNavLink
                      key={t.title}
                      href={t.href}
                      label={t.title}
                      icon={t.icon} // These use the icons from image_873e95.png
                      onClick={() => setIsOpen(false)}
                      isSubLink
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-6 border-t border-border bg-muted/20 space-y-3">
              <Link
                href="/admin/login"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-11"
                >
                  {/* <Shield className="h-4 w-4" /> Admin Login */}
                </Button>
              </Link>
              <Link
                href="/contact"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full h-11 shadow-lg shadow-primary/20 text-md font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

// Helper component for cleaner Mobile Nav Links
function MobileNavLink({
  href,
  label,
  onClick,
  icon: Icon,
  isSubLink = false,
}: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isSubLink
          ? "text-muted-foreground text-sm hover:text-primary hover:bg-muted"
          : "text-foreground font-medium hover:bg-primary/5 hover:text-primary",
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );
}
