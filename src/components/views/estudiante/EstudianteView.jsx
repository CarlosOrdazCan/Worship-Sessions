import React, { useState, useEffect } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { calcularEstadoPago } from '../../../services/worshipDb';

export default function EstudianteView() {
    const { db, activeSubview, setActiveSubview, currentUser, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'classroom';

    const userKey = currentUser?.username || 'alumno1';
    const userProfile = db.usuarios?.[userKey] || currentUser || {};
    const pagoInfo = calcularEstadoPago(userProfile);

    const tareas = (db.tareas || []).filter(t => !t.area || t.area.toLowerCase() === (userProfile.area || '').toLowerCase());
    const entregas = db.entregasTareas || {};

    // Metronome state
    const [bpm, setBpm] = useState(90);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isPlaying) {
            const ms = (60 / bpm) * 1000;
            interval = setInterval(() => {
                setCurrentBeat(b => (b + 1) % 4);
            }, ms);
        } else {
            setCurrentBeat(0);
        }
        return () => clearInterval(interval);
    }, [isPlaying, bpm]);

    const calificaciones = db.calificaciones?.[userKey] || { teoria: 85, tecnica: 90, notas: "Estudiante constante." };

    return (
        <div id="view-estudiante" className="app-view">
            {/* SUBVIEW NAV TABS */}
            <div className="subview-nav">
                {[
                    { id: 'classroom', label: 'Mi Salón & Tareas', icon: 'fas fa-chalkboard-teacher' },
                    { id: 'progreso', label: 'Mi Progreso & Notas', icon: 'fas fa-chart-line' },
                    { id: 'ensamble', label: 'Mi Ensamble', icon: 'fas fa-guitar' },
                    { id: 'playback', label: 'Multitrack & Metrónomo', icon: 'fas fa-sliders-h' },
                    { id: 'recursos', label: 'Anuncios & Recursos', icon: 'fas fa-folder-open' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`btn btn-sm btn-secondary ${currentSub === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveSubview(tab.id)}
                    >
                        <i className={tab.icon}></i> {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB: CLASSROOM & TAREAS */}
            {currentSub === 'classroom' && (
                <div className="estudiante-subview">
                    {/* CLASS STATUS BANNER */}
                    <div className="class-status-banner">
                        <div>
                            <strong style={{ fontSize: '1rem', color: '#fff' }}>
                                {db.estatusClases?.mensaje || '✅ Clases Normales Sábado de 10:00 AM a 1:00 PM'}
                            </strong>
                            <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                                Actualizado: {db.estatusClases?.fechaActualizacion || 'Recientemente'}
                            </div>
                        </div>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-tasks"></i> Tareas Asignadas a mi Instrumento ({userProfile.area || 'General'})</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Tarea</th>
                                        <th>Fecha Límite</th>
                                        <th>Docente</th>
                                        <th>Estatus</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tareas.length === 0 ? (
                                        <tr><td colSpan="5" className="text-muted" style={{ textAlign: 'center' }}>No tienes tareas pendientes para tu instrumento.</td></tr>
                                    ) : (
                                        tareas.map(t => {
                                            const keyEntrega = `${t.id}_${userKey}`;
                                            const entrega = entregas[keyEntrega];
                                            return (
                                                <tr key={t.id}>
                                                    <td>
                                                        <strong>{t.titulo}</strong>
                                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{t.descripcion}</div>
                                                    </td>
                                                    <td>{t.fechaLimite}</td>
                                                    <td>{t.maestro}</td>
                                                    <td>
                                                        {entrega ? (
                                                            <span className="badge badge-solvente">Entregado ({entrega.calificacion ? `${entrega.calificacion}/100` : 'En revisión'})</span>
                                                        ) : (
                                                            <span className="badge badge-warning">Pendiente</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => openModal('entregar-tarea', { tareaId: t.id, userKey })}
                                                        >
                                                            <i className="fas fa-upload"></i> {entrega ? 'Reenviar' : 'Subir Video'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: PROGRESO */}
            {currentSub === 'progreso' && (
                <div className="estudiante-subview">
                    {pagoInfo.adeudo > 0 && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <strong style={{ color: '#ef4444' }}><i className="fas fa-exclamation-circle"></i> Aviso de Colegiatura:</strong>
                            <p style={{ fontSize: '0.88rem', color: '#fff', marginTop: '4px' }}>
                                Tienes {pagoInfo.adeudo} mes(es) pendiente(s). Por favor acércate a administración o justifica tu prórroga.
                            </p>
                        </div>
                    )}

                    <div className="dashboard-grid">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-book-reader"></i></div>
                            <div>
                                <h3>Evaluación Teórica</h3>
                                <div className="stat-val">{calificaciones.teoria} / 100</div>
                                <small className="text-muted">Lectura, ritmo y solfeo</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon red-variant"><i className="fas fa-hand-sparkles"></i></div>
                            <div>
                                <h3>Evaluación Técnica</h3>
                                <div className="stat-val">{calificaciones.tecnica} / 100</div>
                                <small className="text-muted">Digitación, tempo y postura</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-receipt"></i></div>
                            <div>
                                <h3>Estatus Colegiatura</h3>
                                <div className="stat-val" style={{ fontSize: '1.3rem' }}>{pagoInfo.label}</div>
                                <small className="text-muted">{userProfile.motivoNoPago || 'Al corriente'}</small>
                            </div>
                        </div>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-comment-dots"></i> Observaciones de tu Maestro</h3>
                        </div>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-light)' }}>
                            "{userProfile.observacionesMaestro || calificaciones.notas || 'Excelente desempeño en los ensayos y dedicación constante.'}"
                        </p>
                    </div>
                </div>
            )}

            {/* TAB: ENSAMBLE */}
            {currentSub === 'ensamble' && (
                <div className="estudiante-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-guitar"></i> Mi Participación en Ensambles</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Canción</th>
                                        <th>Tono</th>
                                        <th>Tempo</th>
                                        <th>Indicaciones del Director</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(db.ensambleAsignaciones || {}).filter(a => a.username === userKey).length === 0 ? (
                                        <tr><td colSpan="4" className="text-muted" style={{ textAlign: 'center' }}>No tienes asignaciones activas de ensamble para este fin de semana.</td></tr>
                                    ) : (
                                        Object.values(db.ensambleAsignaciones).filter(a => a.username === userKey).map(asig => (
                                            <tr key={asig.id}>
                                                <td><strong>{asig.songId}</strong></td>
                                                <td><span className="badge badge-solvente">{asig.tono}</span></td>
                                                <td>{asig.tempo}</td>
                                                <td>{asig.notes}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: PLAYBACK & METRONOME */}
            {currentSub === 'playback' && (
                <div className="estudiante-subview">
                    <div className="metronome-box">
                        <div>
                            <h3 style={{ color: '#fff', marginBottom: '6px' }}><i className="fas fa-stopwatch"></i> Metrónomo de Práctica</h3>
                            <p className="text-muted">Ajusta el tempo para tus sesiones diarias de instrumento.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div className="metro-tempo-display">{bpm} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>BPM</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <button className="btn btn-sm btn-secondary" onClick={() => setBpm(b => Math.min(240, b + 5))}>+5 BPM</button>
                                <button className="btn btn-sm btn-secondary" onClick={() => setBpm(b => Math.max(40, b - 5))}>-5 BPM</button>
                            </div>
                        </div>
                        <div className="metro-beats-container">
                            {[0, 1, 2, 3].map(beat => (
                                <div key={beat} className={`metro-beat-dot ${currentBeat === beat && isPlaying ? 'active' : ''}`}></div>
                            ))}
                        </div>
                        <button
                            className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'}`}
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            <i className={isPlaying ? 'fas fa-stop' : 'fas fa-play'}></i> {isPlaying ? 'Detener' : 'Iniciar Metrónomo'}
                        </button>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-sliders-h"></i> Multitrack Mixer de Práctica (Simulación Stems)</h3>
                        </div>
                        <p className="text-muted" style={{ marginBottom: '1rem' }}>Silencia o ajusta el volumen de cada instrumento para ensayar tu parte.</p>
                        <div className="multitrack-mixer-grid">
                            {['Click & Cues', 'Batería', 'Bajo', 'Guitarras', 'Teclados', 'Voz Principal'].map(track => (
                                <div key={track} className="track-card">
                                    <div className="track-title"><i className="fas fa-volume-up"></i> {track}</div>
                                    <input type="range" min="0" max="100" defaultValue="80" style={{ accentColor: 'var(--primary-red)' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="btn btn-sm btn-secondary" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>Mute</button>
                                        <button className="btn btn-sm btn-secondary" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>Solo</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: RECURSOS */}
            {currentSub === 'recursos' && (
                <div className="estudiante-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-folder-open"></i> Materiales de Estudio y Enlaces</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>Recurso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(db.materiales || []).map(m => (
                                        <tr key={m.id}>
                                            <td><span className="badge badge-solvente">{m.area}</span></td>
                                            <td><strong>{m.titulo}</strong></td>
                                            <td>{m.descripcion}</td>
                                            <td>
                                                <a href={m.enlace} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-teal)' }}>
                                                    <i className="fas fa-external-link-alt"></i> Ver Práctica
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
