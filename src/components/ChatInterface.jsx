import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Activity } from 'lucide-react';

/* Waveform Visualizer Component */
const Waveform = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '20px' }}>
        {[...Array(5)].map((_, i) => (
            <div
                key={i}
                style={{
                    width: '3px',
                    background: 'var(--neon-cyan)',
                    height: '100%',
                    animation: `wave 1s infinite ease-in-out ${i * 0.1}s`
                }}
            />
        ))}
        <style>{`
      @keyframes wave {
        0%, 100% { height: 20%; opacity: 0.5; }
        50% { height: 100%; opacity: 1; box-shadow: 0 0 10px var(--neon-cyan); }
      }
    `}</style>
    </div>
);

const ChatInterface = ({ mood }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: `SYSTEM INITIALIZED.\nMOOD DETECTED: ${mood.toUpperCase()}.\nAWAITING INPUT...` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const responses = [
                "PROCESSING...",
                "DATA RECEIVED.",
                "CALCULATING TRAJECTORY.",
                "INTERESTING.",
                "AFFIRMATIVE.",
                "I AM LISTENING.",
                `OPTIMIZING FOR ${mood.toUpperCase()} STATE.`
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMsg = { id: Date.now() + 1, sender: 'ai', text: randomResponse };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem', /* Reduced padding for mobile */
            background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.03), transparent 70%)',
            position: 'relative'
        }}>
            <div className="scan-bar" /> {/* Moving scanline */}

            {/* HUD Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--grid-line)',
                marginBottom: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                        border: '1px solid var(--neon-cyan)',
                        padding: '5px',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px var(--glow-cyan)'
                    }}>
                        <Cpu size={20} color="var(--neon-cyan)" />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-header)',
                        letterSpacing: '2px',
                        color: 'var(--neon-cyan)',
                        textShadow: 'var(--glow-cyan)',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}>LUMINOSITY</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Waveform />
                    <span style={{ fontSize: '0.7rem', color: 'var(--neon-amber)', letterSpacing: '1px' }}>ONLINE</span>
                </div>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '0.5rem',
                scrollBehavior: 'smooth'
            }} className="hide-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={msg.id} className="fade-in-up" style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%', /* Increased width for mobile */
                        display: 'flex',
                        gap: '10px',
                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                        animationDelay: `${idx * 0.1}s` /* Staggered init */
                    }}>
                        {/* Neon Bar Indicator */}
                        <div style={{
                            width: '4px',
                            backgroundColor: msg.sender === 'user' ? 'var(--neon-amber)' : 'var(--neon-cyan)',
                            boxShadow: `0 0 10px ${msg.sender === 'user' ? 'var(--neon-amber)' : 'var(--neon-cyan)'}`,
                            borderRadius: '2px',
                            flexShrink: 0
                        }} />

                        <div style={{
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            textShadow: '0 0 5px rgba(0,0,0,0.5)',
                            whiteSpace: 'pre-wrap',
                            background: 'rgba(0,0,0,0.2)', /* Background readability */
                            padding: '0.5rem',
                            borderRadius: '4px'
                        }}>
                            <div style={{
                                fontSize: '0.7rem',
                                color: 'var(--text-dim)',
                                marginBottom: '4px',
                                textAlign: msg.sender === 'user' ? 'right' : 'left'
                            }}>
                                {msg.sender === 'user' ? 'YOU' : 'UNIT-01'}
                            </div>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ alignSelf: 'flex-start', marginLeft: '14px', color: 'var(--neon-cyan)' }} className="fade-in-up">
                        <Activity size={16} className="animate-spin" /> WRITING_
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Terminal */}
            <form onSubmit={handleSend} style={{
                marginTop: '0.5rem',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid var(--grid-line)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '4px'
            }}>
                <span style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>&gt;&gt;</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER_COMMAND..."
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        outline: 'none',
                        caretColor: 'var(--neon-cyan)',
                        minWidth: 0 /* Prevent flex overflow */
                    }}
                />
                <button type="submit" style={{
                    background: 'transparent',
                    border: '1px solid var(--neon-cyan)',
                    color: 'var(--neon-cyan)',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem'
                }}>
                    SEND
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
