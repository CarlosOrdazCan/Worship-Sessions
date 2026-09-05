import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorship } from '../../services/WorshipContext';
import '../../styles/login.css';

export default function LoginCard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useWorship();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/intro');
        } catch (err) {
            setError(err.message || 'Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="login-screen">
            <button
                type="button"
                className="btn-top-back-choice"
                onClick={() => navigate('/')}
            >
                <i className="fas fa-arrow-left"></i>
                <span>Volver a Selección de Plataforma</span>
            </button>

            <div className="login-card">
                <div className="login-brand">
                    <img
                        src="/img/worship-sessions-logo.png"
                        alt="WORSHIP SESSIONS"
                        className="login-graphic-logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginTop: '8px' }}>
                        WORSHIP SESSIONS
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Centro de Avivamiento Naucalpan
                    </p>
                    <div className="brand-divider"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                        <label htmlFor="login-user">
                            <i className="fas fa-user"></i> Usuario
                        </label>
                        <input
                            type="text"
                            id="login-user"
                            className="form-control"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                        <label htmlFor="login-pass">
                            <i className="fas fa-lock"></i> Contraseña
                        </label>
                        <input
                            type="password"
                            id="login-pass"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-main" disabled={loading}>
                        <span>{loading ? 'Ingresando...' : 'Ingresar al Sistema'}</span>
                        <i className="fas fa-arrow-right"></i>
                    </button>

                    {error && (
                        <div className="error-msg">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>{error}</span>
                        </div>
                    )}
                </form>

                <div className="login-footer">
                    <p>Usa tus credenciales asignadas de Maestro, Alumno o Admin.</p>
                    <span className="version-tag">v3.0.0 React Enterprise</span>
                </div>
            </div>
        </div>
    );
}
