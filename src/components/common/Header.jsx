import React, { useState } from 'react';
import { useWorship } from '../../services/WorshipContext';

export default function Header() {
    const { currentUser, activeRole, db, updateDb } = useWorship();
    const [showNotifs, setShowNotifs] = useState(false);

    const userKey = currentUser?.username || currentUser?.key || '';
    const userRole = activeRole;

    // Filtrar notificaciones para este usuario o su rol
    const myNotifs = (db.notifications || []).filter(n => {
        if (!n.targetUser && !n.targetRole) return true;
        if (n.targetUser && n.targetUser === userKey) return true;
        if (n.targetRole && (n.targetRole === 'ambos' || n.targetRole === userRole || (userRole === 'estudiante' && n.targetRole === 'alumnos') || (userRole === 'maestro' && n.targetRole === 'maestros'))) return true;
        return false;
    });

    const unreadCount = myNotifs.filter(n => !n.read).length;

    const markAllRead = () => {
        updateDb(prev => ({
            ...prev,
            notifications: (prev.notifications || []).map(n => ({ ...n, read: true }))
        }));
    };

    const roleName = {
        admin: 'Administrador del Sistema',
        pastor: 'Liderazgo Pastoral',
        maestro: 'Personal Docente',
        administracion: 'Producción & Logística',
        adoracion: 'Líder de Ensamble',
        estudiante: 'Estudiante de la Academia'
    }[activeRole] || 'Usuario Activo';

    return (
        <header className="header" style={{ position: 'relative' }}>
            <div className="welcome-text">
                <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Bienvenido(a), {currentUser?.name || currentUser?.nombre || 'Usuario'}</h2>
                <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{roleName} • Centro Apostólico de las Naciones (CAN)</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* BOTÓN DE NOTIFICACIONES */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => {
                            setShowNotifs(!showNotifs);
                            if (unreadCount > 0) markAllRead();
                        }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                        title="Notificaciones"
                    >
                        <i className="fas fa-bell"></i>
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '-2px',
                                background: '#dc2626',
                                color: '#fff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 10px rgba(220, 38, 38, 0.6)'
                            }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* MENÚ DE NOTIFICACIONES POPUP */}
                    {showNotifs && (
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '50px',
                            width: '320px',
                            background: '#121420',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '16px',
                            padding: '1rem',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                            zIndex: 9999,
                            maxHeight: '380px',
                            overflowY: 'auto'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Notificaciones del Sistema</strong>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{myNotifs.length} avisos</span>
                            </div>

                            {myNotifs.length === 0 ? (
                                <p style={{ color: '#94a3b8', fontSize: '0.82rem', textAlign: 'center', margin: '1rem 0' }}>No tienes notificaciones pendientes.</p>
                            ) : (
                                myNotifs.slice(0, 8).map(n => (
                                    <div key={n.id} style={{
                                        background: n.type === 'pastoral' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                                        borderLeft: n.type === 'pastoral' ? '3px solid #8b5cf6' : '3px solid #3b82f6',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        marginBottom: '8px'
                                    }}>
                                        <h4 style={{ margin: '0 0 4px', fontSize: '0.85rem', color: n.type === 'pastoral' ? '#a78bfa' : '#fff' }}>{n.title}</h4>
                                        <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#cbd5e1' }}>{n.message}</p>
                                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{n.date}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* USER PROFILE BADGE */}
                <div className="user-badge" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="user-info-text" style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', color: '#fff' }}>{currentUser?.name || currentUser?.nombre || 'Invitado'}</span>
                        <small style={{ color: '#10b981', fontSize: '0.75rem' }}>● En línea</small>
                    </div>
                    {currentUser?.photo ? (
                        <img src={currentUser.photo} alt="Avatar" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #dc2626' }} />
                    ) : (
                        <div className="avatar-img" style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' }}>
                            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
