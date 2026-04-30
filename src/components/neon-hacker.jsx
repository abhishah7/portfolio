import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════
// CONFIGURATION & DATA
// ═══════════════════════════════════════════════════════════

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];=+*&^%$#@!';

const HACKING_PHASES = [
  {
    id: 'recon',
    label: 'RECONNAISSANCE',
    lines: [
      { text: '[*] Initializing network scanner...', type: 'info', delay: 60 },
      { text: '[+] Target IP: 192.168.1.***', type: 'success', delay: 40 },
      { text: '[+] Port scan: 22, 80, 443, 8080, 3306 OPEN', type: 'success', delay: 50 },
      { text: '[*] Fingerprinting OS: Linux Ubuntu 22.04', type: 'info', delay: 45 },
      { text: '[*] Enumerating services...', type: 'info', delay: 80 },
      { text: '  ├─ SSH-2.0-OpenSSH_8.9p1', type: 'data', delay: 30 },
      { text: '  ├─ Apache/2.4.52', type: 'data', delay: 30 },
      { text: '  └─ MySQL 8.0.32', type: 'data', delay: 30 },
      { text: '[+] Vulnerability database matched: 14 results', type: 'success', delay: 50 },
      { text: '', type: 'blank', delay: 20 },
    ],
  },
  {
    id: 'exploit',
    label: 'EXPLOITATION',
    lines: [
      { text: '[*] Loading exploit: CVE-2024-XXXX', type: 'info', delay: 70 },
      { text: 'const payload = new Shellcode({', type: 'code', delay: 25 },
      { text: "  arch: 'x64',", type: 'code', delay: 20 },
      { text: "  encoder: 'shikata_ga_nai',", type: 'code', delay: 20 },
      { text: "  platform: 'linux',", type: 'code', delay: 20 },
      { text: '  iterations: 5,', type: 'code', delay: 20 },
      { text: "  badChars: '\\x00\\x0a\\x0d',", type: 'code', delay: 20 },
      { text: '});', type: 'code', delay: 25 },
      { text: '', type: 'blank', delay: 15 },
      { text: 'await payload.compile();', type: 'code', delay: 30 },
      { text: 'await payload.inject(target, port);', type: 'code', delay: 35 },
      { text: '', type: 'blank', delay: 15 },
      { text: '[+] Shell spawned → /bin/bash', type: 'success', delay: 50 },
      { text: '[+] Privilege escalation: SUCCESS', type: 'success', delay: 60 },
      { text: '[!] ROOT ACCESS OBTAINED', type: 'warning', delay: 80 },
      { text: '', type: 'blank', delay: 20 },
    ],
  },
  {
    id: 'extract',
    label: 'DATA EXTRACTION',
    lines: [
      { text: '[*] Mounting encrypted filesystem...', type: 'info', delay: 60 },
      { text: '[*] Decrypting AES-256-GCM stream...', type: 'info', delay: 50 },
      { text: '[████████████████████████████████] 100%', type: 'progress', delay: 30 },
      { text: '', type: 'blank', delay: 15 },
      { text: '[+] Extracted 2,847 files (14.3 GB)', type: 'success', delay: 45 },
      { text: '[+] Database dump: users.db (340 MB)', type: 'success', delay: 40 },
      { text: '[+] Credentials found: 1,291 pairs', type: 'success', delay: 40 },
      { text: '', type: 'blank', delay: 15 },
      { text: 'class DataExfiltrator {', type: 'code', delay: 25 },
      { text: '  constructor(channel) {', type: 'code', delay: 20 },
      { text: '    this.channel = channel;', type: 'code', delay: 20 },
      { text: '    this.encrypted = true;', type: 'code', delay: 20 },
      { text: '  }', type: 'code', delay: 15 },
      { text: '  async stream(data) {', type: 'code', delay: 20 },
      { text: '    return await this.send(data);', type: 'code', delay: 20 },
      { text: '  }', type: 'code', delay: 15 },
      { text: '}', type: 'code', delay: 25 },
      { text: '', type: 'blank', delay: 20 },
    ],
  },
  {
    id: 'cover',
    label: 'COVERING TRACKS',
    lines: [
      { text: '[*] Clearing /var/log/auth.log...', type: 'info', delay: 50 },
      { text: '[*] Clearing /var/log/syslog...', type: 'info', delay: 45 },
      { text: '[*] Removing bash history...', type: 'info', delay: 40 },
      { text: '[*] Tampering timestamps (touch -r)...', type: 'info', delay: 55 },
      { text: '[*] Killing residual processes...', type: 'info', delay: 40 },
      { text: '[+] Logs sanitized: 47 entries removed', type: 'success', delay: 50 },
      { text: '[+] No traces remaining', type: 'success', delay: 60 },
      { text: '', type: 'blank', delay: 20 },
      { text: '[✓] OPERATION COMPLETE — CLEAN EXIT', type: 'warning', delay: 80 },
      { text: '', type: 'blank', delay: 30 },
    ],
  },
];

const NETWORK_NODES = [
  { id: 'src', label: 'YOU', x: 10, y: 50, active: true },
  { id: 'proxy1', label: 'PROXY-1', x: 30, y: 25, active: false },
  { id: 'proxy2', label: 'PROXY-2', x: 30, y: 75, active: false },
  { id: 'fw', label: 'FIREWALL', x: 55, y: 50, active: false },
  { id: 'dmz', label: 'DMZ', x: 75, y: 30, active: false },
  { id: 'db', label: 'DATABASE', x: 90, y: 50, active: false },
];

const NETWORK_EDGES = [
  ['src', 'proxy1'], ['src', 'proxy2'],
  ['proxy1', 'fw'], ['proxy2', 'fw'],
  ['fw', 'dmz'], ['fw', 'db'],
  ['dmz', 'db'],
];

const HEX_STREAM = () => {
  let s = '';
  for (let i = 0; i < 32; i++) {
    s += Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase();
    if (i < 31) s += ' ';
  }
  return s;
};

const TYPE_COLORS = {
  info: '#4fc3f7',
  success: '#00ff88',
  warning: '#ff6b35',
  error: '#ff1744',
  data: '#b0bec5',
  code: '#ce93d8',
  progress: '#ffd54f',
  blank: 'transparent',
};

const KEYWORD_COLORS = {
  const: '#c792ea',
  let: '#c792ea',
  var: '#c792ea',
  async: '#c792ea',
  await: '#c792ea',
  return: '#c792ea',
  class: '#c792ea',
  constructor: '#82aaff',
  new: '#c792ea',
  this: '#f07178',
  true: '#f78c6c',
  false: '#f78c6c',
  null: '#f78c6c',
  function: '#82aaff',
  if: '#c792ea',
  else: '#c792ea',
  for: '#c792ea',
  while: '#c792ea',
  export: '#c792ea',
  import: '#c792ea',
  from: '#c792ea',
  default: '#c792ea',
};

// ═══════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════

function MatrixRain({ width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 10, 20, 0.06)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00ff8822';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => clearInterval(interval);
  }, [width, height]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 0.4 }} />;
}

function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -20,
      opacity: 0.1 + Math.random() * 0.3,
    })), []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: '#00ff88',
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px #00ff88`,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function NetworkGraph({ activeNodes, phaseProgress }) {
  const svgRef = useRef(null);
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    if (phaseProgress < 0.1) {
      setPackets([]);
      return;
    }
    const interval = setInterval(() => {
      const edgeIdx = Math.floor(Math.random() * NETWORK_EDGES.length);
      const [from, to] = NETWORK_EDGES[edgeIdx];
      const fromNode = NETWORK_NODES.find(n => n.id === from);
      const toNode = NETWORK_NODES.find(n => n.id === to);
      if (fromNode && toNode && activeNodes.includes(from) && activeNodes.includes(to)) {
        setPackets(prev => [...prev.slice(-8), {
          id: Date.now() + Math.random(),
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y,
          progress: 0,
        }]);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [activeNodes, phaseProgress]);

  useEffect(() => {
    const frame = requestAnimationFrame(function animate() {
      setPackets(prev => {
        let changed = false;
        const next = prev.map(p => {
          if (p.progress < 1) {
            changed = true;
            return { ...p, progress: Math.min(1, p.progress + 0.03) };
          }
          return p;
        }).filter(p => p.progress < 1);
        return next;
      });
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="packetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ff88" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </linearGradient>
        </defs>

        {NETWORK_EDGES.map(([from, to], i) => {
          const fn = NETWORK_NODES.find(n => n.id === from);
          const tn = NETWORK_NODES.find(n => n.id === to);
          const isActive = activeNodes.includes(from) && activeNodes.includes(to);
          return (
            <line
              key={i}
              x1={fn.x} y1={fn.y} x2={tn.x} y2={tn.y}
              stroke={isActive ? '#00ff88' : '#1a2a3a'}
              strokeWidth={isActive ? 0.4 : 0.2}
              strokeDasharray={isActive ? 'none' : '1 1'}
              opacity={isActive ? 0.6 : 0.3}
            />
          );
        })}

        {packets.map(p => (
          <circle
            key={p.id}
            cx={p.fromX + (p.toX - p.fromX) * p.progress}
            cy={p.fromY + (p.toY - p.fromY) * p.progress}
            r="0.8"
            fill="#00ff88"
            filter="url(#glow)"
            opacity={1 - p.progress * 0.5}
          />
        ))}

        {NETWORK_NODES.map(node => {
          const isActive = activeNodes.includes(node.id);
          return (
            <g key={node.id} filter={isActive ? 'url(#glow)' : undefined}>
              <circle
                cx={node.x} cy={node.y} r="2.5"
                fill={isActive ? '#00ff8820' : '#0a1520'}
                stroke={isActive ? '#00ff88' : '#1a2a3a'}
                strokeWidth="0.3"
              />
              {isActive && (
                <circle cx={node.x} cy={node.y} r="1" fill="#00ff88">
                  <animate attributeName="r" values="1;1.5;1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <text
                x={node.x} y={node.y + 5}
                textAnchor="middle"
                fill={isActive ? '#00ff88' : '#2a3a4a'}
                fontSize="2.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function AudioWaveform() {
  const bars = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    baseHeight: 3 + Math.random() * 8,
    duration: 0.4 + Math.random() * 0.6,
    delay: Math.random() * -2,
  })), []);

  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map(b => (
        <div
          key={b.id}
          className="w-[3px] rounded-t-sm"
          style={{
            backgroundColor: '#00ff88',
            opacity: 0.6,
            animation: `waveBar ${b.duration}s ease-in-out ${b.delay}s infinite alternate`,
            height: `${b.baseHeight}px`,
            boxShadow: '0 0 4px #00ff8844',
          }}
        />
      ))}
    </div>
  );
}

function HexStream() {
  const [lines, setLines] = useState(() => Array.from({ length: 6 }, () => HEX_STREAM()));

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => [...prev.slice(1), HEX_STREAM()]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-0.5 font-mono text-[9px] leading-tight" style={{ color: '#00ff8833' }}>
      {lines.map((line, i) => (
        <div key={i} style={{ opacity: 0.3 + (i / lines.length) * 0.7 }}>{line}</div>
      ))}
    </div>
  );
}

function HighlightedCode({ text }) {
  return (
    <span>
     {text.split(/(\s+|[\]{}\[\];,.])/).map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
      if (/^[\]{}\[\];,.]$/.test(token)) {
          return <span key={i} style={{ color: '#89ddff' }}>{token}</span>;
        }
        if (KEYWORD_COLORS[token]) {
          return <span key={i} style={{ color: KEYWORD_COLORS[token], fontWeight: 600 }}>{token}</span>;
        }
        if (/^['"`]/.test(token) || token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
          return <span key={i} style={{ color: '#c3e88d' }}>{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} style={{ color: '#f78c6c' }}>{token}</span>;
        }
        if (/^\/\//.test(token)) {
          return <span key={i} style={{ color: '#546e7a', fontStyle: 'italic' }}>{token}</span>;
        }
        if (/^[A-Z_]+$/.test(token) && token.length > 1) {
          return <span key={i} style={{ color: '#ffcb6b' }}>{token}</span>;
        }
        return <span key={i} style={{ color: '#eeffff' }}>{token}</span>;
      })}
    </span>
  );
}

function ProgressBar({ percent }) {
  return (
    <span>
      {`[`}
      <span style={{ color: '#00ff88' }}>
        {'█'.repeat(Math.floor(percent / 5))}
        {'░'.repeat(20 - Math.floor(percent / 5))}
      </span>
      {`] ${Math.round(percent)}%`}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function NeonHacker() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayLines, setDisplayLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [activeNodes, setActiveNodes] = useState(['src']);
  const [progress, setProgress] = useState(0);
  const [hexStreams, setHexStreams] = useState({});
  const [activeTab, setActiveTab] = useState('terminal');
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const containerRef = useRef(null);
  const terminalRef = useRef(null);

  // Observe container size for matrix rain
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      'BIOS v4.2.0 — POST check...',
      'CPU: Quantum X9 @ 5.2GHz ............ OK',
      'RAM: 64GB DDR5-6400 ................. OK',
      'GPU: Neural RTX 5090 ................. OK',
      'NIC: 10Gbps Ethernet ................ OK',
      'Loading kernel: quantum-os-6.1.0 ... OK',
      'Initializing crypto engine ........... OK',
      'Mounting /dev/encrypted .............. OK',
      'Starting network daemon .............. OK',
      'Establishing TOR circuit (3 hops) .... OK',
      '',
      'Welcome to QuantumOS v4.2.0',
      'Last login: Never',
      '',
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootLines(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootComplete(true), 500);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayLines, bootLines]);

  // Typing effect
  useEffect(() => {
    if (!bootComplete) return;

    const phase = HACKING_PHASES[phaseIndex];
    if (!phase) {
      setTimeout(() => {
        setPhaseIndex(0);
        setLineIndex(0);
        setCharIndex(0);
        setDisplayLines([]);
        setActiveNodes(['src']);
        setProgress(0);
      }, 4000);
      return;
    }

    const line = phase.lines[lineIndex];
    if (!line) {
      // Phase complete
      setTimeout(() => {
        setPhaseIndex(phaseIndex + 1);
        setLineIndex(0);
        setCharIndex(0);
      }, 800);
      return;
    }

    if (line.type === 'blank') {
      setDisplayLines(prev => [...prev, { text: '', type: 'blank' }]);
      setLineIndex(lineIndex + 1);
      setCharIndex(0);
      return;
    }

    if (charIndex < line.text.length) {
      const jitter = line.delay ? line.delay * (0.7 + Math.random() * 0.6) : 30;
      const timeout = setTimeout(() => {
        setDisplayLines(prev => {
          const newLines = [...prev];
          const existing = newLines.find((_, idx) => idx === prev.length - 1 && prev[prev.length - 1]?._typing);
          if (existing) {
            existing.text = line.text.slice(0, charIndex + 1);
            if (charIndex + 1 >= line.text.length) {
              delete existing._typing;
            }
          } else {
            newLines.push({
              text: line.text.slice(0, charIndex + 1),
              type: line.type,
              ...(charIndex + 1 < line.text.length ? { _typing: true } : {}),
            });
          }
          return newLines;
        });
        setCharIndex(charIndex + 1);
      }, jitter);
      return () => clearTimeout(timeout);
    } else {
      // Ensure line is finalized
      setDisplayLines(prev => {
        const last = prev[prev.length - 1];
        if (last && last._typing) {
          const newLines = [...prev];
          newLines[newLines.length - 1] = { text: line.text, type: line.type };
          return newLines;
        }
        return prev;
      });
      setLineIndex(lineIndex + 1);
      setCharIndex(0);
    }
  }, [bootComplete, phaseIndex, lineIndex, charIndex]);

  // Update progress and network nodes based on phase
  useEffect(() => {
    if (!bootComplete) return;
    const phaseProgress = lineIndex / (HACKING_PHASES[phaseIndex]?.lines.length || 1);
    setProgress(((phaseIndex + phaseProgress) / HACKING_PHASES.length) * 100);

    const nodeOrder = ['src', 'proxy1', 'proxy2', 'fw', 'dmz', 'db'];
    const activeCount = Math.floor(phaseProgress * (nodeOrder.length - 1)) + 1;
    setActiveNodes(nodeOrder.slice(0, activeCount));
  }, [bootComplete, phaseIndex, lineIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Advanced glitch
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.75) {
        setIsGlitching(true);
        setGlitchType(Math.floor(Math.random() * 4));
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 150);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getGlitchStyle = useCallback(() => {
    if (!isGlitching) return {};
    const styles = [
      // RGB split
      { textShadow: '-2px 0 #ff0040, 2px 0 #00ffff', transform: `translate(${(Math.random()-0.5)*4}px, ${(Math.random()-0.5)*2}px)` },
      // Horizontal tear
      { clipPath: `polygon(0 0, 100% 0, 100% ${30+Math.random()*20}%, 0 ${35+Math.random()*20}%)`, transform: `translateY(${Math.random()*6-3}px)` },
      // Scale glitch
      { transform: `scale(${1 + Math.random()*0.02}) skewX(${(Math.random()-0.5)*3}deg)`, filter: 'hue-rotate(90deg)' },
      // Intense flash
      { filter: 'brightness(2) contrast(1.5)', textShadow: '0 0 20px #00ff88, 0 0 40px #00ff88' },
    ];
    return styles[glitchType] || {};
  }, [isGlitching, glitchType]);

  const renderLine = (line, idx) => {
    if (line.type === 'blank') return <div key={idx} className="h-3" />;
    if (line.type === 'progress') {
      const match = line.text.match(/(\d+)%/);
      const pct = match ? parseInt(match[1]) : 0;
      return (
        <div key={idx} className="font-mono text-xs" style={{ color: TYPE_COLORS.progress }}>
          <ProgressBar percent={pct} />
        </div>
      );
    }
    if (line.type === 'code') {
      return (
        <div key={idx} className="font-mono text-xs pl-4" style={{ color: '#eeffff' }}>
          <HighlightedCode text={line.text} />
        </div>
      );
    }
    return (
      <div key={idx} className="font-mono text-xs" style={{ color: TYPE_COLORS[line.type] || '#b0bec5' }}>
        {line.text}
      </div>
    );
  };

  const currentPhase = HACKING_PHASES[phaseIndex];
  const allLines = [...bootLines.map(t => ({ text: t, type: 'info' })), ...displayLines];

  return (
    <div className="w-full my-8 px-4">
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #050a14 0%, #0a1628 50%, #0d1a2d 100%)',
          border: '1px solid rgba(0, 255, 136, 0.15)',
          boxShadow: isGlitching
            ? '0 0 60px rgba(0, 255, 136, 0.4), 0 0 120px rgba(0, 255, 136, 0.1), inset 0 0 60px rgba(0, 255, 136, 0.05)'
            : '0 0 30px rgba(0, 255, 136, 0.1), 0 4px 30px rgba(0, 0, 0, 0.5)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Matrix Rain Background */}
        <MatrixRain width={containerSize.width} height={containerSize.height} />
        <FloatingParticles />

        {/* CRT Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-20" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)',
        }} />
        {/* CRT Vignette */}
        <div className="absolute inset-0 pointer-events-none z-20" style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-xl pointer-events-none z-30" style={{
          padding: '1px',
          background: 'conic-gradient(from var(--border-angle, 0deg), transparent 60%, #00ff8866, #00ff88, #00ff8866, transparent 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'rotateBorder 4s linear infinite',
        }} />

        {/* Header bar */}
        <div className="relative z-10 flex items-center gap-3 px-5 py-3 border-b" style={{
          borderColor: 'rgba(0, 255, 136, 0.12)',
          background: 'rgba(0, 10, 20, 0.7)',
          backdropFilter: 'blur(10px)',
        }}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 transition cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-125 transition cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-125 transition cursor-pointer" />
          </div>

          {/* Tabs */}
          <div className="flex gap-0 ml-4">
            {['terminal', 'network', 'monitor'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest transition-all duration-200 rounded-t-md"
                style={{
                  color: activeTab === tab ? '#00ff88' : 'rgba(0, 255, 136, 0.35)',
                  background: activeTab === tab ? 'rgba(0, 255, 136, 0.08)' : 'transparent',
                  borderBottom: activeTab === tab ? '2px solid #00ff88' : '2px solid transparent',
                  textShadow: activeTab === tab ? '0 0 10px rgba(0,255,136,0.5)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <AudioWaveform />
            <span className="text-[10px] font-mono animate-pulse flex items-center gap-1.5" style={{ color: '#00ff88' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] inline-block" style={{ boxShadow: '0 0 6px #00ff88' }} />
              ENCRYPTED
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'rgba(0,255,136,0.3)' }}>
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex min-h-[420px]" style={getGlitchStyle()}>
          {/* Terminal panel */}
          <div className={`flex-1 flex flex-col ${activeTab !== 'terminal' ? 'hidden' : ''}`}>
            <div ref={terminalRef} className="flex-1 overflow-y-auto p-5 space-y-0.5" style={{
              maxHeight: '420px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#00ff8833 transparent',
            }}>
              {allLines.map((line, idx) => (
                <div key={idx} className="flex items-start group">
                  {bootComplete && idx >= bootLines.length && (
                    <span className="select-none mr-4 text-right w-7 shrink-0 text-[10px] font-mono" style={{ color: 'rgba(0,255,136,0.2)' }}>
                      {(idx - bootLines.length + 1).toString().padStart(2, '0')}
                    </span>
                  )}
                  <div className="flex-1">
                    {bootComplete && idx >= bootLines.length
                      ? renderLine(line, idx)
                      : <div className="font-mono text-xs" style={{ color: '#4fc3f7' }}>{line.text}</div>
                    }
                  </div>
                </div>
              ))}

              {/* Cursor */}
              {bootComplete && currentPhase && (
                <div className="flex items-center ml-11">
                  <span
                    className="inline-block w-2 h-4"
                    style={{
                      backgroundColor: showCursor ? '#00ff88' : 'transparent',
                      boxShadow: showCursor ? '0 0 8px #00ff88, 0 0 16px #00ff8844' : 'none',
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Network panel */}
          <div className={`flex-1 flex flex-col p-5 ${activeTab !== 'network' ? 'hidden' : ''}`}>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: 'rgba(0,255,136,0.5)' }}>
              Network Topology — Live
            </div>
            <div className="flex-1">
              <NetworkGraph activeNodes={activeNodes} phaseProgress={progress / 100} />
            </div>
            <div className="mt-4 space-y-2">
              {NETWORK_NODES.map(node => (
                <div key={node.id} className="flex items-center gap-2 text-[10px] font-mono">
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: activeNodes.includes(node.id) ? '#00ff88' : '#1a2a3a',
                      boxShadow: activeNodes.includes(node.id) ? '0 0 6px #00ff88' : 'none',
                    }}
                  />
                  <span style={{ color: activeNodes.includes(node.id) ? '#00ff88' : '#2a3a4a' }}>
                    {node.label}
                  </span>
                  <span className="ml-auto" style={{ color: activeNodes.includes(node.id) ? '#00ff8888' : '#1a2a3a' }}>
                    {activeNodes.includes(node.id) ? 'CONNECTED' : '---'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monitor panel */}
          <div className={`flex-1 flex flex-col p-5 ${activeTab !== 'monitor' ? 'hidden' : ''}`}>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: 'rgba(0,255,136,0.5)' }}>
              System Monitor
            </div>

            {/* Gauges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'CPU', value: 45 + Math.sin(Date.now() / 1000) * 25 },
                { label: 'RAM', value: 62 + Math.sin(Date.now() / 1500) * 15 },
                { label: 'NET', value: 30 + Math.sin(Date.now() / 800) * 28 },
                { label: 'DISK', value: 78 + Math.sin(Date.now() / 2000) * 5 },
              ].map(g => (
                <MiniGauge key={g.label} label={g.label} value={g.value} />
              ))}
            </div>

            {/* Hex stream */}
            <div className="mb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: 'rgba(0,255,136,0.3)' }}>
                Data Stream
              </div>
              <HexStream />
            </div>

            {/* Operation progress */}
            <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(0,255,136,0.08)' }}>
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span style={{ color: 'rgba(0,255,136,0.5)' }}>OPERATION PROGRESS</span>
                <span style={{ color: '#00ff88' }}>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,255,136,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500 relative"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #00ff88, #00ccff)',
                    boxShadow: '0 0 10px #00ff8888',
                  }}
                >
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: 'shimmer 2s infinite',
                  }} />
                </div>
              </div>

              {/* Phase indicators */}
              <div className="flex gap-1 mt-3">
                {HACKING_PHASES.map((phase, i) => (
                  <div
                    key={phase.id}
                    className="flex-1 h-1 rounded-full transition-all duration-500"
                    style={{
                      background: i < phaseIndex ? '#00ff88' : i === phaseIndex ? '#00ff8866' : 'rgba(0,255,136,0.08)',
                      boxShadow: i <= phaseIndex ? '0 0 6px #00ff8844' : 'none',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-mono mt-1.5" style={{ color: 'rgba(0,255,136,0.25)' }}>
                <span>RECON</span>
                <span>EXPLOIT</span>
                <span>EXTRACT</span>
                <span>CLEAN</span>
              </div>
            </div>
          </div>

          {/* Side hex panel - always visible */}
          <div className="hidden lg:block w-44 border-l p-3 overflow-hidden" style={{
            borderColor: 'rgba(0,255,136,0.08)',
            background: 'rgba(0,5,15,0.5)',
          }}>
            <div className="text-[8px] font-mono uppercase tracking-widest mb-2" style={{ color: 'rgba(0,255,136,0.25)' }}>
              Memory Dump
            </div>
            <HexStreamSide />
          </div>
        </div>

        {/* Footer status bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-2 border-t text-[10px] font-mono" style={{
          borderColor: 'rgba(0, 255, 136, 0.08)',
          background: 'rgba(0, 10, 20, 0.7)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(0,255,136,0.4)',
        }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full" style={{ background: currentPhase ? TYPE_COLORS[currentPhase.id === 'cover' ? 'warning' : 'info'] : '#00ff88' }} />
              {bootComplete ? `PHASE: ${currentPhase?.label || 'COMPLETE'}` : 'BOOTING...'}
            </span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Ln {displayLines.length + 1}, Col {charIndex + 1}</span>
            <span style={{ color: '#00ff88' }}>{Math.round(progress)}%</span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#00ff88] animate-pulse" />
              SECURE
            </span>
          </div>
        </div>

        {/* Corner accents */}
        {[
          'top-0 left-0 border-t-2 border-l-2',
          'top-0 right-0 border-t-2 border-r-2',
          'bottom-0 left-0 border-b-2 border-l-2',
          'bottom-0 right-0 border-b-2 border-r-2',
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 z-30 pointer-events-none ${pos}`}
            style={{
              borderColor: '#00ff88',
              boxShadow: '0 0 8px #00ff8844',
              opacity: 0.6,
            }}
          />
        ))}

        {/* Glitch overlay layers */}
        {isGlitching && (
          <>
            <div className="absolute inset-0 z-25 pointer-events-none" style={{
              background: 'linear-gradient(transparent 40%, rgba(0,255,136,0.03) 40%, rgba(0,255,136,0.03) 60%, transparent 60%)',
              transform: `translateY(${Math.random() * 20 - 10}px)`,
              animation: 'glitchSlice 0.1s infinite',
            }} />
            <div className="absolute inset-0 z-25 pointer-events-none" style={{
              background: 'linear-gradient(90deg, transparent 48%, rgba(255,0,64,0.05) 48%, rgba(255,0,64,0.05) 52%, transparent 52%)',
              transform: `translateX(${Math.random() * 4 - 2}px)`,
            }} />
          </>
        )}
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--particle-opacity, 0.2); }
          25% { transform: translate(10px, -20px) scale(1.2); }
          50% { transform: translate(-5px, -40px) scale(0.8); }
          75% { transform: translate(15px, -20px) scale(1.1); }
        }
        @keyframes waveBar {
          0% { height: 2px; }
          100% { height: 16px; }
        }
        @keyframes rotateBorder {
          to { --border-angle: 360deg; }
        }
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes glitchSlice {
          0% { clip-path: inset(20% 0 60% 0); }
          20% { clip-path: inset(50% 0 10% 0); }
          40% { clip-path: inset(10% 0 70% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(30% 0 40% 0); }
          100% { clip-path: inset(20% 0 60% 0); }
        }
        /* Custom scrollbar */
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #00ff8833; border-radius: 2px; }
        div::-webkit-scrollbar-thumb:hover { background: #00ff8866; }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════

function MiniGauge({ label, value }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(function update() {
      setCurrent(prev => {
        const diff = value - prev;
        if (Math.abs(diff) < 0.5) return value;
        return prev + diff * 0.1;
      });
      requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const color = current > 80 ? '#ff6b35' : current > 60 ? '#ffd54f' : '#00ff88';
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (current / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="18" fill="none" stroke="rgba(0,255,136,0.08)" strokeWidth="3" />
        <circle
          cx="26" cy="26" r="18" fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 26 26)"
          style={{ transition: 'stroke-dashoffset 0.3s ease', filter: `drop-shadow(0 0 4px ${color}44)` }}
        />
        <text
          x="26" y="28" textAnchor="middle" fill={color}
          fontSize="11" fontFamily="monospace" fontWeight="bold"
        >
          {Math.round(current)}%
        </text>
      </svg>
      <span className="text-[9px] font-mono mt-1" style={{ color: 'rgba(0,255,136,0.4)' }}>{label}</span>
    </div>
  );
}

function HexStreamSide() {
  const [lines, setLines] = useState(() => Array.from({ length: 20 }, () => {
    let s = '';
    for (let i = 0; i < 8; i++) s += Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase() + ' ';
    return s.trim();
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev];
        const idx = Math.floor(Math.random() * newLines.length);
        let s = '';
        for (let i = 0; i < 8; i++) s += Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase() + ' ';
        newLines[idx] = s.trim();
        return newLines;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-px font-mono text-[8px] leading-[10px]" style={{ color: '#00ff8822' }}>
      {lines.map((line, i) => (
        <div key={i} style={{ opacity: 0.2 + (i / lines.length) * 0.8 }}>{line}</div>
      ))}
    </div>
  );
}