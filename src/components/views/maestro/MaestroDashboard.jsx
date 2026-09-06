import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { normalizeRol } from '../../../services/worshipDb';

export default function MaestroDashboard() {
    const { db, updateDb, activeSubview, setActiveSubview, currentUser, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'dashboard';

    // Determinar el área / instrumento del maestro actual
    const teacherArea = currentUser?.area || currentUser?.instrument || 'Teclado';

    // Estados para Asistencia
    const [fechaAsistencia, setFechaAsistencia] = useState(new Date().toISOString().slice(0, 10));
    const [asistenciaFechaState, setAsistenciaFechaState] = useState({});

    // Estados para Nueva Tarea
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaLimite: '' });
    const [archivoTarea, setArchivoTarea] = useState(null);

    // Estados para Nuevo Material
    const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', descripcion: '', enlace: '' });
    const [archivoMaterial, setArchivoMaterial] = useState(null);

    // Filtrar ALUMNOS estrictamente por el instrumento/área del Maestro
    const usuarios = db.usuarios || {};
    const myStudents = Object.entries(usuarios)
        .filter(([_, u]) => {
            const isStudent = normalizeRol(u.rol) === 'estudiante';
            const studentArea = u.area || u.instrument || 'Teclado';
            // Si el usuario actual es admin, mostrar todos, sino filtrar por el área del maestro
            if (currentUser?.role === 'admin' || currentUser?.rol === 'admin') return isStudent;
            return isStudent && studentArea.toLowerCase().includes(teacherArea.toLowerCase());
        })
        .map(([k, u]) => ({ key: k, ...u }));

    // Tareas y Materiales del Área del Maestro
    const allTareas = db.tareas || [];
    const myTareas = allTareas.filter(t => {
        if (currentUser?.role === 'admin' || currentUser?.rol === 'admin') return true;
        return (t.area || '').toLowerCase().includes(teacherArea.toLowerCase());
    });

    const allMateriales = db.materiales || [];
    const myMateriales = allMateriales.filter(m => {
        if (currentUser?.role === 'admin' || currentUser?.rol === 'admin') return true;
        return (m.area || '').toLowerCase().includes(teacherArea.toLowerCase());
    });

    const entregas = db.entregasTareas || {};

    // MANEJADOR DE ARCHIVOS LOCALES (FileReader -> Base64)
    const handleFileChange = (e, setFileState) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limite de 10MB para almacenamiento local
        if (file.size > 10 * 1024 * 1024) {
            showToast('El archivo es demasiado grande (Máximo 10MB)', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setFileState({
                nombre: file.name,
                tipo: file.type,
                tamano: (file.size / 1024).toFixed(1) + ' KB',
                dataUrl: ev.target.result
            });
            showToast(`Archivo "${file.name}" cargado listo para publicar`, 'info');
        };
        reader.readAsDataURL(file);
    };

    // CREAR TAREA
    const handleCrearTarea = (e) => {
        e.preventDefault();
        if (!nuevaTarea.titulo || !nuevaTarea.fechaLimite) {
            showToast('Por favor llena el título y la fecha límite', 'error');
            return;
        }

        const task = {
            id: 't_' + Date.now(),
            area: teacherArea,
            titulo: nuevaTarea.titulo,
            descripcion: nuevaTarea.descripcion,
            fechaLimite: nuevaTarea.fechaLimite,
            maestro: currentUser?.name || currentUser?.nombre || 'Maestro ' + teacherArea,
            archivoLocal: archivoTarea || null
        };

        updateDb(prev => ({
            ...prev,
            tareas: [task, ...(prev.tareas || [])]
        }));

        setNuevaTarea({ titulo: '', descripcion: '', fechaLimite: '' });
        setArchivoTarea(null);
        showToast(`Tarea asignada a los alumnos de ${teacherArea}`, 'success');
    };

    // CREAR MATERIAL
    const handleCrearMaterial = (e) => {
        e.preventDefault();
        if (!nuevoMaterial.titulo && !archivoMaterial) {
            showToast('Ingresa un título o adjunta un archivo local', 'error');
            return;
        }

        const mat = {
            id: 'm_' + Date.now(),
            area: teacherArea,
            titulo: nuevoMaterial.titulo,
            descripcion: nuevoMaterial.descripcion,
            enlace: nuevoMaterial.enlace || '',
            archivoLocal: archivoMaterial || null,
            fecha: new Date().toISOString().slice(0, 10)
        };

        updateDb(prev => ({
            ...prev,
            materiales: [mat, ...(prev.materiales || [])]
        }));

        setNuevoMaterial({ titulo: '', descripcion: '', enlace: '' });
        setArchivoMaterial(null);
        showToast(`Material de ${teacherArea} publicado a tus alumnos`, 'success');
    };

    // MANEJO DE ASISTENCIA
    const handleSetAsistenciaState = (studentKey, estado) => {
        setAsistenciaFechaState(prev => ({
            ...prev,
            [studentKey]: estado
        }));
    };

    const handleGuardarAsistencia = () => {
        if (!fechaAsistencia) {
            showToast('Selecciona una fecha válida', 'error');
            return;
        }

        updateDb(prev => {
            const nextAsistencia = { ...(prev.asistencia || {}) };
            Object.entries(asistenciaFechaState).forEach(([studentKey, estado]) => {
                if (!nextAsistencia[studentKey]) nextAsistencia[studentKey] = {};
                nextAsistencia[studentKey][fechaAsistencia] = estado;
            });
            return {
                ...prev,
                asistencia: nextAsistencia
            };
        });

        showToast(`Asistencia de la fecha ${fechaAsistencia} guardada correctamente`, 'success');
    };

    return (
        <div id="view-maestro" className="app-view animate-fade-in">
            {/* ENCABEZADO DEL MAESTRO CON BADGE DE ÁREA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                        Portal Docente • <span style={{ color: '#dc2626' }}>{teacherArea}</span>
                    </h1>
                    <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: '0.9rem' }}>
                        Gestión académica exclusiva para tus alumnos de {teacherArea} en CAN
                    </p>
                </div>

                <div style={{ background: 'rgba(220, 38, 38, 0.15)', border: '1px solid rgba(220, 38, 38, 0.3)', padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-music" style={{ color: '#ef4444' }}></i>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#ffffff' }}>Especialidad: {teacherArea}</span>
                </div>
            </div>

            {/* NAVEGACIÓN POR PESTAÑAS */}
            <div className="subview-nav">
                {[
                    { id: 'dashboard', label: 'Mi Dashboard', icon: 'fas fa-chart-bar' },
                    { id: 'asistencia', label: 'Tomar Asistencia', icon: 'fas fa-calendar-check' },
                    { id: 'alumnos', label: 'Mis Alumnos & Evaluación', icon: 'fas fa-user-graduate' },
                    { id: 'classroom', label: 'Tareas & Asignaciones', icon: 'fas fa-tasks' },
                    { id: 'materiales', label: 'Materiales & Archivos Locales', icon: 'fas fa-folder-open' },
                    { id: 'anuncios', label: 'Anuncios Staff', icon: 'fas fa-bullhorn' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`subview-tab ${currentSub === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveSubview(tab.id)}
                    >
                        <i className={tab.icon}></i> {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB 1: DASHBOARD */}
            {currentSub === 'dashboard' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="dashboard-grid">
                        <div className="status-card">
                            <div className="card-icon red-variant"><i className="fas fa-users"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Mis Alumnos ({teacherArea})</small>
                                <div className="stat-val">{myStudents.length}</div>
                                <small className="text-muted">Asignados a tu clase</small>
                            </div>
                        </div>

                        <div className="status-card">
                            <div className="card-icon green-variant"><i className="fas fa-tasks"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Tareas Publicadas</small>
                                <div className="stat-val">{myTareas.length}</div>
                                <small className="text-muted">Para la especialidad</small>
                            </div>
                        </div>

                        <div className="status-card">
                            <div className="card-icon amber-variant"><i className="fas fa-folder-open"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Materiales & Archivos</small>
                                <div className="stat-val">{myMateriales.length}</div>
                                <small className="text-muted">En la biblioteca de clase</small>
                            </div>
                        </div>
                    </div>

                    {/* Entregas recientes */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-clock" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Entregas Recientes de Alumnos</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Tarea ID</th>
                                        <th style={{ padding: '12px' }}>Evidencia Video / Enlace</th>
                                        <th style={{ padding: '12px' }}>Estado</th>
                                        <th style={{ padding: '12px' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(entregas).length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay entregas pendientes de revisar.</td></tr>
                                    ) : (
                                        Object.entries(entregas).map(([k, e]) => (
                                            <tr key={k} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '12px' }}><strong>@{e.username}</strong></td>
                                                <td style={{ padding: '12px' }}>{e.tareaId}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <a href={e.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                        <i className="fas fa-external-link-alt"></i> Ver Evidencia
                                                    </a>
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    <span className={`badge ${e.estado === 'calificado' ? 'badge-solvente' : 'badge-warning'}`}>{e.estado}</span>
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    <button className="btn btn-sm btn-primary" onClick={() => openModal('evaluar-tarea', { key: k, ...e })}>
                                                        <i className="fas fa-star" style={{ marginRight: '6px' }}></i> Calificar
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

            {/* TAB 2: TOMAR ASISTENCIA */}
            {currentSub === 'asistencia' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}><i className="fas fa-user-check" style={{ color: '#10b981', marginRight: '8px' }}></i> Registro de Asistencia por Fecha</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>Selecciona la fecha y marca la asistencia de tus alumnos de {teacherArea}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1' }}>Fecha de Clase:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={fechaAsistencia}
                                    onChange={(e) => setFechaAsistencia(e.target.value)}
                                    style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
                                />
                            </div>
                        </div>

                        <div className="table-container" style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Instrumento</th>
                                        <th style={{ padding: '12px' }}>Estatus Registrado</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>Marcar Asistencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStudents.length === 0 ? (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay alumnos registrados para {teacherArea}.</td></tr>
                                    ) : (
                                        myStudents.map(s => {
                                            const asistenciaAlumno = db.asistencia?.[s.key] || {};
                                            const estadoGuardado = asistenciaAlumno[fechaAsistencia] || 'sin_registro';
                                            const estadoSeleccionado = asistenciaFechaState[s.key] || estadoGuardado;

                                            return (
                                                <tr key={s.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '12px' }}>
                                                        <strong>{s.nombre || s.key}</strong>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>@{s.key}</div>
                                                    </td>
                                                    <td style={{ padding: '12px' }}>{s.area || s.instrument || teacherArea}</td>
                                                    <td style={{ padding: '12px' }}>
                                                        <span style={{
                                                            padding: '4px 10px',
                                                            borderRadius: '12px',
                                                            fontSize: '0.78rem',
                                                            fontWeight: 800,
                                                            textTransform: 'uppercase',
                                                            background: estadoSeleccionado === 'presente' ? 'rgba(16, 185, 129, 0.2)' : estadoSeleccionado === 'ausente' ? 'rgba(239, 68, 68, 0.2)' : estadoSeleccionado === 'retardo' ? 'rgba(245, 158, 11, 0.2)' : estadoSeleccionado === 'justificado' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.06)',
                                                            color: estadoSeleccionado === 'presente' ? '#10b981' : estadoSeleccionado === 'ausente' ? '#ef4444' : estadoSeleccionado === 'retardo' ? '#f59e0b' : estadoSeleccionado === 'justificado' ? '#3b82f6' : '#94a3b8'
                                                        }}>
                                                            {estadoSeleccionado}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                                        <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                            <button
                                                                type="button"
                                                                style={{
                                                                    padding: '6px 12px', borderRadius: '8px', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer',
                                                                    background: estadoSeleccionado === 'presente' ? '#10b981' : 'rgba(255,255,255,0.06)',
                                                                    color: estadoSeleccionado === 'presente' ? '#fff' : '#cbd5e1'
                                                                }}
                                                                onClick={() => handleSetAsistenciaState(s.key, 'presente')}
                                                            >
                                                                Presente
                                                            </button>

                                                            <button
                                                                type="button"
                                                                style={{
                                                                    padding: '6px 12px', borderRadius: '8px', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer',
                                                                    background: estadoSeleccionado === 'ausente' ? '#dc2626' : 'rgba(255,255,255,0.06)',
                                                                    color: estadoSeleccionado === 'ausente' ? '#fff' : '#cbd5e1'
                                                                }}
                                                                onClick={() => handleSetAsistenciaState(s.key, 'ausente')}
                                                            >
                                                                Ausente
                                                            </button>

                                                            <button
                                                                type="button"
                                                                style={{
                                                                    padding: '6px 12px', borderRadius: '8px', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer',
                                                                    background: estadoSeleccionado === 'retardo' ? '#f59e0b' : 'rgba(255,255,255,0.06)',
                                                                    color: estadoSeleccionado === 'retardo' ? '#fff' : '#cbd5e1'
                                                                }}
                                                                onClick={() => handleSetAsistenciaState(s.key, 'retardo')}
                                                            >
                                                                Retardo
                                                            </button>

                                                            <button
                                                                type="button"
                                                                style={{
                                                                    padding: '6px 12px', borderRadius: '8px', border: 'none', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer',
                                                                    background: estadoSeleccionado === 'justificado' ? '#2563eb' : 'rgba(255,255,255,0.06)',
                                                                    color: estadoSeleccionado === 'justificado' ? '#fff' : '#cbd5e1'
                                                                }}
                                                                onClick={() => handleSetAsistenciaState(s.key, 'justificado')}
                                                            >
                                                                Justificado
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <button className="btn btn-primary" onClick={handleGuardarAsistencia} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800 }}>
                            <i className="fas fa-save" style={{ marginRight: '8px' }}></i> Guardar Asistencia de la Fecha ({fechaAsistencia})
                        </button>
                    </div>
                </div>
            )}

            {/* TAB 3: MIS ALUMNOS & EVALUACIÓN */}
            {currentSub === 'alumnos' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-user-graduate" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Alumnos de {teacherArea} & Calificaciones</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Instrumento</th>
                                        <th style={{ padding: '12px' }}>Teoría (0-100)</th>
                                        <th style={{ padding: '12px' }}>Técnica (0-100)</th>
                                        <th style={{ padding: '12px' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStudents.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No tienes alumnos asignados en {teacherArea}.</td></tr>
                                    ) : (
                                        myStudents.map(s => {
                                            const cal = db.calificaciones?.[s.key] || { teoria: '-', tecnica: '-' };
                                            return (
                                                <tr key={s.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '12px' }}>
                                                        <strong>{s.nombre || s.key}</strong>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>@{s.key}</div>
                                                    </td>
                                                    <td style={{ padding: '12px' }}>{s.area || s.instrument || teacherArea}</td>
                                                    <td style={{ padding: '12px' }}><strong>{cal.teoria}</strong> / 100</td>
                                                    <td style={{ padding: '12px' }}><strong>{cal.tecnica}</strong> / 100</td>
                                                    <td style={{ padding: '12px' }}>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => openModal('calificar', s)}>
                                                            <i className="fas fa-star" style={{ marginRight: '6px' }}></i> Evaluar Alumno
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

            {/* TAB 4: TAREAS & ASIGNACIONES */}
            {currentSub === 'classroom' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-plus-circle" style={{ color: '#dc2626', marginRight: '8px' }}></i> Asignar Tarea a Alumnos de {teacherArea}</h3>
                        </div>
                        <form onSubmit={handleCrearTarea} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Título de la Tarea:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Escala de Do Mayor a 90 BPM"
                                        value={nuevaTarea.titulo}
                                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Fecha Límite:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={nuevaTarea.fechaLimite}
                                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, fechaLimite: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Instrucciones detalladas:</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    placeholder="Describe qué ejercicio o metrónomo debe practicar el alumno..."
                                    value={nuevaTarea.descripcion}
                                    onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                />
                            </div>

                            {/* Adjuntar Archivo Local para Tarea */}
                            <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                                    <i className="fas fa-paperclip" style={{ marginRight: '6px', color: '#3b82f6' }}></i> Adjuntar Archivo Local de Tarea (PDF, Imagen, Audio):
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.mp3,.png,.jpg,.jpeg,.doc,.docx"
                                    onChange={(e) => handleFileChange(e, setArchivoTarea)}
                                    style={{ color: '#cbd5e1', fontSize: '0.85rem' }}
                                />
                                {archivoTarea && (
                                    <div style={{ marginTop: '8px', color: '#10b981', fontSize: '0.82rem', fontWeight: 700 }}>
                                        <i className="fas fa-file-check" style={{ marginRight: '6px' }}></i> {archivoTarea.nombre} ({archivoTarea.tamano})
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: '10px' }}>
                                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Publicar Tarea
                            </button>
                        </form>
                    </div>

                    {/* Tareas Activas */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-tasks" style={{ color: '#10b981', marginRight: '8px' }}></i> Tareas Activas en {teacherArea} ({myTareas.length})</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Título / Instrucciones</th>
                                        <th style={{ padding: '12px' }}>Fecha Límite</th>
                                        <th style={{ padding: '12px' }}>Archivo Adjunto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myTareas.length === 0 ? (
                                        <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay tareas publicadas en {teacherArea}.</td></tr>
                                    ) : (
                                        myTareas.map(t => (
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
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: MATERIALES & ARCHIVOS LOCALES */}
            {currentSub === 'materiales' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-folder-plus" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Publicar Material de Práctica (Enlaces & Archivos Locales)</h3>
                        </div>

                        <form onSubmit={handleCrearMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Título del Material:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Rudimentos de Bombo o Partitura PDF"
                                        value={nuevoMaterial.titulo}
                                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, titulo: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Enlace Externo (Opcional - YouTube, Drive):</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        placeholder="https://youtube.com/watch?v=..."
                                        value={nuevoMaterial.enlace}
                                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, enlace: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Descripción / Notas de Práctica:</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    placeholder="Describe cómo deben estudiar este material los alumnos de tu clase..."
                                    value={nuevoMaterial.descripcion}
                                    onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, descripcion: e.target.value })}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                />
                            </div>

                            {/* Carga de Archivo Local */}
                            <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px dashed rgba(59, 130, 246, 0.4)' }}>
                                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#3b82f6', marginBottom: '8px' }}>
                                    <i className="fas fa-file-upload" style={{ marginRight: '6px' }}></i> Subir Archivo Local (PDF, MP3, Imagen, Partitura):
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.mp3,.wav,.png,.jpg,.jpeg,.doc,.docx"
                                    onChange={(e) => handleFileChange(e, setArchivoMaterial)}
                                    style={{ color: '#cbd5e1', fontSize: '0.85rem' }}
                                />
                                {archivoMaterial && (
                                    <div style={{ marginTop: '10px', color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>
                                        <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> {archivoMaterial.nombre} ({archivoMaterial.tamano})
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: '10px' }}>
                                <i className="fas fa-upload" style={{ marginRight: '8px' }}></i> Publicar Material a Alumnos
                            </button>
                        </form>
                    </div>

                    {/* Biblioteca de Materiales */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-book" style={{ color: '#10b981', marginRight: '8px' }}></i> Biblioteca de Materiales de {teacherArea} ({myMateriales.length})</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            {myMateriales.length === 0 ? (
                                <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>No has publicado materiales para {teacherArea}.</div>
                            ) : (
                                myMateriales.map(m => (
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

            {/* TAB 6: ANUNCIOS STAFF */}
            {currentSub === 'anuncios' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-bullhorn" style={{ color: '#f59e0b', marginRight: '8px' }}></i> Muro de Anuncios del Staff & Coordinación</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(db.anunciosStaff || []).map(a => (
                                <div key={a.id} style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #ef4444', padding: '1.2rem', borderRadius: '10px' }}>
                                    <h4 style={{ margin: '0 0 6px', color: '#ffffff' }}>{a.titulo}</h4>
                                    <p style={{ margin: '0 0 8px', color: '#cbd5e1', fontSize: '0.9rem' }}>{a.contenido}</p>
                                    <small style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{a.fecha} • {a.autor}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
