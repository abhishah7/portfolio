import { useEffect, useState } from 'react';

const TypingEffect = ({ text, speed = 100, delay = 0, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span className="typing-cursor inline-block w-[3px] h-[1.2em] bg-[#16f2b3] ml-1 align-middle" 
            style={{ opacity: showCursor ? 1 : 0 }}></span>
    </span>
  );
};

export default TypingEffect;
