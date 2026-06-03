"use client";
import { useCallback, useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer to detect when the element comes into view
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };
      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);
      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  // Easing function (easeOutExpo)
  const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      const endVal = direction === 'down' ? from : to;
      if (ref.current) {
        ref.current.textContent = formatValue(endVal);
      }
      if (onStart) onStart();
      if (onEnd) onEnd();
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const startVal = direction === 'down' ? to : from;
    const endVal = direction === 'down' ? from : to;

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
        if (onStart) onStart();
      }

      const progress = timestamp - startTime - delay * 1000;
      
      if (progress < 0) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      const durationMs = duration * 1000;
      const t = Math.min(progress / durationMs, 1);
      const easedT = Math.min(easeOutExpo(t), 1);
      
      const currentVal = startVal + (endVal - startVal) * easedT;
      
      if (ref.current) {
        ref.current.textContent = formatValue(currentVal);
      }

      if (t < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        if (ref.current) {
          ref.current.textContent = formatValue(endVal);
        }
        if (onEnd) onEnd();
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, startWhen, direction, from, to, delay, duration, formatValue, onStart, onEnd]);

  return <span className={className} ref={ref} />;
}
