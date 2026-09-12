"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CreditCard, Globe } from "lucide-react";
import { toast } from "sonner";
import { coursePricing, Currency } from "@/lib/academy-pricing";

interface CheckoutModalProps {
  courseSlug: string;
  courseName: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CheckoutModal({
  courseSlug,
  courseName,
  children,
  open,
  onOpenChange,
}: CheckoutModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [submitting, setSubmitting] = useState(false);

  const pricing = coursePricing[courseSlug];
  const amountMajor =
    currency === "NGN" ? pricing?.standardFeeNgn : pricing?.standardFeeUsd;
  const currencySymbol = currency === "NGN" ? "₦" : "$";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !email || !phone) {
      toast.error("Please enter your name, email, and phone number");
      return;
    }
    if (!pricing) {
      toast.error("Course pricing not configured");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullname,
          phone,
          courseSlug,
          currency,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.authorizationUrl) {
        throw new Error(data.error || "Failed to start checkout");
      }
      toast.success("Redirecting to payment...");
      window.location.href = data.authorizationUrl;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0">
        <form onSubmit={handleSubmit} className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Enroll in {courseName}</DialogTitle>
            <DialogDescription>
              Complete payment to get instantly onboarded as a student on the
              ViekTech Academy LMS.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 flex gap-2" role="radiogroup">
            <button
              type="button"
              onClick={() => setCurrency("NGN")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                currency === "NGN"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted bg-background text-muted-foreground hover:bg-accent"
              }}`}
            >
              <Globe className="h-4 w-4" />
              NGN (₦{amountMajor?.toLocaleString("en-NG")})
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                currency === "USD"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted bg-background text-muted-foreground hover:bg-accent"
              }}`}
            >
              <Globe className="h-4 w-4" />
              USD (${amountMajor?.toLocaleString("en-US")})
            </button>
          </div>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                placeholder="e.g. Ada Lovelace"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                minLength={7}
                autoComplete="tel"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Pay {currencySymbol}{" "}
                {amountMajor !== undefined
                  ? amountMajor.toLocaleString(
                      currency === "NGN" ? "en-NG" : "en-US",
                    )
                  : ""}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
