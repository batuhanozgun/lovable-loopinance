
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { TypewriterProps } from "./types";

export const Typewriter = ({
  texts,
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenTexts = 2000,
  className
}: TypewriterProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion = 
    typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;

  useEffect(() => {
    // If user prefers reduced motion, just show the full text
    if (prefersReducedMotion) {
      setCurrentText(texts[currentTextIndex]);
      return;
    }

    const handleTyping = () => {
      const currentFullText = texts[currentTextIndex];
      
      if (isDeleting) {
        // Deleting text
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setIsPaused(true);
          
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
          }, 500); // Small pause before starting to type the next text
        }
      } else {
        // Typing text
        setCurrentText((prev) => 
          currentFullText.substring(0, prev.length + 1)
        );
        
        if (currentText === currentFullText) {
          setIsPaused(true);
          
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            setIsPaused(false);
          }, delayBetweenTexts);
        }
      }
    };

    if (!isPaused) {
      timeoutRef.current = setTimeout(
        handleTyping, 
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentText, 
    currentTextIndex, 
    isDeleting, 
    isPaused, 
    texts, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenTexts,
    prefersReducedMotion
  ]);

  return (
    <div 
      className={cn("min-h-[100px] w-full", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-lg md:text-xl">
        {currentText}
        <span className={`inline-block w-1 ml-1 bg-current ${isDeleting || isPaused ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
          |
        </span>
      </p>
    </div>
  );
};
