import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/intro.css';

export default function HighEndIntro() {
    const navigate = useNavigate();

    return (
        <div id="worship-intro-screen">
            <button
                onClick={() => navigate('/')}
                className="btn-top-back-choice"
            >
                <i className="fas fa-arrow-left"></i> Cambiar Plataforma
            </button>

            <div className="highend-noise-overlay"></div>
            <div className="highend-mesh-orb orb-orange"></div>
            <div className="highend-mesh-orb orb-teal"></div>

            <div className="highend-intro-container">
                <header className="highend-intro-header">
                    <div className="highend-brand">
                        <span style={{ color: 'var(--primary-red)' }}>✳</span> WORSHIP SESSIONS ACADEMY™
                    </div>
                    <div className="highend-status-badge">
                        <span className="status-dot"></span> [ SESIÓN ACTIVA ]
                    </div>
                </header>

                <main className="highend-intro-body">
                    <div className="highend-logo-hero-box">
                        <img
                            src="/img/worship-sessions-logo.png"
                            alt="WORSHIP SESSIONS"
                            className="worship-sessions-graphic-logo"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>

                    <div className="highend-tag-pill">
                        [ EXCELENCIA & ADORACIÓN INSTITUCIONAL ]
                    </div>

                    <h1 className="highend-hero-title">
                        LA DISCIPLINA <span className="highlight-serif-italic">puede llevarte</span><br />
                        AL LUGAR <span className="highlight-mesh-orange">DONDE EL TALENTO</span><br />
                        <span className="highlight-serif-italic">no alcanza.</span>
                    </h1>

                    <p className="highend-hero-sub">
                        Formación técnica, pastoral y musical de alto nivel para ministrar con pasión y excelencia.
                    </p>

                    <div className="highend-action-wrapper">
                        <button
                            type="button"
                            className="highend-cta-btn"
                            onClick={() => navigate('/app')}
                        >
                            <span>[ COMENCEMOS</span>
                            <i className="fas fa-arrow-right"></i>
                            <span>]</span>
                        </button>
                    </div>
                </main>

                <footer className="highend-intro-footer">
                    <div className="highend-meta-item">
                        <span style={{ color: '#f59e0b', marginRight: '6px' }}>★★★★★</span>
                        <span>5.0 ACADEMY</span>
                    </div>
                    <div className="highend-meta-item">
                        <span>50+ [ ESTUDIANTES ACTIVOS ]</span>
                    </div>
                    <div className="highend-meta-item">
                        <span>BY [ WORSHIP SESSIONS ]</span>
                    </div>
                    <div className="highend-meta-item">
                        <span>0% [ DESERCIÓN ]</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
