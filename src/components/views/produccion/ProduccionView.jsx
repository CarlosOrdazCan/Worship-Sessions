import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { calcularEstadoPago, normalizeRol } from '../../../services/worshipDb';

export default function ProduccionView() {
    const { db, updateDb, activeSubview, setActiveSubview, showToast } = useWorship();
    const currentSub = activeSubview || 'estatus';

    const [estatusEstado, setEstatusEstado] = useState(db.estatusClases?.estado || 'normal');
    const [estatusMensaje, setEstatusMensaje] = useState(db.estatusClases?.mensaje || '');
    const [nuevoAnuncio, setNuevoAnuncio] = useState({ titulo: '', contenido: '' });

    const students = Object.entries(db.usuarios || {})
        .filter(([_, u]) => normalizeRol(u.rol) === 'estudiante')
        .map(([k, u]) => ({ key: k, ...u }));

    const handleActualizarEstatus = (e) => {
        e.preventDefault();
        updateDb(prev => ({
            ...prev,
            estatusClases: {
                estado: estatusEstado,
                mensaje: estatusMensaje,
                fechaActualizacion: new Date().toISOString().slice(0, 10),
                publicadoPor: 'Equipo Producción & Staff'
            }
        }));
        showToast('Estatus de clases actualizado exitosamente', 'success');
    };

    const handlePublicarAnuncio = (e) => {
        e.preventDefault();
        if (!nuevoAnuncio.titulo || !nuevoAnuncio.contenido) return;

        const an = {
            id: 's_' + Date.now(),
            ...nuevoAnuncio,
            fecha: new Date().toISOString().slice(0, 10),
            autor: 'Equipo Producción & Staff'
        };

        updateDb(prev => ({
            ...prev,
            anunciosStaff: [an, ...(prev.anunciosStaff || [])]
        }));

        setNuevoAnuncio({ titulo: '', contenido: '' });
        showToast('Anuncio publicado al equipo', 'success');
    };

    const handleCambiarAdeudo = (username, meses) => {
        updateDb(prev => ({
            ...prev,
            usuarios: {
                ...prev.usuarios,
                [username]: {
                    ...prev.usuarios[username],
                    mesesAdeudo: meses
                }
            }
        }));
        showToast(`Adeudo de ${username} actualizado`, 'info');
    };

    return (
        <div id="view-produccion" className="app-view">
            {/* SUBVIEW NAV TABS */}
            <div className="subview-nav">
                {[
                    { id: 'estatus', label: 'Estatus Clases', icon: 'fas fa-calendar-check' },
                    { id: 'anuncios', label: 'Anuncios Staff', icon: 'fas fa-bullhorn' },
                    { id: 'colegiaturas', label: 'Control Colegiaturas', icon: 'fas fa-file-invoice-dollar' }
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

            {/* TAB: ESTATUS */}
            {currentSub === 'estatus' && (
                <div className="produccion-subview">
                    <div className="panel-box" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header">
                            <h3><i className="fas fa-bullhorn"></i> Configuración de Estatus de Clases</h3>
                        </div>
                        <form onSubmit={handleActualizarEstatus} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="form-group">
                                <label>Condición:</label>
                                <select className="form-control" value={estatusEstado} onChange={(e) => setEstatusEstado(e.target.value)}>
                                    <option value="normal">✅ Clases Normales (Confirmadas)</option>
                                    <option value="alerta">⚠️ Aviso Importante (Cambio de Aula o Horario)</option>
                                    <option value="suspendida">❌ Clases Suspendidas</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Mensaje Visible para Alumnos:</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    value={estatusMensaje}
                                    onChange={(e) => setEstatusMensaje(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                <i className="fas fa-save"></i> Publicar Estatus
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB: ANUNCIOS */}
            {currentSub === 'anuncios' && (
                <div className="produccion-subview">
                    <div className="panel-box" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header">
                            <h3><i className="fas fa-plus"></i> Publicar Nuevo Comunicado para el Staff</h3>
                        </div>
                        <form onSubmit={handlePublicarAnuncio} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="form-group">
                                <label>Título del Comunicado:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej. Junta de Docentes previa a graduación"
                                    value={nuevoAnuncio.titulo}
                                    onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, titulo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mensaje:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={nuevoAnuncio.contenido}
                                    onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, contenido: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                <i className="fas fa-paper-plane"></i> Enviar a Maestros
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB: COLEGIATURAS */}
            {currentSub === 'colegiaturas' && (
                <div className="produccion-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-money-check-alt"></i> Control Administrativo de Colegiaturas</h3>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Instrumento</th>
                                        <th>Adeudo</th>
                                        <th>Estatus</th>
                                        <th>Acción Rápida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => {
                                        const p = calcularEstadoPago(s);
                                        return (
                                            <tr key={s.key}>
                                                <td><strong>{s.nombre || s.key}</strong></td>
                                                <td>{s.area || s.instrument || 'Música'}</td>
                                                <td>{s.mesesAdeudo || 0} meses</td>
                                                <td><span className={`badge ${p.clase}`}>{p.label}</span></td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '6px' }}>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCambiarAdeudo(s.key, 0)}>
                                                            <i className="fas fa-check"></i> Solvente
                                                        </button>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCambiarAdeudo(s.key, 1)}>
                                                            +1 Mes
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleCambiarAdeudo(s.key, 2)}>
                                                            Mora 2m
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
        </div>
    );
}
