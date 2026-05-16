"use client";

import Link from "next/link";
import Image from "next/image"; // Import the Image component
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Custom TikTok SVG Icon Component to match Lucide styling
const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a8 8 0 0 0 8 8h-2a6 6 0 0 1-6-6v12a6 6 0 1 1-6-6z" />
  </svg>
);

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#academy", label: "Academy" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const services = [
  { href: "#services", label: "Web Development" },
  { href: "#services", label: "Mobile Apps" },
  { href: "#services", label: "UI/UX Design" },
  { href: "#services", label: "Tech Training" },
  { href: "#services", label: "Consulting" },
];

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/share/18gDp7DDqF/?mibextid=wwXIfr",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://x.com/viektechno83gs?s=21",
    icon: Twitter,
    label: "Twitter",
  },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Instagram, label: "Instagram" },
  {
    href: "https://www.tiktok.com/@viek_technologies?_r=1&_t=ZS-96MIcQVDoto",
    icon: TiktokIcon,
    label: "Tiktok",
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              {/* Added Logo Image here */}
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo2.jpeg"
                  alt="ViekTech Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-background">
                  Viek<span className="text-primary">Tech</span>
                </span>
                <span className="text-[10px] text-background/60 uppercase tracking-widest -mt-1">
                  Innovating with Purpose
                </span>
              </div>
            </Link>
            <p className="text-background/70 leading-relaxed max-w-sm">
              A dual-purpose tech hub and academy specializing in building
              purposeful digital solutions while training the next generation of
              tech talent.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary/80 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-background mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-background mb-4">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">
              Subscribe to get the latest updates, news, and offers.
            </p>
            <form className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button size="icon" className="flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
            <div className="mt-6">
              <h5 className="font-medium text-background text-sm mb-3">
                Legal
              </h5>
              <ul className="space-y-2">
                {legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-primary transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>
            &copy; {new Date().getFullYear()} Viek Technologies. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <span className="text-primary">purpose</span> in Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
