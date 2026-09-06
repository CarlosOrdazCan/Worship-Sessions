import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { exportDB, calcularEstadoPago, normalizeRol } from '../../../services/worshipDb';
import AdminStemsUploader from './AdminStemsUploader';

export default function AdminDashboard() {
    const { db, updateDb, activeSubview, setActiveSubview, setActiveRole, openModal, showToast } = useWorship();
    const currentSub = activeSubview || 'panel';

    const usuarios = db.usuarios || {};
    const userKeys = Object.keys(usuarios);

    const staffUsers = userKeys
        .filter(k => normalizeRol(usuarios[k].rol) !== 'estudiante')
        .map(k => ({ key: k, ...usuarios[k] }));

    const studentUsers = userKeys
        .filter(k => normalizeRol(usuarios[k].rol) === 'estudiante')
        .map(k => ({ key: k, ...usuarios[k] }));

    const handleDeleteUser = (key) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario ${key}?`)) {
            updateDb(prev => {
                const nextUsers = { ...prev.usuarios };
                delete nextUsers[key];
                return { ...prev, usuarios: nextUsers };
            });
            showToast(`Usuario ${key} eliminado`, 'info');
        }
    };

    const handleImportDb = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const parsed = JSON.parse(ev.target.result);
                if (parsed && parsed.usuarios) {
                    updateDb(parsed);
                    showToast('Base de datos restaurada con éxito', 'success');
                } else {
                    showToast('El archivo no contiene un formato de base de datos válido', 'error');
                }
            } catch (err) {
                showToast('Error al leer el archivo JSON', 'error');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div id="view-admin" className="app-view">
            {/* QUICK ROLE SWITCHER FOR ADMIN */}
            <div className="admin-role-switcher">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-key" style={{ color: 'var(--primary-red)', fontSize: '1.2rem' }}></i>
                    <strong style={{ color: 'white', fontSize: '0.9rem' }}>ACCESO TOTAL DE ADMINISTRADOR (FULL ACCESS)</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => setActiveRole('pastor')}>
                        <i className="fas fa-chart-line"></i> Pastor
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setActiveRole('maestro')}>
                        <i className="fas fa-chalkboard-teacher"></i> Maestro
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setActiveRole('administracion')}>
                        <i className="fas fa-sliders-h"></i> Producción
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setActiveRole('adoracion')}>
                        <i className="fas fa-music"></i> Adoración
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setActiveRole('estudiante')}>
                        <i className="fas fa-graduation-cap"></i> Estudiante
                    </button>
                </div>
            </div>

            {/* SUBVIEW 1: PANEL & ESTADÍSTICAS */}
            {currentSub === 'panel' && (
                <div className="admin-subview">
                    <div className="dashboard-grid">
                        <div className="card status-card">
                            <div className="card-icon"><i className="fas fa-server"></i></div>
                            <div>
                                <h3>Personal Académico</h3>
                                <div className="stat-val">{staffUsers.length}</div>
                                <small className="text-muted">Maestros, Pastores y Staff</small>
                            </div>
                        </div>
                        <div className="card status-card">
                            <div className="card-icon red-variant"><i className="fas fa-users"></i></div>
                            <div>
                                <h3>Alumnos Registrados</h3>
                                <div className="stat-val">{studentUsers.length}</div>
                                <small className="text-muted">Estudiantes de la Academia</small>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SUBVIEW 2: GESTIÓN DE USUARIOS */}
            {currentSub === 'usuarios' && (
                <div className="admin-subview">
                    <div className="panel-box" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header">
                            <h3><i className="fas fa-users-cog"></i> 1. Personal Docente & Administrativo</h3>
                            <button className="btn btn-primary" onClick={() => openModal('usuario', { rol: 'maestro' })}>
                                <i className="fas fa-plus"></i> Nuevo Personal
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Usuario / Nombre</th>
                                        <th>Rol</th>
                                        <th>Área Responsable</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffUsers.map(user => (
                                        <tr key={user.key}>
                                            <td>
                                                <strong>{user.nombre || user.key}</strong>
                                                <div className="text-muted" style={{ fontSize: '0.78rem' }}>@{user.key}</div>
                                            </td>
                                            <td><span className="badge badge-solvente">{user.rol}</span></td>
                                            <td>{user.area || 'General'}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => openModal('usuario', user)}>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.key)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-user-graduate"></i> 2. Alumnos Matriculados</h3>
                            <button className="btn btn-primary" onClick={() => openModal('usuario', { rol: 'estudiante' })}>
                                <i className="fas fa-plus"></i> Registrar Alumno
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>Alumno / Usuario</th>
                                        <th>Rol</th>
                                        <th>Instrumento</th>
                                        <th>Colegiatura</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentUsers.map(user => {
                                        const pago = calcularEstadoPago(user);
                                        return (
                                            <tr key={user.key}>
                                                <td>
                                                    <strong>{user.nombre || user.key}</strong>
                                                    <div className="text-muted" style={{ fontSize: '0.78rem' }}>@{user.key}</div>
                                                </td>
                                                <td><span className="badge badge-solvente">{user.rol}</span></td>
                                                <td>{user.area || user.instrument || 'Sin asignar'}</td>
                                                <td><span className={`badge ${pago.clase}`}>{pago.label}</span></td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => openModal('usuario', user)}>
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.key)}>
                                                            <i className="fas fa-trash"></i>
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

            {/* SUBVIEW 3: CARGAR CANCIONES & STEMS (PLAYBACK CLOUD) */}
            {currentSub === 'stems_cloud' && (
                <div className="admin-subview">
                    <AdminStemsUploader />
                </div>
            )}

            {/* SUBVIEW 4: RESPALDOS & SISTEMA */}
            {currentSub === 'respaldos' && (
                <div className="admin-subview">
                    <div className="panel-box">
                        <div className="panel-header">
                            <h3><i className="fas fa-database"></i> Mantenimiento del Sistema</h3>
                        </div>
                        <p className="text-muted" style={{ marginBottom: '1.2rem' }}>
                            Descarga una copia física de la base de datos o restaura un respaldo guardado en tu computadora.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button className="btn btn-secondary" onClick={exportDB}>
                                <i className="fas fa-download"></i> Respaldar Base de Datos (JSON)
                            </button>
                            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                                <i className="fas fa-upload"></i> Restaurar Respaldo
                                <input type="file" accept=".json" onChange={handleImportDb} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
