import React, { useState, useEffect } from 'react';
import { CustomerReview } from '../types';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';

const TESTIMONIALS: CustomerReview[] = [
  {
    id: 't-01',
    reviewerName: 'Sunita G.',
    initials: 'SG',
    rating: 5,
    comment:
      'We bought 6 pure Banarasi Katan silk sarees and my daughter’s bridal lehenga from Radhika Sarees in Tel Gali, Atarra. The zari work is authentic handloom quality and their master tailor did the blouse stitching with exquisite precision. Highly recommended!',
    productCategory: 'Bridal Banarasi Silk Saree',
    location: 'Tel Gali, Atarra (Banda)',
    verifiedBuyer: true,
    date: 'September 2026',
  },
  {
    id: 't-02',
    reviewerName: 'Anjali T.',
    initials: 'AT',
    rating: 5,
    comment:
      'The sheer organza floral saree I inquired about arrived with perfect fall & pico finishing. Living in Chitrakoot, it was wonderful to connect directly on WhatsApp with the store owner, view video call options, and get doorstep delivery!',
    productCategory: 'Blush Organza Saree',
    location: 'Chitrakoot, UP',
    verifiedBuyer: true,
    date: 'September 2026',
  },
  {
    id: 't-03',
    reviewerName: 'Rajesh V.',
    initials: 'RV',
    rating: 5,
    comment:
      'I got my wedding reception 3-piece coat suit and my brother’s sherwani from Radhika Sarees. The fabric drape and shoulder fitting were top-notch, far better than expensive stores in Kanpur. Great family shopping destination in Atarra.',
    productCategory: 'Italian Wool Coat Suit & Sherwani',
    location: 'Atarra Road, Banda',
    verifiedBuyer: true,
    date: 'August 2026',
  },
  {
    id: 't-04',
    reviewerName: 'Poonam C.',
    initials: 'PC',
    rating: 5,
    comment:
      'Authentic Rajasthani Gota Patti Bandhani saree with vibrant colors. The team is extremely polite, honest with fabric composition, and gave us the best direct weaver rates.',
    productCategory: 'Jaipuri Bandhani Silk Saree',
    location: 'Tel Gali, Atarra',
    verifiedBuyer: true,
    date: 'September 2026',
  },
  {
    id: 't-05',
    reviewerName: 'Manish & Priya K.',
    initials: 'MK',
    rating: 5,
    comment:
      'Complete one-stop shop for our family wedding! We shopped sarees for ladies, sherwanis for men, and ethnic sets for the kids all under one roof. Truly the pride of Atarra!',
    productCategory: 'Full Family Wedding Trousseau',
    location: 'Naraini, Banda (UP)',
    verifiedBuyer: true,
    date: 'August 2026',
  },
];

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-red-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-[#E51A24] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Experiences & Ratings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Trusted by Families Across Bundelkhand
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Read authentic verified feedback from our patrons who chose Radhika Sarees for their most cherished celebrations.
          </p>
        </div>

        {/* Testimonial Slider Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card Frame */}
          <div className="bg-gradient-to-br from-[#FFFDF9] to-red-50/40 rounded-3xl p-8 sm:p-12 border border-red-100 shadow-xl relative min-h-[320px] flex flex-col justify-between transition-all duration-500">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-8 text-red-200 pointer-events-none">
              <Quote className="w-16 h-16 opacity-50" />
            </div>

            {/* Stars & Category */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex text-amber-500 text-base">
                  {'★'.repeat(current.rating)}
                </div>
                <span className="text-xs font-bold text-[#E51A24] bg-white px-3 py-1 rounded-full border border-red-100 shadow-xs">
                  {current.productCategory}
                </span>
              </div>

              {/* Review Text */}
              <p className="font-serif text-base sm:text-xl text-stone-800 leading-relaxed italic">
                "{current.comment}"
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="mt-8 pt-6 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Initials Badge */}
                <div className="w-12 h-12 rounded-full bg-[#E51A24] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md shadow-red-500/20">
                  {current.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-stone-900 flex items-center gap-1.5">
                    <span>{current.reviewerName}</span>
                    <span title="Verified Store Customer" className="inline-flex">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </span>
                  </h4>
                  <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E51A24]" />
                    <span>{current.location}</span>
                    <span>•</span>
                    <span>{current.date}</span>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white hover:bg-red-50 text-stone-700 hover:text-[#E51A24] border border-stone-200 hover:border-red-200 transition-all shadow-xs"
                  title="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white hover:bg-red-50 text-stone-700 hover:text-[#E51A24] border border-stone-200 hover:border-red-200 transition-all shadow-xs"
                  title="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 bg-[#E51A24]'
                    : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
