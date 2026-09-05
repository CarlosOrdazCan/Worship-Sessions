import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorship } from '../../services/WorshipContext';
import { MENU_BY_ROLE } from '../../services/rolesConfig';

export default function Sidebar() {
    const { activeRole, activeSubview, setActiveSubview, logout } = useWorship();
    const navigate = useNavigate();

    const menuItems = MENU_BY_ROLE[activeRole] || [];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="brand-app" style={{ textAlign: 'center' }}>
                    <img
                        src="/img/worship-sessions-logo.png"
                        alt="WORSHIP SESSIONS"
                        className="sidebar-graphic-logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ color: '#fff', fontWeight: 'bold', letterSpacing: '0.05em', fontSize: '0.9rem', marginTop: '6px' }}>
                        ACADEMY
                    </div>
                </div>
                <div className="user-role-badge">
                    <i className="fas fa-shield-alt"></i>
                    <span>{activeRole}</span>
                </div>
            </div>

            <div className="menu-divider"></div>

            <ul className="nav-menu">
                {menuItems.map((item) => {
                    const isActive = activeSubview === item.id || (!activeSubview && item === menuItems[0]);
                    return (
                        <li key={item.id}>
                            <button
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveSubview(item.id)}
                            >
                                <i className={item.icon}></i>
                                <span>{item.label}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="sidebar-footer">
                <button
                    className="nav-link"
                    style={{ marginBottom: '8px', fontSize: '0.8rem' }}
                    onClick={() => navigate('/')}
                >
                    <i className="fas fa-exchange-alt"></i>
                    <span>Cambiar Plataforma</span>
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
