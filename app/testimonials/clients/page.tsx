"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Quote, CheckCircle } from "lucide-react";

const clientReviews = [
  {
    company: "New Era Ventures",
    clientName: "Executive Director",
    content:
      "The modular architecture provided for our tech platform has transformed our workflow. The professional energy and high-contrast design perfectly match our brand identity.",
    result: "40% Increase in Efficiency",
  },
  {
    company: "Kro Luxury",
    clientName: "Founder",
    content:
      "ViekTech's attention to detail on our e-commerce sliders and high-end accessory showcase was exceptional. They truly understand luxury aesthetics.",
    result: "Seamless UI/UX Experience",
  },
  {
    company: "Tech Hub Lagos",
    clientName: "Operations Manager",
    content:
      "A reliable partner for full-stack development. The integration of React and Django was handled with technical mastery.",
    result: "Successful System Migration",
  },
];

export default function ClientReviewsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/testimonials">
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" /> Back to Testimonials
          </Button>
        </Link>

        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Client <span className="text-primary">Reviews</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We partner with forward-thinking companies to build digital products
            that solve real-world problems. Here is what our partners have to
            say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {clientReviews.map((review, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl border border-border bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{review.company}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {review.clientName}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-primary/10" />
                </div>
                <p className="text-lg italic leading-relaxed mb-8">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-border flex items-center gap-2 text-primary font-semibold">
                <CheckCircle className="h-5 w-5" />
                <span>{review.result}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Ready to build something great?
          </h2>
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full px-12 h-14 text-lg shadow-lg shadow-primary/20"
            >
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
