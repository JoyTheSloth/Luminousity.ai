import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import ChatInterface from './components/ChatInterface';
import './index.css';

function App() {
  const [view, setView] = useState('mood'); // 'mood' | 'chat'
  const [mood, setMood] = useState(null);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setView('chat');
  };

  return (
    <div className="monitor-frame">
      <div className="monitor-scanlines" />
      <div style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {view === 'mood' && (
          <MoodSelector onSelectMood={handleMoodSelect} />
        )}

        {view === 'chat' && (
          <ChatInterface mood={mood} />
        )}
      </div>
    </div>
  );
}

export default App;
