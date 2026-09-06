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
    const [currentTime, setCurrentTime] = useState(7); // seconds
    const [totalTime, setTotalTime] = useState(614); // 10:14
    const [isPadActive, setIsPadActive] = useState(true);
    const [activeSection, setActiveSection] = useState('V1');

    const DEFAULT_CHANNELS = [
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
    ];

    const [channels, setChannels] = useState(DEFAULT_CHANNELS);

    // REFS FOR AUDIO MANAGEMENT
    const audioCtxRef = useRef(null);
    const audioElementsRef = useRef({});
    const synthNodesRef = useRef(null);

    // Sync song parameters and dynamic channel strips when selectedSongId changes
    useEffect(() => {
        if (currentSong) {
            setBpm(currentSong.bpm || 135);
            setTimeSig(currentSong.timeSig || '4/4');

            if (currentSong.stemsList && currentSong.stemsList.length > 0) {
                const dynamicStrips = currentSong.stemsList.map((s, idx) => ({
                    id: s.id || `st_${idx}`,
                    label: s.label || s.tipo,
                    vol: 85,
                    muted: false,
                    solo: false,
                    key: s.tipo,
                    audioUrl: s.url || s.archivoUrl
                }));
                setChannels(dynamicStrips);
            } else if (currentSong.stems) {
                const legacyStrips = Object.entries(currentSong.stems).map(([key, url], idx) => ({
                    id: `legacy_${key}_${idx}`,
                    label: key.toUpperCase(),
                    vol: 85,
                    muted: false,
                    solo: false,
                    key: key,
                    audioUrl: url
                }));
                setChannels(legacyStrips.length > 0 ? legacyStrips : DEFAULT_CHANNELS);
            } else {
                setChannels(DEFAULT_CHANNELS);
            }
        }
    }, [selectedSongId, currentSong]);

    // PREPARE / CLEANUP REAL AUDIO ELEMENTS FOR UPLOADED STEMS
    useEffect(() => {
        // Cleanup existing audio elements
        Object.values(audioElementsRef.current).forEach(audio => {
            try {
                audio.pause();
                audio.src = '';
            } catch (e) {}
        });
        audioElementsRef.current = {};

        // Create new Audio elements for channels with audioUrl
        channels.forEach(ch => {
            if (ch.audioUrl && ch.audioUrl.length > 20) {
                try {
                    const audio = new Audio(ch.audioUrl);
                    audio.loop = true;
                    audio.preload = 'auto';
                    audioElementsRef.current[ch.id] = audio;
                } catch (e) {
                    console.warn('Error al cargar audio stem:', e);
                }
            }
        });

        return () => {
            Object.values(audioElementsRef.current).forEach(audio => {
                try {
                    audio.pause();
                } catch (e) {}
            });
        };
    }, [channels, selectedSongId]);

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

    // INITIALIZE WEB AUDIO CONTEXT
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

    // PLAY METRONOME CLICK SOUND
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

    // MULTI-TRACK SYNTHESIZER ENGINE (Synthesizes Drums, Bass, Keys for every beat)
    const playBeatSynth = (beat) => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const hasSolo = channels.some(c => c.solo);

        const isChannelActive = (term) => {
            const ch = channels.find(c =>
                (c.key && c.key.toLowerCase().includes(term)) ||
                (c.id && c.id.toLowerCase().includes(term)) ||
                (c.label && c.label.toLowerCase().includes(term))
            );
            if (!ch) return true;
            return hasSolo ? ch.solo : (!ch.muted && ch.vol > 0);
        };

        const getChannelVol = (term) => {
            const ch = channels.find(c =>
                (c.key && c.key.toLowerCase().includes(term)) ||
                (c.id && c.id.toLowerCase().includes(term)) ||
                (c.label && c.label.toLowerCase().includes(term))
            );
            return ch ? (ch.vol / 100) : 0.85;
        };

        try {
            const now = ctx.currentTime;

            // 1. BATERÍA & PANDERO (KICK & SNARE & PERCUSSION)
            if (isChannelActive('bat') || isChannelActive('drum') || isChannelActive('pan') || isChannelActive('percur')) {
                const vol = getChannelVol('bat');
                // Kick Drum on beat 0
                if (beat === 0) {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.setValueAtTime(130, now);
                    osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.18);
                    gain.gain.setValueAtTime(vol * 0.9, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.18);
                }
                // Snare Drum on beat 2
                if (beat === 2) {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(240, now);
                    gain.gain.setValueAtTime(vol * 0.7, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.14);
                }
            }

            // 2. BAJO (SUB BASS NOTE ON BEAT 0 & 2)
            if ((beat === 0 || beat === 2) && (isChannelActive('baj') || isChannelActive('bass'))) {
                const vol = getChannelVol('baj');
                const bassFreqMap = { 'C': 65.41, 'C#': 69.30, 'D': 73.42, 'Eb': 77.78, 'E': 82.41, 'F': 87.31, 'F#': 92.50, 'G': 98.00, 'Ab': 103.83, 'A': 110.00, 'Bb': 116.54, 'B': 123.47 };
                const freq = bassFreqMap[currentSong.tono] || 73.42;

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(vol * 0.45, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.38);
            }

            // 3. TECLADOS / PIANO & GUITARRAS (CHORD STABS ON BEAT 0 & 2)
            if ((beat === 0 || beat === 2) && (isChannelActive('tec') || isChannelActive('pian') || isChannelActive('key') || isChannelActive('ga') || isChannelActive('ge'))) {
                const vol = getChannelVol('tec');
                const chordMap = {
                    'C': [261.63, 329.63, 392.00],
                    'C#': [277.18, 349.23, 415.30],
                    'D': [293.66, 369.99, 440.00],
                    'Eb': [311.13, 392.00, 466.16],
                    'E': [329.63, 415.30, 493.88],
                    'F': [349.23, 440.00, 523.25],
                    'F#': [369.99, 466.16, 554.37],
                    'G': [392.00, 493.88, 587.33],
                    'Ab': [415.30, 523.25, 622.25],
                    'A': [440.00, 554.37, 659.25],
                    'Bb': [466.16, 587.33, 698.46],
                    'B': [493.88, 622.25, 739.99]
                };
                const chord = chordMap[currentSong.tono] || chordMap['D'];

                chord.forEach(f => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.value = f;
                    gain.gain.setValueAtTime(vol * 0.28, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.45);
                });
            }

        } catch (e) {
            // Ignore audio synth errors
        }
    };

    // AMBIENT SYNTH PAD GENERATOR (Web Audio API Chords based on Song Key)
    const startAmbientPad = () => {
        if (!audioCtxRef.current || !isPadActive) return;

        stopAmbientPad();

        const keyFreqMap = {
            'C': [130.81, 164.81, 196.00],
            'C#': [138.59, 174.61, 207.65],
            'D': [146.83, 185.00, 220.00],
            'Eb': [155.56, 196.00, 233.08],
            'E': [164.81, 207.65, 246.94],
            'F': [174.61, 220.00, 261.63],
            'F#': [185.00, 233.08, 277.18],
            'G': [196.00, 246.94, 293.66],
            'Ab': [207.65, 261.63, 311.13],
            'A': [220.00, 277.18, 329.63],
            'Bb': [233.08, 293.66, 349.23],
            'B': [246.94, 311.13, 369.99]
        };

        const freqs = keyFreqMap[currentSong.tono] || keyFreqMap['D'];

        try {
            const filter = audioCtxRef.current.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 650;

            const padGain = audioCtxRef.current.createGain();
            padGain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
            padGain.gain.exponentialRampToValueAtTime(0.22, audioCtxRef.current.currentTime + 1.0);

            filter.connect(padGain);
            padGain.connect(audioCtxRef.current.destination);

            const nodes = freqs.map(freq => {
                const osc = audioCtxRef.current.createOscillator();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                osc.connect(filter);
                osc.start();
                return osc;
            });

            synthNodesRef.current = { nodes, gain: padGain };
        } catch (e) {
            console.warn('Pad synth error:', e);
        }
    };

    const stopAmbientPad = () => {
        if (synthNodesRef.current?.nodes) {
            try {
                if (synthNodesRef.current.gain) {
                    synthNodesRef.current.gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
                }
                setTimeout(() => {
                    if (synthNodesRef.current?.nodes) {
                        synthNodesRef.current.nodes.forEach(n => {
                            try { n.stop(); } catch (e) {}
                        });
                        synthNodesRef.current = null;
                    }
                }, 300);
            } catch (e) {
                synthNodesRef.current = null;
            }
        }
    };

    // PLAY / PAUSE AUDIO CONTROL EFFECT
    useEffect(() => {
        const hasSolo = channels.some(c => c.solo);

        // Control real audio elements for uploaded stems
        channels.forEach(ch => {
            const audio = audioElementsRef.current[ch.id];
            if (!audio) return;

            const isMuted = ch.muted;
            const isSolo = ch.solo;
            const isActiveTrack = hasSolo ? isSolo : !isMuted;

            if (isPlaying && isActiveTrack) {
                audio.volume = Math.max(0, Math.min(1, ch.vol / 100));
                audio.play().catch(err => console.warn('Audio play error:', err));
            } else {
                audio.pause();
            }
        });

        // Control Ambient Synth Pad
        if (isPlaying && isPadActive) {
            startAmbientPad();
        } else {
            stopAmbientPad();
        }
    }, [isPlaying, channels, isPadActive, selectedSongId]);

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

    // METRONOME & BEAT SYNTH TICKING EFFECT
    useEffect(() => {
        let timer = null;
        if (isPlaying) {
            const intervalMs = (60 / bpm) * 1000;
            let beat = 0;
            timer = setInterval(() => {
                playClickSound(beat === 0);
                playBeatSynth(beat);
                beat = (beat + 1) % 4;
            }, intervalMs);
        }
        return () => clearInterval(timer);
    }, [isPlaying, bpm, channels]);

    const togglePlay = () => {
        initAudio();
        const nextState = !isPlaying;
        setIsPlaying(nextState);

        const hasSolo = channels.some(c => c.solo);

        // SYNCHRONOUSLY PLAY/PAUSE STEM AUDIO ELEMENTS ON USER GESTURE
        Object.entries(audioElementsRef.current).forEach(([chId, audio]) => {
            const ch = channels.find(c => c.id === chId);
            const isMuted = ch ? ch.muted : false;
            const isSolo = ch ? ch.solo : false;
            const isActiveTrack = hasSolo ? isSolo : !isMuted;

            if (nextState && isActiveTrack) {
                try {
                    audio.currentTime = currentTime;
                    audio.volume = ch ? Math.max(0, Math.min(1, ch.vol / 100)) : 0.8;
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(err => console.warn('Error reproduciendo stem:', err));
                    }
                } catch (err) {
                    console.warn('Error al iniciar audio stem:', err);
                }
            } else {
                try {
                    audio.pause();
                } catch (err) {}
            }
        });

        // CONTROL AMBIENT SYNTH PAD
        if (nextState && isPadActive) {
            startAmbientPad();
        } else {
            stopAmbientPad();
        }

        const audioCount = Object.keys(audioElementsRef.current).length;
        showToast(
            nextState
                ? `▶ Reproduciendo "${currentSong.titulo}" (${bpm} BPM) • Meclador Multitrack Activo`
                : '❚❚ Pausado',
            nextState ? 'success' : 'info'
        );
    };

    const handleRewind = () => {
        setCurrentTime(0);
        Object.values(audioElementsRef.current).forEach(audio => {
            try { audio.currentTime = 0; } catch (e) {}
        });
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
                    <span className="playback-song-title">{currentSong.titulo}</span>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{currentSong.autor} • Tono: {currentSong.tono}</div>
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
                                Object.values(audioElementsRef.current).forEach(audio => {
                                    try { audio.currentTime = sec.startSec; } catch (e) {}
                                });
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
                    const hasAudioFile = Boolean(ch.audioUrl);

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
                            <div className="playback-track-label" title={ch.label}>
                                {hasAudioFile && <i className="fas fa-volume-up" style={{ color: '#22c55e', marginRight: '4px' }}></i>}
                                {ch.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
