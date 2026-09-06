import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { normalizeRol } from '../../../services/worshipDb';
import PlaybackStudioApp from '../../common/PlaybackStudioApp';

export default function MaestroDashboard() {
    const { db, updateDb, activeSubview, setActiveSubview, currentUser, updateUserProfile, showToast } = useWorship();
    const currentSub = activeSubview || 'dashboard';

    const userKey = currentUser?.username || currentUser?.key || 'maestro1';
    const teacherProfile = db.usuarios?.[userKey] || currentUser || {};
    const teacherArea = teacherProfile.area || teacherProfile.instrument || 'Teclado';

    // ESTADO PARA "MI PERFIL"
    const [profilePhoto, setProfilePhoto] = useState(teacherProfile.photo || '');
    const [profilePhone, setProfilePhone] = useState(teacherProfile.phone || teacherProfile.telefono || '');
    const [profilePassword, setProfilePassword] = useState(teacherProfile.password || 'can2026**');
    const [profileBio, setProfileBio] = useState(teacherProfile.bio || '');

    // ESTADO PARA TAREAS Y EVALUACIÓN POR TAREA SELECCIONADA
    const [selectedTaskToGrade, setSelectedTaskToGrade] = useState('');
    const [evaluacionData, setEvaluacionData] = useState({});

    // ESTADO PARA NUEVA TAREA (con límite de hora y hasta 500MB de archivo local)
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaLimite: '', horaLimite: '23:59' });
    const [archivoTarea, setArchivoTarea] = useState(null);

    // ESTADO PARA NUEVO MATERIAL (archivos hasta 500MB)
    const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', descripcion: '', enlace: '' });
    const [archivoMaterial, setArchivoMaterial] = useState(null);

    // FILTRAR ALUMNOS DEL MAESTRO POR SU INSTRUMENTO/ÁREA
    const myStudents = Object.entries(db.usuarios || {})
        .filter(([_, u]) => {
            const isStudent = normalizeRol(u.rol) === 'estudiante';
            const studentArea = u.area || u.instrument || 'Teclado';
            if (currentUser?.role === 'admin' || currentUser?.rol === 'admin') return isStudent;
            return isStudent && studentArea.toLowerCase().includes(teacherArea.toLowerCase());
        })
        .map(([k, u]) => ({ key: k, ...u }));

    // Tareas y Materiales filtrados por Área
    const myTareas = (db.tareas || []).filter(t => {
        if (currentUser?.role === 'admin' || currentUser?.rol === 'admin') return true;
        return (t.area || '').toLowerCase().includes(teacherArea.toLowerCase());
    });

    const myMateriales = (db.materiales || []).filter(m => {
        if (currentUser?.role === 'admin' || currentUser?.rol === 'admin') return true;
        return (m.area || '').toLowerCase().includes(teacherArea.toLowerCase());
    });

    const entregas = db.entregasTareas || {};

    // Carga de Archivos Locales (Hasta 500MB con lectura FileReader)
    const handleFileUpload = (e, setFileState) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Límite de 500MB
        if (file.size > 500 * 1024 * 1024) {
            showToast('El archivo supera el límite permitido de 500 MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setFileState({
                nombre: file.name,
                tipo: file.type,
                tamano: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                dataUrl: ev.target.result
            });
            showToast(`Archivo "${file.name}" cargado exitosamente`, 'info');
        };
        reader.readAsDataURL(file);
    };

    // GUARDAR MI PERFIL
    const handleSaveProfile = (e) => {
        e.preventDefault();
        updateUserProfile(userKey, {
            photo: profilePhoto,
            phone: profilePhone,
            password: profilePassword,
            bio: profileBio
        });
        showToast('Perfil de maestro actualizado con éxito', 'success');
    };

    // FOTO DE PERFIL CREADA POR ARCHIVO
    const handleProfilePhotoFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setProfilePhoto(ev.target.result);
            showToast('Foto cargada. Recuerda hacer clic en Guardar Perfil.', 'info');
        };
        reader.readAsDataURL(file);
    };

    // CREAR TAREA (MODELO GOOGLE CLASSROOM CON FECHA Y HORA LÍMITE)
    const handleCrearTarea = (e) => {
        e.preventDefault();
        if (!nuevaTarea.titulo || !nuevaTarea.fechaLimite) {
            showToast('Por favor completa el título y la fecha límite', 'error');
            return;
        }

        const task = {
            id: 't_' + Date.now(),
            area: teacherArea,
            titulo: nuevaTarea.titulo,
            descripcion: nuevaTarea.descripcion,
            fechaLimite: nuevaTarea.fechaLimite,
            horaLimite: nuevaTarea.horaLimite || '23:59',
            maestro: currentUser?.name || currentUser?.nombre || 'Maestro ' + teacherArea,
            archivoLocal: archivoTarea || null
        };

        updateDb(prev => ({
            ...prev,
            tareas: [task, ...(prev.tareas || [])]
        }));

        setNuevaTarea({ titulo: '', descripcion: '', fechaLimite: '', horaLimite: '23:59' });
        setArchivoTarea(null);
        showToast(`Tarea publicada a alumnos de ${teacherArea} con hora límite ${task.horaLimite}`, 'success');
    };

    // CREAR MATERIAL DE PRÁCTICA (ARCHIVOS HASTA 500MB)
    const handleCrearMaterial = (e) => {
        e.preventDefault();
        if (!nuevoMaterial.titulo && !archivoMaterial) {
            showToast('Ingresa un título o adjunta un archivo', 'error');
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
        showToast(`Material de ${teacherArea} publicado a la clase`, 'success');
    };

    // GUARDAR CALIFICACIÓN INDIVIDUAL DE ALUMNO CON COMENTARIO (CLASSROOM)
    const handleGuardarEvaluacionTarea = (tareaId, studentKey) => {
        const keyEntrega = `${tareaId}_${studentKey}`;
        const evalObj = evaluacionData[keyEntrega] || {};

        updateDb(prev => {
            const nextEntregas = { ...(prev.entregasTareas || {}) };
            const currentEntry = nextEntregas[keyEntrega] || { tareaId, username: studentKey };

            nextEntregas[keyEntrega] = {
                ...currentEntry,
                calificacion: parseInt(evalObj.calificacion) || 100,
                comentario: evalObj.comentario || '¡Excelente desempeño en tu entrega!',
                estado: 'calificado'
            };

            return {
                ...prev,
                entregasTareas: nextEntregas
            };
        });

        showToast(`Calificación guardada para @${studentKey}`, 'success');
    };

    return (
        <div id="view-maestro" className="app-view animate-fade-in">
            {/* CABECERA CON AVATAR DE MAESTRO */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {teacherProfile.photo ? (
                        <img src={teacherProfile.photo} alt="Avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #dc2626' }} />
                    ) : (
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800 }}>
                            {(teacherProfile.nombre || teacherProfile.name || 'M').charAt(0)}
                        </div>
                    )}
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 800, color: '#ffffff' }}>
                            Docente: {teacherProfile.nombre || teacherProfile.name}
                        </h1>
                        <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Especialidad: <strong style={{ color: '#ef4444' }}>{teacherArea}</strong> • Tel: {teacherProfile.phone || teacherProfile.telefono || 'Sin registrar'}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={() => setActiveSubview('perfil')}>
                        <i className="fas fa-user-cog" style={{ marginRight: '6px' }}></i> Mi Perfil
                    </button>
                    <button className="btn btn-primary" onClick={() => setActiveSubview('ensambles')}>
                        <i className="fas fa-sliders-h" style={{ marginRight: '6px' }}></i> Sala de Ensayo (Playback)
                    </button>
                </div>
            </div>



            {/* TAB 1: MI DASHBOARD (RESUMEN GENERAL ESTILO GOOGLE CLASSROOM) */}
            {currentSub === 'dashboard' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="dashboard-grid">
                        <div className="status-card">
                            <div className="card-icon red-variant"><i className="fas fa-users"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Mis Alumnos ({teacherArea})</small>
                                <div className="stat-val">{myStudents.length}</div>
                                <small className="text-muted">Inscritos a tu especialidad</small>
                            </div>
                        </div>

                        <div className="status-card">
                            <div className="card-icon green-variant"><i className="fas fa-tasks"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Tareas Activas</small>
                                <div className="stat-val">{myTareas.length}</div>
                                <small className="text-muted">Asignadas en Classroom</small>
                            </div>
                        </div>

                        <div className="status-card">
                            <div className="card-icon amber-variant"><i className="fas fa-folder-open"></i></div>
                            <div>
                                <small style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Materiales Publicados</small>
                                <div className="stat-val">{myMateriales.length}</div>
                                <small className="text-muted">En la biblioteca de clase</small>
                            </div>
                        </div>
                    </div>

                    {/* ENTREGAS RECIENTES DE ALUMNOS CON FECHA Y HORA EXACTA DE ENTREGA */}
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-history" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Entregas Recientes de Alumnos (Registro Fecha y Hora)</h3>
                            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Estructura resumen estilo Google Classroom</span>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Tarea ID</th>
                                        <th style={{ padding: '12px' }}>Fecha y Hora de Entrega</th>
                                        <th style={{ padding: '12px' }}>Evidencia / Enlace</th>
                                        <th style={{ padding: '12px' }}>Estatus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(entregas).length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay entregas registradas aún.</td></tr>
                                    ) : (
                                        Object.entries(entregas).map(([k, e]) => {
                                            const fechaHoraFormatted = e.fechaEntrega ? `${e.fechaEntrega} ${e.horaEntrega || '18:30'}` : '2026-09-05 14:20';
                                            return (
                                                <tr key={k} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '12px' }}><strong>@{e.username}</strong></td>
                                                    <td style={{ padding: '12px' }}>{e.tareaId}</td>
                                                    <td style={{ padding: '12px' }}>
                                                        <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
                                                            <i className="fas fa-clock" style={{ marginRight: '4px' }}></i> {fechaHoraFormatted}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        <a href={e.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#10b981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                            <i className="fas fa-external-link-alt"></i> Ver Evidencia
                                                        </a>
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        <span className={`badge ${e.estado === 'calificado' ? 'badge-solvente' : 'badge-warning'}`}>{e.estado}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* COMUNICADOS RECIENTES Y ANUNCIOS PASTORALES DESTACADOS */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-bullhorn" style={{ color: '#f59e0b', marginRight: '8px' }}></i> Anuncios Destacados & Cobertura Pastoral</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(db.anunciosStaff || []).slice(0, 5).map(a => {
                                const isPastoral = a.autor?.toLowerCase().includes('pastor') || a.tipo === 'pastoral';
                                return (
                                    <div
                                        key={a.id}
                                        style={{
                                            background: isPastoral ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(30, 27, 75, 0.4))' : 'rgba(255,255,255,0.03)',
                                            border: isPastoral ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                                            borderLeft: isPastoral ? '6px solid #8b5cf6' : '4px solid #ef4444',
                                            padding: '1.2rem',
                                            borderRadius: '14px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <h4 style={{ margin: 0, color: isPastoral ? '#a78bfa' : '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                                                {isPastoral && <i className="fas fa-crown" style={{ color: '#eab308', marginRight: '8px' }}></i>}
                                                {a.titulo}
                                            </h4>
                                            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{a.fecha}</span>
                                        </div>
                                        <p style={{ margin: '0 0 8px', color: '#cbd5e1', fontSize: '0.9rem' }}>{a.contenido}</p>
                                        <small style={{ color: isPastoral ? '#c4b5fd' : '#94a3b8', fontSize: '0.78rem', fontWeight: 700 }}>
                                            {isPastoral ? '✝ Emitido por Liderazgo Pastoral' : `Publicado por: ${a.autor}`}
                                        </small>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: MI PERFIL */}
            {currentSub === 'perfil' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel" style={{ maxWidth: '650px', margin: '0 auto' }}>
                        <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-user-cog" style={{ color: '#dc2626', marginRight: '8px' }}></i> Configuración de Mi Perfil de Maestro</h3>
                        </div>

                        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {/* Previsualización Foto de Perfil */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px' }}>
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt="Perfil" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #dc2626' }} />
                                ) : (
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
                                        {(teacherProfile.nombre || 'M').charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: '#fff' }}>Subir Foto de Perfil:</label>
                                    <input type="file" accept="image/*" onChange={handleProfilePhotoFile} style={{ color: '#cbd5e1', fontSize: '0.85rem' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.88rem', marginBottom: '4px' }}>Número de Teléfono / WhatsApp:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="+52 55 1234 5678"
                                    value={profilePhone}
                                    onChange={(e) => setProfilePhone(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.88rem', marginBottom: '4px' }}>Contraseña de Acceso:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nueva contraseña"
                                    value={profilePassword}
                                    onChange={(e) => setProfilePassword(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.88rem', marginBottom: '4px' }}>Biografía / Presentación:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Describe tu trayectoria musical en CAN..."
                                    value={profileBio}
                                    onChange={(e) => setProfileBio(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800, alignSelf: 'flex-start' }}>
                                <i className="fas fa-save" style={{ marginRight: '8px' }}></i> Guardar Cambios de Perfil
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB 3: TAREAS & CALIFICACIONES (MODELO GOOGLE CLASSROOM) */}
            {currentSub === 'classroom' && (
                <div className="maestro-subview animate-fade-in">
                    {/* CREAR TAREA CON FECHA Y HORA LÍMITE */}
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-plus-circle" style={{ color: '#dc2626', marginRight: '8px' }}></i> Asignar Tarea a {teacherArea} (Límite Fecha y Hora)</h3>
                        </div>
                        <form onSubmit={handleCrearTarea} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Título de la Tarea:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Rudimento Paradiddle a 100 BPM"
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

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Hora Límite de Corte:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={nuevaTarea.horaLimite}
                                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, horaLimite: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Instrucciones detalladas de la asignación:</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    placeholder="Describe las pautas de estudio..."
                                    value={nuevaTarea.descripcion}
                                    onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                />
                            </div>

                            {/* Adjuntar Archivo Local (Hasta 500MB) */}
                            <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px dashed rgba(220, 38, 38, 0.4)' }}>
                                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#ef4444', marginBottom: '6px' }}>
                                    <i className="fas fa-file-upload" style={{ marginRight: '6px' }}></i> Adjuntar Guía o Material Local (Hasta 500 MB):
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e, setArchivoTarea)}
                                    style={{ color: '#cbd5e1', fontSize: '0.85rem' }}
                                />
                                {archivoTarea && (
                                    <div style={{ marginTop: '8px', color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>
                                        <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> {archivoTarea.nombre} ({archivoTarea.tamano})
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: '10px' }}>
                                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Publicar Tarea en Classroom
                            </button>
                        </form>
                    </div>

                    {/* EVALUACIÓN INDIVIDUAL POR TAREA (CLASSROOM WORKFLOW) */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-star" style={{ color: '#f59e0b', marginRight: '8px' }}></i> Calificación Individual de Entregas por Tarea</h3>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px', color: '#fff' }}>Seleccionar Tarea a Calificar:</label>
                            <select
                                className="form-control"
                                value={selectedTaskToGrade}
                                onChange={(e) => setSelectedTaskToGrade(e.target.value)}
                                style={{ width: '100%', maxWidth: '400px' }}
                            >
                                <option value="">-- Seleccionar Tarea Activa --</option>
                                {myTareas.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.titulo} (Límite: {t.fechaLimite} {t.horaLimite || '23:59'})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedTaskToGrade ? (
                            <div className="table-container" style={{ overflowX: 'auto' }}>
                                <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                            <th style={{ padding: '12px' }}>Alumno</th>
                                            <th style={{ padding: '12px' }}>Evidencia Enviada</th>
                                            <th style={{ padding: '12px' }}>Nota (0-100 pts)</th>
                                            <th style={{ padding: '12px' }}>Comentario Retroalimentación</th>
                                            <th style={{ padding: '12px' }}>Guardar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myStudents.map(s => {
                                            const keyEntrega = `${selectedTaskToGrade}_${s.key}`;
                                            const entrega = entregas[keyEntrega];
                                            const currentEval = evaluacionData[keyEntrega] || {
                                                calificacion: entrega?.calificacion || 95,
                                                comentario: entrega?.comentario || ''
                                            };

                                            return (
                                                <tr key={s.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '12px' }}>
                                                        <strong>{s.nombre || s.key}</strong>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>@{s.key}</div>
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        {entrega ? (
                                                            <a href={entrega.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                                                                <i className="fas fa-play-circle" style={{ marginRight: '4px' }}></i> Abrir Evidencia
                                                            </a>
                                                        ) : (
                                                            <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>Sin entregar aún</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={currentEval.calificacion}
                                                            onChange={(e) => setEvaluacionData({
                                                                ...evaluacionData,
                                                                [keyEntrega]: { ...currentEval, calificacion: e.target.value }
                                                            })}
                                                            style={{ width: '80px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Retroalimentación para el alumno..."
                                                            value={currentEval.comentario}
                                                            onChange={(e) => setEvaluacionData({
                                                                ...evaluacionData,
                                                                [keyEntrega]: { ...currentEval, comentario: e.target.value }
                                                            })}
                                                            style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '12px' }}>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => handleGuardarEvaluacionTarea(selectedTaskToGrade, s.key)}
                                                        >
                                                            <i className="fas fa-check"></i> Guardar
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Selecciona una tarea en el menú desplegable superior para evaluar a cada alumno individualmente.</p>
                        )}
                    </div>
                </div>
            )}

            {/* TAB 4: MIS ALUMNOS */}
            {currentSub === 'alumnos' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-user-graduate" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Directorio de Alumnos de {teacherArea} ({myStudents.length})</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Instrumento</th>
                                        <th style={{ padding: '12px' }}>Teoría (0-100)</th>
                                        <th style={{ padding: '12px' }}>Técnica (0-100)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStudents.map(s => {
                                        const cal = db.calificaciones?.[s.key] || { teoria: 85, tecnica: 90 };
                                        return (
                                            <tr key={s.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '12px' }}>
                                                    <strong>{s.nombre || s.key}</strong>
                                                    <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>@{s.key}</div>
                                                </td>
                                                <td style={{ padding: '12px' }}>{s.area || s.instrument || teacherArea}</td>
                                                <td style={{ padding: '12px' }}><strong>{cal.teoria}</strong> / 100</td>
                                                <td style={{ padding: '12px' }}><strong>{cal.tecnica}</strong> / 100</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: MATERIALES & ARCHIVOS LOCALES (HASTA 500 MB) */}
            {currentSub === 'materiales' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-folder-plus" style={{ color: '#10b981', marginRight: '8px' }}></i> Publicar Material (PDF, MP3, MP4, PNG, DOCX hasta 500 MB)</h3>
                        </div>

                        <form onSubmit={handleCrearMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Título del Material:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Partitura en PDF o Pista de Acompañamiento"
                                        value={nuevoMaterial.titulo}
                                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, titulo: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Enlace Web (Opcional):</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        placeholder="https://..."
                                        value={nuevoMaterial.enlace}
                                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, enlace: e.target.value })}
                                        style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                    />
                                </div>
                            </div>

                            {/* Carga de Archivos Locales hasta 500MB */}
                            <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px dashed rgba(16, 185, 129, 0.4)' }}>
                                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>
                                    <i className="fas fa-cloud-upload-alt" style={{ marginRight: '6px' }}></i> Subir Archivo Local (Video, Audio, PDF, Excel, Word, Zip hasta 500 MB):
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e, setArchivoMaterial)}
                                    style={{ color: '#cbd5e1', fontSize: '0.85rem' }}
                                />
                                {archivoMaterial && (
                                    <div style={{ marginTop: '10px', color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>
                                        <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> {archivoMaterial.nombre} ({archivoMaterial.tamano})
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: '10px' }}>
                                <i className="fas fa-upload" style={{ marginRight: '8px' }}></i> Publicar Material
                            </button>
                        </form>
                    </div>

                    {/* Biblioteca de Materiales */}
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-book" style={{ color: '#10b981', marginRight: '8px' }}></i> Biblioteca de Materiales de {teacherArea}</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                            {myMateriales.length === 0 ? (
                                <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>No has publicado materiales.</div>
                            ) : (
                                myMateriales.map(m => (
                                    <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span className="badge badge-solvente">{m.area}</span>
                                                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{m.fecha}</span>
                                            </div>
                                            <h4 style={{ margin: '0 0 6px', color: '#ffffff', fontSize: '1.05rem' }}>{m.titulo}</h4>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                                            {m.enlace && (
                                                <a href={m.enlace} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                    <i className="fas fa-external-link-alt"></i> Abrir Enlace
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

            {/* TAB 6: ENSAMBLES & SALA DE ENSAYO (PLAYBACK APP REPLICA) */}
            {(currentSub === 'ensambles' || currentSub === 'playback_studio') && (
                <div className="maestro-subview animate-fade-in">
                    <PlaybackStudioApp />
                </div>
            )}

            {/* TAB 7: ANUNCIOS & COBERTURA PASTORAL */}
            {currentSub === 'anuncios' && (
                <div className="maestro-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-bullhorn" style={{ color: '#8b5cf6', marginRight: '8px' }}></i> Comunicados del Staff & Cobertura Pastoral</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {(db.anunciosStaff || []).map(a => {
                                const isPastoral = a.autor?.toLowerCase().includes('pastor') || a.tipo === 'pastoral';
                                return (
                                    <div
                                        key={a.id}
                                        style={{
                                            background: isPastoral ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(30, 27, 75, 0.5))' : 'rgba(255,255,255,0.03)',
                                            border: isPastoral ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                                            borderLeft: isPastoral ? '6px solid #8b5cf6' : '4px solid #ef4444',
                                            padding: '1.4rem',
                                            borderRadius: '16px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <h4 style={{ margin: 0, color: isPastoral ? '#a78bfa' : '#ffffff', fontSize: '1.1rem', fontWeight: 800 }}>
                                                {isPastoral && <i className="fas fa-crown" style={{ color: '#eab308', marginRight: '8px' }}></i>}
                                                {a.titulo}
                                            </h4>
                                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{a.fecha}</span>
                                        </div>
                                        <p style={{ margin: '0 0 10px', color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.5' }}>{a.contenido}</p>
                                        <small style={{ color: isPastoral ? '#c4b5fd' : '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>
                                            {isPastoral ? '✝ Mensaje de Cobertura Pastoral' : `Emisión: ${a.autor}`}
                                        </small>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
