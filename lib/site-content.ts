export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  read: boolean;
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
      "To provide cutting-edge digital solutions and world-class technical education that empowers individuals and businesses to thrive. At Viek Tech, we bridge the gap between potential and performance by innovating with purpose.",
    vision:
      "To become a global leader in tech innovation and talent development, fostering a future where technology is accessible, impactful, and driven by a commitment to excellence.",
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
    email: "info@viektech.com",
    phone: "+233 XX XXX XXXX",
    address: "Lagos, Nigeria",
  },
  messages: [],
};
