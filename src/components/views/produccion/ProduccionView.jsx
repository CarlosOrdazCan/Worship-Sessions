import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';
import { calcularEstadoPago, normalizeRol } from '../../../services/worshipDb';
import PlaybackStudioApp from '../../common/PlaybackStudioApp';

export default function ProduccionView() {
    const { db, updateDb, activeSubview, setActiveSubview, currentUser, showToast } = useWorship();
    const currentSub = activeSubview || 'playback';

    // Determinar instrumento del usuario si es alumno o maestro
    const myInstrument = currentUser?.area || currentUser?.instrument || 'Teclados';

    // ESTADO DEL REPRODUCTOR PLAYBACK STEMS
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState('1');
    const [masterVol, setMasterVol] = useState(80);

    const [stems, setStems] = useState({
        click: { name: 'Metrónomo / Guía', vol: 80, muted: false, solo: false },
        secuencia: { name: 'Secuencia / Pads', vol: 85, muted: false, solo: false },
        teclado: { name: 'Teclados & Synth', vol: 80, muted: false, solo: false },
        guitarras: { name: 'Guitarras Eléctricas', vol: 75, muted: false, solo: false },
        bajo: { name: 'Bajo Eléctrico', vol: 80, muted: false, solo: false },
        bateria: { name: 'Batería Multitrack', vol: 85, muted: false, solo: false },
        voces: { name: 'Voces de Acompañamiento', vol: 70, muted: false, solo: false }
    });

    const songs = db.canciones || [
        { id: '1', titulo: 'Tumbas a Jardines', tono: 'B', autor: 'Elevation Worship' },
        { id: '2', titulo: 'Digno de Alabar', tono: 'G', autor: 'Phil Wickham' },
        { id: '3', titulo: 'Hermoso Nombre', tono: 'D', autor: 'Hillsong Worship' }
    ];

    const currentSong = songs.find(s => s.id === selectedSongId) || songs[0];

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        showToast(isPlaying ? 'Playback pausado' : '▶ Reproduciendo multitrack de ' + currentSong.titulo, isPlaying ? 'info' : 'success');
    };

    // BOTÓN "MUTEAR MI INSTRUMENTO"
    const handleMuteMyInstrument = () => {
        const inst = myInstrument.toLowerCase();
        let targetStemKey = 'teclado';

        if (inst.includes('batería') || inst.includes('bateria')) targetStemKey = 'bateria';
        else if (inst.includes('bajo')) targetStemKey = 'bajo';
        else if (inst.includes('guitarra')) targetStemKey = 'guitarras';
        else if (inst.includes('canto') || inst.includes('voz')) targetStemKey = 'voces';

        setStems(prev => ({
            ...prev,
            [targetStemKey]: { ...prev[targetStemKey], muted: !prev[targetStemKey].muted }
        }));

        showToast(`Estatus de silencio para ${myInstrument} alternado`, 'info');
    };

    const toggleMute = (key) => {
        setStems(prev => ({
            ...prev,
            [key]: { ...prev[key], muted: !prev[key].muted }
        }));
    };

    const toggleSolo = (key) => {
        setStems(prev => {
            const next = { ...prev };
            const isCurrentSolo = next[key].solo;
            Object.keys(next).forEach(k => (next[k].solo = false));
            next[key].solo = !isCurrentSolo;
            return next;
        });
    };

    const handleStemVol = (key, val) => {
        setStems(prev => ({
            ...prev,
            [key]: { ...prev[key], vol: parseInt(val) }
        }));
    };

    // ESTADO PLANTILLAS DE ESTATUS DE CLASES
    const [estatusEstado, setEstatusEstado] = useState(db.estatusClases?.estado || 'normal');
    const [estatusMensaje, setEstatusMensaje] = useState(db.estatusClases?.mensaje || '✅ Próxima Clase: Sábado de 10:00 AM a 1:00 PM • Asistencia Normal.');
    const [nuevoAnuncio, setNuevoAnuncio] = useState({ titulo: '', contenido: '' });

    // PLANTILLAS RÁPIDAS DE CLASES
    const plantillasEstatus = [
        { label: '✅ Confirmar Clases Presenciales', estado: 'normal', msg: '✅ Próxima Clase: Sábado de 10:00 AM a 1:00 PM • Asistencia Normal.' },
        { label: '❌ Cancelar por Feriado / Festividad', estado: 'suspendida', msg: '❌ Clases Suspendidas por asueto/festivo oficial. Nos reincorporamos el siguiente sábado.' },
        { label: '⚠️ Cambio de Horario o Aula', estado: 'alerta', msg: '⚠️ Atención Alumnos: La clase del sábado se traslada al Auditorio Principal a las 11:00 AM.' },
        { label: '📊 Evaluación Especial de Ciclo', estado: 'alerta', msg: '📊 Evaluación General: Traer instrumento afinado y partituras para examen de fin de ciclo.' }
    ];

    const aplicarPlantilla = (p) => {
        setEstatusEstado(p.estado);
        setEstatusMensaje(p.msg);
        showToast('Plantilla aplicada. Presiona Publicar para confirmar.', 'info');
    };

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
        showToast('Estatus de clases publicado exitosamente', 'success');
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
        showToast(`Adeudo de @${username} actualizado`, 'info');
    };

    return (
        <div id="view-produccion" className="app-view animate-fade-in">
            {/* SUBVIEW NAV TABS */}
            <div className="subview-nav">
                {[
                    { id: 'playback', label: 'Sala de Ensayo (App iOS Playback)', icon: 'fas fa-sliders-h' },
                    { id: 'estatus', label: 'Estatus Clases & Plantillas', icon: 'fas fa-calendar-check' },
                    { id: 'anuncios', label: 'Anuncios Staff', icon: 'fas fa-bullhorn' },
                    { id: 'colegiaturas', label: 'Control Colegiaturas', icon: 'fas fa-file-invoice-dollar' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`subview-tab ${currentSub === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveSubview(tab.id)}
                    >
                        <i className={tab.icon}></i> {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB: SALA DE ENSAYO PLAYBACK IOS REPLICA */}
            {currentSub === 'playback' && (
                <div className="produccion-subview animate-fade-in">
                    <PlaybackStudioApp />
                </div>
            )}

            {/* TAB: ESTATUS DE CLASES & PLANTILLAS RÁPIDAS */}
            {currentSub === 'estatus' && (
                <div className="produccion-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-bullhorn" style={{ color: '#dc2626', marginRight: '8px' }}></i> Configuración de Estatus de Clases & Plantillas Rápidas</h3>
                        </div>

                        {/* PLANTILLAS RÁPIDAS */}
                        <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '14px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6', marginBottom: '8px' }}>Plantillas de Estatus Predefinidas:</label>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {plantillasEstatus.map((p, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => aplicarPlantilla(p)}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleActualizarEstatus} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>Condición:</label>
                                <select className="form-control" value={estatusEstado} onChange={(e) => setEstatusEstado(e.target.value)}>
                                    <option value="normal">✅ Clases Normales (Confirmadas)</option>
                                    <option value="alerta">⚠️ Aviso Importante (Cambio de Aula o Horario)</option>
                                    <option value="suspendida">❌ Clases Suspendidas</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>Mensaje Visible para Alumnos:</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    value={estatusMensaje}
                                    onChange={(e) => setEstatusMensaje(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', borderRadius: '10px', padding: '10px 22px' }}>
                                <i className="fas fa-save" style={{ marginRight: '8px' }}></i> Publicar Estatus General
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB: ANUNCIOS */}
            {currentSub === 'anuncios' && (
                <div className="produccion-subview animate-fade-in">
                    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-plus" style={{ color: '#3b82f6', marginRight: '8px' }}></i> Publicar Comunicado para el Staff</h3>
                        </div>
                        <form onSubmit={handlePublicarAnuncio} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>Título del Comunicado:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej. Junta de Coordinación de Graduaciones"
                                    value={nuevoAnuncio.titulo}
                                    onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, titulo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>Mensaje:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={nuevoAnuncio.contenido}
                                    onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, contenido: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', borderRadius: '10px', padding: '10px 22px' }}>
                                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Enviar Comunicado
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TAB: COLEGIATURAS */}
            {currentSub === 'colegiaturas' && (
                <div className="produccion-subview animate-fade-in">
                    <div className="glass-panel">
                        <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                            <h3 style={{ margin: 0 }}><i className="fas fa-money-check-alt" style={{ color: '#10b981', marginRight: '8px' }}></i> Control Administrativo de Colegiaturas</h3>
                        </div>
                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table className="table-custom" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px' }}>Alumno</th>
                                        <th style={{ padding: '12px' }}>Instrumento</th>
                                        <th style={{ padding: '12px' }}>Adeudo</th>
                                        <th style={{ padding: '12px' }}>Estatus</th>
                                        <th style={{ padding: '12px' }}>Acción Rápida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => {
                                        const p = calcularEstadoPago(s);
                                        return (
                                            <tr key={s.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '12px' }}><strong>{s.nombre || s.key}</strong></td>
                                                <td style={{ padding: '12px' }}>{s.area || s.instrument || 'Música'}</td>
                                                <td style={{ padding: '12px' }}>{s.mesesAdeudo || 0} meses</td>
                                                <td style={{ padding: '12px' }}><span className={`badge ${p.clase}`}>{p.label}</span></td>
                                                <td style={{ padding: '12px' }}>
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
