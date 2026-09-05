import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/choice.css';

export default function AppChoiceScreen() {
    const navigate = useNavigate();

    return (
        <div id="app-choice-screen">
            <div className="choice-video-mesh-layer"></div>

            <div className="choice-buttons-standalone">
                {/* BOTÓN 1: C.A.N ALABANZA */}
                <button
                    className="choice-card-btn choice-btn-alabanza"
                    id="btn-alabanza"
                    onClick={() => { window.location.href = '/alabanza/index.html'; }}
                >
                    <div className="choice-card-content">
                        <img
                            src="/img/can-logo.png"
                            alt="C.A.N."
                            className="choice-can-logo"
                            onError={(e) => { e.target.src = '/alabanza/can-logo.png'; }}
                        />
                        <h2 className="choice-card-title">C.A.N ALABANZA</h2>
                        <p className="choice-card-subtitle">Plataforma de canciones, acordes y cifrados</p>
                        <span className="choice-card-action">
                            ACCEDER A CANCIONES <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                </button>

                {/* BOTÓN 2: WORSHIP SESSIONS */}
                <button
                    className="choice-card-btn choice-btn-worship"
                    id="btn-worship"
                    onClick={() => navigate('/login')}
                >
                    <div className="choice-card-content">
                        <img
                            src="/img/worship-sessions-logo.png"
                            alt="Worship Sessions"
                            className="choice-ws-graphic-logo"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <h2 className="choice-card-title">WORSHIP SESSIONS</h2>
                        <p className="choice-card-subtitle">Plataforma de formación y gestión académica</p>
                        <span className="choice-card-action">
                            INGRESAR A PLATAFORMA <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}
