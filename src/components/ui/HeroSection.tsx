
import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './AnimatedButton';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  ctaText?: string;
  ctaAction?: () => void;
  secondaryCtaText?: string;
  secondaryCtaAction?: () => void;
  align?: 'left' | 'center' | 'right';
  imagePosition?: 'left' | 'right' | 'background';
  className?: string;
  overlayOpacity?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageSrc,
  ctaText,
  ctaAction,
  secondaryCtaText,
  secondaryCtaAction,
  align = 'center',
  imagePosition = 'background',
  className,
  overlayOpacity = 0.6,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const renderContent = () => (
    <motion.div
      className={cn('relative z-10 max-w-3xl', textAlign)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight"
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-base md:text-lg mb-8 opacity-90"
        variants={itemVariants}
      >
        {subtitle}
      </motion.p>
      {(ctaText || secondaryCtaText) && (
        <motion.div 
          className={cn('flex gap-4 flex-wrap', 
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end'
          )}
          variants={itemVariants}
        >
          {ctaText && (
            <AnimatedButton
              variant="premium"
              size="lg"
              onClick={ctaAction}
            >
              {ctaText}
            </AnimatedButton>
          )}
          {secondaryCtaText && (
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={secondaryCtaAction}
            >
              {secondaryCtaText}
            </AnimatedButton>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  if (imagePosition === 'background') {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-no-repeat bg-cover bg-center py-24 md:py-32",
          className
        )}
        style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : undefined }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"
          style={{ opacity: overlayOpacity }}
        />
        <div className="container mx-auto px-6 flex justify-center items-center min-h-[50vh]">
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-6">
        <div className={cn(
          "grid md:grid-cols-2 gap-12 items-center",
          imagePosition === 'left' && 'md:flex-row-reverse'
        )}>
          {imagePosition === 'left' && (
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              {imageSrc && (
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                  src={imageSrc}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
          <div className="flex justify-center">
            {renderContent()}
          </div>
          {imagePosition === 'right' && (
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              {imageSrc && (
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                  src={imageSrc}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
