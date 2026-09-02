"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, StarIcon, Webhook } from "lucide-react";
import { CourseListType } from "@/lib/course-list";

export default function LearningPathsSlider({
  courses,
}: {
  courses: CourseListType[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const cardWidth = 256; // 240px card + 16px gap

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [courses]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="flex-1">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => scrollByCard("left")}
          disabled={!canScrollLeft}
          className="h-10 w-10 rounded-full bg-white shadow flex items-center justify-center disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scrollByCard("right")}
          disabled={!canScrollRight}
          className="h-10 w-10 rounded-full bg-white shadow flex items-center justify-center disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="viek-path-slider flex gap-4 overflow-x-auto scroll-px-1 scroll-p-1 pb-3"
      >
        {courses.map((course) => (
          <div
            key={course.slug}
            className="viek-snap-start flex-shrink-0 w-[240px]"
          >
            <Link href={`/academy/${course.slug}`}>
              <div className="min-w-60 rounded-2xl bg-white overflow-hidden cursor-pointer group">
                <div className="h-40 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.name}
                    width={240}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="min-h-36 p-4">
                  <h5 className="font-medium capitalize">{course.name}</h5>
                  <div className="flex items-center gap-x-2 mt-2">
                    <Webhook className="h-4 w-4 text-primary inline-block" />
                    <p className="text-xs font-medium">{course.level}</p>
                  </div>
                  <div className="flex items-center gap-x-2 mt-4">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <h5 className="text-sm font-medium">{course.rating}</h5>
                    <h5 className="text-sm font-medium">({course.reviews})</h5>
                  </div>
                  <div className="flex items-center gap-x-2 mt-4">
                    <h5 className="text-sm font-medium">
                      ₦{course.standardFee.toLocaleString()}
                    </h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
