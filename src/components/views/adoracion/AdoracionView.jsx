import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';

export default function AdoracionView() {
    const { db, updateDb, activeSubview, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'control';

    // ESTADO PARA MODO HÍBRIDO: 'principal' | 'kids'
    const [modoEnsamble, setModoEnsamble] = useState('principal');

    const rolesKey = modoEnsamble === 'kids' ? 'ensambleRolesKids' : 'ensambleRolesPrincipal';
    const roles = db[rolesKey] || (modoEnsamble === 'principal' ? (db.ensambleRoles || {}) : {});

    const [rolesForm, setRolesForm] = useState({
        lider: roles.lider || '',
        teclado: roles.teclado || '',
        bateria: roles.bateria || '',
        bajo: roles.bajo || '',
        guitarra: roles.guitarra || '',
        canto: roles.canto || '',
        indicaciones: roles.indicaciones || ''
    });

    // Cambiar de modalidad y cargar sus datos asignados
    const handleSwitchMode = (newMode) => {
        setModoEnsamble(newMode);
        const nextKey = newMode === 'kids' ? 'ensambleRolesKids' : 'ensambleRolesPrincipal';
        const nextRoles = db[nextKey] || (newMode === 'principal' ? (db.ensambleRoles || {}) : {});
        setRolesForm({
            lider: nextRoles.lider || '',
            teclado: nextRoles.teclado || '',
            bateria: nextRoles.bateria || '',
            bajo: nextRoles.bajo || '',
            guitarra: nextRoles.guitarra || '',
            canto: nextRoles.canto || '',
            indicaciones: nextRoles.indicaciones || ''
        });
        showToast(`Cambiado a modalidad: ${newMode === 'kids' ? 'KIDS 👶' : 'SERVICIO PRINCIPAL ⛪'}`, 'info');
    };

    const canciones = (db.canciones || []).filter(c => {
        if (!c.modo || c.modo === 'ambos') return true;
        return c.modo === modoEnsamble;
    });
    const usuarios = db.usuarios || {};

    const handleGuardarRoles = (e) => {
        e.preventDefault();
        updateDb(prev => ({
            ...prev,
            [rolesKey]: { ...rolesForm }
        }));
        showToast(`Alineación guardada para ${modoEnsamble === 'kids' ? 'KIDS 👶' : 'SERVICIO PRINCIPAL ⛪'}`, 'success');
    };

    return (
        <div id="view-adoracion" className="app-view animate-fade-in">
            {/* ENCABEZADO DE CAMBIO DE MODALIDAD HÍBRIDA: KIDS VS SERVICIO PRINCIPAL */}
            <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.8rem',
                background: 'linear-gradient(135deg, #161822, #1f2330)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 69, 0, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #ff4500, #dc2626)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#fff', boxShadow: '0 4px 12px rgba(255, 69, 0, 0.4)' }}>
                        <i className="fas fa-random"></i>
                    </div>
                    <div>
                        <strong style={{ color: '#ffffff', fontSize: '1.1rem', display: 'block' }}>
                            ACCESO HÍBRIDO DE ALABANZA
                        </strong>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                            Modalidad activa: <strong style={{ color: modoEnsamble === 'kids' ? '#22c55e' : '#ff4500' }}>
                                {modoEnsamble === 'kids' ? '👶 KIDS (Ministerio Infantil)' : '⛪ SERVICIO PRINCIPAL'}
                            </strong>
                        </span>
                    </div>
                </div>

                {/* BOTÓN CONMUTADOR (TOGGLE) ENTRE KIDS Y PRINCIPAL */}
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                        type="button"
                        onClick={() => handleSwitchMode('principal')}
                        style={{
                            background: modoEnsamble === 'principal' ? 'linear-gradient(135deg, #ff4500, #dc2626)' : 'transparent',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 800,
                            padding: '8px 16px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fas fa-church" style={{ marginRight: '6px' }}></i> Servicio Principal
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchMode('kids')}
                        style={{
                            background: modoEnsamble === 'kids' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 800,
                            padding: '8px 16px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fas fa-child" style={{ marginRight: '6px' }}></i> Kids
                    </button>
                </div>
            </div>

            {/* TAB 1: ALINEACIÓN DEL ENSAMBLE */}
            {currentSub === 'control' && (
                <div className="adoracion-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}>
                                <i className="fas fa-users-cog" style={{ color: modoEnsamble === 'kids' ? '#22c55e' : '#ff4500', marginRight: '8px' }}></i>
                                Configurar Alineación: {modoEnsamble === 'kids' ? '👶 KIDS' : '⛪ SERVICIO PRINCIPAL'}
                            </h3>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Asigna a los músicos y cantantes para este servicio</span>
                        </div>

                        <form onSubmit={handleGuardarRoles} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
                                {[
                                    { key: 'lider', label: '👑 Líder / Director de Alabanza', icon: 'fas fa-crown' },
                                    { key: 'teclado', label: '🎹 Teclado / Piano', icon: 'fas fa-keyboard' },
                                    { key: 'bateria', label: '🥁 Batería / Percusión', icon: 'fas fa-drum' },
                                    { key: 'bajo', label: '🎸 Bajo Eléctrico', icon: 'fas fa-guitar' },
                                    { key: 'guitarra', label: '⚡ Guitarra Eléctrica / Acústica', icon: 'fas fa-guitar' },
                                    { key: 'canto', label: '🎤 Voz Principal / Voces', icon: 'fas fa-microphone' }
                                ].map(inst => (
                                    <div key={inst.key} className="form-group">
                                        <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                                            <i className={inst.icon} style={{ marginRight: '6px', color: '#ff4500' }}></i> {inst.label}:
                                        </label>
                                        <select
                                            className="form-control"
                                            value={rolesForm[inst.key] || ''}
                                            onChange={(e) => setRolesForm({ ...rolesForm, [inst.key]: e.target.value })}
                                        >
                                            <option value="">-- Sin asignar --</option>
                                            {Object.entries(usuarios).map(([k, u]) => (
                                                <option key={k} value={k}>
                                                    {u.nombre || k} ({u.area || u.instrument || u.rol})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <div className="form-group">
                                <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                                    <i className="fas fa-clipboard-list" style={{ marginRight: '6px', color: '#3b82f6' }}></i> Indicaciones y Orden del Servicio ({modoEnsamble.toUpperCase()}):
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Ej. Horario de ensayo 9:00 AM. Vestimenta: Blanco con Meztli. Notas de arreglos..."
                                    value={rolesForm.indicaciones || ''}
                                    onChange={(e) => setRolesForm({ ...rolesForm, indicaciones: e.target.value })}
                                    style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800, alignSelf: 'flex-start' }}>
                                <i className="fas fa-save" style={{ marginRight: '8px' }}></i> Guardar Ensamble de {modoEnsamble === 'kids' ? 'KIDS' : 'SERVICIO PRINCIPAL'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB 2: REPERTORIO DE CANCIONES */}
            {currentSub === 'repertorio' && (
                <div className="adoracion-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}>
                                <i className="fas fa-list-music" style={{ color: '#22c55e', marginRight: '8px' }}></i> 
                                Repertorio Musical: {modoEnsamble === 'kids' ? '👶 KIDS' : '⛪ SERVICIO PRINCIPAL'} ({canciones.length})
                            </h3>
                            <button className="btn btn-primary" onClick={() => openModal('cancion')}>
                                <i className="fas fa-plus"></i> Nueva Canción
                            </button>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Título</th>
                                        <th style={{ padding: '12px' }}>Autor</th>
                                        <th style={{ padding: '12px' }}>Tono</th>
                                        <th style={{ padding: '12px' }}>Acordes / Letra</th>
                                        <th style={{ padding: '12px' }}>Video Tutorial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {canciones.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay canciones registradas para este ensamble.</td></tr>
                                    ) : (
                                        canciones.map(c => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '12px' }}><strong>{c.titulo}</strong></td>
                                                <td style={{ padding: '12px' }}>{c.autor}</td>
                                                <td style={{ padding: '12px' }}><span className="badge badge-solvente">{c.tono}</span></td>
                                                <td style={{ padding: '12px' }}>
                                                    {c.linkAcordes ? (
                                                        <a href={c.linkAcordes} target="_blank" rel="noreferrer" style={{ color: '#00b4d8', fontWeight: 700, fontSize: '0.85rem' }}>
                                                            <i className="fas fa-file-alt" style={{ marginRight: '4px' }}></i> Ver Acordes
                                                        </a>
                                                    ) : (
                                                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Sin enlace</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    {c.linkVideo ? (
                                                        <a href={c.linkVideo} target="_blank" rel="noreferrer" style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>
                                                            <i className="fab fa-youtube" style={{ marginRight: '4px' }}></i> Ver Video
                                                        </a>
                                                    ) : (
                                                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Sin video</span>
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
        </div>
    );
}
