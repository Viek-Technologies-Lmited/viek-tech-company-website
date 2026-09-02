"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, BookOpen, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";

interface Enrollment {
  id: string;
  email: string;
  fullname: string;
  phone: string | null;
  course_slug: string;
  currency: string;
  amount_cents: number;
  paystack_reference: string;
  moodle_userid: number | null;
  status: string;
  created_at: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get("reference") || searchParams.get("trxref");
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!txRef) return;
    fetch(`/api/enrollments?reference=${encodeURIComponent(txRef)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Enrollment not found");
        return res.json();
      })
      .then((data) => {
        setEnrollment(data.enrollment ?? null);
        if (!data.enrollment) {
          setError("We could not locate your enrollment record.");
        }
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Failed to load enrollment",
        );
        toast.error("Failed to load enrollment status");
      });
  }, [txRef]);

  const loading = !enrollment && !error && Boolean(txRef);

  // Render-time handling for a missing reference (no setState in effect).
  if (!txRef) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">No payment reference found.</p>
        <Button asChild>
          <Link href="/academy">Browse Courses</Link>
        </Button>
      </motion.div>
    );
  }

  const amountMajor = enrollment ? enrollment.amount_cents / 100 : 0;
  const symbol = enrollment?.currency === "USD" ? "$" : "₦";

  const copyEmail = () => {
    if (enrollment?.email) {
      navigator.clipboard.writeText(enrollment.email);
      toast.success("Email copied to clipboard");
    }
  };

  const moodleUrl = process.env.NEXT_PUBLIC_MOODLE_URL || "";

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">
          Confirming your payment and enrolment...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">{error}</p>
        <Button asChild>
          <Link href="/academy">Browse Courses</Link>
        </Button>
      </motion.div>
    );
  }

  if (!enrollment) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="h-10 w-10 text-green-500" />
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
      </div>

      <div className="rounded-xl bg-green-50/60 border border-green-200 p-5 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Enrollment ID</span>
          <span className="font-mono text-sm">{enrollment.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Name</span>
          <span className="font-medium">{enrollment.fullname}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Email</span>
          <span className="font-medium flex items-center gap-1">
            {enrollment.email}
            <button
              type="button"
              onClick={copyEmail}
              className="ml-1 text-xs underline"
            >
              <Copy className="h-3 w-3" />
            </button>
          </span>
        </div>
        {enrollment.phone && (
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Phone</span>
            <span className="font-medium">{enrollment.phone}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Course</span>
          <span className="font-medium">{enrollment.course_slug}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Amount</span>
          <span className="font-medium">
            {symbol}{" "}
            {amountMajor.toLocaleString(
              enrollment.currency === "USD" ? "en-US" : "en-NG",
            )}
          </span>
        </div>
      </div>

      {enrollment.status === "pending" && (
        <div className="flex items-center gap-3 rounded-xl bg-amber-50/60 border border-amber-200 p-4 text-amber-800">
          <Clock className="h-5 w-5" />
          <span className="text-sm">
            Your enrollment is still being processed. You will receive an email
            with your Moodle login once onboarding completes.
          </span>
        </div>
      )}

      {enrollment.status === "moodle_enrolled" && moodleUrl && (
        <div className="rounded-xl bg-blue-50/60 border border-blue-200 p-5 space-y-3">
          <h2 className="font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Your LMS account is ready
          </h2>
          <p className="text-sm text-muted-foreground">
            A student account has been created for you on the ViekTech Academy
            LMS and you have been enrolled in{" "}
            <strong>{enrollment.course_slug}</strong>. A welcome email with your
            login details has been sent to <strong>{enrollment.email}</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            If you didn&apos;t receive the email, you can also set your password from
            the LMS login page using{" "}
            <a
              href={moodleUrl + "/login/index.php"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Forgot your username or password?
            </a>
            . Your username is your email address.
          </p>
          <Button asChild className="gap-2">
            <a href={moodleUrl} target="_blank" rel="noreferrer">
              Open LMS <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      <Button asChild className="w-full sm:w-auto gap-2">
        <Link href="/academy">
          <BookOpen className="h-4 w-4" /> Browse More Courses
        </Link>
      </Button>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-32 max-w-2xl">
        <Suspense
          fallback={
            <div className="text-center py-12 text-muted-foreground">
              Loading your payment details...
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
      <Toaster />
    </main>
  );
}
