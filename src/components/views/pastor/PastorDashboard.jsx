import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { calcularEstadoPago, normalizeRol } from '../../../services/worshipDb';

export default function PastorDashboard() {
    const { db, updateDb, activeSubview, setActiveSubview, showToast } = useWorship();
    const currentSub = activeSubview || 'alertas';

    const [notaAlumno, setNotaAlumno] = useState('');
    const [notaContenido, setNotaContenido] = useState('');

    const usuarios = db.usuarios || {};
    const students = Object.entries(usuarios)
        .filter(([_, u]) => normalizeRol(u.rol) === 'estudiante')
        .map(([k, u]) => ({ key: k, ...u }));

    const teachers = Object.entries(usuarios)
        .filter(([_, u]) => normalizeRol(u.rol) === 'maestro')
        .map(([k, u]) => ({ key: k, ...u }));

    const tareas = db.tareas || [];
    const entregas = db.entregasTareas || {};
    const totalEntregas = Object.keys(entregas).length;

    const handleGuardarNota = (e) => {
        e.preventDefault();
        if (!notaAlumno || !notaContenido.trim()) {
            showToast('Selecciona un alumno y escribe una nota', 'error');
            return;
        }

        const nuevaNota = {
            id: 'np_' + Date.now(),
            alumno: notaAlumno,
            contenido: notaContenido.trim(),
            fecha: new Date().toISOString().slice(0, 10),
            autor: 'Pastor General'
        };

        updateDb(prev => ({
            ...prev,
            notasPastorales: [nuevaNota, ...(prev.notasPastorales || [])]
        }));

        setNotaContenido('');
        showToast('Nota pastoral guardada con éxito', 'success');
    };

    return (
        <div id="view-pastor" className="app-view">
            {/* SUBVIEW NAV TABS */}
            <div className="subview-nav">
                {[
                    { id: 'alertas', label: 'Visión Global', icon: 'fas fa-chart-pie' },
                    { id: 'asistencia', label: 'Expedientes', icon: 'fas fa-id-card' },
                    { id: 'colegiaturas', label: 'Colegiaturas & Estatus', icon: 'fas fa-file-invoice-dollar' },
                    { id: 'cobertura', label: 'Cuidado Pastoral', icon: 'fas fa-heart' },
                    { id: 'docentes', label: 'Docentes', icon: 'fas fa-chalkboard-teacher' },
                    { id: 'calendario', label: 'Eventos', icon: 'fas fa-calendar-alt' }
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

            {/* TAB: VISIÓN GLOBAL */}
            {currentSub === 'alertas' && (
                <div className="pastor-subview">
                    <div className="dashboard-grid">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-user-graduate"></i></div>
                            <div>
                                <h3>Alumnos Inscritos</h3>
                                <div className="stat-val">{students.length}</div>
                                <small className="text-muted">Matrícula Activa</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon red-variant"><i className="fas fa-calendar-check"></i></div>
                            <div>
                                <h3>Asistencia Promedio</h3>
                                <div className="stat-val">92%</div>
                                <small className="text-muted">Asistencia global histórica</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon red-variant"><i className="fas fa-tasks"></i></div>
                            <div>
                                <h3>Tareas Entregadas</h3>
                                <div className="stat-val">{totalEntregas}</div>
                                <small className="text-muted">{totalEntregas} entregas registradas</small>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: EXPEDIENTES */}
            {currentSub === 'asistencia' && (
                <div className="pastor-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-id-card"></i> Expedientes Académicos y Pastorales</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Instrumento</th>
                                        <th>Ciclos</th>
                                        <th>Observaciones del Maestro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => (
                                        <tr key={s.key}>
                                            <td>
                                                <strong>{s.nombre || s.key}</strong>
                                                <div className="text-muted" style={{ fontSize: '0.78rem' }}>{s.edad || 'N/A'} • {s.anosIglesia || 'C.A.N.'}</div>
                                            </td>
                                            <td>{s.area || s.instrument || 'General'}</td>
                                            <td>{s.ciclosWS || '1° Ciclo'}</td>
                                            <td>{s.observacionesMaestro || 'Sin observaciones registradas.'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: COLEGIATURAS */}
            {currentSub === 'colegiaturas' && (
                <div className="pastor-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-file-invoice-dollar"></i> Estatus de Colegiaturas (Visión Pastoral)</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Instrumento</th>
                                        <th>Estatus</th>
                                        <th>Motivo / Justificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => {
                                        const p = calcularEstadoPago(s);
                                        return (
                                            <tr key={s.key}>
                                                <td><strong>{s.nombre || s.key}</strong></td>
                                                <td>{s.area || s.instrument || 'General'}</td>
                                                <td><span className={`badge ${p.clase}`}>{p.label}</span></td>
                                                <td>{s.motivoNoPago || 'Al corriente / Sin justificación'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: CUIDADO PASTORAL */}
            {currentSub === 'cobertura' && (
                <div className="pastor-subview">
                    <div className="panel-box" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header">
                            <h3><i className="fas fa-heart"></i> Registrar Nota de Cobertura Pastoral</h3>
                        </div>
                        <form onSubmit={handleGuardarNota} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="form-group">
                                <label>Seleccionar Alumno:</label>
                                <select
                                    className="form-control"
                                    value={notaAlumno}
                                    onChange={(e) => setNotaAlumno(e.target.value)}
                                    required
                                >
                                    <option value="">-- Seleccionar alumno --</option>
                                    {students.map(s => (
                                        <option key={s.key} value={s.nombre || s.key}>
                                            {s.nombre || s.key} ({s.area || 'General'})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nota Pastoral / Situación / Oración:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Describe la situación pastoral o acuerdos de consejería..."
                                    value={notaContenido}
                                    onChange={(e) => setNotaContenido(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                <i className="fas fa-save"></i> Guardar en Bitácora
                            </button>
                        </form>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-book-open"></i> Bitácora de Acompañamiento Pastoral</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Alumno</th>
                                        <th>Nota</th>
                                        <th>Autor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(db.notasPastorales || []).length === 0 ? (
                                        <tr><td colSpan="4" className="text-muted" style={{ textAlign: 'center' }}>No hay notas pastorales registradas aún.</td></tr>
                                    ) : (
                                        db.notasPastorales.map((np) => (
                                            <tr key={np.id}>
                                                <td>{np.fecha}</td>
                                                <td><strong>{np.alumno}</strong></td>
                                                <td>{np.contenido}</td>
                                                <td><small className="text-muted">{np.autor}</small></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: DOCENTES */}
            {currentSub === 'docentes' && (
                <div className="pastor-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-chalkboard-teacher"></i> Directorio de Docentes</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Maestro</th>
                                        <th>Especialidad / Área</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map(t => (
                                        <tr key={t.key}>
                                            <td><strong>{t.nombre || t.key}</strong></td>
                                            <td>{t.area || 'Música'}</td>
                                            <td><span className="badge badge-solvente">Docente Activo</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: CALENDARIO */}
            {currentSub === 'calendario' && (
                <div className="pastor-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-calendar-alt"></i> Próximos Eventos & Horarios</h3>
                        </div>
                        <div className="announcements-wall-container">
                            <div className="announcement-item">
                                <h4>Clase Semanal de Academia</h4>
                                <p>Sábados de 10:00 AM a 1:00 PM • Formación técnica e instrumental presencial en Naucalpan.</p>
                            </div>
                            <div className="announcement-item">
                                <h4>Junta de Maestros & Staff</h4>
                                <p>Jueves 7:00 PM • Coordinación pedagógica y evaluación de setlists dominicales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
