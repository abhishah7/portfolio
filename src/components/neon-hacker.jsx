import { useEffect, useState, useRef } from 'react';

const codeSnippets = [
  'const hackThePlanet = () => {',
  '  const target = "mainframe";',
  '  const payload = new Exploit();',
  '  payload.inject(target);',
  '  return "ACCESS_GRANTED";',
  '};',
  '',
  'async function bypassSecurity() {',
  '  await crackEncryption();',
  '  console.log("🔓 Firewall breached");',
  '  return true;',
  '}',
  '',
  'class NeuralInterface {',
  '  constructor() {',
  '    this.status = "CONNECTED";',
  '    this.bandwidth = "10Gbps";',
  '  }',
  '  sync() { return this.hack(); }',
  '}',
];

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`あいうえおカキクケコ';

export default function NeonHacker() {
  const [displayLines, setDisplayLines] = useState(['']);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef(null);

  // Typing effect
  useEffect(() => {
    if (currentLine >= codeSnippets.length) {
      // Reset after delay for loop
      const timeout = setTimeout(() => {
        setDisplayLines(['']);
        setCurrentLine(0);
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentSnippet = codeSnippets[currentLine];
    
    if (charIndex < currentSnippet.length) {
      const timeout = setTimeout(() => {
        setDisplayLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = currentSnippet.slice(0, charIndex + 1);
          return newLines;
        });
        setCharIndex(charIndex + 1);
      }, 30 + Math.random() * 50);
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setDisplayLines(prev => [...prev, '']);
        setCurrentLine(currentLine + 1);
        setCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, charIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getGlitchText = (text) => {
    if (!isGlitching) return text;
    return text.split('').map((char, i) => {
      if (Math.random() > 0.8) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  return (
    <div className="w-full my-8 px-4">
      <div 
        ref={containerRef}
        className="relative max-w-4xl mx-auto rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0a0f1f 0%, #111936 100%)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          boxShadow: isGlitching 
            ? '0 0 30px rgba(0, 255, 136, 0.5), inset 0 0 30px rgba(0, 255, 136, 0.1)'
            : '0 0 20px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.05)',
          transition: 'box-shadow 0.15s ease',
        }}
      >
        {/* Scanline overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.03) 2px, rgba(0, 255, 136, 0.03) 4px)',
          }}
        />
        
        {/* Terminal header */}
        <div 
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(0, 255, 136, 0.2)' }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-4 text-xs font-mono tracking-wider" style={{ color: 'rgba(0, 255, 136, 0.6)' }}>
            root@dev-portfolio:~# ./hack.sh
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span 
              className="text-[10px] font-mono animate-pulse"
              style={{ color: '#00ff88' }}
            >
              ● LIVE
            </span>
          </div>
        </div>

        {/* Code content */}
        <div className="relative p-6 font-mono text-sm min-h-[300px]">
          {/* Background glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)' }}
          />
          
          {/* Code lines */}
          <div className="relative z-10 space-y-1">
            {displayLines.map((line, index) => (
              <div key={index} className="flex items-start">
                <span 
                  className="select-none mr-4 text-right w-8"
                  style={{ color: 'rgba(0, 255, 136, 0.3)' }}
                >
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span 
                  className="break-all"
                  style={{ 
                    color: index === currentLine ? '#00ff88' : 'rgba(0, 255, 136, 0.7)',
                    textShadow: index === currentLine ? '0 0 10px rgba(0, 255, 136, 0.5)' : 'none',
                  }}
                >
                  {getGlitchText(line)}
                  {index === currentLine && (
                    <span 
                      className="inline-block w-2 h-4 ml-0.5 align-middle"
                      style={{ 
                        backgroundColor: showCursor ? '#00ff88' : 'transparent',
                        boxShadow: showCursor ? '0 0 8px #00ff88' : 'none',
                        transition: 'all 0.1s ease',
                      }}
                    />
                  )}
                </span>
              </div>
            ))}
            
            {/* Status bar */}
            <div 
              className="mt-8 pt-4 border-t flex items-center justify-between"
              style={{ borderColor: 'rgba(0, 255, 136, 0.1)' }}
            >
              <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(0, 255, 136, 0.5)' }}>
                <span>UTF-8</span>
                <span>JavaScript</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  SECURE CONNECTION
                </span>
              </div>
              <div className="text-xs" style={{ color: 'rgba(0, 255, 136, 0.4)' }}>
                {Math.round((currentLine / codeSnippets.length) * 100)}% COMPLETE
              </div>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div 
          className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
          style={{ borderColor: '#00ff88', boxShadow: '0 0 10px #00ff88' }}
        />
        <div 
          className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
          style={{ borderColor: '#00ff88', boxShadow: '0 0 10px #00ff88' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
          style={{ borderColor: '#00ff88', boxShadow: '0 0 10px #00ff88' }}
        />
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
          style={{ borderColor: '#00ff88', boxShadow: '0 0 10px #00ff88' }}
        />
      </div>
    </div>
  );
}
