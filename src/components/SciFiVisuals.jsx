import React, { useEffect, useRef } from 'react';

export const HexGrid = () => (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
      linear-gradient(30deg, var(--grid-line) 12%, transparent 12.5%, transparent 87%, var(--grid-line) 87.5%, var(--grid-line)),
      linear-gradient(150deg, var(--grid-line) 12%, transparent 12.5%, transparent 87%, var(--grid-line) 87.5%, var(--grid-line)),
      linear-gradient(30deg, var(--grid-line) 12%, transparent 12.5%, transparent 87%, var(--grid-line) 87.5%, var(--grid-line)),
      linear-gradient(150deg, var(--grid-line) 12%, transparent 12.5%, transparent 87%, var(--grid-line) 87.5%, var(--grid-line)),
      linear-gradient(60deg, rgba(0, 255, 255, 0.05) 25%, transparent 25.5%, transparent 75%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05)),
      linear-gradient(60deg, rgba(0, 255, 255, 0.05) 25%, transparent 25.5%, transparent 75%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05))
    `,
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        opacity: 0.1,
        pointerEvents: 'none',
        zIndex: 0
    }} />
);

export const DataStream = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const chars = '0101010101XYZΩΣΠ';
        const columns = width / 20;
        const drops = [];

        for (let i = 0; i < columns; i++) drops[i] = 1;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0f0'; // Neon Green
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#0ff';
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975)
                    drops[i] = 0;
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '100%', opacity: 0.1, pointerEvents: 'none' }} />;
};

export const CircularGraph = () => (
    <div className="spin-slow" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        border: '1px dashed var(--auto-magenta)',
        borderRadius: '50%',
        opacity: 0.05,
        pointerEvents: 'none',
        zIndex: 0
    }}>
        <div className="spin-reverse-fast" style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            border: '2px solid var(--neon-cyan)',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: '50%',
            opacity: 0.3
        }} />
    </div>
);
