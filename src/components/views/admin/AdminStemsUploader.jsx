import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';

export default function AdminStemsUploader() {
    const { db, updateDb, showToast } = useWorship();

    // NUEVA CANCIÓN FORM STATE
    const [nuevaCancion, setNuevaCancion] = useState({
        titulo: '',
        autor: '',
        tono: 'D',
        bpm: 120,
        timeSig: '4/4',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80'
    });

    // STEMS FILES STATE (storing file object or objectURL)
    const STEM_KEYS = [
        { id: 'bateria', label: 'Batería Multitrack', icon: 'fas fa-drum' },
        { id: 'pandero', label: 'Pandero & Percusiones', icon: 'fas fa-drum-steelpan' },
        { id: 'loop', label: 'Loop Rítmico', icon: 'fas fa-redo' },
        { id: 'fx', label: 'Efectos / Fx', icon: 'fas fa-bolt' },
        { id: 'bajo', label: 'Bajo Eléctrico', icon: 'fas fa-guitar' },
        { id: 'bajosnt', label: 'Bajo Synth / Sub', icon: 'fas fa-wave-square' },
        { id: 'ga', label: 'GA (Guitarra Acústica)', icon: 'fas fa-guitar' },
        { id: 'ge', label: 'GE (Guitarra Eléctrica)', icon: 'fas fa-bolt' },
        { id: 'teclados', label: 'Teclados & Synths', icon: 'fas fa-music' },
        { id: 'voces', label: 'Voces de Acompañamiento', icon: 'fas fa-microphone' },
        { id: 'click', label: 'Metrónomo & Guía de Voz', icon: 'fas fa-stopwatch' }
    ];

    const [stemsArchivos, setStemsArchivos] = useState({
        bateria: null,
        pandero: null,
        loop: null,
        fx: null,
        bajo: null,
        bajosnt: null,
        ga: null,
        ge: null,
        teclados: null,
        voces: null,
        click: null
    });

    const [stemsNombres, setStemsNombres] = useState({});

    // HANDLE FILE SELECTION FOR SPECIFIC STEM
    const handleFileChange = (stemId, e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setStemsArchivos(prev => ({ ...prev, [stemId]: objectUrl }));
        setStemsNombres(prev => ({ ...prev, [stemId]: file.name }));
        showToast(`Stem ${file.name} listo para subir`, 'info');
    };

    // SUBMIT CANCIÓN MULTITRACK A LA NUBE
    const handleGuardarCancion = (e) => {
        e.preventDefault();
        if (!nuevaCancion.titulo || !nuevaCancion.autor) {
            showToast('Ingresa al menos el título y autor de la canción', 'error');
            return;
        }

        const songId = 'c_' + Date.now();
        const countUploaded = Object.values(stemsArchivos).filter(Boolean).length;

        const cancionGuardada = {
            id: songId,
            titulo: nuevaCancion.titulo,
            autor: nuevaCancion.autor,
            tono: nuevaCancion.tono,
            bpm: parseInt(nuevaCancion.bpm) || 120,
            timeSig: nuevaCancion.timeSig,
            cover: nuevaCancion.coverUrl,
            fechaCarga: new Date().toLocaleDateString('es-MX'),
            stems: { ...stemsArchivos },
            stemsNombres: { ...stemsNombres },
            totalStems: countUploaded || 11
        };

        updateDb(prev => {
            const cancExistentes = prev.canciones || [];
            return {
                ...prev,
                canciones: [cancionGuardada, ...cancExistentes]
            };
        });

        // RESET FORM
        setNuevaCancion({
            titulo: '',
            autor: '',
            tono: 'D',
            bpm: 120,
            timeSig: '4/4',
            coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80'
        });
        setStemsArchivos({
            bateria: null, pandero: null, loop: null, fx: null, bajo: null,
            bajosnt: null, ga: null, ge: null, teclados: null, voces: null, click: null
        });
        setStemsNombres({});

        showToast(`🎵 Canción "${cancionGuardada.titulo}" subida exitosamente a Playback Cloud`, 'success');
    };

    // BORRAR CANCIÓN DE LA NUBE
    const handleEliminarCancion = (id, titulo) => {
        if (window.confirm(`¿Eliminar la canción "${titulo}" de Playback Cloud?`)) {
            updateDb(prev => ({
                ...prev,
                canciones: (prev.canciones || []).filter(c => c.id !== id)
            }));
            showToast(`Canción "${titulo}" eliminada`, 'info');
        }
    };

    const listaCanciones = db.canciones || [];

    return (
        <div className="admin-stems-uploader animate-fade-in">
            {/* BANNER NUBE PLAYBACK */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(15, 23, 42, 0.8))',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '18px',
                padding: '1.5rem 1.8rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <span style={{ background: '#22c55e', color: '#000000', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>
                        Playback Cloud Studio
                    </span>
                    <h2 style={{ margin: '8px 0 4px', color: '#ffffff', fontSize: '1.6rem', fontWeight: 800 }}>
                        <i className="fas fa-cloud-upload-alt" style={{ color: '#22c55e', marginRight: '10px' }}></i>
                        Cargar Canción & Stems Multitrack
                    </h2>
                    <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                        Sube pistas separadas stem por stem (MP3, WAV, M4A) para los ensambles de la academia. Se integrarán automáticamente a la consola iOS Playback.
                    </p>
                </div>
            </div>

            {/* FORMULARIO DE CARGA */}
            <div className="panel-box" style={{ marginBottom: '2.5rem' }}>
                <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>
                        <i className="fas fa-plus-circle" style={{ color: '#22c55e', marginRight: '8px' }}></i>
                        1. Información General de la Canción
                    </h3>
                </div>

                <form onSubmit={handleGuardarCancion}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Título de la Canción *</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej. Júbilo, Generación Libre"
                                value={nuevaCancion.titulo}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, titulo: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Artista / Autor *</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej. Miel San Marcos"
                                value={nuevaCancion.autor}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, autor: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Tono (Key)</label>
                            <select
                                className="form-control"
                                value={nuevaCancion.tono}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, tono: e.target.value })}
                            >
                                {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map(k => (
                                    <option key={k} value={k}>{k}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Tempo (BPM)</label>
                            <input
                                type="number"
                                className="form-control"
                                min="40"
                                max="240"
                                value={nuevaCancion.bpm}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, bpm: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Compás (Time Signature)</label>
                            <select
                                className="form-control"
                                value={nuevaCancion.timeSig}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, timeSig: e.target.value })}
                            >
                                <option value="4/4">4/4</option>
                                <option value="6/8">6/8</option>
                                <option value="3/4">3/4</option>
                                <option value="12/8">12/8</option>
                            </select>
                        </div>
                    </div>

                    {/* SECCIÓN CARGA STEM POR STEM */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                            <i className="fas fa-sliders-h" style={{ color: '#3b82f6', marginRight: '8px' }}></i>
                            2. Subir Pistas Separadas (Stems Audio Files)
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
                            Selecciona los archivos de audio locales (WAV, MP3, M4A) para cada instrumento:
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                            {STEM_KEYS.map(stem => {
                                const tieneArchivo = Boolean(stemsArchivos[stem.id]);
                                const nombreArchivo = stemsNombres[stem.id];
                                return (
                                    <div
                                        key={stem.id}
                                        style={{
                                            background: tieneArchivo ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                                            border: tieneArchivo ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: tieneArchivo ? '#22c55e' : '#ffffff' }}>
                                                <i className={stem.icon} style={{ marginRight: '6px', color: tieneArchivo ? '#22c55e' : '#94a3b8' }}></i>
                                                {stem.label}
                                            </span>
                                            {tieneArchivo && (
                                                <span style={{ background: '#22c55e', color: '#000', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                                                    Cargado
                                                </span>
                                            )}
                                        </div>

                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                background: tieneArchivo ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                                                border: '1px dashed ' + (tieneArchivo ? '#22c55e' : 'rgba(255,255,255,0.2)'),
                                                borderRadius: '8px',
                                                padding: '8px 12px',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <i className="fas fa-upload"></i>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                                                {nombreArchivo || 'Examinar archivo audio...'}
                                            </span>
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                onChange={(e) => handleFileChange(stem.id, e)}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary pulse-active"
                        style={{ padding: '12px 30px', borderRadius: '30px', fontWeight: 800, fontSize: '1rem' }}
                    >
                        <i className="fas fa-cloud-upload-alt" style={{ marginRight: '8px' }}></i>
                        Publicar Canción a Playback Cloud
                    </button>
                </form>
            </div>

            {/* BIBLIOTECA DE CANCIONES SUBIDAS A LA NUBE */}
            <div className="panel-box">
                <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ margin: 0 }}>
                        <i className="fas fa-music" style={{ color: '#ec4899', marginRight: '8px' }}></i>
                        Canciones Disponibles en Playback Cloud ({listaCanciones.length})
                    </h3>
                </div>

                <div className="table-container" style={{ overflowX: 'auto' }}>
                    <table className="table-custom" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Canción / Artista</th>
                                <th>Tono</th>
                                <th>BPM</th>
                                <th>Compás</th>
                                <th>Stems Cargados</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaCanciones.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                                        No hay canciones cargadas en la nube. ¡Utiliza el formulario superior para subir la primera canción multitrack!
                                    </td>
                                </tr>
                            ) : (
                                listaCanciones.map(c => (
                                    <tr key={c.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src={c.cover} alt={c.titulo} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                                                <div>
                                                    <strong>{c.titulo}</strong>
                                                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{c.autor}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-solvente" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>{c.tono}</span></td>
                                        <td><strong>{c.bpm} BPM</strong></td>
                                        <td>{c.timeSig || '4/4'}</td>
                                        <td><span className="badge badge-solvente">{c.totalStems || 11} Pistas</span></td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleEliminarCancion(c.id, c.titulo)}
                                                title="Eliminar de la nube"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
