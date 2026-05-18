import React, { useState, useEffect } from 'react';

interface DelayedRenderProps {
  children: React.ReactNode;
  delayMs?: number;
  waitForInteraction?: boolean;
}

export const DelayedRender: React.FC<DelayedRenderProps> = ({
  children,
  delayMs = 3500,
  waitForInteraction = true,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const renderNow = () => {
      setShouldRender(true);
      if (waitForInteraction) {
        ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach((event) =>
          window.removeEventListener(event, renderNow)
        );
      }
    };

    if (waitForInteraction) {
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach((event) =>
        window.addEventListener(event, renderNow, { once: true, passive: true })
      );
      // Fallback if no interaction happens within delay
      timeoutId = setTimeout(renderNow, delayMs);
    } else {
      timeoutId = setTimeout(renderNow, delayMs);
    }

    return () => {
      clearTimeout(timeoutId);
      if (waitForInteraction) {
        ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach((event) =>
          window.removeEventListener(event, renderNow)
        );
      }
    };
  }, [delayMs, waitForInteraction]);

  return shouldRender ? <>{children}</> : null;
};
