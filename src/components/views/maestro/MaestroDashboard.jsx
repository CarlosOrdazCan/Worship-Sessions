import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { normalizeRol } from '../../../services/worshipDb';

export default function MaestroDashboard() {
    const { db, updateDb, activeSubview, setActiveSubview, currentUser, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'dashboard';

    const [nuevaTarea, setNuevaTarea] = useState({ area: 'Teclado', titulo: '', descripcion: '', fechaLimite: '' });
    const [nuevoMaterial, setNuevoMaterial] = useState({ area: 'Teclado', titulo: '', descripcion: '', enlace: '' });

    const usuarios = db.usuarios || {};
    const students = Object.entries(usuarios)
        .filter(([_, u]) => normalizeRol(u.rol) === 'estudiante')
        .map(([k, u]) => ({ key: k, ...u }));

    const tareas = db.tareas || [];
    const entregas = db.entregasTareas || {};

    const handleCrearTarea = (e) => {
        e.preventDefault();
        if (!nuevaTarea.titulo || !nuevaTarea.fechaLimite) {
            showToast('Por favor llena los campos requeridos', 'error');
            return;
        }

        const task = {
            id: 't_' + Date.now(),
            ...nuevaTarea,
            maestro: currentUser?.name || 'Maestro'
        };

        updateDb(prev => ({
            ...prev,
            tareas: [task, ...(prev.tareas || [])]
        }));

        setNuevaTarea({ area: 'Teclado', titulo: '', descripcion: '', fechaLimite: '' });
        showToast('Tarea asignada exitosamente a los alumnos', 'success');
    };

    const handleCrearMaterial = (e) => {
        e.preventDefault();
        if (!nuevoMaterial.titulo || !nuevoMaterial.enlace) {
            showToast('Completa el título y enlace del material', 'error');
            return;
        }

        const mat = {
            id: 'm_' + Date.now(),
            ...nuevoMaterial,
            fecha: new Date().toISOString().slice(0, 10)
        };

        updateDb(prev => ({
            ...prev,
            materiales: [mat, ...(prev.materiales || [])]
        }));

        setNuevoMaterial({ area: 'Teclado', titulo: '', descripcion: '', enlace: '' });
        showToast('Material de práctica publicado', 'success');
    };

    return (
        <div id="view-maestro" className="app-view">
            {/* SUBVIEW NAV TABS */}
            <div className="subview-nav">
                {[
                    { id: 'dashboard', label: 'Mi Dashboard', icon: 'fas fa-chart-bar' },
                    { id: 'classroom', label: 'Tareas & Classroom', icon: 'fas fa-tasks' },
                    { id: 'alumnos', label: 'Alumnos & Asistencia', icon: 'fas fa-user-graduate' },
                    { id: 'ensambles', label: 'Ensambles', icon: 'fas fa-music' },
                    { id: 'materiales', label: 'Materiales & Práctica', icon: 'fas fa-book' },
                    { id: 'anuncios', label: 'Anuncios Staff', icon: 'fas fa-bullhorn' }
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

            {/* TAB: DASHBOARD */}
            {currentSub === 'dashboard' && (
                <div className="maestro-subview">
                    <div className="dashboard-grid">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-users"></i></div>
                            <div>
                                <h3>Alumnos a mi Cargo</h3>
                                <div className="stat-val">{students.length}</div>
                                <small className="text-muted">Estudiantes asignados</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon red-variant"><i className="fas fa-clipboard-list"></i></div>
                            <div>
                                <h3>Tareas Asignadas</h3>
                                <div className="stat-val">{tareas.length}</div>
                                <small className="text-muted">En el ciclo activo</small>
                            </div>
                        </div>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-clock"></i> Entregas Recientes de Alumnos</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Tarea</th>
                                        <th>Video / Enlace</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(entregas).length === 0 ? (
                                        <tr><td colSpan="5" className="text-muted" style={{ textAlign: 'center' }}>No hay entregas pendientes de revisar.</td></tr>
                                    ) : (
                                        Object.entries(entregas).map(([k, e]) => (
                                            <tr key={k}>
                                                <td><strong>{e.username}</strong></td>
                                                <td>{e.tareaId}</td>
                                                <td><a href={e.videoUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-teal)' }}><i className="fas fa-play-circle"></i> Ver Video</a></td>
                                                <td><span className={`badge ${e.estado === 'calificado' ? 'badge-solvente' : 'badge-warning'}`}>{e.estado}</span></td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary" onClick={() => openModal('evaluar-tarea', { key: k, ...e })}>
                                                        <i className="fas fa-check"></i> Calificar
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
            )}

            {/* TAB: CLASSROOM / TAREAS */}
            {currentSub === 'classroom' && (
                <div className="maestro-subview">
                    <div className="panel-box" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header">
                            <h3><i className="fas fa-plus-circle"></i> Crear y Asignar Nueva Tarea</h3>
                        </div>
                        <form onSubmit={handleCrearTarea} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label>Área / Instrumento:</label>
                                    <select
                                        className="form-control"
                                        value={nuevaTarea.area}
                                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, area: e.target.value })}
                                    >
                                        <option value="Teclado">Teclado / Piano</option>
                                        <option value="Batería">Batería / Percusión</option>
                                        <option value="Bajo">Bajo</option>
                                        <option value="Guitarra">Guitarra</option>
                                        <option value="Canto">Canto</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Título de la Tarea:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Escala de Do Mayor con metrónomo"
                                        value={nuevaTarea.titulo}
                                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha Límite:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={nuevaTarea.fechaLimite}
                                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, fechaLimite: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Instrucciones detalladas:</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    placeholder="Describe qué debe practicar el alumno y subir..."
                                    value={nuevaTarea.descripcion}
                                    onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                <i className="fas fa-paper-plane"></i> Asignar Tarea
                            </button>
                        </form>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-list"></i> Tareas Activas</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>Título</th>
                                        <th>Fecha Límite</th>
                                        <th>Docente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tareas.map(t => (
                                        <tr key={t.id}>
                                            <td><span className="badge badge-solvente">{t.area}</span></td>
                                            <td><strong>{t.titulo}</strong><div className="text-muted" style={{ fontSize: '0.8rem' }}>{t.descripcion}</div></td>
                                            <td>{t.fechaLimite}</td>
                                            <td>{t.maestro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: ALUMNOS & ASISTENCIA */}
            {currentSub === 'alumnos' && (
                <div className="maestro-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-user-check"></i> Alumnos Asignados & Calificaciones</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Instrumento</th>
                                        <th>Teoría</th>
                                        <th>Técnica</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => {
                                        const cal = db.calificaciones?.[s.key] || { teoria: '-', tecnica: '-' };
                                        return (
                                            <tr key={s.key}>
                                                <td><strong>{s.nombre || s.key}</strong></td>
                                                <td>{s.area || s.instrument || 'Música'}</td>
                                                <td>{cal.teoria} / 100</td>
                                                <td>{cal.tecnica} / 100</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => openModal('calificar', s)}>
                                                            <i className="fas fa-star"></i> Evaluar
                                                        </button>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => openModal('asistencia', s)}>
                                                            <i className="fas fa-calendar-check"></i> Asistencia
                                                        </button>
                                                    </div>
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

            {/* TAB: ENSAMBLES */}
            {currentSub === 'ensambles' && (
                <div className="maestro-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-music"></i> Asignaciones para Ensamble</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Canción</th>
                                        <th>Alumno</th>
                                        <th>Tempo / Tono</th>
                                        <th>Notas del Maestro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(db.ensambleAsignaciones || {}).map(([k, asig]) => (
                                        <tr key={k}>
                                            <td><strong>{asig.songId}</strong></td>
                                            <td>{asig.username}</td>
                                            <td>{asig.tempo} • {asig.tono}</td>
                                            <td>{asig.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: MATERIALES */}
            {currentSub === 'materiales' && (
                <div className="maestro-subview">
                    <div className="panel-box" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header">
                            <h3><i className="fas fa-plus"></i> Compartir Material de Práctica</h3>
                        </div>
                        <form onSubmit={handleCrearMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label>Área:</label>
                                    <select className="form-control" value={nuevoMaterial.area} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, area: e.target.value })}>
                                        <option value="Teclado">Teclado</option>
                                        <option value="Batería">Batería</option>
                                        <option value="Bajo">Bajo</option>
                                        <option value="Guitarra">Guitarra</option>
                                        <option value="Canto">Canto</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Título del Material:</label>
                                    <input type="text" className="form-control" placeholder="Ej. Rudimentos de bombo" value={nuevoMaterial.titulo} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, titulo: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Enlace de Referencia (YouTube, Drive):</label>
                                    <input type="url" className="form-control" placeholder="https://..." value={nuevoMaterial.enlace} onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, enlace: e.target.value })} required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                <i className="fas fa-upload"></i> Publicar Material
                            </button>
                        </form>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-book"></i> Biblioteca de Materiales</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>Título</th>
                                        <th>Enlace</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(db.materiales || []).map(m => (
                                        <tr key={m.id}>
                                            <td><span className="badge badge-solvente">{m.area}</span></td>
                                            <td><strong>{m.titulo}</strong></td>
                                            <td><a href={m.enlace} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-teal)' }}><i className="fas fa-external-link-alt"></i> Abrir Enlace</a></td>
                                            <td>{m.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: ANUNCIOS */}
            {currentSub === 'anuncios' && (
                <div className="maestro-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-bullhorn"></i> Muro de Anuncios del Staff y Docentes</h3>
                        </div>
                        <div className="announcements-wall-container">
                            {(db.anunciosStaff || []).map(a => (
                                <div key={a.id} className="announcement-item">
                                    <h4>{a.titulo}</h4>
                                    <p>{a.contenido}</p>
                                    <small className="text-muted">{a.fecha} • {a.autor}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
