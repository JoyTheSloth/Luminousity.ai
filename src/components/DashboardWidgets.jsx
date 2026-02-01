import React, { useEffect, useState, useRef } from 'react';
import { Activity, Database, Radio, Wifi, Battery, Zap, Brain, Globe, Shield, Clock, RotateCcw, Lock, Unlock, Cpu } from 'lucide-react';

/* --- Shared Widget Container --- */
const Widget = ({ title, children, color = 'var(--neon-cyan)', align = 'left' }) => (
    <div style={{
        border: `1px solid ${color}`,
        background: 'rgba(0, 5, 10, 0.4)',
        marginBottom: '1rem',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            background: color,
            color: '#000',
            padding: '2px 8px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)'
        }}>
            <span style={{ letterSpacing: '2px' }}>{title}</span>
            <div style={{ width: '10px', height: '10px', background: '#000', animation: 'pulse-opacity 1s infinite' }} />
        </div>
        <div style={{ padding: '0.5rem' }}>
            {children}
        </div>
    </div>
);

/* --- System Load Graph --- */
export const SystemMonitor = () => {
    const [bars, setBars] = useState([...Array(10)].map(() => Math.random() * 100));

    useEffect(() => {
        const interval = setInterval(() => {
            setBars(prev => prev.map(() => Math.random() * 100));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <Widget title="NEURAL_LOAD" color="var(--neon-cyan)">
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '2px' }}>
                {bars.map((h, i) => (
                    <div key={i} style={{
                        flex: 1,
                        background: `linear-gradient(to top, var(--neon-cyan) ${h}%, transparent ${h}%)`,
                        height: '100%',
                        opacity: 0.8
                    }} />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '0.6rem', color: 'var(--text-dim)' }}>
                <span>CORE_01</span>
                <span>CORE_04</span>
            </div>
        </Widget>
    );
};

/* --- Network Logs --- */
export const NetworkLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const words = ['PACKET', 'SYNC', 'PING', 'ACK', 'HANDSHAKE', 'ENCRYPT'];
        const interval = setInterval(() => {
            const newLog = `> ${words[Math.floor(Math.random() * words.length)]}_${Math.floor(Math.random() * 999)}`;
            setLogs(prev => [newLog, ...prev].slice(0, 6));
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <Widget title="NET_TRAFFIC" color="var(--neon-amber)">
            <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-dim)', height: '80px', overflow: 'hidden' }}>
                {logs.map((log, i) => (
                    <div key={i} style={{ opacity: 1 - (i * 0.15) }}>{log}</div>
                ))}
            </div>
        </Widget>
    );
};

/* --- Memory Health --- */
export const MemoryCore = () => (
    <Widget title="MEMORY_INTEGRITY" color="var(--neon-purple)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
            {[...Array(16)].map((_, i) => (
                <div key={i} style={{
                    width: '100%',
                    paddingTop: '100%',
                    background: Math.random() > 0.8 ? 'var(--neon-purple)' : 'transparent',
                    border: '1px solid var(--neon-purple)',
                    opacity: Math.random() > 0.5 ? 0.8 : 0.3
                }} />
            ))}
        </div>
    </Widget>
);

/* --- Target Tracking (Active Connections) --- */
export const TargetTracking = () => (
    <Widget title="TARGET_LOCK" color="var(--neon-red)">
        <div style={{ position: 'relative', height: '100px', border: '1px dashed var(--neon-red)', borderRadius: '50%', margin: '10px' }}>
            <div className="spin-slow" style={{
                position: 'absolute', inset: '10px',
                border: '1px solid var(--neon-red)',
                borderRadius: '50%',
                borderRightColor: 'transparent'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '4px', height: '4px', background: 'var(--neon-red)', borderRadius: '50%',
                boxShadow: '0 0 10px var(--neon-red)'
            }} />
            <div style={{
                position: 'absolute', top: '20%', left: '60%',
                color: 'var(--neon-red)', fontSize: '0.6rem'
            }}>
                [LOCKED]
            </div>
        </div>
    </Widget>
);


/* --- New: Secure Uplink (API Key) --- */
export const SecureUplink = ({ apiKey, setApiKey }) => {
    const [locked, setLocked] = useState(true);

    return (
        <Widget title="SECURE_UPLINK" color="var(--neon-cyan)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input
                        type={locked ? "password" : "text"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        disabled={locked}
                        placeholder="ENTER_KEY..."
                        style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            border: '1px solid var(--grid-line)',
                            color: 'var(--text-primary)',
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            fontFamily: 'monospace'
                        }}
                    />
                </div>
                <button onClick={() => setLocked(!locked)} style={{
                    background: 'transparent',
                    border: 'none',
                    color: locked ? 'var(--neon-red)' : 'var(--neon-cyan)',
                    cursor: 'pointer'
                }}>
                    {locked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>
            </div>
            <div style={{ fontSize: '0.6rem', color: locked ? 'var(--neon-red)' : 'var(--neon-cyan)', marginTop: '4px' }}>
                STATUS: {locked ? 'ENCRYPTED' : 'WRITE_MODE'}
            </div>
        </Widget>
    );
};

/* --- New: Meteorite Radar --- */
export const MeteoriteRadar = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const meteors = [];

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 10, 20, 0.2)'; // Trail effect
            ctx.fillRect(0, 0, width, height);

            // Grid
            ctx.strokeStyle = 'rgba(255, 170, 0, 0.2)';
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, width * 0.3, 0, Math.PI * 2);
            ctx.stroke();

            // Meteors
            if (Math.random() > 0.95) {
                meteors.push({
                    x: Math.random() * width,
                    y: 0,
                    dx: (Math.random() - 0.5) * 4,
                    dy: Math.random() * 4 + 2
                });
            }

            ctx.fillStyle = '#ffaa00';
            for (let i = 0; i < meteors.length; i++) {
                const m = meteors[i];
                m.x += m.dx;
                m.y += m.dy;
                ctx.fillRect(m.x, m.y, 2, 8); // Tail

                if (m.y > height) meteors.splice(i, 1);
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

    return (
        <Widget title="METEOR_RADAR" color="var(--neon-amber)">
            <canvas ref={canvasRef} style={{ width: '100%', height: '100px' }} />
        </Widget>
    );
};

/* --- New: Time Controls --- */
export const TimeControls = ({ timeWarp, setTimeWarp, onTimeTravel }) => (
    <Widget title="PHYSICS_ENGINE" color="var(--neon-purple)">
        <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-dim)' }}>TIME_DILATION</span>
                <span style={{ color: 'var(--neon-purple)' }}>{timeWarp.toFixed(1)}x</span>
            </div>
            <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={timeWarp}
                onChange={(e) => setTimeWarp(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--neon-purple)' }}
            />
        </div>
        <button onClick={onTimeTravel} style={{
            width: '100%',
            background: 'rgba(188, 19, 254, 0.2)',
            border: '1px solid var(--neon-purple)',
            color: 'var(--neon-purple)',
            padding: '8px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }}>
            <RotateCcw size={14} /> INITIATE_TIME_JUMP
        </button>
    </Widget>
);

/* --- New: Model Selector --- */
export const ModelSelector = ({ currentModel, setModel }) => {
    return (
        <Widget title="NEURAL_CORE_SELECTOR" color="var(--neon-amber)">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                    onClick={() => setModel('gemini-1.5-flash')}
                    style={{
                        background: currentModel === 'gemini-1.5-flash' ? 'rgba(255, 170, 0, 0.2)' : 'transparent',
                        border: `1px solid ${currentModel === 'gemini-1.5-flash' ? 'var(--neon-amber)' : '#333'}`,
                        color: currentModel === 'gemini-1.5-flash' ? 'var(--neon-amber)' : 'var(--text-dim)',
                        padding: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={14} /> <span>FLASH_CORE_V1.5</span>
                    </div>
                    {currentModel === 'gemini-1.5-flash' && <div className="breathing" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-amber)' }} />}
                </button>

                <button
                    onClick={() => setModel('gemini-1.5-pro-latest')}
                    style={{
                        background: currentModel === 'gemini-1.5-pro-latest' ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                        border: `1px solid ${currentModel === 'gemini-1.5-pro-latest' ? 'var(--neon-cyan)' : '#333'}`,
                        color: currentModel === 'gemini-1.5-pro-latest' ? 'var(--neon-cyan)' : 'var(--text-dim)',
                        padding: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cpu size={14} /> <span>DEEP_CORE_V1.5 (LATEST)</span>
                    </div>
                    {currentModel === 'gemini-1.5-pro-latest' && <div className="breathing" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-cyan)' }} />}
                </button>
            </div>
        </Widget>
    );
};
