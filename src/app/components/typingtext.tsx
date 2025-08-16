"use client";
import { useState, useEffect } from 'react';

interface TypingTextProps {
  messages?: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
}

interface TypingState {
  text: string;
  messageIndex: number;
  charIndex: number;
  isDeleting: boolean;
  isPaused: boolean;
}

const DEFAULT_MESSAGES = [
  "Hello I'm Patiphan Akkahadsri",
  "I love mathematics",
];

const DEFAULT_CONFIG = {
  typingSpeed: 110,
  deletingSpeed: 55,
  pauseAfterTyping: 1500,
  pauseAfterDeleting: 700,
  speedVariation: 30,
} as const;

export default function TypingText({
  messages = DEFAULT_MESSAGES,
  className = "text-3xl font-semibold text-center mt-8 text-white",
  typingSpeed = DEFAULT_CONFIG.typingSpeed,
  deletingSpeed = DEFAULT_CONFIG.deletingSpeed,
  pauseAfterTyping = DEFAULT_CONFIG.pauseAfterTyping,
  pauseAfterDeleting = DEFAULT_CONFIG.pauseAfterDeleting,
}: TypingTextProps) {
  const [state, setState] = useState<TypingState>({
    text: '',
    messageIndex: 0,
    charIndex: 0,
    isDeleting: false,
    isPaused: false,
  });

  const getRandomizedSpeed = (baseSpeed: number): number => {
    const variation = DEFAULT_CONFIG.speedVariation;
    return baseSpeed + (Math.random() * variation - variation / 2);
  };

  const getCurrentMessage = (): string => messages[state.messageIndex];

  const moveToNextMessage = (): void => {
    setState(prev => ({
      ...prev,
      messageIndex: (prev.messageIndex + 1) % messages.length,
      charIndex: 0,
      isDeleting: false,
      isPaused: false,
    }));
  };

  const handleTyping = (): void => {
    const currentMessage = getCurrentMessage();
    const nextCharIndex = state.charIndex + 1;

    setState(prev => ({
      ...prev,
      text: currentMessage.slice(0, nextCharIndex),
      charIndex: nextCharIndex,
      isPaused: nextCharIndex === currentMessage.length,
    }));
  };

  const handleDeleting = (): void => {
    const currentMessage = getCurrentMessage();
    const nextCharIndex = state.charIndex - 1;

    setState(prev => ({
      ...prev,
      text: currentMessage.slice(0, nextCharIndex),
      charIndex: nextCharIndex,
      isPaused: nextCharIndex === 0,
    }));
  };

  const handlePause = (): void => {
    if (state.isDeleting) {
      moveToNextMessage();
    } else {
      setState(prev => ({
        ...prev,
        isDeleting: true,
        isPaused: false,
      }));
    }
  };

  useEffect(() => {
    const calculateDelay = (): number => {
      if (state.isPaused) {
        return state.isDeleting ? pauseAfterDeleting : pauseAfterTyping;
      }
      return state.isDeleting 
        ? getRandomizedSpeed(deletingSpeed)
        : getRandomizedSpeed(typingSpeed);
    };

    const timeout = setTimeout(() => {
      if (state.isPaused) {
        handlePause();
      } else if (state.isDeleting) {
        handleDeleting();
      } else {
        handleTyping();
      }
    }, calculateDelay());

    return () => clearTimeout(timeout);
  }, [state, typingSpeed, deletingSpeed, pauseAfterTyping, pauseAfterDeleting]);

  return (
    <h5 className={className}>
      {state.text}
      <span className="animate-pulse">|</span>
    </h5>
  );
}