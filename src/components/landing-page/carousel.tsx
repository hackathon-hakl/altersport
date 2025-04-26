"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MatchCard from "./match-card";

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const checkScrollButtons = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScrollWidth = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScrollWidth - 10);

    // Calculate scroll percentage
    setScrollPercentage(
      maxScrollWidth > 0 ? (scrollLeft / maxScrollWidth) * 100 : 0,
    );
  };

  useEffect(() => {
    // Initial check
    checkScrollButtons();

    // Add scroll event listener
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollButtons);

      // Check after content might have changed
      setTimeout(checkScrollButtons, 500);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollButtons);
      }
    };
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const scrollAmount = 408; // Width of a card (396px) + gap (12px)
    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  // Sample data for demonstration with proper typing
  const matches = [
    { variant: "upcoming" as const },
    { isFavorite: false, variant: "upcoming" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "result" as const },
    { variant: "result" as const },
  ];

  return (
    <div className="flex w-full flex-col gap-6 overflow-x-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          Preporučeni događaji
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollCarousel("left")}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0E0C28] text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            disabled={!canScrollRight}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0E0C28] text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ width: "100%", maxWidth: "100%" }}
        >
          {matches.map((matchProps, index) => (
            <MatchCard key={index} {...matchProps} />
          ))}
        </div>
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#070314]/70 via-[#070314]/50 via-60% to-transparent transition-opacity duration-300"
          style={{ opacity: scrollPercentage >= 80 ? 0 : 1 }}
        />
      </div>
    </div>
  );
}
