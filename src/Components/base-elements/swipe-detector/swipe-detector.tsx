import { FC, useRef } from "react";

interface Props {
  onSwipeLeft: any;
  onSwipeRight: any;
  children: any;
}

const SwipeDetector: FC<Props> = ({ onSwipeLeft, onSwipeRight, children }) => {
  const startX = useRef(null);
  const startY = useRef(null);

  const handleTouchStart = (e: any) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: any) => {
    if (!startX.current || !startY.current) return;

    const deltaX = e.touches[0].clientX - startX.current;
    const deltaY = e.touches[0].clientY - startY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault(); // prevent vertical scrolling
    }
  };

  const handleTouchEnd = (e: any) => {
    if (!startX.current || !startY.current) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;

    if (deltaX > 50) {
      onSwipeRight(); // invoke method for right swipe
    } else if (deltaX < -50) {
      onSwipeLeft(); // invoke method for left swipe
    }

    startX.current = null;
    startY.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default SwipeDetector;
