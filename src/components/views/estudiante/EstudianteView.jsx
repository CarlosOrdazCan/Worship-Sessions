import React, { useState, useEffect } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { calcularEstadoPago } from '../../../services/worshipDb';
import PlaybackStudioApp from '../../common/PlaybackStudioApp';

export default function EstudianteView() {
    const { db, activeSubview, setActiveSubview, currentUser, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'classroom';

    const userKey = currentUser?.username || 'alumno1';
    const userProfile = db.usuarios?.[userKey] || currentUser || {};
    const studentArea = userProfile.area || userProfile.instrument || 'Teclado';
    const pagoInfo = calcularEstadoPago(userProfile);

    // Tareas y Materiales estrictamente filtrados por el instrumento del alumno
    const tareas = (db.tareas || []).filter(t => !t.area || (t.area || '').toLowerCase().includes(studentArea.toLowerCase()));
    const materiales = (db.materiales || []).filter(m => !m.area || (m.area || '').toLowerCase().includes(studentArea.toLowerCase()));
    const entregas = db.entregasTareas || {};

    // Metrónomo
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
        <div id="view-estudiante" className="app-view animate-fade-in">


            {/* TAB: CLASSROOM & TAREAS */}
            {currentSub === 'classroom' && (
                <div className="estudiante-subview animate-fade-in">
                    <div className="class-status-banner">
                        <div>
                            <strong style={{ fontSize: '1rem', color: '#fff' }}>
                                {db.estatusClases?.mensaje || '✅ Clases Normales Sábado de 10:00 AM a 1:00 PM'}
                            </strong>
                            <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                                Especialidad: <strong>{studentArea}</strong> • Actualizado: {db.estatusClases?.fechaActualizacion || 'Recientemente'}
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-tasks" style={{ color: '#dc2626', marginRight: '8px' }}></i> Tareas Asignadas a mi Instrumento ({studentArea})</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Tarea</th>
                                        <th style={{ padding: '12px' }}>Fecha Límite</th>
                                        <th style={{ padding: '12px' }}>Archivo Adjunto</th>
                                        <th style={{ padding: '12px' }}>Estatus</th>
                                        <th style={{ padding: '12px' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tareas.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No tienes tareas pendientes para tu instrumento.</td></tr>
                                    ) : (
                                        tareas.map(t => {
                                            const keyEntrega = `${t.id}_${userKey}`;
                                            const entrega = entregas[keyEntrega];
                                            return (
                                                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '12px' }}>
                                                        <strong>{t.titulo}</strong>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '2px' }}>{t.descripcion}</div>
                                                    </td>
                                                    <td style={{ padding: '12px' }}>{t.fechaLimite}</td>
                                                    <td style={{ padding: '12px' }}>
                                                        {t.archivoLocal ? (
                                                            <a href={t.archivoLocal.dataUrl} download={t.archivoLocal.nombre} style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                                                                <i className="fas fa-download" style={{ marginRight: '4px' }}></i> {t.archivoLocal.nombre}
                                                            </a>
                                                        ) : (
                                                            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Sin archivo adjunto</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        {entrega ? (
                                                            <span className="badge badge-solvente">Entregado ({entrega.calificacion ? `${entrega.calificacion}/100` : 'En revisión'})</span>
                                                        ) : (
                                                            <span className="badge badge-warning">Pendiente</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => openModal('entregar-tarea', { tareaId: t.id, userKey })}
                                                        >
                                                            <i className="fas fa-upload" style={{ marginRight: '6px' }}></i> {entrega ? 'Reenviar' : 'Subir Video'}
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
                <div className="estudiante-subview animate-fade-in">
                    {pagoInfo.adeudo > 0 && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.5rem' }}>
                            <strong style={{ color: '#ef4444' }}><i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i> Aviso de Colegiatura:</strong>
                            <p style={{ fontSize: '0.88rem', color: '#fff', marginTop: '4px', margin: 0 }}>
                                Tienes {pagoInfo.adeudo} mes(es) pendiente(s). Por favor acércate a administración o justifica tu prórroga.
                            </p>
                        </div>
                    )}

                    <div className="dashboard-grid">
                        <div className="status-card">
                            <div className="card-icon green-variant"><i className="fas fa-book-reader"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Evaluación Teórica</small>
                                <div className="stat-val">{calificaciones.teoria} / 100</div>
                                <small className="text-muted">Lectura, ritmo y solfeo</small>
                            </div>
                        </div>
                        <div className="status-card">
                            <div className="card-icon red-variant"><i className="fas fa-hand-sparkles"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Evaluación Técnica</small>
                                <div className="stat-val">{calificaciones.tecnica} / 100</div>
                                <small className="text-muted">Digitación, tempo y postura</small>
                            </div>
                        </div>
                        <div className="status-card">
                            <div className="card-icon amber-variant"><i className="fas fa-receipt"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Estatus Colegiatura</small>
                                <div className="stat-val" style={{ fontSize: '1.3rem' }}>{pagoInfo.label}</div>
                                <small className="text-muted">{userProfile.motivoNoPago || 'Al corriente'}</small>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-comment-dots" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Observaciones del Maestro ({studentArea})</h3>
                        </div>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e1', margin: 0 }}>
                            "{userProfile.observacionesMaestro || calificaciones.notas || 'Excelente desempeño en los ensayos y dedicación constante.'}"
                        </p>
                    </div>
                </div>
            )}

            {/* TAB: RECURSOS Y MATERIALES */}
            {currentSub === 'recursos' && (
                <div className="estudiante-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-folder-open" style={{ color: '#10b981', marginRight: '8px' }}></i> Materiales de Estudio de {studentArea} ({materiales.length})</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            {materiales.length === 0 ? (
                                <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>No hay materiales publicados para tu especialidad ({studentArea}).</div>
                            ) : (
                                materiales.map(m => (
                                    <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span className="badge badge-solvente">{m.area}</span>
                                                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{m.fecha}</span>
                                            </div>
                                            <h4 style={{ margin: '0 0 6px', color: '#ffffff', fontSize: '1.05rem' }}>{m.titulo}</h4>
                                            {m.descripcion && <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0 0 12px' }}>{m.descripcion}</p>}
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                                            {m.enlace && (
                                                <a href={m.enlace} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                    <i className="fas fa-external-link-alt"></i> Enlace Web
                                                </a>
                                            )}

                                            {m.archivoLocal && (
                                                <a href={m.archivoLocal.dataUrl} download={m.archivoLocal.nombre} className="btn btn-sm btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                    <i className="fas fa-download"></i> Descargar ({m.archivoLocal.nombre})
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: ENSAMBLE */}
            {currentSub === 'ensamble' && (
                <div className="estudiante-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-guitar" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Mi Participación en Ensambles</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Canción</th>
                                        <th style={{ padding: '12px' }}>Tono</th>
                                        <th style={{ padding: '12px' }}>Tempo</th>
                                        <th style={{ padding: '12px' }}>Indicaciones del Director</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(db.ensambleAsignaciones || {}).filter(a => a.username === userKey).length === 0 ? (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No tienes asignaciones activas de ensamble para este fin de semana.</td></tr>
                                    ) : (
                                        Object.values(db.ensambleAsignaciones).filter(a => a.username === userKey).map(asig => (
                                            <tr key={asig.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '12px' }}><strong>{asig.songId}</strong></td>
                                                <td style={{ padding: '12px' }}><span className="badge badge-solvente">{asig.tono}</span></td>
                                                <td style={{ padding: '12px' }}>{asig.tempo}</td>
                                                <td style={{ padding: '12px' }}>{asig.notes}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: PLAYBACK & METRONOME (IOS PLAYBACK APP REPLICA) */}
            {currentSub === 'playback' && (
                <div className="estudiante-subview animate-fade-in">
                    <PlaybackStudioApp />
                </div>
            )}
        </div>
    );
}
