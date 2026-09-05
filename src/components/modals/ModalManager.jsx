import React, { useState, useEffect } from 'react';
import { useWorship } from '../../services/WorshipContext';

export default function ModalManager() {
    const { modal, closeModal, updateDb, showToast } = useWorship();
    if (!modal.name) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {modal.name === 'usuario' && <UserModal data={modal.data} onClose={closeModal} />}
                {modal.name === 'calificar' && <GradeModal data={modal.data} onClose={closeModal} />}
                {modal.name === 'entregar-tarea' && <DeliverHomeworkModal data={modal.data} onClose={closeModal} />}
                {modal.name === 'evaluar-tarea' && <EvaluateHomeworkModal data={modal.data} onClose={closeModal} />}
                {modal.name === 'cancion' && <SongModal onClose={closeModal} />}
                {modal.name === 'asistencia' && <AttendanceModal data={modal.data} onClose={closeModal} />}
            </div>
        </div>
    );
}

function UserModal({ data, onClose }) {
    const { updateDb, showToast } = useWorship();
    const isEdit = !!data?.key;

    const [form, setForm] = useState({
        username: data?.key || '',
        nombre: data?.nombre || '',
        password: data?.password || 'can2026**',
        rol: data?.rol || 'estudiante',
        area: data?.area || 'Teclado'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const uKey = form.username.trim().toLowerCase();
        if (!uKey) return;

        updateDb(prev => ({
            ...prev,
            usuarios: {
                ...prev.usuarios,
                [uKey]: {
                    ...(prev.usuarios?.[uKey] || {}),
                    ...form
                }
            }
        }));

        showToast(`Usuario ${form.nombre || uKey} guardado exitosamente`, 'success');
        onClose();
    };

    return (
        <div>
            <div className="modal-header">
                <h3><i className="fas fa-user-edit"></i> {isEdit ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                    <label>Nombre Completo:</label>
                    <input type="text" className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Usuario (Login):</label>
                    <input type="text" className="form-control" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} disabled={isEdit} required />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Rol en el Sistema:</label>
                    <select className="form-control" value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
                        <option value="estudiante">Estudiante / Alumno</option>
                        <option value="maestro">Maestro / Docente</option>
                        <option value="pastor">Pastor</option>
                        <option value="administracion">Producción & Staff</option>
                        <option value="adoracion">Adoración & Ensamble</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Área o Instrumento:</label>
                    <input type="text" className="form-control" placeholder="Ej. Batería, Piano, Pastoral" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                    <i className="fas fa-save"></i> Guardar Usuario
                </button>
            </form>
        </div>
    );
}

function GradeModal({ data, onClose }) {
    const { updateDb, showToast } = useWorship();
    const [teoria, setTeoria] = useState(85);
    const [tecnica, setTecnica] = useState(85);
    const [notas, setNotas] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const key = data.key;
        updateDb(prev => ({
            ...prev,
            calificaciones: {
                ...(prev.calificaciones || {}),
                [key]: {
                    teoria: Number(teoria),
                    tecnica: Number(tecnica),
                    notas
                }
            }
        }));
        showToast(`Calificación guardada para ${data.nombre || key}`, 'success');
        onClose();
    };

    return (
        <div>
            <div className="modal-header">
                <h3><i className="fas fa-star"></i> Calificar a {data.nombre || data.key}</h3>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                    <label>Evaluación Teórica (0 - 100):</label>
                    <input type="number" min="0" max="100" className="form-control" value={teoria} onChange={(e) => setTeoria(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Evaluación Técnica (0 - 100):</label>
                    <input type="number" min="0" max="100" className="form-control" value={tecnica} onChange={(e) => setTecnica(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Observaciones y Retroalimentación:</label>
                    <textarea className="form-control" rows="3" value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Comentarios para el alumno..." />
                </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> Guardar Calificación
                </button>
            </form>
        </div>
    );
}

function DeliverHomeworkModal({ data, onClose }) {
    const { updateDb, showToast } = useWorship();
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!videoUrl) return;

        const key = `${data.tareaId}_${data.userKey}`;
        updateDb(prev => ({
            ...prev,
            entregasTareas: {
                ...(prev.entregasTareas || {}),
                [key]: {
                    id: 'e_' + Date.now(),
                    tareaId: data.tareaId,
                    username: data.userKey,
                    videoUrl,
                    fechaEntrega: new Date().toISOString().slice(0, 10),
                    estado: 'entregado',
                    calificacion: null,
                    feedback: ''
                }
            }
        }));
        showToast('Tarea entregada exitosamente', 'success');
        onClose();
    };

    return (
        <div>
            <div className="modal-header">
                <h3><i className="fas fa-upload"></i> Entregar Tarea Práctica</h3>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                    <label>Enlace de Video o Grabación (YouTube, Drive, etc.):</label>
                    <input type="url" className="form-control" placeholder="https://www.youtube.com/watch?v=..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
                </div>
                <p className="text-muted" style={{ fontSize: '0.82rem' }}>
                    Sube tu práctica a YouTube (No listado) o Google Drive y pega aquí el enlace público para tu maestro.
                </p>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane"></i> Enviar Entrega
                </button>
            </form>
        </div>
    );
}

function EvaluateHomeworkModal({ data, onClose }) {
    const { updateDb, showToast } = useWorship();
    const [calificacion, setCalificacion] = useState(data.calificacion || 90);
    const [feedback, setFeedback] = useState(data.feedback || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDb(prev => ({
            ...prev,
            entregasTareas: {
                ...prev.entregasTareas,
                [data.key]: {
                    ...prev.entregasTareas[data.key],
                    estado: 'calificado',
                    calificacion: Number(calificacion),
                    feedback
                }
            }
        }));
        showToast('Tarea evaluada y retroalimentación guardada', 'success');
        onClose();
    };

    return (
        <div>
            <div className="modal-header">
                <h3><i className="fas fa-check-circle"></i> Evaluar Tarea de {data.username}</h3>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                    <label>Calificación (0 - 100):</label>
                    <input type="number" min="0" max="100" className="form-control" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Retroalimentación para el Alumno:</label>
                    <textarea className="form-control" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Indica fortalezas y aspectos a corregir..." />
                </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> Guardar Evaluación
                </button>
            </form>
        </div>
    );
}

function SongModal({ onClose }) {
    const { updateDb, showToast } = useWorship();
    const [form, setForm] = useState({
        titulo: '',
        autor: '',
        tono: 'G',
        linkAcordes: 'https://www.lacuerda.net',
        linkVideo: 'https://www.youtube.com'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const nueva = { id: 's_' + Date.now(), ...form, activo: true };
        updateDb(prev => ({
            ...prev,
            canciones: [nueva, ...(prev.canciones || [])]
        }));
        showToast(`Canción "${form.titulo}" agregada`, 'success');
        onClose();
    };

    return (
        <div>
            <div className="modal-header">
                <h3><i className="fas fa-music"></i> Registrar Nueva Canción</h3>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                    <label>Título:</label>
                    <input type="text" className="form-control" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Autor / Intérprete:</label>
                    <input type="text" className="form-control" value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Tono:</label>
                    <input type="text" className="form-control" value={form.tono} onChange={(e) => setForm({ ...form, tono: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Enlace de Acordes:</label>
                    <input type="url" className="form-control" value={form.linkAcordes} onChange={(e) => setForm({ ...form, linkAcordes: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Enlace de Video:</label>
                    <input type="url" className="form-control" value={form.linkVideo} onChange={(e) => setForm({ ...form, linkVideo: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> Guardar Canción
                </button>
            </form>
        </div>
    );
}

function AttendanceModal({ data, onClose }) {
    const { db, updateDb, showToast } = useWorship();
    const key = data.key;
    const asistencias = db.asistencia?.[key] || {};
    const hoy = new Date().toISOString().slice(0, 10);

    const handleMarcar = (estado) => {
        updateDb(prev => ({
            ...prev,
            asistencia: {
                ...(prev.asistencia || {}),
                [key]: {
                    ...(prev.asistencia?.[key] || {}),
                    [hoy]: estado
                }
            }
        }));
        showToast(`Asistencia de hoy marcada como: ${estado}`, 'success');
    };

    return (
        <div>
            <div className="modal-header">
                <h3><i className="fas fa-calendar-check"></i> Asistencia: {data.nombre || data.key}</h3>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                <button className="btn btn-sm btn-primary" onClick={() => handleMarcar('presente')}>
                    <i className="fas fa-check"></i> Presente Hoy
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleMarcar('ausente')}>
                    <i className="fas fa-times"></i> Falta Hoy
                </button>
            </div>
            <div className="table-container">
                <table className="table-custom">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(asistencias).map(([f, est]) => (
                            <tr key={f}>
                                <td>{f}</td>
                                <td>
                                    <span className={`badge ${est === 'presente' ? 'badge-solvente' : 'badge-danger'}`}>
                                        {est}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
