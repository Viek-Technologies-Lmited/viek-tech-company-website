import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions - Viek Tech",
  description:
    "Read the terms and conditions for using Viek Technologies services and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            LEGAL
          </Badge>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Viek Technologies website and
                services, you agree to be bound by these Terms and Conditions.
                If you disagree with any part of these terms, you may not access
                our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Services Description
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Viek Technologies provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Web and mobile application development services</li>
                <li>UI/UX and graphic design services</li>
                <li>Technical training and academy programs</li>
                <li>Digital consulting and business solutions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Academy Enrollment
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For our training programs:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  Enrollment is subject to availability and eligibility
                  requirements
                </li>
                <li>
                  Course fees must be paid according to the agreed payment
                  schedule
                </li>
                <li>
                  Refund policies are outlined in individual program agreements
                </li>
                <li>Attendance and participation requirements must be met</li>
                <li>
                  Certificates are issued upon successful completion of programs
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Project Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For development and design projects:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  Project scope, timeline, and costs are defined in separate
                  agreements
                </li>
                <li>
                  Client must provide necessary materials and feedback in a
                  timely manner
                </li>
                <li>
                  Intellectual property rights are transferred upon full payment
                </li>
                <li>
                  Revisions are limited as specified in project agreements
                </li>
                <li>
                  Maintenance and support are available under separate
                  agreements
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unless otherwise specified:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  All content on our website is owned by Viek Technologies
                </li>
                <li>
                  You may not reproduce, distribute, or create derivative works
                  without permission
                </li>
                <li>Training materials are for personal use only</li>
                <li>
                  Client deliverables become client property upon full payment
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. User Responsibilities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Use our services lawfully and ethically</li>
                <li>Not attempt to disrupt our website or services</li>
                <li>Respect the rights of other users and third parties</li>
                <li>Maintain confidentiality of your account credentials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Payment Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment terms include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Prices are quoted in the agreed currency</li>
                <li>Payment schedules are defined in service agreements</li>
                <li>Late payments may incur additional charges</li>
                <li>Refund policies vary by service type</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Viek Technologies shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of
                our services or any related matter.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are provided &quot;as is&quot; without any
                warranties, express or implied. We do not guarantee that our
                services will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your access to our services
                immediately, without prior notice, for any breach of these
                Terms. Upon termination, your right to use our services will
                cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of Ghana, without regard to its conflict of law
                provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any
                time. Material changes will be notified at least 30 days before
                taking effect. Your continued use of our services after changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                13. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-foreground font-medium">Viek Technologies</p>
                <p className="text-muted-foreground">
                  Email: info@viektech.com
                </p>
                <p className="text-muted-foreground">Address: Lagos, Nigeria</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
