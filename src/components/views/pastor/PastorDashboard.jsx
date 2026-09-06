import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { calcularEstadoPago, normalizeRol } from '../../../services/worshipDb';

export default function PastorDashboard() {
    const { db, updateDb, activeSubview, setActiveSubview, addNotification, showToast } = useWorship();
    const currentSub = activeSubview || 'vision';

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedDocente, setSelectedDocente] = useState(null);

    // ESTADO PARA NOTAS DE COBERTURA PASTORAL (ALUMNOS Y MAESTROS)
    const [coberturaTipo, setCoberturaTipo] = useState('estudiante');
    const [coberturaDestinatario, setCoberturaDestinatario] = useState('');
    const [notaContenido, setNotaContenido] = useState('');

    // ESTADO PARA CREAR EVENTO CON TARGET DE NOTIFICACIÓN
    const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', fecha: '', hora: '', lugar: '', audiencia: 'ambos' });

    const usuarios = db.usuarios || {};
    const students = Object.entries(usuarios)
        .filter(([_, u]) => normalizeRol(u.rol) === 'estudiante')
        .map(([k, u]) => ({ key: k, ...u }));

    const docentes = Object.entries(usuarios)
        .filter(([_, u]) => normalizeRol(u.rol) === 'maestro')
        .map(([k, u]) => ({ key: k, ...u }));

    const solventes = students.filter(s => calcularEstadoPago(s).status === 'solvente');
    const morosos = students.filter(s => calcularEstadoPago(s).status !== 'solvente');

    // GUARDAR NOTA DE COBERTURA PASTORAL Y NOTIFICAR AL DESTINATARIO
    const handleGuardarNotaPastoral = (e) => {
        e.preventDefault();
        if (!coberturaDestinatario || !notaContenido) {
            showToast('Selecciona un destinatario y escribe la nota', 'error');
            return;
        }

        const nuevaNota = {
            id: 'np_' + Date.now(),
            tipoDestinatario: coberturaTipo,
            destinatario: coberturaDestinatario,
            contenido: notaContenido,
            fecha: new Date().toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' }),
            autor: 'Liderazgo Pastoral'
        };

        updateDb(prev => ({
            ...prev,
            notasPastorales: [nuevaNota, ...(prev.notasPastorales || [])]
        }));

        // ENVIAR NOTIFICACIÓN AUTOMÁTICA AL USUARIO DESTINATARIO
        addNotification({
            title: '✝ Cobertura Pastoral Registrada',
            message: `El liderazgo pastoral ha registrado una nota de cobertura para ti: "${notaContenido.slice(0, 60)}..."`,
            targetUser: coberturaDestinatario,
            type: 'pastoral'
        });

        setNotaContenido('');
        showToast(`Nota pastoral registrada y notificación enviada a @${coberturaDestinatario}`, 'success');
    };

    // CREAR EVENTO CON NOTIFICACIÓN A AUDIENCIA OBJETIVO
    const handleCrearEvento = (e) => {
        e.preventDefault();
        if (!nuevoEvento.titulo || !nuevoEvento.fecha) {
            showToast('Completa el título y fecha del evento', 'error');
            return;
        }

        const ev = {
            id: 'ev_' + Date.now(),
            ...nuevoEvento,
            autor: 'Liderazgo Pastoral'
        };

        updateDb(prev => ({
            ...prev,
            eventos: [ev, ...(prev.eventos || [])]
        }));

        // NOTIFICAR A LA AUDIENCIA SELECCIONADA
        addNotification({
            title: `📅 Nuevo Evento: ${nuevoEvento.titulo}`,
            message: `El ${nuevoEvento.fecha} a las ${nuevoEvento.hora || '19:00'} en ${nuevoEvento.lugar || 'Auditorio CAN'}.`,
            targetRole: nuevoEvento.audiencia,
            type: 'evento'
        });

        setNuevoEvento({ titulo: '', fecha: '', hora: '', lugar: '', audiencia: 'ambos' });
        showToast('Evento agendado y notificación emitida', 'success');
    };

    // DESBLOQUEO MANUAL DE COLEGIATURA POR EL PASTOR
    const handleToggleDesbloqueoManual = (userKey) => {
        updateDb(prev => {
            const nextUsers = { ...prev.usuarios };
            const u = nextUsers[userKey];
            if (u) {
                u.desbloqueadoManual = !u.desbloqueadoManual;
            }
            return { ...prev, usuarios: nextUsers };
        });
        showToast(`Estatus de desbloqueo manual actualizado para @${userKey}`, 'info');
    };

    return (
        <div id="view-pastor" className="app-view animate-fade-in">


            {/* TAB 1: VISIÓN GLOBAL */}
            {currentSub === 'vision' && (
                <div className="pastor-subview animate-fade-in">
                    <div className="dashboard-grid">
                        <div className="status-card">
                            <div className="card-icon green-variant"><i className="fas fa-check-circle"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Alumnos Solventes</small>
                                <div className="stat-val" style={{ color: '#10b981' }}>{solventes.length}</div>
                                <small className="text-muted">Al corriente con colegiaturas</small>
                            </div>
                        </div>

                        <div className="status-card">
                            <div className="card-icon red-variant"><i className="fas fa-exclamation-triangle"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Alumnos en Mora</small>
                                <div className="stat-val" style={{ color: '#ef4444' }}>{morosos.length}</div>
                                <small className="text-muted">Con adeudos pendientes</small>
                            </div>
                        </div>

                        <div className="status-card">
                            <div className="card-icon"><i className="fas fa-chalkboard-teacher"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Docentes</small>
                                <div className="stat-val">{docentes.length}</div>
                                <small className="text-muted">Maestros activos en CAN</small>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: EXPEDIENTES DE ALUMNOS CON FOTO Y MODAL */}
            {currentSub === 'expedientes' && (
                <div className="pastor-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-id-card" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Expedientes Académicos del Alumnado</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            {students.map(s => {
                                const p = calcularEstadoPago(s);
                                return (
                                    <div key={s.key} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                                {s.photo ? (
                                                    <img src={s.photo} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #dc2626' }} />
                                                ) : (
                                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.4rem' }}>
                                                        {(s.nombre || s.key).charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 style={{ margin: 0, color: '#fff', fontSize: '1.05rem' }}>{s.nombre || s.key}</h4>
                                                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>@{s.key} • {s.area || s.instrument || 'Teclado'}</span>
                                                </div>
                                            </div>

                                            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                                                <div><strong>Antigüedad:</strong> {s.anosIglesia || '3 Años en CAN'}</div>
                                                <div><strong>Ciclo:</strong> {s.ciclosWS || '2° Ciclo Escolar'}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                            <span className={`badge ${p.clase}`}>{p.label}</span>
                                            <button className="btn btn-sm btn-secondary" onClick={() => setSelectedStudent(s)}>
                                                Ver Expediente Completo
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: DIRECTORIO DE DOCENTES CON EXPEDIENTES */}
            {currentSub === 'docentes' && (
                <div className="pastor-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-chalkboard-teacher" style={{ color: '#10b981', marginRight: '8px' }}></i> Directorio de Personal Docente</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            {docentes.map(d => (
                                <div key={d.key} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                        {d.photo ? (
                                            <img src={d.photo} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981' }} />
                                        ) : (
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.4rem' }}>
                                                {(d.nombre || d.key).charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 style={{ margin: 0, color: '#fff', fontSize: '1.05rem' }}>{d.nombre || d.key}</h4>
                                            <span style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 700 }}>Especialidad: {d.area || d.instrument || 'Teclado'}</span>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                                        <div><strong>Teléfono:</strong> {d.phone || d.telefono || '+52 55 1234 5678'}</div>
                                        <div><strong>Estado:</strong> Maestro Activo</div>
                                    </div>

                                    <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDocente(d)}>
                                        Ver Expediente Docente
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: COLEGIATURAS & ESTATUS */}
            {currentSub === 'colegiaturas' && (
                <div className="pastor-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-file-invoice-dollar" style={{ color: '#f59e0b', marginRight: '8px' }}></i> Supervisión de Colegiaturas & Desbloqueo Pastoral</h3>
                        </div>

                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Especialidad</th>
                                        <th style={{ padding: '12px' }}>Estatus Financiero</th>
                                        <th style={{ padding: '12px' }}>Desbloqueo Manual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => {
                                        const p = calcularEstadoPago(s);
                                        return (
                                            <tr key={s.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '12px' }}><strong>{s.nombre || s.key}</strong></td>
                                                <td style={{ padding: '12px' }}>{s.area || s.instrument || 'Teclado'}</td>
                                                <td style={{ padding: '12px' }}><span className={`badge ${p.clase}`}>{p.label}</span></td>
                                                <td style={{ padding: '12px' }}>
                                                    <button
                                                        className={`btn btn-sm ${s.desbloqueadoManual ? 'btn-primary' : 'btn-secondary'}`}
                                                        onClick={() => handleToggleDesbloqueoManual(s.key)}
                                                    >
                                                        <i className={s.desbloqueadoManual ? 'fas fa-lock-open' : 'fas fa-lock'} style={{ marginRight: '6px' }}></i>
                                                        {s.desbloqueadoManual ? 'Desbloqueado Manualmente' : 'Bloqueo Normal'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: COBERTURA PASTORAL (NOTIFICACIÓN AUTOMÁTICA A DESTINATARIOS) */}
            {currentSub === 'cobertura' && (
                <div className="pastor-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-heart" style={{ color: '#8b5cf6', marginRight: '8px' }}></i> Registrar Cobertura Pastoral (Alumnos & Maestros)</h3>
                        </div>

                        <form onSubmit={handleGuardarNotaPastoral} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Tipo de Cobertura:</label>
                                    <select
                                        className="form-control"
                                        value={coberturaTipo}
                                        onChange={(e) => {
                                            setCoberturaTipo(e.target.value);
                                            setCoberturaDestinatario('');
                                        }}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    >
                                        <option value="estudiante">Para Alumno</option>
                                        <option value="maestro">Para Maestro / Docente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Seleccionar Destinatario:</label>
                                    <select
                                        className="form-control"
                                        value={coberturaDestinatario}
                                        onChange={(e) => setCoberturaDestinatario(e.target.value)}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    >
                                        <option value="">-- Seleccionar destinatario --</option>
                                        {(coberturaTipo === 'estudiante' ? students : docentes).map(u => (
                                            <option key={u.key} value={u.key}>
                                                {u.nombre || u.key} (@{u.key} • {u.area || 'General'})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Mensaje de Cobertura Pastoral / Oración / Acuerdo:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Describe las observaciones de consejería pastoral..."
                                    value={notaContenido}
                                    onChange={(e) => setNotaContenido(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: '10px' }}>
                                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Emitir Cobertura & Notificar
                            </button>
                        </form>
                    </div>

                    {/* Muro de Notas Pastorales */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-history" style={{ color: '#8b5cf6', marginRight: '8px' }}></i> Histórico de Coberturas Pastorales</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(db.notasPastorales || []).map(np => (
                                <div key={np.id} style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(30, 27, 75, 0.4))', border: '1px solid #8b5cf6', borderLeft: '6px solid #8b5cf6', padding: '1.2rem', borderRadius: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <h4 style={{ margin: 0, color: '#a78bfa', fontSize: '1rem', fontWeight: 800 }}>
                                            ✝ Cobertura a @{np.destinatario} ({np.tipoDestinatario === 'maestro' ? 'Docente' : 'Alumno'})
                                        </h4>
                                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{np.fecha}</span>
                                    </div>
                                    <p style={{ margin: '0 0 8px', color: '#cbd5e1', fontSize: '0.9rem' }}>{np.contenido}</p>
                                    <small style={{ color: '#c4b5fd', fontSize: '0.78rem', fontWeight: 700 }}>Autor: {np.autor}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 6: EVENTOS & AGENDA CON NOTIFICACIONES */}
            {currentSub === 'eventos' && (
                <div className="pastor-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-calendar-plus" style={{ color: '#10b981', marginRight: '8px' }}></i> Crear Nuevo Evento & Notificar Audiencia</h3>
                        </div>

                        <form onSubmit={handleCrearEvento} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Título del Evento:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Graduación de Ciclo o Noche de Alabanza"
                                        value={nuevoEvento.titulo}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Fecha:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={nuevoEvento.fecha}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Hora & Lugar:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="19:00 hrs en Auditorio Principal CAN"
                                        value={nuevoEvento.lugar}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, lugar: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Audiencia a Notificar:</label>
                                    <select
                                        className="form-control"
                                        value={nuevoEvento.audiencia}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, audiencia: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    >
                                        <option value="ambos">📢 Notificar a Alumnos y Maestros</option>
                                        <option value="alumnos">🎓 Solo a Alumnos</option>
                                        <option value="maestros">👨‍🏫 Solo a Maestros</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: '10px' }}>
                                <i className="fas fa-calendar-check" style={{ marginRight: '8px' }}></i> Publicar Evento & Emitir Alerta
                            </button>
                        </form>
                    </div>

                    {/* Lista de Eventos */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-calendar-alt" style={{ color: '#10b981', marginRight: '8px' }}></i> Agenda de Eventos Oficiales</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            {(db.eventos || []).map(ev => (
                                <div key={ev.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem' }}>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800 }}>
                                        {ev.fecha}
                                    </span>
                                    <h4 style={{ margin: '8px 0 4px', color: '#fff', fontSize: '1.1rem' }}>{ev.titulo}</h4>
                                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0 0 8px' }}>{ev.lugar || 'Auditorio CAN'}</p>
                                    <small style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Notificado a: {ev.audiencia.toUpperCase()}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL EXPEDIENTE ALUMNO CON FOTO */}
            {selectedStudent && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#121420', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '2rem', maxWidth: '550px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#fff' }}>Expediente Académico del Alumno</h3>
                            <button className="btn btn-sm btn-secondary" onClick={() => setSelectedStudent(null)} style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', marginBottom: '1.2rem' }}>
                            {selectedStudent.photo ? (
                                <img src={selectedStudent.photo} alt="Foto" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #dc2626' }} />
                            ) : (
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '2rem', color: '#fff' }}>
                                    {(selectedStudent.nombre || selectedStudent.key).charAt(0)}
                                </div>
                            )}
                            <div>
                                <h3 style={{ margin: 0, color: '#fff' }}>{selectedStudent.nombre || selectedStudent.key}</h3>
                                <p style={{ color: '#ef4444', fontWeight: 700, margin: '4px 0 0', fontSize: '0.9rem' }}>Especialidad: {selectedStudent.area || 'Teclado'}</p>
                                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>@{selectedStudent.key}</span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                                <small style={{ color: '#94a3b8', display: 'block' }}>Tiempo en CAN</small>
                                <strong style={{ color: '#fff' }}>{selectedStudent.anosIglesia || '3 Años'}</strong>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                                <small style={{ color: '#94a3b8', display: 'block' }}>Ciclo Escolar</small>
                                <strong style={{ color: '#fff' }}>{selectedStudent.ciclosWS || '2° Ciclo'}</strong>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <small style={{ color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Notas de Seguimiento</small>
                            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem' }}>{selectedStudent.observacionesMaestro || 'Estudiante dedicado en ensayos y clases.'}</p>
                        </div>

                        <button className="btn btn-primary" onClick={() => setSelectedStudent(null)} style={{ width: '100%', borderRadius: '12px' }}>
                            Cerrar Expediente
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL EXPEDIENTES DOCENTES */}
            {selectedDocente && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#121420', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '2rem', maxWidth: '550px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#fff' }}>Expediente del Personal Docente</h3>
                            <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDocente(null)} style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', marginBottom: '1.2rem' }}>
                            {selectedDocente.photo ? (
                                <img src={selectedDocente.photo} alt="Foto" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10b981' }} />
                            ) : (
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '2rem', color: '#fff' }}>
                                    {(selectedDocente.nombre || selectedDocente.key).charAt(0)}
                                </div>
                            )}
                            <div>
                                <h3 style={{ margin: 0, color: '#fff' }}>{selectedDocente.nombre || selectedDocente.key}</h3>
                                <p style={{ color: '#10b981', fontWeight: 700, margin: '4px 0 0', fontSize: '0.9rem' }}>Docente de {selectedDocente.area || 'Teclado'}</p>
                                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>@{selectedDocente.key} • Tel: {selectedDocente.phone || selectedDocente.telefono || '+52 55 1234 5678'}</span>
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={() => setSelectedDocente(null)} style={{ width: '100%', borderRadius: '12px' }}>
                            Cerrar Expediente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
