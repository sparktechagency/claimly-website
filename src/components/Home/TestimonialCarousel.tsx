'use client'
import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils/cn";



interface Testimonial {
    id: number;
    heading: string;
    quote: string;
    author: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        heading: "Clear, structured and independent.",
        quote: "The report broke everything down clearly - what the insurer relied on, what mattered legally, and what my next steps were.",
        author: "Daniel R., VIC"
    },
    {
        id: 2,
        heading: "Professional and easy to understand.",
        quote: "My insurer’s correspondence was confusing. Claimly explained it in plain language and outlined the key points I needed to consider.",
        author: "Sarah L., NSW"
    },
    {
        id: 3,
        heading: "Gave me clarity before making a decision.",
        quote: "I appreciated how structured the review was. It highlighted what was relevant and what wasn't, which made things much clearer.",
        author: "A.K., SA"
    },
    {
        id: 4,
        heading: "Calm and factual.",
        quote: "The report focused on the facts and the policy wording. It helped me approach the insurer with a clearer understanding.",
        author: "David P., NSW"
    },
    {
        id: 5,
        heading: "Worth it for the clarity alone.",
        quote: "I felt stuck before receiving the review. After reading it, I understood the reasoning behind the decision and how to move forward.",
        author: "Emma J., VIC"
    }
];

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.3 }
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.3
        }
    })
};

const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const TestimonialCarousel: React.FC = memo(() => {
    const [[currentIndex, direction], setCurrentState] = useState([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const paginate = useCallback((newDirection: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCurrentState(([prevIndex]) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) newIndex = TESTIMONIALS.length - 1;
            if (newIndex >= TESTIMONIALS.length) newIndex = 0;
            return [newIndex, newDirection];
        });

        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    const currentTestimonial = TESTIMONIALS[currentIndex];

    return (
        <div
            className="w-full container flex-col gap-8 mx-auto my-4 flex items-center justify-center md:h-[calc(100vh-200px)] bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
            role="region"
            aria-label="Testimonials carousel"
        >
            <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-2xl lg:text-[40px] font-semibold">
                    What Our <span className="text-brand">Users Say</span>
                </h2>
                {/* <p className="default-list-text max-w-2xl">
                    Most asked-about insurers (last 30 days). Based on Claimly submissions. Not affiliated with any insurer.
                </p> */}
            </div>
            {/* <div className="absolute hidden xl:block bg-gradient-to-br from-[#1E293B] via-[#2563EB] to-[#2563EB] top-[50%] translate-y-[-50%] left-0 w-[50%] p-4 h-[600px]">
                <div className="w-full h-full bg-white"></div>
            </div> */}
            <div className="relative bg-white overflow-hidden max-w-4xl h-fit z-10 flex flex-col items-center justify-center px-6 py-12 md:py-20 rounded-3xl shadow-xl w-full mx-4">
               
               

                <div className="w-full">
                    
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                        
                        {/* Quote Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-8 p-4 bg-blue-50 rounded-2xl"
                        >
                            <svg width="40" height="30" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 11V21.2832L6.15674 16.1484L12.3135 11.0137V5.86524V0.716797H6.15674H0V11ZM17.499 11V21.2832L23.6558 16.1484L29.8125 11.0137V5.86524V0.716797H23.6558H17.499V11Z" fill="#2563EB" />
                            </svg>
                        </motion.div>

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-6 flex flex-col items-center"
                            >
                                <motion.h2
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                                >
                                    {currentTestimonial?.heading}
                                </motion.h2>
                                <blockquote className="text-lg md:text-xl leading-relaxed text-gray-600 font-medium italic">
                                    "{currentTestimonial?.quote}"
                                </blockquote>
                                <div className="pt-6">
                                    <h3 className="font-bold text-blue-600 text-lg md:text-xl">
                                        — {currentTestimonial?.author}
                                    </h3>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-6 mt-12 w-full">
                            <button
                                onClick={() => paginate(-1)}
                                disabled={isAnimating}
                                className="p-3 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            index === currentIndex ? "bg-blue-600 w-6" : "bg-blue-100"
                                        )}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => paginate(1)}
                                disabled={isAnimating}
                                className="p-3 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

TestimonialCarousel.displayName = 'TestimonialCarousel';

export default memo(TestimonialCarousel);