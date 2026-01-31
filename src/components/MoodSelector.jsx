import React, { useEffect, useState } from 'react';
import { Sun, CloudRain, Zap, Ghost, Circle, Disc } from 'lucide-react';

const moods = [
    { id: 'joy', icon: Sun, label: 'JOY', color: 'var(--neon-amber)' },
    { id: 'sadness', icon: CloudRain, label: 'MELANCHOLY', color: 'var(--neon-cyan)' },
    { id: 'anger', icon: Zap, label: 'FURY', color: 'var(--neon-red)' },
    { id: 'fear', icon: Ghost, label: 'ANXIETY', color: 'var(--neon-purple)' },
    { id: 'neutral', icon: Disc, label: 'STASIS', color: 'var(--text-primary)' },
];

const Typewriter = ({ text, delay = 50 }) => {
    const [currentText, setCurrentText] = useState('');
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setCurrentText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, delay);
        return () => clearInterval(timer);
    }, [text, delay]);

    return <span>{currentText}</span>;
}

const MoodSelector = ({ onSelectMood }) => {
    return (
        <div style={{
            textAlign: 'center',
            width: '100%',
            height: '100%',
            animation: 'fadeIn 1s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            overflowY: 'auto' // Allow scroll on very small screens
        }}>
            <h1 style={{
                fontFamily: 'var(--font-header)',
                color: 'var(--neon-cyan)',
                fontSize: 'clamp(2rem, 5vw, 3rem)', // Fluid font size
                textShadow: 'var(--glow-cyan)',
                marginBottom: '1rem',
                letterSpacing: '4px',
                lineHeight: 1.2
            }}>
                <Typewriter text="SYSTEM INITIALIZATION" />
            </h1>

            <p style={{
                color: 'var(--neon-amber)',
                fontSize: '1.2rem',
                marginBottom: '3rem',
                fontFamily: 'var(--font-mono)'
            }}>
                <span className="animate-pulse-text">&gt; CALIBRATE EMOTIONAL SENSORS...</span>
            </p>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                maxWidth: '900px'
            }}>
                {moods.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => onSelectMood(m.id)}
                        style={{
                            background: 'rgba(0,0,0,0.4)',
                            border: `1px solid ${m.color}`,
                            color: m.color,
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            width: 'clamp(100px, 15vw, 140px)', // Fluid width
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 30px ${m.color}`;
                            e.currentTarget.style.background = `rgba(255,255,255,0.05)`;
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <m.icon size={48} strokeWidth={1} style={{ filter: `drop-shadow(0 0 5px ${m.color})` }} />
                        <span style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: '0.9rem',
                            letterSpacing: '2px'
                        }}>
                            {m.label}
                        </span>

                        {/* Corner Decor */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: `2px solid ${m.color}`, borderLeft: `2px solid ${m.color}` }} />
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: `2px solid ${m.color}`, borderRight: `2px solid ${m.color}` }} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;
