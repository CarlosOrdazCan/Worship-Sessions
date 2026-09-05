import React from 'react';
import { useWorship } from '../../services/WorshipContext';

export default function Header() {
    const { currentUser, activeRole } = useWorship();

    const roleName = {
        admin: 'Administrador del Sistema',
        pastor: 'Liderazgo Pastoral',
        maestro: 'Personal Docente',
        administracion: 'Producción & Logística',
        adoracion: 'Líder de Ensamble',
        estudiante: 'Estudiante de la Academia'
    }[activeRole] || 'Usuario Activo';

    return (
        <header className="header">
            <div className="welcome-text">
                <h2>Bienvenido(a), {currentUser?.name || 'Usuario'}</h2>
                <p>{roleName} • Centro de Avivamiento Naucalpan</p>
            </div>
            <div className="user-badge">
                <div className="user-info-text">
                    <span>{currentUser?.name || currentUser?.username || 'Invitado'}</span>
                    <small>● En línea</small>
                </div>
                <div className="avatar-img">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
            </div>
        </header>
    );
}
