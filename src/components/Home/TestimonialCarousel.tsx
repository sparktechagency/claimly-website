'use client'
import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGE } from '@/app/constant/index.image';
import { cn } from "@/lib/utils/cn";
import Image from 'next/image';



interface Testimonial {
    id: number;
    name: string;
    date: string;
    image: string;
    quote: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Sherri Cronin",
        date: "November 2025",
        image: IMAGE.kidden.src,
        quote: `Before, managing insurance claims was confusing and time-consuming — now with Claimly, everything is organised and easy to track!`
    },
    {
        id: 2,
        name: "Terry Woodberry",
        date: "November 2025",
        image: IMAGE.Terry.src,
        quote: `Before, managing insurance claims was confusing and time-consuming — now with Claimly, everything is organised and easy to track!`
    },
    {
        id: 3,
        name: "Terry Woodberry",
        date: "November 2025",
        image: IMAGE.Terry.src,
        quote: `Before, managing insurance claims was confusing and time-consuming — now with Claimly, everything is organised and easy to track!`
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
            className="w-full container mx-auto my-4 flex items-center justify-center md:h-[calc(100vh-200px)] bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
            role="region"
            aria-label="Testimonials carousel"
        >
            <div className="absolute hidden xl:block bg-gradient-to-br from-[#1E293B] via-[#2563EB] to-[#2563EB] top-[50%] translate-y-[-50%] left-0 w-[50%] p-4 h-[600px]">
                <div className="w-full h-full bg-white"></div>
            </div>
            <div className="relative bg-white overflow-hidden max-w-screen-xl h-fit z-10 flex items-center justify-center px-4 py-8">
                <div className="w-full container mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        {/* Left Column - Content */}
                        <motion.div
                            className="space-y-8 text-black"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            {/* Quote Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                            >
                                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 11V21.2832L6.15674 16.1484L12.3135 11.0137V5.86524V0.716797H6.15674H0V11ZM17.499 11V21.2832L23.6558 16.1484L29.8125 11.0137V5.86524V0.716797H23.6558H17.499V11Z" fill="#4F5D75" />
                                </svg>

                            </motion.div>

                            {/* Testimonial Text */}
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="space-y-6"
                                >
                                    <blockquote className="text-sm md:text-lg xl:text-xl leading-relaxed md:leading-relaxed  font-light text-[#64748B] ">
                                        {currentTestimonial?.quote}
                                    </blockquote>
                                    <div className='flex items-center gap-2'>
                                        <div className='hidden md:flex items-center justify-center'>
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#2563EB]" />
                                            <div className="w-12 h-[1px] bg-black" />
                                        </div>
                                        <div className="space-y-2">
                                            <motion.h3
                                                className="  line-clamp-1 font-semibold text-xl"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {currentTestimonial?.name}
                                            </motion.h3>

                                            <motion.p
                                                className="text-[#64748B] flex items-center gap-2 text-sm md:text-base line-clamp-1"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >

                                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {currentTestimonial?.date}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <motion.div
                                className="flex items-center gap-4 pt-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <button
                                    onClick={() => paginate(-1)}
                                    disabled={isAnimating}
                                    aria-label="Previous testimonial"
                                    className={cn(
                                        "bg-gradient-to-br from-[#2563EB] to-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-4 text-black transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95",
                                        isAnimating && "opacity-50 cursor-not-allowed",
                                        currentIndex > 0 && "bg-transparent border border-[#2563EB]"
                                    )}
                                >
                                    <ChevronLeft className={cn(
                                        "w-5 h-5 text-white md:w-6 md:h-6",
                                        currentIndex > 0 && "text-[#2563EB]"
                                    )} />
                                </button>
                                <button
                                    onClick={() => paginate(1)}
                                    disabled={isAnimating}
                                    aria-label="Next testimonial"
                                    className="bg-gradient-to-br from-[#2563EB] to-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-4 text-black transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
                                >
                                    <ChevronRight className="w-5 h-5 text-white md:w-6 md:h-6" />
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Visual Element */}
                        <motion.div
                            className="hidden md:flex items-center justify-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="relative">
                                {/* Profile Image */}
                                <div className='flex items-center justify-center'>
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                                        className="relative w-64 z-[999] h-64 xl:w-80 xl:h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl"
                                    >
                                        <Image
                                        height={100}
                                        width={100}
                                            src={currentTestimonial?.image}
                                            alt={currentTestimonial?.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </motion.div>
                                    <div className="flex items-center flex-col gap-2 ml-4">
                                        {TESTIMONIALS.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    if (index !== currentIndex) {
                                                        paginate(index > currentIndex ? 1 : -1);
                                                    }
                                                }}
                                                disabled={isAnimating}
                                                className={cn(
                                                    'w-2 h-2 rounded-full transition-all duration-300',
                                                    index === currentIndex
                                                        ? 'bg-[#2563EB] h-6'
                                                        : 'bg-black/50 hover:bg-black/70'
                                                )}
                                                aria-label={`Go to testimonial ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "tween", stiffness: 500, delay: 0.8 }}
                                    className="absolute -top-3 bg-white -left-4 h-[110%] w-2/4"
                                />
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ type: "tween", stiffness: 500, delay: 1 }}
                                    className="absolute hidden md:block -top-2 rounded bg-gradient-to-r from-[#2563EB] via-[#1E293B] to-[#003F91] -left-4 h-[105%] w-full -z-10"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
});

TestimonialCarousel.displayName = 'TestimonialCarousel';

export default memo(TestimonialCarousel);