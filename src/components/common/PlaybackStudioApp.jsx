import React, { useState, useEffect, useRef } from 'react';
import { useWorship } from '../../services/WorshipContext';

export default function PlaybackStudioApp() {
    const { db, currentUser, showToast } = useWorship();
    const myInstrument = currentUser?.area || currentUser?.instrument || 'Teclados';

    // DEFAULT SETLIST + UPLOADED SONGS FROM PLAYBACK CLOUD
    const defaultSetlist = [
        { id: 's1', titulo: 'Júbilo', tono: 'D', autor: 'Miel San Marcos', bpm: 135, timeSig: '4/4', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80' },
        { id: 's2', titulo: 'Bienvenido...', tono: 'C', autor: 'Elevation Worship', bpm: 128, timeSig: '4/4', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=80' },
        { id: 's3', titulo: 'Hay Libertad', tono: 'F', autor: 'La Imet', bpm: 140, timeSig: '4/4', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=80' },
        { id: 's4', titulo: 'Rey de Reyes', tono: 'D', autor: 'Hillsong Worship', bpm: 72, timeSig: '6/8', cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&auto=format&fit=crop&q=80' }
    ];

    const uploadedSongs = db.canciones || [];
    const setlist = [...uploadedSongs, ...defaultSetlist];

    // PLAYBACK STATE
    const [selectedSongId, setSelectedSongId] = useState('s1');
    const currentSong = setlist.find(s => s.id === selectedSongId) || setlist[0];

    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(currentSong.bpm || 135);
    const [timeSig, setTimeSig] = useState(currentSong.timeSig || '4/4');
    const [currentTime, setCurrentTime] = useState(7); // seconds (00:07)
    const [totalTime, setTotalTime] = useState(614); // 10:14
    const [isPadActive, setIsPadActive] = useState(true);
    const [activeSection, setActiveSection] = useState('V1');

    // Sync song parameters when selectedSongId changes
    useEffect(() => {
        if (currentSong) {
            setBpm(currentSong.bpm || 135);
            setTimeSig(currentSong.timeSig || '4/4');
        }
    }, [selectedSongId, currentSong]);

    // CHANNEL STRIPS STATE (matching screenshot tracks exactly)
    const [channels, setChannels] = useState([
        { id: 'bateria', label: 'Batería', vol: 85, muted: false, solo: false, key: 'bateria' },
        { id: 'pandero', label: 'Pandero', vol: 70, muted: false, solo: false, key: 'percursion' },
        { id: 'loop', label: 'Loop', vol: 80, muted: false, solo: false, key: 'loop' },
        { id: 'fx', label: 'Fx', vol: 65, muted: false, solo: false, key: 'fx' },
        { id: 'bajo', label: 'Bajo', vol: 90, muted: false, solo: false, key: 'bajo' },
        { id: 'bajosnt', label: 'BajoSnt', vol: 75, muted: false, solo: false, key: 'bajosnt' },
        { id: 'ga', label: 'GA', vol: 80, muted: false, solo: false, key: 'ga' },
        { id: 'ge', label: 'GE', vol: 85, muted: false, solo: false, key: 'ge' },
        { id: 'teclados', label: 'Teclados', vol: 90, muted: false, solo: false, key: 'teclados' },
        { id: 'voces', label: 'Voces', vol: 75, muted: false, solo: false, key: 'voces' },
        { id: 'master', label: 'Master', vol: 95, muted: false, solo: false, key: 'master' }
    ]);

    // SECTIONS MARKERS
    const songSections = [
        { id: 'I', label: 'Intro', color: '#3b82f6', startSec: 0 },
        { id: 'V1', label: 'Verse 1', color: '#6366f1', startSec: 15 },
        { id: 'V2', label: 'Verse 2', color: '#8b5cf6', startSec: 45 },
        { id: 'C', label: 'Chorus', color: '#10b981', startSec: 90 },
        { id: 'It', label: 'Interlude', color: '#f59e0b', startSec: 140 },
        { id: 'B', label: 'Bridge', color: '#ec4899', startSec: 180 },
        { id: 'O', label: 'Outro', color: '#ef4444', startSec: 240 }
    ];

    // AUDIO CONTEXT FOR METRONOME & SYNTH PADS
    const audioCtxRef = useRef(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                audioCtxRef.current = new AudioCtx();
            }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    const playClickSound = (high = false) => {
        if (!audioCtxRef.current) return;
        try {
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();
            osc.type = 'sine';
            osc.frequency.value = high ? 1200 : 800;
            gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(audioCtxRef.current.destination);
            osc.start();
            osc.stop(audioCtxRef.current.currentTime + 0.08);
        } catch (e) {
            // Ignore audio context errors
        }
    };

    // PLAYHEAD TIMER EFFECT
    useEffect(() => {
        let interval = null;
        if (isPlaying) {
            initAudio();
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= totalTime) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, totalTime]);

    // METRONOME TICKING EFFECT
    useEffect(() => {
        let timer = null;
        if (isPlaying) {
            const intervalMs = (60 / bpm) * 1000;
            let beat = 0;
            timer = setInterval(() => {
                playClickSound(beat === 0);
                beat = (beat + 1) % 4;
            }, intervalMs);
        }
        return () => clearInterval(timer);
    }, [isPlaying, bpm]);

    const togglePlay = () => {
        initAudio();
        const nextState = !isPlaying;
        setIsPlaying(nextState);
        showToast(nextState ? `▶ Reproduciendo ${currentSong.titulo} (135 BPM)` : '❚❚ Pausado', nextState ? 'success' : 'info');
    };

    const handleRewind = () => {
        setCurrentTime(0);
        showToast('Rebobinado al inicio 00:00', 'info');
    };

    const toggleMute = (channelId) => {
        setChannels(prev => prev.map(ch => ch.id === channelId ? { ...ch, muted: !ch.muted } : ch));
    };

    const toggleSolo = (channelId) => {
        setChannels(prev => prev.map(ch => ch.id === channelId ? { ...ch, solo: !ch.solo } : { ...ch, solo: false }));
    };

    const handleVolChange = (channelId, val) => {
        setChannels(prev => prev.map(ch => ch.id === channelId ? { ...ch, vol: parseInt(val) } : ch));
    };

    // MUTE MY INSTRUMENT QUICK BUTTON
    const handleMuteMyInstrument = () => {
        const inst = myInstrument.toLowerCase();
        let targetId = 'teclados';
        if (inst.includes('bat') || inst.includes('drum')) targetId = 'bateria';
        else if (inst.includes('baj') || inst.includes('bass')) targetId = 'bajo';
        else if (inst.includes('gui') || inst.includes('guit')) targetId = 'ge';
        else if (inst.includes('voc') || inst.includes('cant')) targetId = 'voces';

        setChannels(prev => prev.map(ch => ch.id === targetId ? { ...ch, muted: !ch.muted } : ch));
        showToast(`Silencio alternado para tu instrumento: ${myInstrument}`, 'info');
    };

    // FORMAT TIME (MM:SS)
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="playback-ios-container">
            {/* 1. TOP HEADER TRANSPORT BAR */}
            <div className="playback-top-header">
                {/* LEFT TRANSPORT METRICS */}
                <div className="playback-header-left">
                    <div className="playback-metric-badge">
                        <span className="playback-metric-value">{bpm}</span>
                        <span className="playback-metric-label">BPM</span>
                    </div>
                    <div className="playback-metric-badge">
                        <span className="playback-metric-value">{timeSig}</span>
                    </div>

                    <div className="playback-clock-display">
                        <div className="playback-clock-main">{formatTime(currentTime)}</div>
                        <div className="playback-clock-sub">0:00 / {formatTime(totalTime)}</div>
                    </div>
                </div>

                {/* CENTER TITLE */}
                <div className="playback-header-center">
                    <span className="playback-song-title">Repertorio del Domingo</span>
                </div>

                {/* RIGHT TRANSPORT CONTROLS */}
                <div className="playback-header-right">
                    {/* MAIN NEON PLAY BUTTON */}
                    <button className={`playback-btn-play ${isPlaying ? 'playing' : ''}`} onClick={togglePlay} title="Play / Pause">
                        <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
                    </button>

                    {/* PAD BUTTON */}
                    <button
                        className={`playback-pill-btn ${isPadActive ? 'active' : ''}`}
                        onClick={() => setIsPadActive(!isPadActive)}
                    >
                        PAD
                    </button>

                    {/* REWIND BUTTON */}
                    <button className="playback-icon-btn" onClick={handleRewind} title="Ir al Inicio">
                        <i className="fas fa-step-backward"></i>
                    </button>

                    {/* EDITAR BUTTON */}
                    <button className="playback-pill-btn green-outline">
                        EDITAR
                    </button>

                    {/* MENU ICON */}
                    <button className="playback-icon-btn" title="Menú">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            {/* 2. REPERTORIO SETLIST CAROUSEL */}
            <div className="playback-setlist-bar">
                <div className="playback-setlist-carousel">
                    {setlist.map((song) => {
                        const isSelected = song.id === selectedSongId;
                        return (
                            <div
                                key={song.id}
                                className={`playback-song-card ${isSelected ? 'active' : ''}`}
                                onClick={() => setSelectedSongId(song.id)}
                            >
                                <img src={song.cover} alt={song.titulo} className="playback-card-art" />
                                <div className="playback-card-info">
                                    <div className="playback-card-title">
                                        {song.titulo} <span className="playback-key-tag">({song.tono})</span>
                                    </div>
                                    <div className="playback-card-artist">{song.autor}</div>
                                </div>
                                {isSelected && (
                                    <div className="playback-active-arrow">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 3. SECTION MARKERS & AUDIO WAVEFORM SECTION */}
            <div className="playback-waveform-section">
                {/* SECTION MARKER BADGES */}
                <div className="playback-sections-header">
                    {songSections.map(sec => (
                        <button
                            key={sec.id}
                            className={`playback-section-badge ${activeSection === sec.id ? 'active' : ''}`}
                            style={{ '--sec-color': sec.color }}
                            onClick={() => {
                                setActiveSection(sec.id);
                                setCurrentTime(sec.startSec);
                            }}
                        >
                            [{sec.id}] {sec.label}
                        </button>
                    ))}
                </div>

                {/* WAVEFORM CANVAS / VISUALIZER WITH PLAYHEAD LINE */}
                <div className="playback-waveform-visualizer">
                    <div className="playback-waveform-graph">
                        {[...Array(64)].map((_, i) => {
                            const h1 = 20 + Math.sin(i * 0.4) * 35 + Math.cos(i * 0.2) * 25;
                            return (
                                <div
                                    key={i}
                                    className="playback-wave-bar"
                                    style={{
                                        height: `${Math.max(15, Math.min(90, h1))}%`,
                                        opacity: (i / 64) * 614 < currentTime ? 0.95 : 0.45
                                    }}
                                ></div>
                            );
                        })}
                    </div>

                    {/* VERTICAL PLAYHEAD CURSOR LINE */}
                    <div
                        className="playback-playhead-line"
                        style={{ left: `${Math.min(100, (currentTime / totalTime) * 100)}%` }}
                    >
                        <div className="playback-playhead-head"></div>
                    </div>
                </div>
            </div>

            {/* MUTE MY INSTRUMENT ACTION BAR */}
            <div className="playback-quick-actions">
                <button className="playback-mute-my-inst-btn" onClick={handleMuteMyInstrument}>
                    <i className="fas fa-volume-mute"></i> MUTEAR MI INSTRUMENTO ({myInstrument.toUpperCase()})
                </button>
            </div>

            {/* 4. VERTICAL CHANNEL STRIP MIXER CONSOLE GRID */}
            <div className="playback-mixer-console">
                {channels.map((ch) => {
                    const isMuted = ch.muted;
                    const isSolo = ch.solo;
                    return (
                        <div
                            key={ch.id}
                            className={`playback-channel-strip ${isMuted ? 'muted' : ''} ${isSolo ? 'solo' : ''}`}
                        >
                            {/* TOP MUTE / SOLO SQUARE BUTTONS */}
                            <div className="playback-strip-controls">
                                <button
                                    className={`playback-square-btn btn-mute ${isMuted ? 'active' : ''}`}
                                    onClick={() => toggleMute(ch.id)}
                                >
                                    M
                                </button>
                                <button
                                    className={`playback-square-btn btn-solo ${isSolo ? 'active' : ''}`}
                                    onClick={() => toggleSolo(ch.id)}
                                >
                                    S
                                </button>
                            </div>

                            {/* VERTICAL FADER AREA WITH LED METER */}
                            <div className="playback-fader-container">
                                {/* LED LEVEL METER */}
                                <div className="playback-led-meter">
                                    {[...Array(12)].map((_, idx) => {
                                        const activeCount = Math.floor((ch.vol / 100) * 12);
                                        const isLit = isPlaying && !isMuted && (11 - idx) < activeCount;
                                        let ledClass = 'green';
                                        if (idx < 2) ledClass = 'red';
                                        else if (idx < 4) ledClass = 'yellow';

                                        return (
                                            <div
                                                key={idx}
                                                className={`playback-led-bar ${ledClass} ${isLit ? 'lit' : ''}`}
                                            ></div>
                                        );
                                    })}
                                </div>

                                {/* VERTICAL SLIDER FADER INPUT */}
                                <div className="playback-slider-track">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : ch.vol}
                                        disabled={isMuted}
                                        onChange={(e) => handleVolChange(ch.id, e.target.value)}
                                        className="playback-vertical-fader"
                                    />
                                </div>
                            </div>

                            {/* BOTTOM TRACK LABEL BADGE */}
                            <div className="playback-track-label">
                                {ch.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
