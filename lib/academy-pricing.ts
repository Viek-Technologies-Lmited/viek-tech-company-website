export type Currency = "NGN" | "USD";

export interface CoursePricing {
  standardFeeNgn: number;
  standardFeeUsd: number;
  moodleCourseId: number;
}

// Prices are in the currency's major unit (₦ NGN / $ USD).
// Values are converted to smallest unit (kobo/cents) at checkout.
export const coursePricing: Record<string, CoursePricing> = {
  "viek-core": { standardFeeNgn: 50000, standardFeeUsd: 40, moodleCourseId: 2 },
  "ai-automation": {
    standardFeeNgn: 60000,
    standardFeeUsd: 50,
    moodleCourseId: 4,
  },
  "data-analytics": {
    standardFeeNgn: 75000,
    standardFeeUsd: 60,
    moodleCourseId: 5,
  },
  cybersecurity: {
    standardFeeNgn: 80000,
    standardFeeUsd: 65,
    moodleCourseId: 6,
  },
  "software-development": {
    standardFeeNgn: 100000,
    standardFeeUsd: 85,
    moodleCourseId: 7,
  },
  "cloud-engineering": {
    standardFeeNgn: 90000,
    standardFeeUsd: 75,
    moodleCourseId: 8,
  },
  "product-design": {
    standardFeeNgn: 75000,
    standardFeeUsd: 60,
    moodleCourseId: 9,
  },
  "digital-marketing": {
    standardFeeNgn: 60000,
    standardFeeUsd: 50,
    moodleCourseId: 10,
  },
  "project-management": {
    standardFeeNgn: 60000,
    standardFeeUsd: 50,
    moodleCourseId: 11,
  },
  "digital-operations": {
    standardFeeNgn: 60000,
    standardFeeUsd: 50,
    moodleCourseId: 12,
  },
  "virtual-assistant": {
    standardFeeNgn: 20000,
    standardFeeUsd: 20,
    moodleCourseId: 13,
  },
  "graphic-design-content": {
    standardFeeNgn: 50000,
    standardFeeUsd: 40,
    moodleCourseId: 14,
  },
};

export function getCoursePricing(slug: string): CoursePricing | undefined {
  return coursePricing[slug];
}

export function toSmallestUnit(amount: number): number {
  return Math.round(amount * 100);
}

export function fmtAmount(amountCents: number, currency: Currency): string {
  const major = amountCents / 100;
  const sign = currency === "NGN" ? "₦" : "$";
  const locale = currency === "NGN" ? "en-NG" : "en-US";
  return `${sign}${major.toLocaleString(locale)}`;
}
