import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';

interface AnimatedScoreProps {
  value: number;
  formatLocale?: boolean;
  prefix?: string;
  suffix?: string;
  showPlusSign?: boolean;
  className?: string;
  duration?: number;
}

export default function AnimatedScore({
  value,
  formatLocale = false,
  prefix = '',
  suffix = '',
  showPlusSign = false,
  className = '',
  duration = 0.55,
}: AnimatedScoreProps) {
  const safeTarget = Number.isFinite(Number(value)) ? Math.round(Number(value)) : 0;
  const motionValue = useMotionValue(safeTarget);
  const [displayValue, setDisplayValue] = useState<number>(safeTarget);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const prevTargetRef = useRef<number>(safeTarget);

  useEffect(() => {
    const prev = prevTargetRef.current;
    if (prev === safeTarget) {
      return;
    }

    setDirection(safeTarget > prev ? 'up' : 'down');
    prevTargetRef.current = safeTarget;

    const controls = animate(motionValue, safeTarget, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
      onComplete: () => {
        setDisplayValue(safeTarget);
        setDirection(null);
      },
    });

    return () => {
      controls.stop();
    };
  }, [safeTarget, duration, motionValue]);

  const formattedNumber = formatLocale
    ? displayValue.toLocaleString()
    : String(displayValue);

  const signPrefix = showPlusSign && displayValue > 0 ? '+' : '';

  return (
    <motion.span
      animate={
        direction
          ? {
              scale: [1, 1.14, 1],
            }
          : { scale: 1 }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block tabular-nums ${className}`}
    >
      {prefix}
      {signPrefix}
      {formattedNumber}
      {suffix}
    </motion.span>
  );
}
