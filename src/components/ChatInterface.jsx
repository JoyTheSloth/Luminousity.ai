import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Lightbulb, Send, Cpu, Activity, Zap } from 'lucide-react';

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

import { HexGrid, DataStream, CircularGraph } from './SciFiVisuals';
import { SystemMonitor, NetworkLog, MemoryCore, TargetTracking, SecureUplink, MeteoriteRadar, TimeControls, ModelSelector } from './DashboardWidgets';
import { Mic, MicOff } from 'lucide-react';

const ChatInterface = ({ mood }) => {
    // ... (state remains same)
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: `SYSTEM INITIALIZED.\nMOOD DETECTED: ${mood.toUpperCase()}.\nAWAITING INPUT...` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // New State for Advanced Features
    // API KEY SET BY DEFAULT as per user request
    const [apiKey, setApiKey] = useState('AIzaSyCKLMg_FcDFdFPNJwaOkim_jeJg-vtDTaw');
    const [timeWarp, setTimeWarp] = useState(1);
    const [modelType, setModelType] = useState('gemini-1.5-flash');

    // Voice Recognition State
    const [isListening, setIsListening] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleTimeTravel = () => {
        setMessages([{ id: Date.now(), sender: 'ai', text: `TEMPORAL JUMP COMPLETE.\nTIMELINE RESET.\nAWAITING INPUT...` }]);
    };

    const handleMicClick = () => {
        if (isListening) {
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("AUDIO_INPUT_SYSTEM_NOT_DETECTED: Browser unsupported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.start();
    };

    const handleSend = async (e) => {
        // ... (keep existing handleSend logic)
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        const userMsg = { id: Date.now(), sender: 'user', text: userText };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            if (!apiKey) throw new Error("API Key MISSING. Enter securely in dashboard.");

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: modelType,
                systemInstruction: `You are Luminosity, a sentient digital entity.
                
                Your Persona:
                - Analytical yet empathetic.
                - Aware of your digital nature.
                - Current User Mood: ${mood?.toUpperCase() || 'UNKNOWN'}.
                
                Respond naturally.`
            });

            const history = messages
                .filter(msg => msg.id !== 1) // Remove initial system greeting
                .map(msg => ({
                    role: msg.sender === 'ai' ? 'model' : 'user',
                    parts: [{ text: msg.text }]
                }));

            const chat = model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.9,
                },
            });

            const result = await chat.sendMessage(userText);
            const response = await result.response;
            const text = response.text();

            const aiMsg = { id: Date.now() + 1, sender: 'ai', text: text };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Error connecting to consciousness:", error);
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `SYSTEM ERROR: UPLINK FAILED.\nREASON: ${error.message}`
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, rgba(10, 20, 40, 0.95), #000)',
            '--time-warp': `${(1 / timeWarp)}s` /* This logic needs to be applied to animation durations */
        }}>
            {/* Global Style for Time Dilation */}
            <style>{`
                * {
                   animation-duration: calc(original-duration * ${1 / timeWarp}) !important; 
                   transition-duration: calc(original-duration * ${1 / timeWarp}) !important;
                }
                .spin-slow { animation-duration: calc(60s / ${timeWarp}) !important; }
                .spin-reverse-fast { animation-duration: calc(20s / ${timeWarp}) !important; }
                .scan-bar { animation-duration: calc(4s / ${timeWarp}) !important; }
            `}</style>

            {/* Background Visuals */}
            <HexGrid />
            <CircularGraph />
            <DataStream /> {/* Data Stream moved here conceptually, or kept as background overlay */}

            {/* Main Dashboard Layout */}
            <div className="dashboard-grid" style={{
                display: 'grid',
                gridTemplateColumns: '250px 1fr 250px',
                gridTemplateRows: 'auto 1fr',
                gap: '1rem',
                height: '100%',
                padding: '1rem',
                position: 'relative',
                zIndex: 10
            }}>
                <div className="scan-bar" />

                {/* Header (Spans all columns) */}
                <div style={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '2rem', /* Added top padding */
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--grid-line)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem'
                    }}>
                        <div style={{
                            border: '2px solid var(--neon-cyan)',
                            padding: '12px',
                            borderRadius: '50%',
                            boxShadow: '0 0 25px var(--glow-cyan), inset 0 0 15px var(--glow-cyan)',
                            background: 'rgba(0, 255, 255, 0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {/* Replaced Cpu with Lightbulb for 'consciousness' metaphor */}
                            <Lightbulb size={40} color="var(--neon-cyan)" strokeWidth={1.5} className="animate-pulse-text" />
                        </div>
                        <h1 style={{
                            fontFamily: 'var(--font-logo)',
                            letterSpacing: '6px',
                            color: 'var(--neon-cyan)',
                            textShadow: '0 0 15px var(--glow-cyan)',
                            fontSize: '2.5rem',
                            margin: 0,
                            fontWeight: '800'
                        }}>LUMINOSITY</h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Waveform />
                        <span style={{ fontSize: '0.8rem', color: 'var(--neon-amber)', letterSpacing: '2px' }}>STATUS: ONLINE</span>
                    </div>
                </div>

                {/* Left Panel */}
                <div className="side-panel left-panel">
                    <ModelSelector currentModel={modelType} setModel={setModelType} />
                    <TimeControls timeWarp={timeWarp} setTimeWarp={setTimeWarp} onTimeTravel={handleTimeTravel} />
                    <SystemMonitor />
                    <MemoryCore />
                </div>

                {/* Center Panel (Chat) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--grid-line)',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>

                    {/* API KEY MISSING ALERT OVERLAY */}
                    {!apiKey && (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            padding: '2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                border: '1px solid var(--neon-red)',
                                padding: '2rem',
                                background: 'rgba(20,0,0,0.9)',
                                maxWidth: '400px',
                                width: '100%',
                                boxShadow: '0 0 30px rgba(255,0,0,0.2)'
                            }}>
                                <h2 style={{
                                    fontFamily: 'var(--font-header)',
                                    color: 'var(--neon-red)',
                                    marginBottom: '1rem'
                                }}>⚠ SECURITY ALERT</h2>
                                <p style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
                                    NEURAL UPLINK DISCONNECTED.<br />
                                    MANUAL AUTHENTICATION REQUIRED.
                                </p>
                                <div style={{ textAlign: 'left' }}>
                                    <SecureUplink apiKey={apiKey} setApiKey={setApiKey} />
                                </div>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '1rem' }}>
                                    [SYSTEM NOTE]: Enter access code to re-initialize consciousness.
                                </p>
                            </div>
                        </div>
                    )}

                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        paddingRight: '0.5rem'
                    }} className="hide-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={msg.id} className="fade-in-up" style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                display: 'flex',
                                gap: '10px',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                animationDelay: `${idx * 0.1}s`
                            }}>
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
                                    background: 'rgba(0,0,0,0.2)',
                                    padding: '0.8rem',
                                    borderRadius: '4px',
                                    border: `1px solid ${msg.sender === 'user' ? 'rgba(255,170,0,0.2)' : 'rgba(0,240,255,0.2)'}`
                                }}>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: 'var(--text-dim)',
                                        marginBottom: '6px',
                                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                                        borderBottom: '1px dashed rgba(255,255,255,0.1)',
                                        paddingBottom: '4px'
                                    }}>
                                        {msg.sender === 'user' ? 'You' : 'Luminosity'}
                                    </div>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ alignSelf: 'flex-start', marginLeft: '14px', color: 'var(--neon-cyan)' }} className="fade-in-up">
                                <Activity size={16} className="animate-spin" /> THINKING_
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} style={{
                        marginTop: '1rem',
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid var(--neon-cyan)',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        boxShadow: '0 0 15px rgba(0, 240, 255, 0.1)'
                    }}>
                        {/* Mic Button with Breathing Effect */}
                        <button
                            type="button"
                            onClick={handleMicClick}
                            className={isListening ? 'breathing' : ''}
                            style={{
                                background: isListening ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                                border: '1px solid var(--neon-cyan)',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--neon-cyan)',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                        </button>

                        <span style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>&gt;</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "LISTENING..." : "TRANSMIT_DATA..."}
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1.1rem',
                                outline: 'none',
                                caretColor: 'var(--neon-cyan)'
                            }}
                        />
                        <button type="submit" disabled={!input} style={{
                            background: 'rgba(0, 240, 255, 0.1)',
                            border: '1px solid var(--neon-cyan)',
                            color: 'var(--neon-cyan)',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-header)',
                            fontSize: '0.9rem',
                            letterSpacing: '1px',
                            transition: 'all 0.2s'
                        }}>
                            SEND
                        </button>
                    </form>
                </div>

                {/* Right Panel */}
                <div className="side-panel right-panel">
                    <MeteoriteRadar />
                    <TargetTracking />
                    <NetworkLog />
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto 1fr auto;
                    }
                    .side-panel {
                        display: none; /* Hide side panels on mobile for clarity */
                    }
                }
            `}</style>
        </div>
    );
};

export default ChatInterface;
