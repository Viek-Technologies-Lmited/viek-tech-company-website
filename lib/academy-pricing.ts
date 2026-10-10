export type Currency = "NGN" | "USD";

export interface CoursePricing {
  tuitionFeeNgn: number;
  discountedFeeNgn: number;
  standardFeeNgn: number;
  tuitionFeeUsd: number;
  discountedFeeUsd: number;
  standardFeeUsd: number;
  moodleCourseId: number;
}

// Prices are in the currency's major unit (₦ NGN / $ USD).
// Values are converted to smallest unit (kobo/cents) at checkout.
export const coursePricing: Record<string, CoursePricing> = {
  "viek-core": {
    tuitionFeeNgn: 100000,
    discountedFeeNgn: 50000,
    standardFeeNgn: 50000,
    tuitionFeeUsd: 80,
    discountedFeeUsd: 40,
    standardFeeUsd: 40,
    moodleCourseId: 2,
  },
  "ai-automation": {
    tuitionFeeNgn: 120000,
    discountedFeeNgn: 60000,
    standardFeeNgn: 60000,
    tuitionFeeUsd: 100,
    discountedFeeUsd: 50,
    standardFeeUsd: 50,
    moodleCourseId: 4,
  },
  "data-analytics": {
    tuitionFeeNgn: 150000,
    discountedFeeNgn: 75000,
    standardFeeNgn: 75000,
    tuitionFeeUsd: 120,
    discountedFeeUsd: 60,
    standardFeeUsd: 60,
    moodleCourseId: 5,
  },
  cybersecurity: {
    tuitionFeeNgn: 160000,
    discountedFeeNgn: 80000,
    standardFeeNgn: 80000,
    tuitionFeeUsd: 130,
    discountedFeeUsd: 65,
    standardFeeUsd: 65,
    moodleCourseId: 6,
  },
  "software-development": {
    tuitionFeeNgn: 200000,
    discountedFeeNgn: 100000,
    standardFeeNgn: 100000,
    tuitionFeeUsd: 170,
    discountedFeeUsd: 85,
    standardFeeUsd: 85,
    moodleCourseId: 7,
  },
  "cloud-engineering": {
    tuitionFeeNgn: 180000,
    discountedFeeNgn: 90000,
    standardFeeNgn: 90000,
    tuitionFeeUsd: 150,
    discountedFeeUsd: 75,
    standardFeeUsd: 75,
    moodleCourseId: 8,
  },
  "product-design": {
    tuitionFeeNgn: 150000,
    discountedFeeNgn: 75000,
    standardFeeNgn: 75000,
    tuitionFeeUsd: 120,
    discountedFeeUsd: 60,
    standardFeeUsd: 60,
    moodleCourseId: 9,
  },
  "digital-marketing": {
    tuitionFeeNgn: 120000,
    discountedFeeNgn: 60000,
    standardFeeNgn: 60000,
    tuitionFeeUsd: 100,
    discountedFeeUsd: 50,
    standardFeeUsd: 50,
    moodleCourseId: 10,
  },
  "project-management": {
    tuitionFeeNgn: 120000,
    discountedFeeNgn: 60000,
    standardFeeNgn: 60000,
    tuitionFeeUsd: 100,
    discountedFeeUsd: 50,
    standardFeeUsd: 50,
    moodleCourseId: 11,
  },
  "digital-operations": {
    tuitionFeeNgn: 120000,
    discountedFeeNgn: 60000,
    standardFeeNgn: 60000,
    tuitionFeeUsd: 100,
    discountedFeeUsd: 50,
    standardFeeUsd: 50,
    moodleCourseId: 12,
  },
  "virtual-assistant": {
    tuitionFeeNgn: 40000,
    discountedFeeNgn: 20000,
    standardFeeNgn: 20000,
    tuitionFeeUsd: 40,
    discountedFeeUsd: 20,
    standardFeeUsd: 20,
    moodleCourseId: 13,
  },
  "graphic-design-content": {
    tuitionFeeNgn: 100000,
    discountedFeeNgn: 50000,
    standardFeeNgn: 50000,
    tuitionFeeUsd: 80,
    discountedFeeUsd: 40,
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
