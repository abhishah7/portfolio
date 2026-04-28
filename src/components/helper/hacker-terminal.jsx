import { useEffect, useState, useRef } from 'react';

const HackerTerminal = ({ commands = [], typingSpeed = 50 }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (commandIndex >= commands.length) {
      setIsTyping(false);
      return;
    }

    if (charIndex < commands[commandIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + commands[commandIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentLine]);
        setCurrentLine('');
        setCharIndex(0);
        setCommandIndex(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [commandIndex, charIndex, commands, typingSpeed, currentLine]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentLine]);

  return (
    <div className="bg-[#0a0d0a] border border-[#16f2b3] rounded-lg p-4 font-mono text-sm h-64 overflow-y-auto scanline">
      <div className="text-[#16f2b3] mb-2">
        <span className="text-[#ff00ff]">root@hacker</span>:<span className="text-[#00ffff]">~</span>$
      </div>
      {displayedLines.map((line, index) => (
        <div key={index} className="text-gray-300 mb-1">
          <span className="text-[#16f2b3]">$</span> {line}
        </div>
      ))}
      {isTyping && (
        <div className="text-gray-300">
          <span className="text-[#16f2b3]">$</span> {currentLine}
          <span className="hacker-cursor"></span>
        </div>
      )}
    </div>
  );
};

export default HackerTerminal;
