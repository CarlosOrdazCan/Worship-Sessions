import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';

export default function AdoracionView() {
    const { db, updateDb, activeSubview, setActiveSubview, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'control';

    const roles = db.ensambleRoles || {};
    const [rolesForm, setRolesForm] = useState({
        teclado: roles.teclado || '',
        bateria: roles.bateria || '',
        bajo: roles.bajo || '',
        guitarra: roles.guitarra || '',
        canto: roles.canto || ''
    });

    const canciones = db.canciones || [];
    const usuarios = db.usuarios || {};

    const handleGuardarRoles = (e) => {
        e.preventDefault();
        updateDb(prev => ({
            ...prev,
            ensambleRoles: { ...rolesForm }
        }));
        showToast('Alineación del ensamble guardada exitosamente', 'success');
    };

    return (
        <div id="view-adoracion" className="app-view">


            {/* TAB: CONTROL */}
            {currentSub === 'control' && (
                <div className="adoracion-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-users-cog"></i> Configurar Alineación del Ensamble</h3>
                        </div>
                        <form onSubmit={handleGuardarRoles} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
                            {['teclado', 'bateria', 'bajo', 'guitarra', 'canto'].map(inst => (
                                <div key={inst} className="form-group">
                                    <label style={{ textTransform: 'capitalize' }}><i className="fas fa-music"></i> {inst}:</label>
                                    <select
                                        className="form-control"
                                        value={rolesForm[inst]}
                                        onChange={(e) => setRolesForm({ ...rolesForm, [inst]: e.target.value })}
                                    >
                                        <option value="">-- Sin asignar --</option>
                                        {Object.entries(usuarios).map(([k, u]) => (
                                            <option key={k} value={k}>
                                                {u.nombre || k} ({u.area || u.rol})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            <div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    <i className="fas fa-save"></i> Guardar Ensamble
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB: REPERTORIO */}
            {currentSub === 'repertorio' && (
                <div className="adoracion-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-list-music"></i> Canciones & Acordes</h3>
                            <button className="btn btn-primary" onClick={() => openModal('cancion')}>
                                <i className="fas fa-plus"></i> Nueva Canción
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>Tono</th>
                                        <th>Acordes / Letra</th>
                                        <th>Video Tutorial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {canciones.map(c => (
                                        <tr key={c.id}>
                                            <td><strong>{c.titulo}</strong></td>
                                            <td>{c.autor}</td>
                                            <td><span className="badge badge-solvente">{c.tono}</span></td>
                                            <td>
                                                <a href={c.linkAcordes} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-teal)' }}>
                                                    <i className="fas fa-file-alt"></i> Ver Acordes
                                                </a>
                                            </td>
                                            <td>
                                                <a href={c.linkVideo} target="_blank" rel="noreferrer" style={{ color: '#ef4444' }}>
                                                    <i className="fab fa-youtube"></i> Ver Video
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
