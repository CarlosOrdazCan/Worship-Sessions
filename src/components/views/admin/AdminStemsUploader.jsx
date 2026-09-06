import React, { useState } from 'react';
import { useWorship } from '../../../services/WorshipContext';

export default function AdminStemsUploader() {
    const { db, updateDb, showToast } = useWorship();

    // LISTA AMPLIA DE OPCIONES DE INSTRUMENTOS
    const OPCIONES_INSTRUMENTOS = [
        { value: 'bateria', label: '🥁 Batería (Drums)' },
        { value: 'pandero', label: '🪘 Pandero / Percusión / Shaker' },
        { value: 'loop', label: '🔁 Loop / Secuencia Rítmica' },
        { value: 'fx', label: '💥 Efectos / Fx / Atmósfera' },
        { value: 'bajo', label: '🎸 Bajo Eléctrico' },
        { value: 'bajosnt', label: '🎹 Bajo Synth / Sub / KeyBass' },
        { value: 'ga', label: '🎸 Guitarra Acústica (GA)' },
        { value: 'ge1', label: '⚡ Guitarra Eléctrica 1 (GE1)' },
        { value: 'ge2', label: '⚡ Guitarra Eléctrica 2 (GE2)' },
        { value: 'g_lider', label: '🎸 Guitarra Líder / Solo' },
        { value: 'teclados', label: '🎹 Teclados / Piano / Rhodes' },
        { value: 'synths', label: '🎹 Sintetizadores / Leads / Arps' },
        { value: 'cuerdas', label: '🎻 Cuerdas / Strings / Violín / Cello' },
        { value: 'metales', label: '🎺 Metales / Horns / Trompeta / Sax' },
        { value: 'voz_lead', label: '🎤 Voz Principal (Lead Vocal)' },
        { value: 'voces_back', label: '🎤 Voces de Acompañamiento (Backing Vocals)' },
        { value: 'guia_voz', label: '🎤 Guía de Voz (Vocal Guide / Cue)' },
        { value: 'click', label: '⏱️ Click / Metrónomo' },
        { value: 'master', label: '🔊 Master Mix / Pista General' },
        { value: 'otro', label: '➕ Otro... (Personalizado)' }
    ];

    // METADATOS DE LA NUEVA CANCIÓN
    const [nuevaCancion, setNuevaCancion] = useState({
        titulo: '',
        autor: '',
        tono: 'D',
        bpm: 120,
        timeSig: '4/4',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80'
    });

    // LISTADO DINÁMICO DE STEMS AGREGADOS
    const [stemsDinamicos, setStemsDinamicos] = useState([]);

    // DETECCIÓN AUTOMÁTICA DE INSTRUMENTO SEGÚN EL NOMBRE DEL ARCHIVO
    const autoDetectInstrumentType = (filename) => {
        const name = filename.toLowerCase();

        if (name.includes('click') || name.includes('metronomo') || name.includes('guia') || name.includes('guide') || name.includes('cue')) return { tipo: 'click', customName: '' };
        if (name.includes('bat') || name.includes('drum') || name.includes('kick') || name.includes('snare') || name.includes('tom')) return { tipo: 'bateria', customName: '' };
        if (name.includes('pan') || name.includes('percu') || name.includes('shaker') || name.includes('tambor')) return { tipo: 'pandero', customName: '' };
        if (name.includes('loop') || name.includes('seq') || name.includes('ritm')) return { tipo: 'loop', customName: '' };
        if (name.includes('fx') || name.includes('efect') || name.includes('atmos')) return { tipo: 'fx', customName: '' };
        if (name.includes('bajosnt') || name.includes('synth_bass') || name.includes('sub')) return { tipo: 'bajosnt', customName: '' };
        if (name.includes('baj') || name.includes('bass')) return { tipo: 'bajo', customName: '' };
        if (name.includes('ga') || name.includes('acust') || name.includes('acous')) return { tipo: 'ga', customName: '' };
        if (name.includes('ge2') || name.includes('elec2')) return { tipo: 'ge2', customName: '' };
        if (name.includes('ge') || name.includes('elec')) return { tipo: 'ge1', customName: '' };
        if (name.includes('lider') || name.includes('lead_guit') || name.includes('solo')) return { tipo: 'g_lider', customName: '' };
        if (name.includes('tec') || name.includes('key') || name.includes('piano') || name.includes('rhodes')) return { tipo: 'teclados', customName: '' };
        if (name.includes('syn') || name.includes('pad') || name.includes('lead') || name.includes('arp')) return { tipo: 'synths', customName: '' };
        if (name.includes('cuerd') || name.includes('string') || name.includes('violin') || name.includes('cello')) return { tipo: 'cuerdas', customName: '' };
        if (name.includes('metal') || name.includes('horn') || name.includes('brass') || name.includes('sax')) return { tipo: 'metales', customName: '' };
        if (name.includes('lead_voc') || name.includes('voz_lead') || name.includes('canto')) return { tipo: 'voz_lead', customName: '' };
        if (name.includes('voc') || name.includes('coro') || name.includes('back')) return { tipo: 'voces_back', customName: '' };
        if (name.includes('mast') || name.includes('mix') || name.includes('full')) return { tipo: 'master', customName: '' };

        // Si el nombre no coincide con ninguna palabra clave, poner en 'otro' con el nombre limpio del archivo
        const cleanName = filename.replace(/\.[^/.]+$/, '').replace(/[_.\-]/g, ' ');
        return { tipo: 'otro', customName: cleanName };
    };

    // CARGAR TODOS LOS STEMS DE GOLPE (SELECCIÓN MÚLTIPLE DE ARCHIVOS)
    const handleCargarStemsDeGolpe = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        showToast(`⚡ Procesando ${files.length} stems simultáneamente...`, 'info');

        let loadedCount = 0;
        const newStems = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const dataUrl = evt.target.result;
                const detected = autoDetectInstrumentType(file.name);
                const stemId = 'stem_bulk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

                newStems.push({
                    id: stemId,
                    tipo: detected.tipo,
                    nombrePersonalizado: detected.customName,
                    archivoUrl: dataUrl,
                    archivoNombre: file.name
                });

                loadedCount++;
                if (loadedCount === files.length) {
                    setStemsDinamicos(prev => [...prev.filter(s => s.archivoUrl), ...newStems]);
                    showToast(`🎉 ¡${files.length} Stems cargados de golpe y clasificados automáticamente!`, 'success');
                }
            };
            reader.onerror = () => {
                loadedCount++;
                showToast(`Error al leer archivo ${file.name}`, 'error');
            };
            reader.readAsDataURL(file);
        });
    };

    // AGREGAR NUEVO STEM INDIVIDUAL
    const handleAgregarStem = () => {
        const nuevoId = 'stem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        setStemsDinamicos(prev => [
            ...prev,
            { id: nuevoId, tipo: 'bateria', nombrePersonalizado: '', archivoUrl: null, archivoNombre: '' }
        ]);
        showToast('Nuevo stem añadido a la lista. Selecciona el instrumento y sube tu archivo.', 'info');
    };

    // ELIMINAR UN STEM ESPECÍFICO
    const handleEliminarStem = (id) => {
        setStemsDinamicos(prev => prev.filter(s => s.id !== id));
        showToast('Stem removido', 'info');
    };

    // CAMBIAR TIPO DE INSTRUMENTO
    const handleTipoChange = (id, tipoValue) => {
        setStemsDinamicos(prev => prev.map(s => s.id === id ? { ...s, tipo: tipoValue } : s));
    };

    // CAMBIAR NOMBRE PERSONALIZADO (CUANDO TIPO === 'otro')
    const handleCustomNameChange = (id, nameVal) => {
        setStemsDinamicos(prev => prev.map(s => s.id === id ? { ...s, nombrePersonalizado: nameVal } : s));
    };

    // CAMBIAR ARCHIVO DE AUDIO INDIVIDUAL
    const handleArchivoChange = (id, e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const dataUrl = evt.target.result;
            setStemsDinamicos(prev => prev.map(s => s.id === id ? {
                ...s,
                archivoUrl: dataUrl,
                archivoNombre: file.name
            } : s));
            showToast(`✅ Archivo "${file.name}" cargado y listo`, 'success');
        };
        reader.onerror = () => {
            showToast('Error al leer el archivo de audio', 'error');
        };
        reader.readAsDataURL(file);
    };

    // GUARDAR CANCIÓN EN LA NUBE
    const handleGuardarCancion = (e) => {
        e.preventDefault();
        if (!nuevaCancion.titulo || !nuevaCancion.autor) {
            showToast('Ingresa el título y autor de la canción', 'error');
            return;
        }

        if (stemsDinamicos.length === 0) {
            showToast('Agrega o carga al menos 1 stem para publicar la canción', 'error');
            return;
        }

        const songId = 'c_' + Date.now();

        // CONVERTIR STEMS DINÁMICOS A FORMATO CANCIÓN
        const stemsProcesados = stemsDinamicos.map(s => {
            const opcionBase = OPCIONES_INSTRUMENTOS.find(o => o.value === s.tipo);
            let nombreLabel = opcionBase ? opcionBase.label.replace(/^[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim() : s.tipo;

            if (s.tipo === 'otro' && s.nombrePersonalizado) {
                nombreLabel = s.nombrePersonalizado;
            }

            return {
                id: s.id,
                tipo: s.tipo,
                label: nombreLabel,
                url: s.archivoUrl,
                archivoNombre: s.archivoNombre || 'Audio cargado'
            };
        });

        const cancionGuardada = {
            id: songId,
            titulo: nuevaCancion.titulo,
            autor: nuevaCancion.autor,
            tono: nuevaCancion.tono,
            bpm: parseInt(nuevaCancion.bpm) || 120,
            timeSig: nuevaCancion.timeSig,
            cover: nuevaCancion.coverUrl,
            fechaCarga: new Date().toLocaleDateString('es-MX'),
            stemsList: stemsProcesados,
            totalStems: stemsProcesados.length
        };

        updateDb(prev => ({
            ...prev,
            canciones: [cancionGuardada, ...(prev.canciones || [])]
        }));

        // RESET FORMULARIO
        setNuevaCancion({
            titulo: '',
            autor: '',
            tono: 'D',
            bpm: 120,
            timeSig: '4/4',
            coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80'
        });

        setStemsDinamicos([]);

        showToast(`🎵 Canción "${cancionGuardada.titulo}" subida exitosamente con ${cancionGuardada.totalStems} stems en vivo`, 'success');
    };

    // ELIMINAR CANCIÓN DE LA NUBE
    const handleEliminarCancion = (id, titulo) => {
        if (window.confirm(`¿Eliminar la canción "${titulo}" de Playback Cloud?`)) {
            updateDb(prev => ({
                ...prev,
                canciones: (prev.canciones || []).filter(c => c.id !== id)
            }));
            showToast(`Canción "${titulo}" eliminada`, 'info');
        }
    };

    const listaCanciones = db.canciones || [];

    return (
        <div className="admin-stems-uploader animate-fade-in">
            {/* BANNER HEADER */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(15, 23, 42, 0.8))',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '18px',
                padding: '1.5rem 1.8rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <span style={{ background: '#22c55e', color: '#000000', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>
                        Playback Cloud Studio • Carga Masiva
                    </span>
                    <h2 style={{ margin: '8px 0 4px', color: '#ffffff', fontSize: '1.6rem', fontWeight: 800 }}>
                        <i className="fas fa-cloud-upload-alt" style={{ color: '#22c55e', marginRight: '10px' }}></i>
                        Cargar Canción & Stems (Carga Masiva o Individual)
                    </h2>
                    <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                        Sube todos tus stems de golpe seleccionando múltiples archivos de audio. El sistema los clasificará automáticamente por su nombre.
                    </p>
                </div>
            </div>

            {/* FORMULARIO DE CARGA */}
            <div className="panel-box" style={{ marginBottom: '2.5rem' }}>
                <form onSubmit={handleGuardarCancion}>
                    <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>
                            <i className="fas fa-music" style={{ color: '#22c55e', marginRight: '8px' }}></i>
                            1. Datos Principales de la Canción
                        </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Título de la Canción *</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej. Júbilo, Rey de Reyes"
                                value={nuevaCancion.titulo}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, titulo: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Artista / Autor *</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej. Miel San Marcos"
                                value={nuevaCancion.autor}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, autor: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Tono (Key)</label>
                            <select
                                className="form-control"
                                value={nuevaCancion.tono}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, tono: e.target.value })}
                            >
                                {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map(k => (
                                    <option key={k} value={k}>{k}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Tempo (BPM)</label>
                            <input
                                type="number"
                                className="form-control"
                                min="40"
                                max="240"
                                value={nuevaCancion.bpm}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, bpm: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Compás</label>
                            <select
                                className="form-control"
                                value={nuevaCancion.timeSig}
                                onChange={(e) => setNuevaCancion({ ...nuevaCancion, timeSig: e.target.value })}
                            >
                                <option value="4/4">4/4</option>
                                <option value="6/8">6/8</option>
                                <option value="3/4">3/4</option>
                                <option value="12/8">12/8</option>
                            </select>
                        </div>
                    </div>

                    {/* SECCIÓN CARGA MASIVA & INDIVIDUAL DE STEMS */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                                    <i className="fas fa-sliders-h" style={{ color: '#22c55e', marginRight: '8px' }}></i>
                                    2. Pistas & Stems de la Canción ({stemsDinamicos.length} Stems Cargados)
                                </h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>
                                    Puedes cargar todos tus stems de golpe o agregar pistas una por una.
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {/* BOTÓN CARGAR TODOS DE GOLPE */}
                                <label className="btn btn-primary pulse-active" style={{ cursor: 'pointer', borderRadius: '20px', padding: '8px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
                                    <i className="fas fa-folder-open"></i> ⚡ Cargar Todos los Stems de Golpe
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        multiple
                                        onChange={handleCargarStemsDeGolpe}
                                        style={{ display: 'none' }}
                                    />
                                </label>

                                {/* BOTÓN AGREGAR UN STEM INDIVIDUAL */}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleAgregarStem}
                                    style={{ border: '1px solid #22c55e', color: '#22c55e', fontWeight: 800, borderRadius: '20px', padding: '8px 18px' }}
                                >
                                    <i className="fas fa-plus" style={{ marginRight: '6px' }}></i> +1 Stem Individual
                                </button>
                            </div>
                        </div>

                        {/* LISTADO DE FILAS DE STEMS */}
                        {stemsDinamicos.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(0,0,0,0.3)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '14px' }}>
                                <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: '#22c55e', marginBottom: '1rem' }}></i>
                                <h4 style={{ color: '#ffffff', margin: '0 0 6px', fontWeight: 800 }}>¡Presiona "⚡ Cargar Todos los Stems de Golpe" para seleccionar todos tus archivos a la vez!</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>El sistema clasificará automáticamente cada archivo (*Batería, Bajo, Teclados, Voces, Click, etc.*) según su nombre.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {stemsDinamicos.map((stem, index) => (
                                    <div
                                        key={stem.id}
                                        style={{
                                            background: stem.archivoUrl ? 'rgba(34, 197, 94, 0.08)' : 'rgba(30, 34, 48, 0.6)',
                                            border: stem.archivoUrl ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '14px',
                                            padding: '1rem 1.2rem',
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 1fr 1fr auto',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        {/* NÚMERO DE PISTA */}
                                        <div style={{ background: '#1e2230', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: '#22c55e' }}>
                                            {index + 1}
                                        </div>

                                        {/* SELECCIÓN DE INSTRUMENTO / DROPDOWN */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>Instrumento / Clasificación:</label>
                                            <select
                                                className="form-control"
                                                value={stem.tipo}
                                                onChange={(e) => handleTipoChange(stem.id, e.target.value)}
                                                style={{ background: '#12141d', color: '#ffffff', fontWeight: 700 }}
                                            >
                                                {OPCIONES_INSTRUMENTOS.map(op => (
                                                    <option key={op.value} value={op.value}>{op.label}</option>
                                                ))}
                                            </select>

                                            {/* NOMBRE PERSONALIZADO CUANDO TIPO === 'otro' */}
                                            {stem.tipo === 'otro' && (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nombre del instrumento..."
                                                    value={stem.nombrePersonalizado}
                                                    onChange={(e) => handleCustomNameChange(stem.id, e.target.value)}
                                                    style={{ marginTop: '4px', borderColor: '#eab308', background: '#1c1917' }}
                                                    required
                                                />
                                            )}
                                        </div>

                                        {/* ARCHIVO DE AUDIO DETECTADO/CARGADO */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>Archivo de Audio:</label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    background: stem.archivoUrl ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                                                    border: '1px dashed ' + (stem.archivoUrl ? '#22c55e' : 'rgba(255, 255, 255, 0.25)'),
                                                    borderRadius: '8px',
                                                    padding: '8px 14px',
                                                    fontSize: '0.82rem',
                                                    fontWeight: 700,
                                                    color: '#ffffff',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <i className="fas fa-file-audio" style={{ color: stem.archivoUrl ? '#22c55e' : '#94a3b8' }}></i>
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
                                                    {stem.archivoNombre || 'Adjuntar audio...'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="audio/*"
                                                    onChange={(e) => handleArchivoChange(stem.id, e)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        </div>

                                        {/* BOTÓN BORRAR PISTA */}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleEliminarStem(stem.id)}
                                            title="Eliminar este stem"
                                            style={{ borderRadius: '8px', padding: '8px 12px' }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary pulse-active"
                        style={{ padding: '12px 36px', borderRadius: '30px', fontWeight: 800, fontSize: '1rem' }}
                    >
                        <i className="fas fa-cloud-upload-alt" style={{ marginRight: '8px' }}></i>
                        Publicar Canción Multitrack en la Nube
                    </button>
                </form>
            </div>

            {/* BIBLIOTECA DE CANCIONES SUBIDAS */}
            <div className="panel-box">
                <div className="panel-header" style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ margin: 0 }}>
                        <i className="fas fa-music" style={{ color: '#ec4899', marginRight: '8px' }}></i>
                        Canciones Registradas en Playback Cloud ({listaCanciones.length})
                    </h3>
                </div>

                <div className="table-container" style={{ overflowX: 'auto' }}>
                    <table className="table-custom" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Canción / Artista</th>
                                <th>Tono</th>
                                <th>BPM</th>
                                <th>Compás</th>
                                <th>Stems Configurados</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaCanciones.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                                        No hay canciones registradas en la nube. ¡Agrega tus primeros stems masivos arriba!
                                    </td>
                                </tr>
                            ) : (
                                listaCanciones.map(c => (
                                    <tr key={c.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src={c.cover} alt={c.titulo} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                                                <div>
                                                    <strong>{c.titulo}</strong>
                                                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{c.autor}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-solvente" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>{c.tono}</span></td>
                                        <td><strong>{c.bpm} BPM</strong></td>
                                        <td>{c.timeSig || '4/4'}</td>
                                        <td><span className="badge badge-solvente">{c.stemsList ? c.stemsList.length : (c.totalStems || 11)} Stems</span></td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleEliminarCancion(c.id, c.titulo)}
                                                title="Eliminar de la nube"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
