export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  requirements: string[];
  responsibilities: string[];
  isOpen: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  resumeUrl?: string; // Stored as data URI / Mock path for local storage simulation
  coverLetter?: string;
  timestamp: number;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected";
}

export interface SiteContent {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: {
    projects: string;
    students: string;
    clients: string;
    successRate: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  services: Array<{
    title: string;
    description: string;
    features: string[];
    icon: string;
  }>;
  about: {
    mission: string;
    vision: string;
    pitch: string;
  };
  coreValues: Array<{
    letter: string;
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    content: string;
    image: string;
    rating: number;
  }>;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  messages: ContactMessage[];
  jobs: JobListing[];
  applications: JobApplication[];
}

export const defaultContent: SiteContent = {
  hero: {
    badge: "EMPOWERING FUTURES THROUGH TECHNOLOGY",
    title: "Innovate. Learn.",
    highlight: "Grow.",
    description:
      "Viek Technologies is a dual-purpose tech hub and academy. We specialize in building purposeful digital solutions for businesses while simultaneously training the next generation of tech talent.",
    primaryCta: "Get Started",
    secondaryCta: "Our Services",
  },
  stats: {
    projects: "200+",
    students: "1,500+",
    clients: "150+",
    successRate: "98%",
  },
  features: [
    {
      title: "Expert Development",
      description:
        "Custom software solutions built by industry professionals with cutting-edge technologies.",
      icon: "Code",
    },
    {
      title: "Tech Training",
      description:
        "Comprehensive programs to equip you with in-demand tech skills for the modern workforce.",
      icon: "GraduationCap",
    },
    {
      title: "Business Solutions",
      description:
        "End-to-end digital transformation services tailored to your business needs.",
      icon: "Briefcase",
    },
    {
      title: "Career Support",
      description:
        "Job placement assistance and career guidance to help you succeed in tech.",
      icon: "TrendingUp",
    },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications that drive business growth.",
      features: [
        "Custom Websites",
        "E-commerce Solutions",
        "Web Applications",
        "CMS Development",
      ],
      icon: "Globe",
    },
    {
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-Platform Apps",
        "App Maintenance",
      ],
      icon: "Smartphone",
    },
    {
      title: "UI/UX & Graphics Design",
      description:
        "Beautiful, user-centered designs that captivate and convert.",
      features: [
        "Brand Identity",
        "UI/UX Design",
        "Marketing Materials",
        "Social Media Graphics",
      ],
      icon: "Palette",
    },
    {
      title: "Tech Academy",
      description:
        "Comprehensive training programs to build the next generation of tech talent.",
      features: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Cybersecurity",
      ],
      icon: "BookOpen",
    },
  ],
  about: {
    mission:
      "Bridging the gap between potential and performance with purposeful tech innovation.",
    vision: "To be a global leader in tech innovation and talent development.",
    pitch:
      "Whether we are developing software or mentoring students, our goal is the same: Innovating with purpose.",
  },
  coreValues: [
    {
      letter: "V",
      title: "Versatility",
      description:
        "Adapting to the ever-changing digital landscape with agility and expertise.",
    },
    {
      letter: "I",
      title: "Innovation",
      description:
        "Designing solutions that solve real-world problems through creative thinking.",
    },
    {
      letter: "E",
      title: "Excellence",
      description:
        "Maintaining the highest standards in tech development and training.",
    },
    {
      letter: "K",
      title: "Knowledge",
      description:
        "Empowering our community through continuous learning and growth.",
    },
  ],
  testimonials: [
    {
      name: "David Mensah",
      role: "CEO",
      company: "GrowthHub Ltd",
      content:
        "Viek Tech transformed our business with a stunning website and mobile app. Their team is professional, creative, and delivers on time. Highly recommended!",
      image: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Amara Okonkwo",
      role: "Software Engineer",
      company: "TechCorp Africa",
      content:
        "The academy program at Viek Tech gave me the skills I needed to land my dream job. The instructors are knowledgeable and the curriculum is top-notch.",
      image: "/images/testimonial-2.jpg",
      rating: 5,
    },
    {
      name: "Emmanuel Asare",
      role: "Founder",
      company: "StartUp Ghana",
      content:
        "From concept to launch, Viek Tech handled everything. Their attention to detail and understanding of our vision made the process seamless.",
      image: "/images/testimonial-3.jpg",
      rating: 5,
    },
  ],
  contact: {
    email: "support@viektech.com",
    phone: "+234 708 281 9044",
    address: "Lagos, Nigeria",
  },
  messages: [],
  jobs: [
    {
      id: "job-1",
      title: "Frontend Developer (React/Next.js)",
      department: "Engineering",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description:
        "We are looking for a skilled Frontend Developer to build clean, maintainable, and user-friendly web applications using Next.js and Tailwind CSS.",
      requirements: [
        "2+ years of professional experience with React and Next.js.",
        "Proficiency in TypeScript and Tailwind CSS.",
        "Experience matching custom design layouts accurately from Figma files.",
        "Understanding of frontend optimization techniques and state management.",
      ],
      responsibilities: [
        "Develop scalable, interactive web platforms and UI interfaces.",
        "Collaborate with backend developers to integrate APIs seamlessly.",
        "Optimize performance across a wide array of browsers and devices.",
      ],
      isOpen: true,
    },
    {
      id: "job-2",
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Remote",
      description:
        "Join our core creative team to design intuitive workflows, structural mockups, and visual components for complex web and mobile ecosystems.",
      requirements: [
        "Strong portfolio demonstrating beautiful user centered interfaces.",
        "Advanced proficiency with Figma and design systems.",
        "Ability to translate system requirements into high-fidelity wireframes.",
      ],
      responsibilities: [
        "Create visually stunning mockups, wireframes, and design components.",
        "Iterate designs based on feedback from engineering and active clients.",
        "Maintain absolute design system integrity across applications.",
      ],
      isOpen: true,
    },
  ],
  applications: [],
};
