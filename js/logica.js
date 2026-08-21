// BASE DE DATOS LOCAL INICIALIZADA CON VALORES POR DEFECTO
const defaultDB = {
    usuarios: {
        "admin": { password: "can2026**", rol: "admin", nombre: "Carlos Ordaz (Admin)", area: "Sistemas / Dirección" },
        "produccion": { password: "can2026**", rol: "produccion", nombre: "Equipo Producción & Staff", area: "Producción" },
        "pastor": { password: "can2026**", rol: "pastor", nombre: "Pastor General", area: "Administración" },
        "maestro1": { password: "can2026**", rol: "maestro", nombre: "Juan Carlos (Teclado)", area: "Teclado" },
        "maestro2": { password: "can2026**", rol: "maestro", nombre: "Marcos (Batería)", area: "Batería" },
        "pablo": { password: "can2026**", rol: "adoracion", nombre: "Pablo Ensamble", area: "Ensamble" },
        "alumno1": { password: "can2026**", rol: "estudiante", nombre: "Juan Pérez", area: "Teclado", pagoStatus: "solvente", mesesAdeudo: 0, motivoNoPago: "", observacionesMaestro: "Excelente dedicación en clase de teclado. Muy buen tempo y soltura en arpegios.", edad: "21 Años", anosIglesia: "4 Años en C.A.N.", ciclosWS: "2° Ciclo Escolar", bio: "Apasionado tecladista y servidor activo en el ministerio de jóvenes. Enfocado en la excelencia musical y espiritual." },
        "alumno2": { password: "can2026**", rol: "estudiante", nombre: "Ana Gómez", area: "Batería", pagoStatus: "2_pendientes", mesesAdeudo: 2, motivoNoPago: "Solicita prórroga de 15 días por emergencia familiar.", observacionesMaestro: "Muestra gran avance en paradiddles pero requiere afianzar metrónomo.", edad: "19 Años", anosIglesia: "2 Años en C.A.N.", ciclosWS: "1° Ciclo Escolar", bio: "Entusiasta baterista en formación presencial. Destaca por su disciplina en los ensayos generales." },
        "alumno3": { password: "can2026**", rol: "estudiante", nombre: "Luis Flores", area: "Teclado", pagoStatus: "1_pendiente", mesesAdeudo: 1, motivoNoPago: "Pendiente pago de fin de mes.", observacionesMaestro: "Muy buena técnica de digitación y lectura a primera vista.", edad: "24 Años", anosIglesia: "5 Años en C.A.N.", ciclosWS: "3° Ciclo Escolar", bio: "Músico constante con trayectoria en el ensamble principal de la iglesia." },
        "alumno": { password: "can2026**", rol: "estudiante", nombre: "Alumno de Prueba", area: "Teclado", pagoStatus: "solvente", mesesAdeudo: 0, motivoNoPago: "", observacionesMaestro: "Alumno activo y constante.", edad: "20 Años", anosIglesia: "3 Años en C.A.N.", ciclosWS: "2° Ciclo Escolar", bio: "Estudiante comprometido con el crecimiento integral en la academia." },
        // Nuevos usuarios maestros y pastores
        "ilopez": { password: "can2026**", rol: "maestro", nombre: "Ivan Lopez", area: "Bajo" },
        "cordaz": { password: "can2026**", rol: "maestro", nombre: "Carlos Ordaz", area: "Batería" },
        "egonzalezg": { password: "can2026**", rol: "maestro", nombre: "Enoc Gonzalez", area: "Batería" },
        "avazquez": { password: "can2026**", rol: "maestro", nombre: "Asael Vazquez", area: "Batería Junior" },
        "aurdapilleta": { password: "can2026**", rol: "maestro", nombre: "Aaron Urdapilleta", area: "Guitarra" },
        "aaviles": { password: "can2026**", rol: "maestro", nombre: "Andrea Aviles", area: "Canto" },
        "mdiaz": { password: "can2026**", rol: "maestro", nombre: "Manuel Diaz", area: "Piano" },
        "fgonzalez": { password: "can2026**", rol: "maestro", nombre: "Fe Gonzalez", area: "Piano" },
        // Pastores
        "egonzalez": { password: "can2026**", rol: "pastor", nombre: "Efrain Gonzalez", area: "Pastoral" },
        "mgonzalez": { password: "can2026**", rol: "pastor", nombre: "Martha Gonzalez", area: "Pastoral" }
    },
    canciones: [
        { id: "1", titulo: "Tumbas a Jardines", tono: "B", autor: "Elevation Worship", linkAcordes: "https://www.lacuerda.net", linkVideo: "https://www.youtube.com", activo: true },
        { id: "2", titulo: "Digno de Alabar", tono: "G", autor: "Phil Wickham", linkAcordes: "https://www.lacuerda.net", linkVideo: "https://www.youtube.com", activo: true },
        { id: "3", titulo: "Hermoso Nombre", tono: "D", autor: "Hillsong Worship", linkAcordes: "https://www.lacuerda.net", linkVideo: "https://www.youtube.com", activo: true },
        { id: "4", titulo: "A una voz", tono: "E", autor: "Living", linkAcordes: "https://www.lacuerda.net", linkVideo: "https://www.youtube.com", activo: false }
    ],
    calificaciones: {
        "alumno1": { teoria: 85, tecnica: 90, notas: "Muy buen desempeño en acordes mayores y escalas básicas en octavas." },
        "alumno2": { teoria: 70, tecnica: 75, notas: "Requiere repasar el tempo y la subdivisión de corcheas." },
        "alumno3": { teoria: 92, tecnica: 88, notas: "Excelente lectura a primera vista. Seguir practicando arpegios." }
    },
    asistencia: {
        "alumno1": { "2026-08-01": "presente", "2026-08-08": "ausente", "2026-08-15": "presente" },
        "alumno2": { "2026-08-01": "presente", "2026-08-08": "presente", "2026-08-15": "presente" },
        "alumno3": { "2026-08-01": "ausente", "2026-08-08": "presente", "2026-08-15": "presente" }
    },
    materiales: [
        { id: "1", area: "Teclado", titulo: "Escalas Mayores Dinámicas", descripcion: "Estudiar la escala de Do, Sol y Re mayor en octavas consecutivas. Enfocarse en el paso del pulgar.", enlace: "https://youtube.com", fecha: "2026-08-05" },
        { id: "2", area: "Batería", titulo: "Rudimentos de Caja", descripcion: "Ejercicios prácticos de paradiddle a 80-100 BPM en pad de práctica.", enlace: "https://youtube.com", fecha: "2026-08-06" }
    ],
    anuncios: [
        { id: "1", area: "Teclado", contenido: "Traer partitura del setlist impresa y afinado su instrumento para este sábado.", autor: "Juan Carlos (Teclado)", fecha: "2026-08-07" },
        { id: "2", area: "Batería", contenido: "Practicar los rudimentos de bombo a 90 BPM. Habrá evaluación teórica.", autor: "Marcos (Batería)", fecha: "2026-08-08" }
    ],
    ensambleRoles: {
        teclado: "alumno1",
        bateria: "alumno2",
        guitarra: "maestro1",
        bajo: "alumno3",
        canto: "maestro2"
    },
    estatusClases: {
        estado: "normal",
        mensaje: "✅ Próxima Clase: Sábado de 10:00 AM a 1:00 PM • Asistencia Normal.",
        fechaActualizacion: "2026-08-18",
        publicadoPor: "Equipo Producción & Staff"
    },
    anunciosStaff: [
        {
            id: "s1",
            titulo: "Junta Presencial de Docentes",
            contenido: "Estimados maestros, este jueves a las 7:00 PM tendremos junta de coordinación académica previo al fin de semana.",
            fecha: "2026-08-18",
            autor: "Equipo Producción & Staff"
        }
    ],
    tareas: [
        {
            id: "t1",
            area: "Teclado",
            titulo: "Grabar Escala de Do Mayor a 2 Manos",
            descripcion: "Graba un video de 30 a 60 segundos ejecutando la escala de Do Mayor en 2 octavas a 90 BPM con metrónomo.",
            fechaLimite: "2026-08-25",
            maestro: "Juan Carlos (Teclado)"
        },
        {
            id: "t2",
            area: "Batería",
            titulo: "Rudimento Paradiddle en Pad de Práctica",
            descripcion: "Graba un video ejecutando 1 minuto de paradiddles limpios a 100 BPM en tu pad de práctica.",
            fechaLimite: "2026-08-26",
            maestro: "Marcos (Batería)"
        }
    ],
    entregasTareas: {
        "t1_alumno1": {
            id: "e1",
            tareaId: "t1",
            username: "alumno1",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            fechaEntrega: "2026-08-18",
            estado: "calificado",
            calificacion: 95,
            feedback: "¡Excelente tempo y paso de pulgar impecable!"
        }
    },
    ensambleActivo: false,
    ensambleAsignaciones: {
        "1_alumno1": {
            id: "ens_1_alumno1",
            songId: "1",
            username: "alumno1",
            nivel: "Avanzado",
            tempo: "120 BPM",
            tono: "B (Si)",
            compas: "4/4",
            playthroughUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            notes: "Estudiar la entrada del verso 2 a 120 BPM en octavas limpias.",
            maestro: "Juan Carlos (Teclado)"
        }
    },
    cursos: []
};

function normalizeRol(rol) {
    if (!rol) return 'estudiante';
    const r = String(rol).trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (r === 'alumno' || r === 'alumnos' || r === 'estudiante' || r === 'estudiantes' || r === 'student') return 'estudiante';
    if (r === 'maestro' || r === 'profesor' || r === 'docente' || r === 'teacher') return 'maestro';
    if (r === 'pastor' || r === 'pastoral') return 'pastor';
    if (r === 'produccion' || r === 'staff' || r === 'administracion' || r === 'admin_staff') return 'administracion';
    if (r === 'adoracion' || r === 'ensamble') return 'adoracion';
    if (r === 'admin' || r === 'administrador') return 'admin';
    return r;
}

// MOTOR DE BASE DE DATOS LOCAL
function initDB() {
    let db = null;
    try {
        const stored = localStorage.getItem('worship_sessions_db');
        if (stored) db = JSON.parse(stored);
    } catch(e) {}

    if (!db || !db.usuarios) {
        localStorage.setItem('worship_sessions_db', JSON.stringify(defaultDB));
    } else {
        let modificado = false;
        if (!db.estatusClases) { db.estatusClases = defaultDB.estatusClases; modificado = true; }
        if (!db.anunciosStaff) { db.anunciosStaff = defaultDB.anunciosStaff; modificado = true; }
        if (!db.tareas) { db.tareas = defaultDB.tareas; modificado = true; }
        if (!db.entregasTareas) { db.entregasTareas = defaultDB.entregasTareas; modificado = true; }
        if (db.ensambleActivo === undefined) { db.ensambleActivo = false; modificado = true; }
        if (!db.ensambleAsignaciones) { db.ensambleAsignaciones = defaultDB.ensambleAsignaciones; modificado = true; }
        if (!db.notasPastorales) { db.notasPastorales = []; modificado = true; }
        
        // Sanear y normalizar roles y datos de colegiatura de todos los usuarios
        Object.keys(db.usuarios).forEach(uKey => {
            const uObj = db.usuarios[uKey];
            if (uObj && uObj.rol) {
                const normRol = normalizeRol(uObj.rol);
                if (uObj.rol !== normRol) {
                    uObj.rol = normRol;
                    modificado = true;
                }
            }
            if (uObj && normalizeRol(uObj.rol) === 'estudiante') {
                if (uObj.mesesAdeudo === undefined) {
                    uObj.mesesAdeudo = (uObj.pagoStatus === 'pendiente' || uObj.pagoStatus === '1_pendiente') ? 1 : (uObj.pagoStatus === '2_pendientes' ? 2 : 0);
                    modificado = true;
                }
                if (uObj.motivoNoPago === undefined) { uObj.motivoNoPago = ""; modificado = true; }
                if (uObj.desbloqueadoManual === undefined) { uObj.desbloqueadoManual = false; modificado = true; }
                if (uObj.observacionesMaestro === undefined) { uObj.observacionesMaestro = "Alumno constante y activo en clase."; modificado = true; }
            }
        });

        // Garantizar usuario alumno de prueba solo si no existe aún
        if (!db.usuarios["alumno"]) {
            db.usuarios["alumno"] = {
                password: "can2026**",
                rol: "estudiante",
                nombre: "Alumno de Prueba",
                area: "Teclado",
                instrumento: "Teclado",
                pagoStatus: "solvente",
                mesesAdeudo: 0,
                motivoNoPago: "",
                desbloqueadoManual: false,
                observacionesMaestro: "Alumno de prueba activo."
            };
            modificado = true;
        }
        if (!db.usuarios["administracion"]) {
            db.usuarios["administracion"] = {
                password: "can2026**",
                rol: "administracion",
                nombre: "Equipo de Administración",
                area: "Administración"
            };
            modificado = true;
        }
        
        if (modificado) {
            localStorage.setItem('worship_sessions_db', JSON.stringify(db));
        }
    }
}

function obtenerEstatusColegiatura(u) {
    if (!u) return { status: 'solvente', label: 'SOLVENTE', color: '#10b981', badgeClass: 'presente', estaBloqueado: false };

    // Si la administración registró pago del mes en curso:
    if (u.pagoStatus === 'solvente' || u.pagoStatus === 'pagado') {
        return {
            status: 'solvente',
            label: 'SOLVENTE (AL DÍA)',
            color: '#10b981',
            badgeClass: 'presente',
            estaBloqueado: false
        };
    }

    // Si administración asignó explícitamente estado no_pagado
    if (u.pagoStatus === 'no_pagado' || u.pagoStatus === '2_pendientes') {
        const estaDesbloqueadoPastor = u.desbloqueadoManual || false;
        return {
            status: 'no_pagado',
            label: estaDesbloqueadoPastor ? 'NO PAGADO (AUTORIZADO PASTOR)' : 'NO PAGADO (SUSPENDIDO)',
            color: estaDesbloqueadoPastor ? '#f59e0b' : '#ef4444',
            badgeClass: 'ausente',
            estaBloqueado: !estaDesbloqueadoPastor
        };
    }

    // Regla de fecha y calendario:
    // Periodo de pago: Primeros 15 días del mes.
    // Tolerancia: 12 días adicionales (hasta el día 27 del mes).
    // A partir del día 28: NO PAGADO (SUSPENDIDO).
    const hoy = new Date();
    const diaDelMes = hoy.getDate();

    if (diaDelMes <= 15) {
        return {
            status: 'pendiente',
            label: 'PENDIENTE (PERIODO DÍAS 1-15)',
            color: '#f59e0b',
            badgeClass: 'ausente',
            estaBloqueado: false
        };
    } else if (diaDelMes <= 27) {
        return {
            status: 'pendiente',
            label: 'PENDIENTE (TOLERANCIA 12 DÍAS)',
            color: '#f59e0b',
            badgeClass: 'ausente',
            estaBloqueado: false
        };
    } else {
        // Pasaron 12 días del límite de pago -> NO PAGADO (SUSPENDIDO)
        const estaDesbloqueadoPastor = u.desbloqueadoManual || false;
        return {
            status: 'no_pagado',
            label: estaDesbloqueadoPastor ? 'NO PAGADO (AUTORIZADO PASTOR)' : 'NO PAGADO (SUSPENDIDO)',
            color: estaDesbloqueadoPastor ? '#f59e0b' : '#ef4444',
            badgeClass: 'ausente',
            estaBloqueado: !estaDesbloqueadoPastor
        };
    }
}

function esAlumnoBloqueado(username) {
    const db = getDB();
    if (!db || !db.usuarios || !db.usuarios[username]) return false;
    const u = db.usuarios[username];
    if (normalizeRol(u.rol) !== 'estudiante') return false;
    
    const info = obtenerEstatusColegiatura(u);
    return info.estaBloqueado;
}

function getDB() {
    initDB();
    return JSON.parse(localStorage.getItem('worship_sessions_db'));
}

function saveDB(db) {
    localStorage.setItem('worship_sessions_db', JSON.stringify(db));
}

// ESTADO GLOBAL DE LA SESIÓN EN MEMORIA, REPRODUCTOR Y METRÓNOMO
let usuarioActual = null;
let editandoUsuarioUsername = null;
let audioIntervalo = null;
let reproductorCorriendo = false;
let progresoActual = 0;

// Sistema de Metrónomo Sintetizado
let metronomeInterval = null;
let metronomeIsPlaying = false;
let metronomeBpm = 120;
let audioCtx = null;
let metronomeVisualState = false;

// -------------------------------------------------------------
// SISTEMA DE NOTIFICACIONES TOAST (PREMIUM)
// -------------------------------------------------------------
function showToast(mensaje, tipo = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${tipo}`;
    
    let icon = 'fa-check-circle';
    if (tipo === 'error') icon = 'fa-exclamation-triangle';
    if (tipo === 'info') icon = 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <div class="toast-content">
            <p>${mensaje}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Auto-eliminar después de 3.5 segundos
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.4s ease forwards';
        setTimeout(() => { toast.remove(); }, 400);
    }, 3500);
}

// SYSTEM DE CONTROL DE PANTALLAS Y ENRUTADOR DE NAVEGACIÓN HISTORIAL HTML5
function mostrarPantalla(idPantalla, pushHistory = true) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    const target = document.getElementById(idPantalla);
    if (target) {
        target.style.display = 'flex';
        target.classList.add('active');
    }
    
    if (pushHistory && window.history && window.history.pushState) {
        let hash = '#eleccion';
        if (idPantalla === 'login-screen') hash = '#login';
        if (idPantalla === 'worship-intro-screen') hash = '#bienvenida';
        if (idPantalla === 'app-screen') {
            const rol = usuarioActual ? normalizeRol(usuarioActual.rol) : 'estudiante';
            hash = getHashParaRolSubvista(rol);
        }
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla, hash }, "", hash);
        }
    }
}

function getHashParaRolSubvista(rol) {
    if (rol === 'admin') return '#admin-' + (subvistaAdminActual || 'panel');
    if (rol === 'pastor') return '#pastor-' + (subvistaPastorActual || 'alertas');
    if (rol === 'maestro') return '#maestro-' + (subvistaMaestroActual || 'dashboard');
    if (rol === 'produccion' || rol === 'administracion') return '#produccion-' + (subvistaProduccionActual || 'estatus');
    if (rol === 'adoracion') return '#adoracion-' + (subvistaAdoracionActual || 'control');
    return '#estudiante-' + (subvistaEstudianteActual || 'classroom');
}

// MENÚS DINÁMICOS SEGÚN EL ROL DEL USUARIO
const menusConfig = {
    admin: `
        <li class="nav-item">
            <a href="#" class="nav-link active" id="nav-admin-panel" onclick="cambiarSubvistaAdmin('panel'); return false;">
                <i class="fas fa-chart-pie"></i> Panel & Estadísticas
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-admin-colegiaturas" onclick="abrirModuloAdministracionDesdeMenu('colegiaturas'); return false;">
                <i class="fas fa-file-invoice-dollar"></i> Administración & Colegiaturas
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-admin-usuarios" onclick="cambiarSubvistaAdmin('usuarios'); return false;">
                <i class="fas fa-users-cog"></i> Gestión de Usuarios
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-admin-respaldos" onclick="cambiarSubvistaAdmin('respaldos'); return false;">
                <i class="fas fa-database"></i> Respaldos & Sistema
            </a>
        </li>
    `,
    pastor: `
        <li class="nav-item">
            <a href="#" class="nav-link active" id="nav-pastor-alertas" onclick="cambiarSubvistaPastor('alertas'); return false;">
                <i class="fas fa-chart-pie"></i> Visión & Métricas Globales
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-pastor-asistencia" onclick="cambiarSubvistaPastor('asistencia'); return false;">
                <i class="fas fa-id-card"></i> Expedientes & Supervisión
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-pastor-colegiaturas" onclick="abrirModuloAdministracionDesdeMenu('colegiaturas'); return false;">
                <i class="fas fa-file-invoice-dollar"></i> Administración & Colegiaturas
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-pastor-cobertura" onclick="cambiarSubvistaPastor('cobertura'); return false;">
                <i class="fas fa-heart"></i> Alertas & Cuidado Pastoral
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-pastor-docentes" onclick="cambiarSubvistaPastor('docentes'); return false;">
                <i class="fas fa-chalkboard-teacher"></i> Evaluación de Docentes
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-pastor-calendario" onclick="cambiarSubvistaPastor('calendario'); return false;">
                <i class="fas fa-calendar-alt"></i> Hitos & Eventos del Ciclo
            </a>
        </li>
    `,
    maestro: `
        <li class="nav-item">
            <a href="#" class="nav-link active" id="nav-maestro-dashboard" onclick="cambiarSubvistaMaestro('dashboard'); return false;">
                <i class="fas fa-home"></i> Resumen General
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-maestro-classroom" onclick="cambiarSubvistaMaestro('classroom'); return false;">
                <i class="fas fa-tasks"></i> Classroom & Tareas
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-maestro-alumnos" onclick="cambiarSubvistaMaestro('alumnos'); return false;">
                <i class="fas fa-user-graduate"></i> Evaluaciones & Asistencia
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-maestro-ensambles" onclick="cambiarSubvistaMaestro('ensambles'); return false;">
                <i class="fas fa-layer-group"></i> Asignación de Ensambles
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-maestro-materiales" onclick="cambiarSubvistaMaestro('materiales'); return false;">
                <i class="fas fa-folder-open"></i> Materiales & Guías
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-maestro-anuncios" onclick="cambiarSubvistaMaestro('anuncios'); return false;">
                <i class="fas fa-bullhorn"></i> Muro de Anuncios
            </a>
        </li>
    `,
    administracion: `
        <li class="nav-item">
            <a href="#" class="nav-link active" id="nav-produccion-colegiaturas" onclick="cambiarSubvistaProduccion('colegiaturas'); return false;">
                <i class="fas fa-file-invoice-dollar"></i> Administración & Colegiaturas
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-produccion-estatus" onclick="cambiarSubvistaProduccion('estatus'); return false;">
                <i class="fas fa-calendar-day"></i> Estatus de Clases & Avisos
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-produccion-asistencias" onclick="cambiarSubvistaProduccion('asistencias'); return false;">
                <i class="fas fa-clipboard-list"></i> Asistencias & Cumplimiento
            </a>
        </li>
    `,
    adoracion: `
        <li class="nav-item">
            <a href="#" class="nav-link active" id="nav-adoracion-control" onclick="cambiarSubvistaAdoracion('control'); return false;">
                <i class="fas fa-toggle-on"></i> Etapa de Ensambles & Servicios
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-adoracion-repertorio" onclick="cambiarSubvistaAdoracion('repertorio'); return false;">
                <i class="fas fa-list-ul"></i> Repertorio & Setlist General
            </a>
        </li>
    `,
    estudiante: `
        <li class="nav-item">
            <a href="#" class="nav-link active" id="nav-estudiante-classroom" onclick="cambiarSubvistaEstudiante('classroom'); return false;">
                <i class="fas fa-tasks"></i> Classroom & Tareas
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-estudiante-progreso" onclick="cambiarSubvistaEstudiante('progreso'); return false;">
                <i class="fas fa-chart-line"></i> Mi Progreso & Asistencia
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-estudiante-ensamble" onclick="cambiarSubvistaEstudiante('ensamble'); return false;">
                <i class="fas fa-guitar"></i> Mi Ensamble & Playthroughs
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-estudiante-playback" onclick="cambiarSubvistaEstudiante('playback'); return false;">
                <i class="fas fa-sliders-h"></i> Estudio Playback & Metrónomo
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" id="nav-estudiante-recursos" onclick="cambiarSubvistaEstudiante('recursos'); return false;">
                <i class="fas fa-bullhorn"></i> Recursos & Anuncios
            </a>
        </li>
    `
};
menusConfig.alumno = menusConfig.estudiante;
menusConfig.produccion = menusConfig.administracion;

// -------------------------------------------------------------
// EVENTOS DE SESIÓN
// -------------------------------------------------------------
function iniciarSesion(event) {
    event.preventDefault();
    
    const inputUser = document.getElementById('login-user').value.trim().toLowerCase();
    const inputPass = document.getElementById('login-pass').value;
    const errorMsg = document.getElementById('login-error');
    
    const db = getDB();
    
    if (db.usuarios[inputUser] && db.usuarios[inputUser].password === inputPass) {
        errorMsg.style.display = 'none';
        
        // Interceptar bloqueo automático por 2 colegiaturas pendientes sin autorización
        if (esAlumnoBloqueado(inputUser)) {
            const modalBloqueo = document.getElementById('modal-bloqueo-alumno');
            if (modalBloqueo) modalBloqueo.classList.add('active');
            showToast("Colegiatura pendiente, favor de comunicarte con administración", "error");
            return;
        }

        usuarioActual = { ...db.usuarios[inputUser], username: inputUser };
        usuarioActual.rol = normalizeRol(usuarioActual.rol);
        
        // Guardar sesión persistente
        localStorage.setItem('ws_user_session', JSON.stringify(usuarioActual));
        
        configurarInterfaz(usuarioActual);
        mostrarPantalla('worship-intro-screen');
        showToast(`¡Bienvenido de vuelta, ${usuarioActual.nombre}!`, 'success');
    } else {
        errorMsg.style.display = 'block';
        errorMsg.style.animation = 'shake 0.3s ease';
        setTimeout(() => { errorMsg.style.animation = ''; }, 300);
        showToast("Error de credenciales", 'error');
    }
}

function cerrarModalBloqueoYSalir() {
    const modalBloqueo = document.getElementById('modal-bloqueo-alumno');
    if (modalBloqueo) modalBloqueo.classList.remove('active');
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
    mostrarPantalla('app-choice-screen');
}

function entrarAlDashboard() {
    const introScreen = document.getElementById('worship-intro-screen');
    if (introScreen) {
        introScreen.style.animation = 'fadeOutScreen 0.4s ease forwards';
        setTimeout(() => {
            mostrarPantalla('app-screen');
            introScreen.style.animation = '';
        }, 400);
    } else {
        mostrarPantalla('app-screen');
    }
}

function cerrarSesion() {
    usuarioActual = null;
    localStorage.removeItem('ws_user_session');
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
    mostrarPantalla('app-choice-screen');
    cerrarReproductor();
    detenerMetronomo();
    showToast("Sesión cerrada con éxito", 'info');
}

function actualizarFondoIntroPorInstrumento(usuario) {
    const layer = document.getElementById('intro-bg-instrument-layer');
    if (!layer) return;
    
    // Obtener datos frescos actualizados de la Base de Datos
    const db = getDB();
    if (usuario && usuario.username && db && db.usuarios && db.usuarios[usuario.username]) {
        const uFresh = db.usuarios[usuario.username];
        usuario.area = uFresh.area || usuario.area;
        usuario.instrumento = uFresh.area || uFresh.instrumento || usuario.instrumento;
        usuario.rol = uFresh.rol || usuario.rol;
    }
    
    const rol = (usuario?.rol || '').toLowerCase().trim();
    const inst = ((usuario?.instrumento || usuario?.area || '') + '').toLowerCase().trim();
    
    let bgUrl = 'img/inst-staff.jpg';
    
    // Para Pastor -> Usar la biblioteca / estudio pastoral (inst-pastor.jpg)
    if (rol === 'pastor') {
        bgUrl = 'img/inst-pastor.jpg';
    } else if (rol === 'produccion') {
        bgUrl = 'img/inst-produccion.jpg';
    } else if (rol === 'maestro' || rol === 'admin' || rol === 'adoracion') {
        bgUrl = 'img/inst-staff.jpg';
    } else {
        // Alumnos según su instrumento
        if (inst.includes('bater') || inst.includes('percus') || inst.includes('drum')) {
            bgUrl = 'img/inst-bateria.jpg';
        } else if (inst.includes('canto') || inst.includes('voz') || inst.includes('vocal')) {
            bgUrl = 'img/inst-canto.jpg';
        } else if (inst.includes('piano') || inst.includes('teclado') || inst.includes('key')) {
            bgUrl = 'img/inst-piano.jpg';
        } else if (inst.includes('bajo') || inst.includes('bass') || inst.includes('guitar')) {
            bgUrl = 'img/inst-bajo.jpg';
        } else {
            bgUrl = 'img/inst-staff.jpg';
        }
    }
    
    layer.style.backgroundImage = `url('${bgUrl}')`;
}

// CONFIGURACIÓN DE LA INTERFAZ SEGÚN EL ROL
function configurarInterfaz(usuario) {
    if (!usuario) return;
    actualizarFondoIntroPorInstrumento(usuario);
    const rol = normalizeRol(usuario.rol);
    usuario.rol = rol;
    const nombre = usuario.nombre || usuario.username || 'Usuario';
    
    const lblRol = document.getElementById('lbl-rol-actual');
    const navUser = document.getElementById('nav-username');
    const appTitle = document.getElementById('app-welcome-title');
    const appSub = document.getElementById('app-welcome-subtitle');
    const navAvatar = document.getElementById('nav-avatar');
    const dynMenu = document.getElementById('dynamic-menu');

    if (lblRol) lblRol.innerText = rol.toUpperCase();
    if (navUser) navUser.innerText = nombre;
    if (appTitle) appTitle.innerText = "Hola, " + nombre;
    if (appSub) appSub.innerText = "Área / Especialidad: " + (usuario.area || 'Estudiante');
    if (navAvatar) navAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=d90429&color=fff&bold=true`;
    
    if (dynMenu && (menusConfig[rol] || menusConfig['estudiante'])) {
        dynMenu.innerHTML = menusConfig[rol] || menusConfig['estudiante'];
    }
    
    cambiarVista(rol);
}

// CAMBIO DE VISTAS DENTRO DEL PANEL PRINCIPAL
function cambiarVista(rolVista) {
    const rol = normalizeRol(rolVista);
    
    document.querySelectorAll('.app-view').forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    
    let targetView = document.getElementById('view-' + rol);
    if (!targetView && (rol === 'administracion' || rol === 'produccion')) {
        targetView = document.getElementById('view-produccion') || document.getElementById('view-administracion');
    }
    if (!targetView) {
        targetView = document.getElementById('view-estudiante');
    }
    
    if (targetView) {
        targetView.style.display = 'block';
        targetView.classList.add('active');
        if (rol === 'admin') { cambiarSubvistaAdmin(subvistaAdminActual || 'panel'); return; }
        if (rol === 'pastor') { cambiarSubvistaPastor(subvistaPastorActual || 'alertas'); return; }
        if (rol === 'maestro') { cambiarSubvistaMaestro(subvistaMaestroActual || 'dashboard'); return; }
        if (rol === 'produccion' || rol === 'administracion') { cambiarSubvistaProduccion(subvistaProduccionActual || 'estatus'); return; }
        if (rol === 'adoracion') { cambiarSubvistaAdoracion(subvistaAdoracionActual || 'control'); return; }
        if (rol === 'estudiante') { cambiarSubvistaEstudiante(subvistaEstudianteActual || 'classroom'); return; }
    }
    
    renderizarDatosVista(rol);
}

// RENDERIZAR DATOS EN LAS VISTAS ESPECÍFICAS
function renderizarDatosVista(rolVista) {
    const db = getDB();
    const rol = normalizeRol(rolVista);
    
    if (rol === 'admin') {
        renderizarAdmin(db);
    } else if (rol === 'pastor') {
        renderizarPastor(db);
    } else if (rol === 'maestro') {
        renderizarMaestro(db);
    } else if (rol === 'produccion' || rol === 'administracion') {
        renderizarProduccion(db);
    } else if (rol === 'adoracion') {
        renderizarAdoracion(db);
    } else {
        renderizarEstudiante(db);
    }
}

// -------------------------------------------------------------
// RENDER DE ROL: ADMINISTRADOR (TABLAS, RESPALDOS Y PAGOS)
// -------------------------------------------------------------
function renderizarAdmin(db) {
    const staffTbody = document.getElementById('admin-staff-tbody');
    const studentsTbody = document.getElementById('admin-students-tbody');
    
    staffTbody.innerHTML = '';
    studentsTbody.innerHTML = '';
    
    let totalStaff = 0;
    let totalAlumnos = 0;

    Object.keys(db.usuarios).forEach(username => {
        const user = db.usuarios[username];
        const tr = document.createElement('tr');
        
        // Carga el estado de pago del alumno si existe
        let pagoColumnHtml = '';
        if (user.rol === 'estudiante') {
            const status = user.pagoStatus || 'solvente';
            const displayClass = status === 'solvente' ? 'presente' : 'ausente';
            pagoColumnHtml = `
                <td>
                    <span class="badge badge-estado ${displayClass}" style="cursor:pointer;" onclick="togglePagoStatus('${username}')" title="Hacer clic para cambiar estado">
                        ${status.toUpperCase()}
                    </span>
                </td>`;
        }

        tr.innerHTML = `
            <td>
                <div class="user-cell">
                    <span class="user-icon-badge ${user.rol === 'estudiante' ? 'accent' : ''}">${user.nombre.charAt(0)}</span>
                    <div>
                        <strong class="user-realname">${user.nombre}</strong>
                        <span class="user-username">@${username}</span>
                    </div>
                </div>
            </td>
            <td><span class="badge badge-rol">${user.rol.toUpperCase()}</span></td>
            <td><span class="badge badge-area">${user.area}</span></td>
            ${pagoColumnHtml}
            <td>
                <button class="btn btn-sm btn-secondary" onclick="abrirModalUsuario('${username}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-delete" onclick="eliminarUsuario('${username}')"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        if (user.rol === 'estudiante') {
            studentsTbody.appendChild(tr);
            totalAlumnos++;
        } else {
            staffTbody.appendChild(tr);
            totalStaff++;
        }
    });

    document.getElementById('admin-total-staff').innerText = totalStaff;
    document.getElementById('admin-total-students').innerText = totalAlumnos;
}

// TOGGLE PAGOS DIRECTAMENTE
function togglePagoStatus(username) {
    const db = getDB();
    if (db.usuarios[username] && db.usuarios[username].rol === 'estudiante') {
        const current = db.usuarios[username].pagoStatus || 'solvente';
        db.usuarios[username].pagoStatus = current === 'solvente' ? 'pendiente' : 'solvente';
        saveDB(db);
        showToast(`Pago de @${username} actualizado a ${db.usuarios[username].pagoStatus.toUpperCase()}`, 'info');
        renderizarDatosVista('admin');
    }
}

function abrirModalUsuario(username = null) {
    const modal = document.getElementById('modal-usuario');
    const db = getDB();
    
    // Ocultar / Mostrar campo de pago
    const pGroup = document.getElementById('user-pago-group');
    
    if (username) {
        editandoUsuarioUsername = username;
        const user = db.usuarios[username];
        document.getElementById('modal-user-title').innerText = "Editar Usuario";
        document.getElementById('user-username').value = username;
        document.getElementById('user-username').disabled = true;
        document.getElementById('user-nombre').value = user.nombre;
        document.getElementById('user-pass').value = user.password;
        document.getElementById('user-rol').value = user.rol;
        document.getElementById('user-area').value = user.area;
        document.getElementById('user-pago').value = user.pagoStatus || 'solvente';
        
        if(user.rol === 'estudiante') {
            pGroup.style.display = 'block';
        } else {
            pGroup.style.display = 'none';
        }
    } else {
        editandoUsuarioUsername = null;
        document.getElementById('modal-user-title').innerText = "Nuevo Usuario";
        document.getElementById('user-username').value = '';
        document.getElementById('user-username').disabled = false;
        document.getElementById('user-nombre').value = '';
        document.getElementById('user-pass').value = '1234';
        document.getElementById('user-rol').value = 'estudiante';
        document.getElementById('user-area').value = 'Teclado';
        document.getElementById('user-pago').value = 'solvente';
        pGroup.style.display = 'block'; // por defecto es estudiante
    }
    
    modal.classList.add('active');
}

// Escucha cambios de rol en el formulario de registro para ocultar/mostrar campo pago
document.addEventListener('DOMContentLoaded', () => {
    const selectRol = document.getElementById('user-rol');
    if (selectRol) {
        selectRol.addEventListener('change', (e) => {
            const pGroup = document.getElementById('user-pago-group');
            if (e.target.value === 'estudiante') {
                pGroup.style.display = 'block';
            } else {
                pGroup.style.display = 'none';
            }
        });
    }
});

function cerrarModalUsuario() {
    document.getElementById('modal-usuario').classList.remove('active');
}

function guardarUsuario(event) {
    event.preventDefault();
    const username = document.getElementById('user-username').value.trim().toLowerCase();
    const nombre = document.getElementById('user-nombre').value.trim();
    const pass = document.getElementById('user-pass').value;
    const rol = document.getElementById('user-rol').value;
    const area = document.getElementById('user-area').value;
    const pago = document.getElementById('user-pago').value;
    
    if (!username || !nombre || !pass) {
        showToast("Rellena todos los campos del usuario.", "error");
        return;
    }
    
    const db = getDB();
    
    if (editandoUsuarioUsername) {
        db.usuarios[editandoUsuarioUsername].nombre = nombre;
        db.usuarios[editandoUsuarioUsername].password = pass;
        db.usuarios[editandoUsuarioUsername].rol = rol;
        db.usuarios[editandoUsuarioUsername].area = area;
        db.usuarios[editandoUsuarioUsername].instrumento = area;
        if(rol === 'estudiante') {
            db.usuarios[editandoUsuarioUsername].pagoStatus = pago;
        }
        
        // Si se edita la cuenta activa, actualizar sesión local
        if (usuarioActual && usuarioActual.username === editandoUsuarioUsername) {
            usuarioActual.nombre = nombre;
            usuarioActual.rol = rol;
            usuarioActual.area = area;
            usuarioActual.instrumento = area;
            usuarioActual.pagoStatus = pago;
            localStorage.setItem('ws_user_session', JSON.stringify(usuarioActual));
            actualizarFondoIntroPorInstrumento(usuarioActual);
        }
        
        showToast("Usuario y su especialidad actualizados correctamente", "success");
    } else {
        if (db.usuarios[username]) {
            showToast("El usuario ya existe en el sistema.", "error");
            return;
        }
        db.usuarios[username] = { 
            password: pass, 
            rol: rol, 
            nombre: nombre, 
            area: area,
            instrumento: area,
            pagoStatus: (rol === 'estudiante' ? pago : undefined)
        };
        showToast("Usuario registrado con éxito", "success");
    }
    
    saveDB(db);
    cerrarModalUsuario();
    renderizarDatosVista('admin');
}

function eliminarUsuario(username) {
    if (username === usuarioActual.username) {
        showToast("No puedes borrarte a ti mismo.", "error");
        return;
    }
    
    if (confirm(`¿Estás seguro de eliminar permanentemente a @${username}?`)) {
        const db = getDB();
        delete db.usuarios[username];
        
        if (db.calificaciones[username]) delete db.calificaciones[username];
        if (db.asistencia[username]) delete db.asistencia[username];
        
        saveDB(db);
        showToast("Usuario eliminado");
        renderizarDatosVista('admin');
    }
}

// RESPALDOS JSON
function exportarBaseDatos() {
    const db = getDB();
    const jsonStr = JSON.stringify(db, null, 4);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `WorshipSessions_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Copia de seguridad descargada", "success");
}

function importarBaseDatos(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importDB = JSON.parse(e.target.result);
            if (importDB.usuarios && importDB.canciones && importDB.calificaciones) {
                saveDB(importDB);
                showToast("Base de datos importada correctamente", "success");
                setTimeout(() => { location.reload(); }, 1200);
            } else {
                showToast("Archivo de respaldo inválido.", "error");
            }
        } catch (err) {
            showToast("Error al procesar el archivo.", "error");
        }
    };
    reader.readAsText(file);
}

// -------------------------------------------------------------
// RENDER DE ROL: PASTOR (FILTROS, GRÁFICOS Y ESTADO DE PAGOS)
// -------------------------------------------------------------
function renderizarPastor(db) {
    const estudiantesArr = Object.values(db.usuarios).filter(u => u.rol === 'estudiante');
    const totalEstudiantes = estudiantesArr.length;
    
    // Asistencia promedio
    let totalClasesMarcadas = 0;
    let totalAsistencias = 0;
    let alumnosFaltasCriticas = 0;
    
    estudiantesArr.forEach(e => {
        const asistObj = db.asistencia[e.username] || {};
        const vals = Object.values(asistObj);
        if (vals.length > 0) {
            const pres = vals.filter(v => v === 'presente').length;
            const pct = Math.round((pres / vals.length) * 100);
            if (pct < 75) alumnosFaltasCriticas++;
        }
    });

    Object.values(db.asistencia).forEach(fechasObj => {
        Object.values(fechasObj).forEach(estado => {
            totalClasesMarcadas++;
            if (estado === 'presente') totalAsistencias++;
        });
    });
    const promAsistencia = totalClasesMarcadas > 0 ? Math.round((totalAsistencias / totalClasesMarcadas) * 100) : 100;
    
    const elTotStud = document.getElementById('pastor-total-students');
    const elGlobalAtt = document.getElementById('pastor-global-attendance');
    if (elTotStud) elTotStud.innerText = totalEstudiantes;
    if (elGlobalAtt) elGlobalAtt.innerText = promAsistencia + "%";

    // Tareas
    const totalTareasAsignadas = (db.tareas || []).length;
    const totalEntregasRecibidas = Object.keys(db.entregasTareas || {}).length;
    const pctCumplimientoTareas = totalTareasAsignadas > 0 ? Math.min(100, Math.round((totalEntregasRecibidas / (totalTareasAsignadas * Math.max(totalEstudiantes, 1))) * 100)) : 100;
    
    const hwPctEl = document.getElementById('pastor-homework-pct');
    const hwCountEl = document.getElementById('pastor-homework-count');
    if (hwPctEl) hwPctEl.innerText = pctCumplimientoTareas + "%";
    if (hwCountEl) hwCountEl.innerText = `${totalEntregasRecibidas} entregas recibidas`;
    
    // Colegiaturas (Estatus solo lectura pastoral)
    const solventes = estudiantesArr.filter(e => obtenerEstatusColegiatura(e).status === 'solvente').length;
    const deudores = estudiantesArr.filter(e => obtenerEstatusColegiatura(e).status === 'no_pagado').length;
    const elSolv = document.getElementById('pastor-solvent-count');
    const elDebt = document.getElementById('pastor-debtor-count');
    if (elSolv) elSolv.innerText = solventes;
    if (elDebt) elDebt.innerText = deudores;
    
    const recaudacionPct = totalEstudiantes > 0 ? Math.round((solventes / totalEstudiantes) * 100) : 100;
    const elRecProg = document.getElementById('pastor-recaudacion-progress');
    const elRecTag = document.getElementById('pastor-recaudacion-tag');
    if (elRecProg) elRecProg.style.width = recaudacionPct + "%";
    if (elRecTag) elRecTag.innerText = recaudacionPct + "% Solvencia en Periodo";

    // Indicadores de Salud Pastoral
    const alumnosEnRiesgo = estudiantesArr.filter(e => {
        const cal = db.calificaciones[e.username];
        if (!cal) return false;
        const prom = ((Number(cal.teoria) || 0) + (Number(cal.tecnica) || 0)) / 2;
        return prom < 75 && cal.teoria !== 'N/A';
    }).length;

    const elRet = document.getElementById('pastor-retencion-val');
    const elRiesgo = document.getElementById('pastor-riesgo-val');
    const elFaltas = document.getElementById('pastor-faltas-criticas-val');
    if (elRet) elRet.innerText = (totalEstudiantes > 0 ? Math.round(((totalEstudiantes - deudores) / totalEstudiantes) * 100) : 100) + "%";
    if (elRiesgo) elRiesgo.innerText = alumnosEnRiesgo;
    if (elFaltas) elFaltas.innerText = alumnosFaltasCriticas;

    // Buscador & Expedientes
    const inputSearch = document.getElementById('pastor-search-input');
    const inputFilt = document.getElementById('pastor-filter-instrument');
    const busqueda = inputSearch ? inputSearch.value.trim().toLowerCase() : '';
    const filtroInst = inputFilt ? inputFilt.value : 'todos';
    
    const tbody = document.getElementById('pastor-summary-tbody');
    if (tbody) {
        tbody.innerHTML = '';
        Object.keys(db.usuarios).forEach(username => {
            const user = db.usuarios[username];
            if (user.rol === 'estudiante') {
                const coincideNombre = user.nombre.toLowerCase().includes(busqueda) || username.includes(busqueda);
                const coincideInstrumento = (filtroInst === "todos" || user.area === filtroInst);
                
                if (coincideNombre && coincideInstrumento) {
                    const notasObj = db.calificaciones[username] || { teoria: 'N/A', tecnica: 'N/A', notas: 'Sin registros' };
                    const asistenciasAlumno = db.asistencia[username] || {};
                    const asistenciasTotales = Object.values(asistenciasAlumno).length;
                    const presentes = Object.values(asistenciasAlumno).filter(val => val === 'presente').length;
                    const asistPct = asistenciasTotales > 0 ? Math.round((presentes / asistenciasTotales) * 100) : 'N/A';
                    
                    const tr = document.createElement('tr');
                    const infoCol = obtenerEstatusColegiatura(user);

                    tr.innerHTML = `
                        <td>
                            <strong class="user-realname" style="color:white;">${user.nombre}</strong><br>
                            <small class="text-muted">${user.area} - @${username}</small>
                        </td>
                        <td>
                            <div class="progress-bar-container mini">
                                <div class="progress-bar" style="width: ${notasObj.teoria === 'N/A' ? '0' : notasObj.teoria}%"></div>
                            </div>
                            <span>${notasObj.teoria}</span>
                        </td>
                        <td>
                            <div class="progress-bar-container mini">
                                <div class="progress-bar" style="width: ${notasObj.tecnica === 'N/A' ? '0' : notasObj.tecnica}%"></div>
                            </div>
                            <span>${notasObj.tecnica}</span>
                        </td>
                        <td><strong class="asist-pct-text" style="color:${asistPct >= 80 ? '#10b981' : '#ef4444'};">${asistPct !== 'N/A' ? asistPct + '%' : 'S/R'}</strong></td>
                        <td>
                            <span class="badge badge-estado ${infoCol.badgeClass}">
                                ${infoCol.label}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="abrirModalExpediente('${username}')">
                                <i class="fas fa-id-card"></i> Ver expediente
                            </button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                }
            }
        });
    }

    // Gráfico de distribución por instrumento
    const conteoInstrumentos = {
        "Teclado": 0, "Batería": 0, "Guitarra Eléctrica": 0, "Bajo Eléctrico": 0, "Canto / Voces": 0
    };
    Object.values(db.usuarios).forEach(u => {
        if (u.rol === 'estudiante' && conteoInstrumentos[u.area] !== undefined) {
            conteoInstrumentos[u.area]++;
        }
    });

    const chartContainer = document.getElementById('pastor-chart-container');
    if (chartContainer) {
        chartContainer.innerHTML = '';
        const maxAlumnos = Math.max(...Object.values(conteoInstrumentos), 1);
        Object.keys(conteoInstrumentos).forEach(inst => {
            const count = conteoInstrumentos[inst];
            const pctWidth = (count / maxAlumnos) * 100;
            const chartRow = document.createElement('div');
            chartRow.className = 'chart-row';
            chartRow.innerHTML = `
                <span class="chart-label">${inst}</span>
                <div class="chart-bar-outer">
                    <div class="chart-bar-inner" style="width: ${pctWidth}%">
                        <span class="chart-bar-val">${count}</span>
                    </div>
                </div>
            `;
            chartContainer.appendChild(chartRow);
        });
    }

    // Llenar selector de alumnos en Cuidado Pastoral
    const selectPastoral = document.getElementById('pastoral-student-select');
    if (selectPastoral) {
        selectPastoral.innerHTML = '<option value="">-- Seleccionar Alumno --</option>';
        estudiantesArr.forEach(st => {
            const opt = document.createElement('option');
            opt.value = st.nombre;
            opt.innerText = `${st.nombre} (${st.area})`;
            selectPastoral.appendChild(opt);
        });
    }

    // Renderizar Bitácora de Notas Pastorales
    const notesTbody = document.getElementById('pastor-notes-tbody');
    if (notesTbody) {
        notesTbody.innerHTML = '';
        const notasPast = db.notasPastorales || [];
        if (notasPast.length === 0) {
            notesTbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted" style="padding:1.5rem;">No hay notas de seguimiento pastoral registradas.</td></tr>';
        } else {
            notasPast.forEach((np, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${np.alumno}</strong></td>
                    <td><span class="badge badge-rol">${np.tipo}</span></td>
                    <td>${np.contenido}</td>
                    <td><small class="text-muted">${np.fecha}</small></td>
                    <td><button class="btn btn-sm btn-danger" onclick="eliminarNotaPastoral(${idx})"><i class="fas fa-trash"></i></button></td>
                `;
                notesTbody.appendChild(tr);
            });
        }
    }

    // Renderizar Evaluación de Docentes
    const teachersTbody = document.getElementById('pastor-teachers-tbody');
    if (teachersTbody) {
        teachersTbody.innerHTML = '';
        const maestrosArr = Object.values(db.usuarios).filter(u => u.rol === 'maestro');
        if (maestrosArr.length === 0) {
            teachersTbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted" style="padding:1.5rem;">No hay maestros registrados.</td></tr>';
        } else {
            maestrosArr.forEach(m => {
                const alumnosDelMaestro = estudiantesArr.filter(e => e.area === m.area || (m.area === 'Batería' && e.area === 'Batería'));
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${m.nombre}</strong></td>
                    <td><span class="badge badge-rol">${m.area || 'Maestro'}</span></td>
                    <td><strong>${alumnosDelMaestro.length}</strong> alumnos</td>
                    <td><strong style="color:var(--primary-red);">88 / 100</strong></td>
                    <td><span class="badge badge-estado presente">🟢 Activo & Al día</span></td>
                `;
                teachersTbody.appendChild(tr);
            });
        }
    }
}

function guardarNotaPastoral(event) {
    event.preventDefault();
    const alumnoSelect = document.getElementById('pastoral-student-select');
    const tipoSelect = document.getElementById('pastoral-note-type');
    const contentText = document.getElementById('pastoral-note-content');
    if (!alumnoSelect || !contentText) return;
    
    const alumno = alumnoSelect.value;
    const tipo = tipoSelect ? tipoSelect.value : 'Consejería';
    const contenido = contentText.value.trim();
    if (!alumno || !contenido) return;

    const db = getDB();
    if (!db.notasPastorales) db.notasPastorales = [];
    db.notasPastorales.unshift({
        alumno,
        tipo,
        contenido,
        fecha: new Date().toLocaleDateString('es-MX')
    });
    saveDB(db);
    contentText.value = '';
    alert('✅ Nota Pastoral guardada exitosamente.');
    renderizarPastor(db);
}

function eliminarNotaPastoral(index) {
    if (!confirm('¿Deseas eliminar esta nota pastoral?')) return;
    const db = getDB();
    if (db.notasPastorales && db.notasPastorales[index]) {
        db.notasPastorales.splice(index, 1);
        saveDB(db);
        renderizarPastor(db);
    }
}

// -------------------------------------------------------------
// CONTROL DE SUBVISTAS LATERALES PARA TODOS LOS ROLES (CON SOPORTE DE ENRUTADOR HISTORIAL)
// -------------------------------------------------------------
let subvistaAdminActual = 'panel';
function cambiarSubvistaAdmin(subVista, pushHistory = true) {
    subvistaAdminActual = subVista || 'panel';
    document.querySelectorAll('.admin-subview').forEach(sv => { sv.style.display = 'none'; sv.classList.remove('active'); });
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    const targetNav = document.getElementById('nav-admin-' + subVista);
    if (targetNav) targetNav.classList.add('active');
    const targetSub = document.getElementById('admin-subview-' + subVista);
    if (targetSub) { targetSub.style.display = 'block'; targetSub.classList.add('active'); }
    
    if (pushHistory && window.history && window.history.pushState) {
        const hash = '#admin-' + subvistaAdminActual;
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla: 'app-screen', subVista: subvistaAdminActual, hash }, "", hash);
        }
    }
    renderizarAdmin(getDB());
}

let subvistaPastorActual = 'alertas';
function cambiarSubvistaPastor(subVista, pushHistory = true) {
    subvistaPastorActual = subVista || 'alertas';
    document.querySelectorAll('.pastor-subview').forEach(sv => { sv.style.display = 'none'; sv.classList.remove('active'); });
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    const targetNav = document.getElementById('nav-pastor-' + subVista);
    if (targetNav) targetNav.classList.add('active');
    const targetSub = document.getElementById('pastor-subview-' + subVista);
    if (targetSub) { targetSub.style.display = 'block'; targetSub.classList.add('active'); }
    
    if (pushHistory && window.history && window.history.pushState) {
        const hash = '#pastor-' + subvistaPastorActual;
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla: 'app-screen', subVista: subvistaPastorActual, hash }, "", hash);
        }
    }
    renderizarPastor(getDB());
}

let subvistaProduccionActual = 'estatus';
function cambiarSubvistaProduccion(subVista, pushHistory = true) {
    subvistaProduccionActual = subVista || 'estatus';
    document.querySelectorAll('.produccion-subview').forEach(sv => { sv.style.display = 'none'; sv.classList.remove('active'); });
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    const targetNav = document.getElementById('nav-produccion-' + subVista);
    if (targetNav) targetNav.classList.add('active');
    const targetSub = document.getElementById('produccion-subview-' + subVista);
    if (targetSub) { targetSub.style.display = 'block'; targetSub.classList.add('active'); }
    
    if (pushHistory && window.history && window.history.pushState) {
        const hash = '#produccion-' + subvistaProduccionActual;
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla: 'app-screen', subVista: subvistaProduccionActual, hash }, "", hash);
        }
    }
    renderizarProduccion(getDB());
}

function abrirModuloAdministracionDesdeMenu(subvista = 'colegiaturas') {
    document.querySelectorAll('.app-view').forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    const targetView = document.getElementById('view-produccion') || document.getElementById('view-administracion');
    if (targetView) {
        targetView.style.display = 'block';
        targetView.classList.add('active');
    }
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    const activeNav = document.getElementById('nav-pastor-colegiaturas') || document.getElementById('nav-admin-colegiaturas') || document.getElementById('nav-produccion-colegiaturas');
    if (activeNav) activeNav.classList.add('active');

    cambiarSubvistaProduccion(subvista);
}

let subvistaAdoracionActual = 'control';
function cambiarSubvistaAdoracion(subVista, pushHistory = true) {
    subvistaAdoracionActual = subVista || 'control';
    document.querySelectorAll('.adoracion-subview').forEach(sv => { sv.style.display = 'none'; sv.classList.remove('active'); });
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    const targetNav = document.getElementById('nav-adoracion-' + subVista);
    if (targetNav) targetNav.classList.add('active');
    const targetSub = document.getElementById('adoracion-subview-' + subVista);
    if (targetSub) { targetSub.style.display = 'block'; targetSub.classList.add('active'); }
    
    if (pushHistory && window.history && window.history.pushState) {
        const hash = '#adoracion-' + subvistaAdoracionActual;
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla: 'app-screen', subVista: subvistaAdoracionActual, hash }, "", hash);
        }
    }
    renderizarAdoracion(getDB());
}

let subvistaEstudianteActual = 'classroom';
function cambiarSubvistaEstudiante(subVista, pushHistory = true) {
    subvistaEstudianteActual = subVista || 'classroom';
    document.querySelectorAll('.estudiante-subview').forEach(sv => { sv.style.display = 'none'; sv.classList.remove('active'); });
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    const targetNav = document.getElementById('nav-estudiante-' + subVista);
    if (targetNav) targetNav.classList.add('active');
    const targetSub = document.getElementById('estudiante-subview-' + subVista);
    if (targetSub) { targetSub.style.display = 'block'; targetSub.classList.add('active'); }
    
    if (pushHistory && window.history && window.history.pushState) {
        const hash = '#estudiante-' + subvistaEstudianteActual;
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla: 'app-screen', subVista: subvistaEstudianteActual, hash }, "", hash);
        }
    }
    renderizarEstudiante(getDB());
}

// -------------------------------------------------------------
// RENDER DE ROL: MAESTRO & DOCENTES
// -------------------------------------------------------------
let subvistaMaestroActual = 'dashboard';

function cambiarSubvistaMaestro(subVista, pushHistory = true) {
    subvistaMaestroActual = subVista || 'dashboard';
    
    document.querySelectorAll('.maestro-subview').forEach(sv => {
        sv.style.display = 'none';
        sv.classList.remove('active');
    });
    
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const targetNav = document.getElementById('nav-maestro-' + subVista);
    if (targetNav) targetNav.classList.add('active');
    
    const targetSub = document.getElementById('maestro-subview-' + subVista);
    if (targetSub) {
        targetSub.style.display = 'block';
        targetSub.classList.add('active');
    }
    
    if (pushHistory && window.history && window.history.pushState) {
        const hash = '#maestro-' + subvistaMaestroActual;
        if (window.location.hash !== hash) {
            history.pushState({ idPantalla: 'app-screen', subVista: subvistaMaestroActual, hash }, "", hash);
        }
    }
    
    const db = getDB();
    renderizarMaestro(db);
}

function usarPlantillaTarea(tipo) {
    const tTitulo = document.getElementById('tarea-titulo');
    const tDesc = document.getElementById('tarea-desc');
    const tFecha = document.getElementById('tarea-fecha-limite');
    
    const nextSat = new Date();
    nextSat.setDate(nextSat.getDate() + ((6 - nextSat.getDay() + 7) % 7 || 7));
    const nextSatStr = nextSat.toISOString().split('T')[0];

    if (tipo === 'escala') {
        if (tTitulo) tTitulo.value = "Grabar Escala Mayor a 2 Manos (90 BPM)";
        if (tDesc) tDesc.value = "Graba un video de 30 a 60 segundos ejecutando la escala mayor de tu especialidad en 2 octavas limpias a 90 BPM con metrónomo.";
    } else if (tipo === 'rudimento') {
        if (tTitulo) tTitulo.value = "Ejecución de Rudimentos / Técnica Fundamental";
        if (tDesc) tDesc.value = "Graba 1 minuto continuo ejecutando los ejercicios técnicos y de digitación recomendados en clase a velocidad constante.";
    } else if (tipo === 'ensamble') {
        if (tTitulo) tTitulo.value = "Montaje Verso 1 y Coro de Canción de Ensamble";
        if (tDesc) tDesc.value = "Graba tu ejecución sobre la pista/click de la canción asignada de ensamble. Revisa el tempo y tono especificado en tu panel.";
    }
    if (tFecha) tFecha.value = nextSatStr;
    showToast("Plantilla de tarea cargada", "info");
}

function usarPlantillaAnuncio(tipo) {
    const contentEl = document.getElementById('bulletin-content');
    if (!contentEl) return;
    
    if (tipo === 'partituras') {
        contentEl.value = "📜 Estimados alumnos: Recuerden traer impresas sus partituras y guías cifradas para la clase de este sábado. ¡Sean puntuales!";
    } else if (tipo === 'examen') {
        contentEl.value = "📝 Recordatorio: Este sábado tendremos evaluación práctica y teórica del material visto en el mes. Practiquen con metrónomo.";
    } else if (tipo === 'horario') {
        contentEl.value = "⏰ Importante: La clase iniciará puntualmente a las 10:00 AM. Favor de llegar 10 minutos antes con su instrumento preparado.";
    }
    showToast("Plantilla de aviso cargada", "info");
}

function guardarAsistenciaMaestro(event) {
    event.preventDefault();
    const fecha = document.getElementById('asistencia-fecha').value;
    if (!fecha) {
        showToast("Selecciona una fecha para la asistencia", "warning");
        return;
    }
    
    const db = getDB();
    if (!db.asistencia) db.asistencia = {};
    
    let countGuardados = 0;
    const checks = document.querySelectorAll('.asistencia-student-checkbox');
    checks.forEach(chk => {
        const username = chk.dataset.username;
        if (!db.asistencia[username]) db.asistencia[username] = {};
        db.asistencia[username][fecha] = chk.checked ? 'presente' : 'ausente';
        countGuardados++;
    });
    
    saveDB(db);
    showToast(`Asistencia de ${countGuardados} alumnos registrada para el ${fecha}`, "success");
    renderizarDatosVista('maestro');
}

function renderizarMaestro(db) {
    try {
        const areaMaestro = usuarioActual ? (usuarioActual.area || 'Teclado') : 'Teclado';
        
        const areaEl = document.getElementById('area-maestro');
        if (areaEl) areaEl.innerText = areaMaestro;

        // 1. Cargar Comunicados del Staff Producción
        const staffBannerContainer = document.getElementById('maestro-staff-announcements-banner');
        if (staffBannerContainer) {
            staffBannerContainer.innerHTML = '';
            const anunciosStaff = (db && db.anunciosStaff) || [];
            if (anunciosStaff.length > 0) {
                anunciosStaff.forEach(s => {
                    const div = document.createElement('div');
                    div.className = 'announcement-banner';
                    div.style.borderColor = 'rgba(229,9,20,0.4)';
                    div.innerHTML = `
                        <div class="announcement-banner-header">
                            <strong style="color:var(--primary-red);"><i class="fas fa-bullhorn"></i> COMUNICADO DEL STAFF PRODUCCIÓN: ${s.titulo || 'Aviso'}</strong>
                            <small>${s.fecha || ''}</small>
                        </div>
                        <p>${s.contenido || ''}</p>
                        <span class="announcement-author">Emitido por: ${s.autor || 'Staff'}</span>
                    `;
                    staffBannerContainer.appendChild(div);
                });
            }
        }

        // Tareas del maestro y estadísticas
        const tareasMaestro = ((db && db.tareas) || []).filter(t => usuarioActual.rol === 'admin' || t.area === areaMaestro);
        const tareaCountEl = document.getElementById('maestro-tasks-count');
        if (tareaCountEl) tareaCountEl.innerText = tareasMaestro.length;

        const entregas = (db && db.entregasTareas) || {};
        const tareaIdsMaestro = tareasMaestro.map(t => t.id);
        const entregasFiltradas = Object.keys(entregas).filter(k => tareaIdsMaestro.includes(entregas[k].tareaId));

        const subCountEl = document.getElementById('maestro-submissions-count');
        if (subCountEl) subCountEl.innerText = entregasFiltradas.length;

        // Tabla de Tareas Entregadas en Video
        const hwSubTbody = document.getElementById('maestro-homework-submissions-tbody');
        if (hwSubTbody) {
            hwSubTbody.innerHTML = '';
            if (entregasFiltradas.length === 0) {
                hwSubTbody.innerHTML = `<tr><td colspan="4" style="text-align:center;" class="text-muted">No hay videos entregados por alumnos aún.</td></tr>`;
            } else {
                entregasFiltradas.forEach(key => {
                    const e = entregas[key];
                    const student = (db.usuarios && db.usuarios[e.username]) || { nombre: e.username };
                    const tObj = ((db && db.tareas) || []).find(t => t.id === e.tareaId) || { titulo: 'Tarea' };
                    
                    const tr = document.createElement('tr');
                    const isCalificado = e.estado === 'calificado';
                    const statusBadge = isCalificado 
                        ? `<span class="task-status-pill calificado">${e.calificacion || 0}/100</span>`
                        : `<span class="task-status-pill entregado">Por Calificar</span>`;
                    
                    tr.innerHTML = `
                        <td>
                            <strong style="color:white;">${student.nombre || e.username}</strong><br>
                            <small class="text-muted">${tObj.titulo} (${e.fechaEntrega || 'Fecha N/A'})</small>
                        </td>
                        <td>
                            <a href="${e.videoUrl || '#'}" target="_blank" class="submission-video-link">
                                <i class="fab fa-youtube"></i> Ver Video ↗
                            </a>
                        </td>
                        <td>${statusBadge}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="abrirModalEvaluarTarea('${key}')">
                                <i class="fas fa-check-circle"></i> Evaluar
                            </button>
                        </td>
                    `;
                    hwSubTbody.appendChild(tr);
                });
            }
        }
        
        // Cargar Lista de Alumnos del Maestro
        const tbody = document.getElementById('maestro-students-tbody');
        const asistListContainer = document.getElementById('maestro-asistencia-list-container');
        
        if (tbody) tbody.innerHTML = '';
        if (asistListContainer) asistListContainer.innerHTML = '';
        
        let count = 0;
        let sumaNotas = 0;
        let alumnosConNota = 0;
        
        const todayStr = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('asistencia-fecha');
        if (dateInput && !dateInput.value) dateInput.value = todayStr;

        const usuariosObj = (db && db.usuarios) || {};
        Object.keys(usuariosObj).forEach(username => {
            const user = usuariosObj[username];
            if (normalizeRol(user.rol) === 'estudiante' && (usuarioActual.rol === 'admin' || user.area === areaMaestro)) {
                count++;
                
                const notasObj = ((db && db.calificaciones) || {})[username] || { teoria: 'Sin calificar', tecnica: 'Sin calificar', notas: '' };
                const asistenciasAlumno = ((db && db.asistencia) || {})[username] || {};
                const asistenciasTotales = Object.values(asistenciasAlumno).length;
                const presentes = Object.values(asistenciasAlumno).filter(val => val === 'presente').length;
                const asistPct = asistenciasTotales > 0 ? Math.round((presentes / asistenciasTotales) * 100) : 0;
                
                if (typeof notasObj.teoria === 'number') {
                    sumaNotas += (notasObj.teoria + (typeof notasObj.tecnica === 'number' ? notasObj.tecnica : notasObj.teoria)) / 2;
                    alumnosConNota++;
                }

                if (tbody) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>
                            <div class="user-cell">
                                <span class="user-icon-badge accent">${(user.nombre || username).charAt(0)}</span>
                                <div>
                                    <strong>${user.nombre || username}</strong><br>
                                    <small class="text-muted">Asistencia: ${asistPct}% | ${user.pagoStatus === 'pendiente' ? 'Deuda' : 'Solvente'}</small>
                                </div>
                            </div>
                        </td>
                        <td><strong class="note-pill">${notasObj.teoria}</strong></td>
                        <td><strong class="note-pill">${notasObj.tecnica}</strong></td>
                        <td style="max-width: 200px;"><span class="text-muted text-truncate-custom">${notasObj.notas || 'Sin anotaciones'}</span></td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="abrirModalCalificar('${username}')"><i class="fas fa-edit"></i> Evaluar</button>
                            <button class="btn btn-sm btn-secondary" onclick="abrirModalAsistencia('${username}')"><i class="fas fa-calendar-check"></i> Historial</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                }

                // Generar ítem de asistencia rápida
                if (asistListContainer) {
                    const isPresente = asistenciasAlumno[dateInput ? dateInput.value : todayStr] !== 'ausente';
                    const itemDiv = document.createElement('div');
                    itemDiv.style.background = 'rgba(255,255,255,0.03)';
                    itemDiv.style.border = '1px solid var(--border-color)';
                    itemDiv.style.padding = '10px 14px';
                    itemDiv.style.borderRadius = '10px';
                    itemDiv.style.display = 'flex';
                    itemDiv.style.justifyContent = 'space-between';
                    itemDiv.style.alignItems = 'center';

                    itemDiv.innerHTML = `
                        <div>
                            <strong style="color:white; font-size:0.9rem;">${user.nombre || username}</strong>
                            <small class="text-muted" style="display:block; font-size:0.75rem;">@${username}</small>
                        </div>
                        <label class="switch-container" style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" class="asistencia-student-checkbox" data-username="${username}" ${isPresente ? 'checked' : ''}>
                            <span style="font-size:0.8rem; font-weight:700; color:${isPresente ? 'var(--green-accent)' : '#ef4444'};">Presente</span>
                        </label>
                    `;
                    asistListContainer.appendChild(itemDiv);
                }
            }
        });
        
        const countEl1 = document.getElementById('maestro-students-count');
        const countEl2 = document.getElementById('maestro-students-count-page');
        if (countEl1) countEl1.innerText = count;
        if (countEl2) countEl2.innerText = count;

        const avgEl = document.getElementById('maestro-group-avg');
        if (avgEl) {
            const promGeneral = alumnosConNota > 0 ? Math.round(sumaNotas / alumnosConNota) : 0;
            avgEl.innerText = promGeneral + "/100";
        }

        // Tabla Materiales Cargados
        const materialsTbody = document.getElementById('maestro-materials-tbody');
        if (materialsTbody) {
            materialsTbody.innerHTML = '';
            const materialesFiltrados = ((db && db.materiales) || []).filter(m => usuarioActual.rol === 'admin' || !m.area || m.area === areaMaestro);
            
            if (materialesFiltrados.length === 0) {
                materialsTbody.innerHTML = `<tr><td colspan="4" style="text-align: center;" class="text-muted">No has subido ningún material didáctico todavía.</td></tr>`;
            } else {
                materialesFiltrados.forEach(m => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${m.titulo || 'Material'}</strong></td>
                        <td><small class="text-muted">${m.descripcion || ''}</small></td>
                        <td><a href="${m.enlace || '#'}" target="_blank" class="cancion-link"><i class="fas fa-external-link-alt"></i> Descargar / Ver ↗</a></td>
                        <td>
                            <button class="btn btn-sm btn-delete" onclick="eliminarMaterial('${m.id}')"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    `;
                    materialsTbody.appendChild(tr);
                });
            }
        }

        // Tabla Anuncios Publicados
        const bulletinsTbody = document.getElementById('maestro-bulletins-tbody');
        if (bulletinsTbody) {
            bulletinsTbody.innerHTML = '';
            const anunciosFiltrados = ((db && db.anuncios) || []).filter(a => usuarioActual.rol === 'admin' || !a.area || a.area === areaMaestro);
            
            if (anunciosFiltrados.length === 0) {
                bulletinsTbody.innerHTML = `<tr><td colspan="2" style="text-align: center;" class="text-muted">No has publicado avisos informativos.</td></tr>`;
            } else {
                anunciosFiltrados.forEach(a => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${a.contenido || ''}</strong><br><small class="text-muted">Subido: ${a.fecha || ''}</small></td>
                        <td>
                            <button class="btn btn-sm btn-delete" onclick="eliminarAnuncio('${a.id}')"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    `;
                    bulletinsTbody.appendChild(tr);
                });
            }
        }

        // Cargar Módulo Asignaciones de Ensamble para el Maestro
        const statusBadge = document.getElementById('maestro-ensamble-status-badge');
        if (statusBadge) {
            const isActivo = db && db.ensambleActivo;
            statusBadge.innerText = isActivo ? "🟢 ETAPA DE ENSAMBLES ACTIVA" : "🔴 ETAPA INACTIVA (MITAD DE CICLO)";
            statusBadge.style.background = isActivo ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)";
            statusBadge.style.color = isActivo ? "#10b981" : "#ef4444";
        }

        const selectSong = document.getElementById('ens-assign-song');
        const selectStudent = document.getElementById('ens-assign-student');
        
        if (selectSong && selectStudent) {
            selectSong.innerHTML = '<option value="">-- Seleccionar Canción --</option>';
            ((db && db.canciones) || []).filter(c => c.activo).forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.innerText = `${c.titulo} - ${c.autor} (${c.tono})`;
                selectSong.appendChild(opt);
            });

            selectStudent.innerHTML = '<option value="">-- Seleccionar Alumno --</option>';
            Object.keys(usuariosObj).forEach(uname => {
                const u = usuariosObj[uname];
                if (normalizeRol(u.rol) === 'estudiante' && (usuarioActual.rol === 'admin' || u.area === areaMaestro)) {
                    const opt = document.createElement('option');
                    opt.value = uname;
                    opt.innerText = `${u.nombre || uname} (${u.area || 'Estudiante'}) - @${uname}`;
                    selectStudent.appendChild(opt);
                }
            });
        }

        // Tabla Asignaciones de Ensamble
        const ensTbody = document.getElementById('maestro-ensamble-assignments-tbody');
        if (ensTbody) {
            ensTbody.innerHTML = '';
            const asignaciones = (db && db.ensambleAsignaciones) || {};
            const keys = Object.keys(asignaciones);
            
            let filteredKeys = keys;
            if (usuarioActual.rol !== 'admin') {
                filteredKeys = keys.filter(k => {
                    const u = usuariosObj[asignaciones[k].username];
                    return u && u.area === areaMaestro;
                });
            }

            if (filteredKeys.length === 0) {
                ensTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;" class="text-muted">No has asignado alumnos de tu área a canciones de ensamble todavía.</td></tr>`;
            } else {
                filteredKeys.forEach(k => {
                    const item = asignaciones[k];
                    const student = usuariosObj[item.username] || { nombre: item.username, area: areaMaestro };
                    const song = ((db && db.canciones) || []).find(c => c.id === item.songId) || { titulo: 'Canción' };
                    
                    let lvlClass = 'basico';
                    if (item.nivel === 'Avanzado') lvlClass = 'avanzado';
                    if (item.nivel === 'Intermedio') lvlClass = 'intermedio';
                    if (item.nivel === 'Junior') lvlClass = 'junior';

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${song.titulo}</strong><br><small class="text-muted">Tempo: ${item.tempo || 'N/A'} | Tono: ${item.tono || 'N/A'} | Compás: ${item.compas || '4/4'}</small></td>
                        <td><strong>${student.nombre || item.username}</strong><br><small class="text-muted">@${item.username}</small></td>
                        <td><span class="badge-level ${lvlClass}">${item.nivel || 'Intermedio'}</span></td>
                        <td>
                            ${item.playthroughUrl ? `<a href="${item.playthroughUrl}" target="_blank" class="submission-video-link"><i class="fab fa-youtube"></i> Playthrough ↗</a>` : '<span class="text-muted">Sin video</span>'}
                        </td>
                        <td>
                            <button class="btn btn-sm btn-delete" onclick="eliminarAsignacionEnsambleMaestro('${k}')"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    `;
                    ensTbody.appendChild(tr);
                });
            }
        }

        // Ponderar y Cargar Métrica de Resumen General Dashboard Maestro
        const dashTotalStudents = document.getElementById('maestro-dash-total-students');
        const dashPendingHw = document.getElementById('maestro-dash-pending-homework');
        const dashAttRate = document.getElementById('maestro-dash-attendance-rate');
        const dashEnsembles = document.getElementById('maestro-dash-ensembles-count');
        const dashStudentsTbody = document.getElementById('maestro-dash-students-tbody');
        const dashSubmissionsList = document.getElementById('maestro-dash-recent-submissions-list');

        const pendientesCount = entregasFiltradas.filter(k => entregas[k].estado !== 'calificado').length;

        if (dashTotalStudents) dashTotalStudents.innerText = count;
        if (dashPendingHw) dashPendingHw.innerText = pendientesCount;
        if (dashEnsembles) {
            const asignaciones = (db && db.ensambleAsignaciones) || {};
            const keys = Object.keys(asignaciones);
            const myEnsembles = keys.filter(k => {
                const u = usuariosObj[asignaciones[k].username];
                return usuarioActual.rol === 'admin' || (u && u.area === areaMaestro);
            });
            dashEnsembles.innerText = myEnsembles.length;
        }

        // Cargar Alumnos en la Tabla Resumen del Dashboard General
        if (dashStudentsTbody) {
            dashStudentsTbody.innerHTML = '';
            const misAlumnosKeys = Object.keys(usuariosObj).filter(uname => {
                const u = usuariosObj[uname];
                return normalizeRol(u.rol) === 'estudiante' && (usuarioActual.rol === 'admin' || u.area === areaMaestro);
            });

            if (misAlumnosKeys.length === 0) {
                dashStudentsTbody.innerHTML = `<tr><td colspan="4" style="text-align:center;" class="text-muted">Sin alumnos inscritos aún en tu área.</td></tr>`;
            } else {
                misAlumnosKeys.forEach(uname => {
                    const user = usuariosObj[uname];
                    const notasObj = ((db && db.calificaciones) || {})[uname] || { teoria: '-', tecnica: '-' };
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>
                            <strong style="color:white;">${user.nombre || uname}</strong><br>
                            <small class="text-muted">@${uname} (${user.area || 'Estudiante'})</small>
                        </td>
                        <td><strong class="note-pill">${notasObj.teoria}</strong></td>
                        <td><strong class="note-pill">${notasObj.tecnica}</strong></td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="abrirModalCalificar('${uname}')"><i class="fas fa-edit"></i> Calificar</button>
                        </td>
                    `;
                    dashStudentsTbody.appendChild(tr);
                });
            }
        }

        // Cargar Entregas Pendientes en Lista del Dashboard
        if (dashSubmissionsList) {
            dashSubmissionsList.innerHTML = '';
            const pendientesKeys = entregasFiltradas.filter(k => entregas[k].estado !== 'calificado');
            
            if (pendientesKeys.length === 0) {
                dashSubmissionsList.innerHTML = `<div style="background:rgba(255,255,255,0.02); padding:14px; border-radius:12px; text-align:center;" class="text-muted">🎉 ¡Excelente! No tienes tareas pendientes por revisar.</div>`;
            } else {
                pendientesKeys.forEach(key => {
                    const e = entregas[key];
                    const student = usuariosObj[e.username] || { nombre: e.username };
                    const tObj = ((db && db.tareas) || []).find(t => t.id === e.tareaId) || { titulo: 'Tarea' };
                    
                    const div = document.createElement('div');
                    div.style.background = 'rgba(255,255,255,0.03)';
                    div.style.border = '1px solid var(--border-color)';
                    div.style.padding = '12px 14px';
                    div.style.borderRadius = '12px';
                    div.style.display = 'flex';
                    div.style.justifyContent = 'space-between';
                    div.style.alignItems = 'center';
                    
                    div.innerHTML = `
                        <div>
                            <strong style="color:white; font-size:0.9rem;">${student.nombre || e.username}</strong>
                            <small class="text-muted" style="display:block; font-size:0.8rem;">${tObj.titulo} • ${e.fechaEntrega || 'Fecha N/A'}</small>
                        </div>
                        <div style="display:flex; gap:8px;">
                            <a href="${e.videoUrl || '#'}" target="_blank" class="btn btn-sm btn-secondary" style="padding:6px 10px;"><i class="fab fa-youtube"></i> Video</a>
                            <button class="btn btn-sm btn-primary" onclick="abrirModalEvaluarTarea('${key}')" style="padding:6px 10px;"><i class="fas fa-check-circle"></i> Nota</button>
                        </div>
                    `;
                    dashSubmissionsList.appendChild(div);
                });
            }
        }
    } catch(err) {
        console.error("Error en renderizarMaestro:", err);
    }
}

// -------------------------------------------------------------
// RENDER DE ROL: PRODUCCIÓN & STAFF
// -------------------------------------------------------------
function renderizarProduccion(db) {
    try {
        const estatus = (db && db.estatusClases) || { estado: 'normal', mensaje: 'Clases normales.' };
        const prodStatusTag = document.getElementById('prod-status-tag');
        const prodClassState = document.getElementById('prod-class-state');
        const prodClassMsg = document.getElementById('prod-class-message');
        
        if (prodStatusTag) {
            let label = "✅ Clases Normales";
            if (estatus.estado === 'suspendida') label = "🚫 Clase Suspendida";
            if (estatus.estado === 'especial') label = "⚠️ Horario Especial";
            prodStatusTag.innerText = label;
        }
        if (prodClassState) prodClassState.value = estatus.estado || 'normal';
        if (prodClassMsg) prodClassMsg.value = estatus.mensaje || '';

        // Historial de comunicados de Staff
        const anunciosStaff = (db && db.anunciosStaff) || [];
        const prodAnnCount = document.getElementById('prod-announcements-count');
        if (prodAnnCount) prodAnnCount.innerText = anunciosStaff.length;

        const tbody = document.getElementById('prod-staff-announcements-tbody');
        if (tbody) {
            tbody.innerHTML = '';
            if (anunciosStaff.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;" class="text-muted">No hay comunicados del staff emitidos aún.</td></tr>`;
            } else {
                anunciosStaff.forEach(a => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>
                            <strong style="color:white;">${a.titulo || 'Comunicado'}</strong><br>
                            <small class="text-muted">${a.contenido || ''}</small>
                        </td>
                        <td>${a.fecha || ''}</td>
                        <td><span class="badge badge-rol">${a.autor || 'Staff'}</span></td>
                        <td>
                            <button class="btn btn-sm btn-delete" onclick="eliminarAnuncioStaff('${a.id}')"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        }

        // Tabla Control de Colegiaturas de Alumnos (Módulo de Administración)
        const billingTbody = document.getElementById('prod-billing-tbody');
        if (billingTbody) {
            billingTbody.innerHTML = '';
            const usuariosObj = (db && db.usuarios) || {};
            const alumnos = Object.keys(usuariosObj)
                .map(uKey => ({ ...usuariosObj[uKey], username: uKey }))
                .filter(u => normalizeRol(u.rol) === 'estudiante');

            const solventesCount = alumnos.filter(u => obtenerEstatusColegiatura(u).status === 'solvente').length;
            
            const badgeSummary = document.getElementById('prod-billing-summary-badge');
            if (badgeSummary) badgeSummary.innerText = `${solventesCount} de ${alumnos.length} Solventes`;

            if (alumnos.length === 0) {
                billingTbody.innerHTML = `<tr><td colspan="7" style="text-align:center;" class="text-muted">No hay alumnos registrados en la academia.</td></tr>`;
            } else {
                alumnos.forEach(u => {
                    const infoCol = obtenerEstatusColegiatura(u);

                    // Asistencia %
                    const asistenciasAlumno = (db.asistencia && db.asistencia[u.username]) || {};
                    const asistenciasTotales = Object.values(asistenciasAlumno).length;
                    const presentes = Object.values(asistenciasAlumno).filter(val => val === 'presente').length;
                    const asistPct = asistenciasTotales > 0 ? Math.round((presentes / asistenciasTotales) * 100) : 100;

                    // Estado de Acceso
                    let accesoHtml = `<span style="color:#10b981; font-weight:700; font-size:0.85rem;"><i class="fas fa-check-circle"></i> ACCESO OK</span>`;
                    if (infoCol.status === 'no_pagado') {
                        if (u.desbloqueadoManual) {
                            accesoHtml = `<span style="color:#f59e0b; font-weight:700; font-size:0.85rem;"><i class="fas fa-unlock"></i> AUTORIZADO (PASTOR)</span>`;
                        } else {
                            accesoHtml = `<span style="color:#ef4444; font-weight:700; font-size:0.85rem;"><i class="fas fa-lock"></i> SUSPENDIDO</span>`;
                        }
                    } else if (infoCol.status === 'pendiente') {
                        accesoHtml = `<span style="color:#f59e0b; font-weight:700; font-size:0.85rem;"><i class="fas fa-clock"></i> EN PERIODO / TOLERANCIA</span>`;
                    }

                    // Warning Motivo No Pago
                    let warningHtml = `<small class="text-muted">Sin nota</small> <button class="btn btn-sm btn-secondary" style="padding:2px 8px; font-size:0.75rem;" onclick="abrirModalMotivoNoPago('${u.username}')"><i class="fas fa-edit"></i> Motivo</button>`;
                    if (u.motivoNoPago) {
                        warningHtml = `
                            <div style="background:rgba(245, 158, 11, 0.1); border:1px solid rgba(245, 158, 11, 0.4); padding:6px 10px; border-radius:8px; font-size:0.8rem; color:#f59e0b;">
                                <i class="fas fa-exclamation-triangle"></i> <strong>Warning:</strong> "${u.motivoNoPago}"
                            </div>
                            <button class="btn btn-sm btn-secondary" style="padding:2px 8px; font-size:0.75rem; margin-top:4px;" onclick="abrirModalMotivoNoPago('${u.username}')">
                                <i class="fas fa-edit"></i> Editar Motivo
                            </button>
                        `;
                    }

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>
                            <strong style="color:white;">${u.nombre || u.username}</strong><br>
                            <small class="text-muted">@${u.username}</small>
                        </td>
                        <td><span class="badge badge-rol">${u.area || 'Estudiante'}</span></td>
                        <td><strong style="color:${asistPct >= 80 ? '#10b981' : '#ef4444'};">${asistPct}%</strong></td>
                        <td><span class="badge badge-estado ${infoCol.badgeClass}">${infoCol.label}</span></td>
                        <td style="max-width:220px;">${warningHtml}</td>
                        <td>${accesoHtml}</td>
                        <td>
                            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                                <button class="btn btn-sm btn-primary" onclick="marcarEstadoColegiaturaAdmin('${u.username}', 'solvente')" title="Registrar pago completo al corriente">
                                    <i class="fas fa-check-circle"></i> Solvente
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="marcarEstadoColegiaturaAdmin('${u.username}', 'no_pagado')" title="Marcar como No Pagado / Suspendido">
                                    <i class="fas fa-times-circle"></i> No Pagado
                                </button>
                                ${infoCol.status === 'no_pagado' ? `
                                    <button class="btn btn-sm ${u.desbloqueadoManual ? 'btn-deactivate' : 'btn-activate'}" onclick="alternarDesbloqueoManual('${u.username}')" title="Autorización del Pastor para permitir o revocar acceso">
                                        ${u.desbloqueadoManual ? '<i class="fas fa-lock"></i> Revocar Acceso' : '<i class="fas fa-unlock"></i> Autorizar (Pastor)'}
                                    </button>
                                ` : ''}
                            </div>
                        </td>
                    `;
                    billingTbody.appendChild(tr);
                });
            }
        }
    } catch(err) {
        console.error("Error en renderizarProduccion:", err);
    }
}

// -------------------------------------------------------------
// FUNCIONES ADMINISTRATIVAS DE COLEGIATURAS Y EXPEDIENTES
// -------------------------------------------------------------
function marcarEstadoColegiaturaAdmin(username, nuevoEstado) {
    const db = getDB();
    if (db.usuarios && db.usuarios[username]) {
        db.usuarios[username].pagoStatus = nuevoEstado;
        if (nuevoEstado === 'solvente') {
            db.usuarios[username].mesesAdeudo = 0;
            db.usuarios[username].motivoNoPago = '';
            db.usuarios[username].desbloqueadoManual = false;
        }
        saveDB(db);
        showToast(`Estado de @${username} actualizado a ${nuevoEstado.toUpperCase()}`, "success");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
    }
}

function registrarPagoColegiatura(username) {
    marcarEstadoColegiaturaAdmin(username, 'solvente');
}

function agregarAdeudoColegiatura(username) {
    const db = getDB();
    if (db.usuarios && db.usuarios[username]) {
        const actual = typeof db.usuarios[username].mesesAdeudo === 'number' ? db.usuarios[username].mesesAdeudo : 0;
        const nuevo = actual + 1;
        db.usuarios[username].mesesAdeudo = nuevo;
        if (nuevo === 1) db.usuarios[username].pagoStatus = '1_pendiente';
        if (nuevo >= 2) db.usuarios[username].pagoStatus = '2_pendientes';
        saveDB(db);
        showToast(`Se registró 1 mes adicional de adeudo a @${username} (Total: ${nuevo} meses).`, "info");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
    }
}

function alternarDesbloqueoManual(username) {
    const db = getDB();
    if (db.usuarios && db.usuarios[username]) {
        const actual = db.usuarios[username].desbloqueadoManual || false;
        db.usuarios[username].desbloqueadoManual = !actual;
        saveDB(db);
        showToast(db.usuarios[username].desbloqueadoManual ? `Autorización Pastoral concedida: @${username} ha sido DESBLOQUEADO.` : `Acceso de @${username} SUSPENDIDO nuevamente por adeudo.`, "success");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
    }
}

let usuarioMotivoSeleccionado = null;
function abrirModalMotivoNoPago(username) {
    usuarioMotivoSeleccionado = username;
    const db = getDB();
    const u = db.usuarios[username];
    if (!u) return;

    const tag = document.getElementById('motivo-student-tag');
    if (tag) tag.innerText = `Alumno: ${u.nombre} (@${username})`;

    const selectMeses = document.getElementById('motivo-meses-adeudo');
    if (selectMeses) selectMeses.value = typeof u.mesesAdeudo === 'number' ? u.mesesAdeudo : (u.pagoStatus === 'pendiente' ? 1 : 0);

    const txtMotivo = document.getElementById('motivo-texto');
    if (txtMotivo) txtMotivo.value = u.motivoNoPago || '';

    const modal = document.getElementById('modal-motivo-nopago');
    if (modal) modal.classList.add('active');
}

function cerrarModalMotivoNoPago() {
    const modal = document.getElementById('modal-motivo-nopago');
    if (modal) modal.classList.remove('active');
}

function guardarMotivoNoPago(event) {
    event.preventDefault();
    if (!usuarioMotivoSeleccionado) return;

    const meses = parseInt(document.getElementById('motivo-meses-adeudo').value) || 0;
    const motivo = document.getElementById('motivo-texto').value.trim();

    const db = getDB();
    if (db.usuarios && db.usuarios[usuarioMotivoSeleccionado]) {
        db.usuarios[usuarioMotivoSeleccionado].mesesAdeudo = meses;
        db.usuarios[usuarioMotivoSeleccionado].motivoNoPago = motivo;
        if (meses === 0) db.usuarios[usuarioMotivoSeleccionado].pagoStatus = 'solvente';
        if (meses === 1) db.usuarios[usuarioMotivoSeleccionado].pagoStatus = '1_pendiente';
        if (meses >= 2) db.usuarios[usuarioMotivoSeleccionado].pagoStatus = '2_pendientes';
        saveDB(db);
        cerrarModalMotivoNoPago();
        showToast("Alerta y motivo de no pago guardados con éxito", "success");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
    }
}

// -------------------------------------------------------------
// EXPEDIENTES INTEGRALES DE ALUMNOS (MODAL CON FOTO Y NOTAS DOCENTES)
// -------------------------------------------------------------
function abrirModalExpediente(username) {
    const db = getDB();
    const user = db.usuarios[username];
    if (!user) return;

    const nombre = user.nombre || username;
    const area = user.area || 'Teclado';
    const avatarImg = document.getElementById('exp-student-avatar');
    const nameEl = document.getElementById('exp-student-name');
    const instEl = document.getElementById('exp-student-instrument');
    
    const metaNombre = document.getElementById('exp-meta-nombre');
    const metaEdad = document.getElementById('exp-meta-edad');
    const metaAnosIglesia = document.getElementById('exp-meta-anos-iglesia');
    const metaCiclosWS = document.getElementById('exp-meta-ciclos-ws');
    const studentBio = document.getElementById('exp-student-bio');

    const noteTeoria = document.getElementById('exp-note-teoria');
    const noteTecnica = document.getElementById('exp-note-tecnica');
    const asistPct = document.getElementById('exp-asistencia-pct');
    const colBadge = document.getElementById('exp-colegiatura-badge');
    const obsMaestro = document.getElementById('exp-observaciones-maestro');
    const warnBox = document.getElementById('exp-warning-container');
    const warnTxt = document.getElementById('exp-warning-text');

    // Foto grande del alumno (fotoUrl personalizada o retrato HD como fallback)
    let photoSrc = user.fotoUrl;
    if (!photoSrc) {
        if (username === 'alumno1') photoSrc = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80';
        else if (username === 'alumno2') photoSrc = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
        else if (username === 'alumno3') photoSrc = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80';
        else photoSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=d90429&color=fff&bold=true`;
    }

    if (avatarImg) avatarImg.src = photoSrc;
    if (nameEl) nameEl.innerText = nombre;
    if (instEl) instEl.innerText = area;

    if (metaNombre) metaNombre.innerText = `@${username}`;
    if (metaEdad) metaEdad.innerText = user.edad || "22 Años";
    if (metaAnosIglesia) metaAnosIglesia.innerText = user.anosIglesia || "3 Años";
    if (metaCiclosWS) metaCiclosWS.innerText = user.ciclosWS || "2° Ciclo Escolar";

    if (studentBio) {
        studentBio.innerText = user.bio || `"${nombre} es un integrante activo de la iglesia C.A.N., comprometido con su llamado musical y espiritual en el área de ${area}."`;
    }

    const cal = (db.calificaciones && db.calificaciones[username]) || {};
    if (noteTeoria) noteTeoria.innerText = cal.teoria !== undefined ? cal.teoria : '-';
    if (noteTecnica) noteTecnica.innerText = cal.tecnica !== undefined ? cal.tecnica : '-';

    // Asistencia Global
    const asistencias = (db.asistencia && db.asistencia[username]) || {};
    const tot = Object.values(asistencias).length;
    const pres = Object.values(asistencias).filter(v => v === 'presente').length;
    const pctVal = tot > 0 ? Math.round((pres / tot) * 100) : 100;
    if (asistPct) {
        asistPct.innerText = pctVal + "%";
        asistPct.style.color = pctVal >= 80 ? '#10b981' : '#ef4444';
    }

    const meses = typeof user.mesesAdeudo === 'number' ? user.mesesAdeudo : (user.pagoStatus === 'pendiente' ? 1 : 0);
    if (colBadge) {
        colBadge.innerText = meses === 0 ? 'Solvente' : `${meses} Mes${meses > 1 ? 'es' : ''} Pendiente${meses > 1 ? 's' : ''}`;
        colBadge.style.color = meses === 0 ? '#10b981' : '#ef4444';
    }

    // Observaciones redactadas por el maestro
    if (obsMaestro) {
        const textoObs = user.observacionesMaestro || cal.notas || "Sin anotaciones del profesor registradas aún.";
        obsMaestro.innerText = `"${textoObs}"`;
    }

    // Warning por no pago
    if (warnBox && warnTxt) {
        if (meses > 0 && user.motivoNoPago) {
            warnBox.style.display = 'block';
            warnTxt.innerText = `Motivo registrado por Administración: "${user.motivoNoPago}"`;
        } else {
            warnBox.style.display = 'none';
        }
    }

    const modal = document.getElementById('modal-expediente-alumno');
    if (modal) modal.classList.add('active');
}

function cerrarModalExpediente() {
    const modal = document.getElementById('modal-expediente-alumno');
    if (modal) modal.classList.remove('active');
}

function alternarPagoAlumnoProduccion(username) {
    const db = getDB();
    if (db.usuarios && db.usuarios[username]) {
        const actual = db.usuarios[username].pagoStatus;
        db.usuarios[username].pagoStatus = actual === 'pendiente' ? 'solvente' : 'pendiente';
        saveDB(db);
        showToast(`Estado de colegiatura de @${username} actualizado`, "success");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
    }
}

function actualizarEstatusClases(event) {
    event.preventDefault();
    const estado = document.getElementById('prod-class-state').value;
    const mensaje = document.getElementById('prod-class-message').value.trim();
    
    if (!mensaje) {
        showToast("Escribe un mensaje de estatus de clase.", "error");
        return;
    }
    
    const db = getDB();
    db.estatusClases = {
        estado,
        mensaje,
        fechaActualizacion: new Date().toISOString().split('T')[0],
        publicadoPor: usuarioActual ? usuarioActual.nombre : "Equipo Producción & Staff"
    };
    saveDB(db);
    showToast("Estatus de clases actualizado para la comunidad", "success");
    renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
}

function publicarAnuncioStaff(event) {
    event.preventDefault();
    const titulo = document.getElementById('staff-announcement-title').value.trim();
    const contenido = document.getElementById('staff-announcement-content').value.trim();
    
    if (!titulo || !contenido) {
        showToast("Completa título y contenido del aviso.", "error");
        return;
    }
    
    const db = getDB();
    if (!db.anunciosStaff) db.anunciosStaff = [];
    const nuevoId = (db.anunciosStaff.length > 0 ? Math.max(...db.anunciosStaff.map(s => parseInt(s.id.replace('s','')) || 0)) + 1 : 1).toString();
    
    db.anunciosStaff.push({
        id: 's' + nuevoId,
        titulo,
        contenido,
        fecha: new Date().toISOString().split('T')[0],
        autor: usuarioActual ? usuarioActual.nombre : "Equipo Producción & Staff"
    });
    
    saveDB(db);
    document.getElementById('staff-announcement-title').value = '';
    document.getElementById('staff-announcement-content').value = '';
    showToast("Comunicado para maestros enviado con éxito");
    renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
}

function eliminarAnuncioStaff(id) {
    if (confirm("¿Deseas eliminar este comunicado del staff?")) {
        const db = getDB();
        db.anunciosStaff = (db.anunciosStaff || []).filter(a => a.id !== id);
        saveDB(db);
        showToast("Comunicado eliminado");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'produccion');
    }
}

// GUARDAR NUEVO ANUNCIO
function publicarAnuncio(event) {
    event.preventDefault();
    const contenido = document.getElementById('bulletin-content').value.trim();
    if (!contenido) return;
    
    const db = getDB();
    const nuevoId = (db.anuncios.length > 0 ? Math.max(...db.anuncios.map(a => parseInt(a.id))) + 1 : 1).toString();
    
    db.anuncios.push({
        id: nuevoId,
        area: usuarioActual.area,
        contenido: contenido,
        autor: usuarioActual.nombre,
        fecha: new Date().toISOString().split('T')[0]
    });
    
    saveDB(db);
    document.getElementById('bulletin-content').value = '';
    showToast("Aviso general publicado con éxito");
    renderizarDatosVista('maestro');
}

function eliminarAnuncio(id) {
    if (confirm("¿Deseas retirar este anuncio del panel de tus estudiantes?")) {
        const db = getDB();
        db.anuncios = db.anuncios.filter(a => a.id !== id);
        saveDB(db);
        showToast("Aviso eliminado");
        renderizarDatosVista('maestro');
    }
}

// METODOS DEL MAESTRO PARA CALIFICAR Y ASISTENCIA (SIN ALERTS)
function abrirModalCalificar(username) {
    maestroAlumnoSeleccionado = username;
    const db = getDB();
    const user = db.usuarios[username];
    const notasObj = db.calificaciones[username] || { teoria: 0, tecnica: 0, notas: '' };
    
    document.getElementById('modal-calificar-title').innerText = `Evaluar a ${user.nombre}`;
    document.getElementById('cal-teoria').value = notasObj.teoria;
    document.getElementById('cal-tecnica').value = notasObj.tecnica;
    document.getElementById('cal-observaciones').value = notasObj.notas || '';
    
    document.getElementById('modal-calificar').classList.add('active');
}

function cerrarModalCalificar() {
    document.getElementById('modal-calificar').classList.remove('active');
}

function guardarCalificacion(event) {
    event.preventDefault();
    const teoria = parseInt(document.getElementById('cal-teoria').value) || 0;
    const tecnica = parseInt(document.getElementById('cal-tecnica').value) || 0;
    const notas = document.getElementById('cal-observaciones').value.trim();
    
    const db = getDB();
    db.calificaciones[maestroAlumnoSeleccionado] = { teoria, tecnica, notas };
    if (db.usuarios && db.usuarios[maestroAlumnoSeleccionado]) {
        db.usuarios[maestroAlumnoSeleccionado].observacionesMaestro = notas;
    }
    
    saveDB(db);
    cerrarModalCalificar();
    showToast(`Evaluación de @${maestroAlumnoSeleccionado} guardada`, 'success');
    renderizarDatosVista('maestro');
}

function abrirModalAsistencia(username) {
    maestroAlumnoSeleccionado = username;
    const db = getDB();
    const user = db.usuarios[username];
    
    document.getElementById('modal-asistencia-title').innerText = `Asistencia de ${user.nombre}`;
    document.getElementById('asist-fecha').value = new Date().toISOString().split('T')[0];
    
    const histDiv = document.getElementById('asist-historial');
    histDiv.innerHTML = '';
    
    const asistencias = db.asistencia[username] || {};
    const fechas = Object.keys(asistencias).sort((a,b) => new Date(b) - new Date(a));
    
    if (fechas.length === 0) {
        histDiv.innerHTML = `<p class="text-muted" style="text-align:center; padding: 10px 0;">No hay registro de asistencia previo.</p>`;
    } else {
        fechas.forEach(f => {
            const estado = asistencias[f];
            const div = document.createElement('div');
            div.className = 'asist-hist-item';
            div.innerHTML = `
                <span><i class="far fa-calendar-alt"></i> ${f}</span>
                <span class="badge badge-estado ${estado}">${estado.toUpperCase()}</span>
            `;
            histDiv.appendChild(div);
        });
    }
    
    document.getElementById('modal-asistencia').classList.add('active');
}

function cerrarModalAsistencia() {
    document.getElementById('modal-asistencia').classList.remove('active');
}

function registrarAsistencia(estado) {
    const fecha = document.getElementById('asist-fecha').value;
    if (!fecha) {
        showToast("Por favor selecciona una fecha.", "error");
        return;
    }
    
    const db = getDB();
    if (!db.asistencia[maestroAlumnoSeleccionado]) {
        db.asistencia[maestroAlumnoSeleccionado] = {};
    }
    
    db.asistencia[maestroAlumnoSeleccionado][fecha] = estado;
    saveDB(db);
    
    showToast(`Asistencia de ${fecha} registrada como ${estado.toUpperCase()}`);
    abrirModalAsistencia(maestroAlumnoSeleccionado);
    renderizarDatosVista('maestro');
}

function guardarMaterial(event) {
    event.preventDefault();
    const titulo = document.getElementById('mat-titulo').value.trim();
    const desc = document.getElementById('mat-desc').value.trim();
    const url = document.getElementById('mat-url').value.trim();
    
    if (!titulo || !url) {
        showToast("Completa los campos obligatorios.", "error");
        return;
    }
    
    const db = getDB();
    const nuevoId = (db.materiales.length > 0 ? Math.max(...db.materiales.map(m => parseInt(m.id))) + 1 : 1).toString();
    
    db.materiales.push({
        id: nuevoId,
        area: usuarioActual.area,
        titulo: titulo,
        descripcion: desc,
        enlace: url,
        fecha: new Date().toISOString().split('T')[0]
    });
    
    saveDB(db);
    
    document.getElementById('mat-titulo').value = '';
    document.getElementById('mat-desc').value = '';
    document.getElementById('mat-url').value = '';
    
    showToast("Material didáctico publicado");
    renderizarDatosVista('maestro');
}

function eliminarMaterial(id) {
    if (confirm("¿Deseas retirar este material didáctico del sistema?")) {
        const db = getDB();
        db.materiales = db.materiales.filter(m => m.id !== id);
        saveDB(db);
        showToast("Material eliminado");
        renderizarDatosVista('maestro');
    }
}

// -------------------------------------------------------------
// RENDER DE ROL: ADORACION (PLANIFICADOR DE ENSAMBLE DOMINICAL)
// -------------------------------------------------------------
let cancionIdSeleccionada = null;

function alternarEtapaEnsamble() {
    const db = getDB();
    db.ensambleActivo = !db.ensambleActivo;
    saveDB(db);
    showToast(db.ensambleActivo ? "⚡ Etapa de Ensambles HABILITADA en la plataforma" : "🚫 Etapa de Ensambles DESHABILITADA", "success");
    renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'admin');
}

function eliminarCancion(id) {
    if (confirm("¿Estás seguro de eliminar permanentemente esta canción del repertorio?")) {
        const db = getDB();
        db.canciones = db.canciones.filter(c => c.id !== id);
        saveDB(db);
        showToast("Canción eliminada del repertorio", "success");
        renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'adoracion');
    }
}

function guardarAsignacionEnsambleMaestro(event) {
    event.preventDefault();
    const songId = document.getElementById('ens-assign-song').value;
    const studentUsername = document.getElementById('ens-assign-student').value;
    const level = document.getElementById('ens-assign-level').value;
    const tempo = document.getElementById('ens-assign-tempo').value.trim() || '120 BPM';
    const tono = document.getElementById('ens-assign-tono').value.trim() || 'C';
    const compas = document.getElementById('ens-assign-compas').value;
    const playthroughUrl = document.getElementById('ens-assign-playthrough').value.trim();
    const notes = document.getElementById('ens-assign-notes').value.trim();

    if (!songId || !studentUsername) {
        showToast("Selecciona canción y alumno.", "error");
        return;
    }

    const db = getDB();
    if (!db.ensambleAsignaciones) db.ensambleAsignaciones = {};
    
    const key = `${songId}_${studentUsername}`;
    db.ensambleAsignaciones[key] = {
        id: 'ens_' + key,
        songId,
        username: studentUsername,
        nivel: level,
        tempo,
        tono,
        compas,
        playthroughUrl,
        notes,
        maestro: usuarioActual ? usuarioActual.nombre : "Maestro"
    };

    saveDB(db);
    showToast("Asignación de ensamble guardada para el alumno", "success");
    renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'maestro');
}

function eliminarAsignacionEnsamble(key) {
    if (confirm("¿Deseas retirar esta asignación de ensamble al alumno?")) {
        const db = getDB();
        if (db.ensambleAsignaciones && db.ensambleAsignaciones[key]) {
            delete db.ensambleAsignaciones[key];
            saveDB(db);
            showToast("Asignación retirada");
            renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'maestro');
        }
    }
}

// -------------------------------------------------------------
// EVALUACIÓN DE EXÁMENES EN PAPEL (OPCIÓN FOTO / OPCIÓN NOTA DIRECTA)
// -------------------------------------------------------------
function abrirModalExamen(usernameSeleccionado = null) {
    const modal = document.getElementById('modal-examen');
    const selectStudent = document.getElementById('exam-student');
    const db = getDB();
    
    if (selectStudent) {
        selectStudent.innerHTML = '<option value="">-- Seleccionar Estudiante --</option>';
        const usuariosObj = (db && db.usuarios) || {};
        Object.keys(usuariosObj).forEach(uname => {
            const u = usuariosObj[uname];
            if (normalizeRol(u.rol) === 'estudiante') {
                const opt = document.createElement('option');
                opt.value = uname;
                opt.innerText = `${u.nombre || uname} (${u.area || 'Estudiante'}) - @${uname}`;
                selectStudent.appendChild(opt);
            }
        });
        if (usernameSeleccionado) selectStudent.value = usernameSeleccionado;
    }

    document.getElementById('exam-titulo').value = '';
    document.getElementById('exam-calificacion').value = '';
    document.getElementById('exam-scan-url').value = '';
    document.getElementById('exam-feedback').value = '';
    modal.classList.add('active');
}

function cerrarModalExamen() {
    document.getElementById('modal-examen').classList.remove('active');
}

function guardarExamenPapel(event) {
    event.preventDefault();
    const uname = document.getElementById('exam-student').value;
    const titulo = document.getElementById('exam-titulo').value.trim();
    const calificacion = parseInt(document.getElementById('exam-calificacion').value) || 0;
    const scanUrl = document.getElementById('exam-scan-url').value.trim();
    const feedback = document.getElementById('exam-feedback').value.trim();

    if (!uname || !titulo) {
        showToast("Selecciona un estudiante e ingresa el título del examen.", "error");
        return;
    }

    const db = getDB();
    if (!db.examenes) db.examenes = {};
    if (!db.examenes[uname]) db.examenes[uname] = [];

    db.examenes[uname].push({
        id: 'ex_' + Date.now(),
        titulo,
        calificacion,
        scanUrl,
        feedback,
        fecha: new Date().toISOString().split('T')[0],
        evaluadoPor: usuarioActual ? usuarioActual.nombre : "Profesor"
    });

    saveDB(db);
    cerrarModalExamen();
    showToast(`Examen "${titulo}" registrado para @${uname} con nota ${calificacion}/100`, "success");
    renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'maestro');
}

function renderizarAdoracion(db) {
    // 0. Estado del Toggle Admin
    const toggleBtn = document.getElementById('admin-toggle-ensamble-btn');
    const toggleDesc = document.getElementById('admin-ensamble-status-desc');
    
    if (toggleBtn) {
        toggleBtn.innerHTML = db.ensambleActivo 
            ? `<i class="fas fa-power-off"></i> Deshabilitar Ensambles` 
            : `<i class="fas fa-play-circle"></i> Habilitar Etapa de Ensambles`;
        toggleBtn.className = db.ensambleActivo ? `btn btn-secondary` : `btn btn-primary`;
    }
    if (toggleDesc) {
        toggleDesc.innerHTML = db.ensambleActivo
            ? `<strong style="color:var(--green-accent);">✅ ETAPA HABILITADA:</strong> Los maestros ya pueden asignar alumnos y repertorio de ensamble.`
            : `<strong style="color:var(--primary-red);">🚫 ETAPA EN ESPERA:</strong> Los ensambles se activarán a mitad del ciclo escolar por el Administrador.`;
    }

    // 1. Tabla de Setlist
    const tbody = document.getElementById('adoracion-setlist-tbody');
    tbody.innerHTML = '';
    
    db.canciones.forEach(c => {
        const tr = document.createElement('tr');
        tr.className = c.activo ? '' : 'cancion-inactiva';
        tr.innerHTML = `
            <td>
                <div style="font-weight: 600;">${c.titulo}</div>
                <small class="text-muted">${c.autor}</small>
            </td>
            <td><span class="tone-badge">${c.tono}</span></td>
            <td>
                ${c.linkAcordes ? `<a href="${c.linkAcordes}" target="_blank" class="cancion-link"><i class="fas fa-file-pdf"></i> Acordes</a>` : ''}
                ${c.linkVideo ? `<a href="${c.linkVideo}" target="_blank" class="cancion-link" style="color: #ff333f;"><i class="fab fa-youtube"></i> Video</a>` : ''}
            </td>
            <td>
                <span class="badge-status-cancion ${c.activo ? 'activo' : 'inactivo'}">
                    ${c.activo ? 'En Repertorio' : 'Inactiva'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="abrirModalCancion('${c.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm ${c.activo ? 'btn-deactivate' : 'btn-activate'}" onclick="alternarEstadoCancion('${c.id}')">
                    ${c.activo ? '<i class="fas fa-eye-slash"></i> Ocultar' : '<i class="fas fa-eye"></i> Activar'}
                </button>
                <button class="btn btn-sm btn-delete" onclick="eliminarCancion('${c.id}')" title="Eliminar canción"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // 2. Módulo Planificador de Músicos
    configurarPlanificadorEnsamble(db);
}

function configurarPlanificadorEnsamble(db) {
    const rolesPlanificados = ['teclado', 'bateria', 'guitarra', 'bajo', 'canto'];
    
    // Llenar los SELECTS dinámicamente con usuarios que pertenezcan a esa área (maestros y alumnos)
    rolesPlanificados.forEach(puesto => {
        const selectEl = document.getElementById(`ens-${puesto}`);
        if (!selectEl) return;
        
        // Guardar selección actual antes de borrar opciones
        const seleccionPrevia = db.ensambleRoles[puesto] || '';
        
        selectEl.innerHTML = `<option value="">-- Sin asignar --</option>`;
        
        // Mapear instrumento técnico del sistema
        let instrumentoMapeado = '';
        if (puesto === 'teclado') instrumentoMapeado = 'Teclado';
        if (puesto === 'bateria') instrumentoMapeado = 'Batería';
        if (puesto === 'guitarra') instrumentoMapeado = 'Guitarra Eléctrica';
        if (puesto === 'bajo') instrumentoMapeado = 'Bajo Eléctrico';
        if (puesto === 'canto') instrumentoMapeado = 'Canto / Voces';
        
        Object.keys(db.usuarios).forEach(uname => {
            const user = db.usuarios[uname];
            // Maestros o Alumnos de esa especialidad
            if ((user.rol === 'maestro' || user.rol === 'estudiante') && user.area === instrumentoMapeado) {
                const opt = document.createElement('option');
                opt.value = uname;
                opt.innerText = `${user.nombre} (${user.rol.toUpperCase()})`;
                selectEl.appendChild(opt);
            }
        });
        
        // Restaurar selección previa
        selectEl.value = seleccionPrevia;
    });
}

function guardarPlanEnsamble(event) {
    event.preventDefault();
    const db = getDB();
    
    db.ensambleRoles.teclado = document.getElementById('ens-teclado').value;
    db.ensambleRoles.bateria = document.getElementById('ens-bateria').value;
    db.ensambleRoles.guitarra = document.getElementById('ens-guitarra').value;
    db.ensambleRoles.bajo = document.getElementById('ens-bajo').value;
    db.ensambleRoles.canto = document.getElementById('ens-canto').value;
    
    saveDB(db);
    showToast("Planificación dominical guardada", "success");
}

function abrirModalCancion(cancionId = null) {
    const modal = document.getElementById('modal-cancion');
    const db = getDB();
    
    if (cancionId) {
        cancionIdSeleccionada = cancionId;
        const c = db.canciones.find(item => item.id === cancionId);
        document.getElementById('modal-cancion-title').innerText = "Editar Canción";
        document.getElementById('canc-titulo').value = c.titulo;
        document.getElementById('canc-autor').value = c.autor;
        document.getElementById('canc-tono').value = c.tono;
        document.getElementById('canc-acordes').value = c.linkAcordes || '';
        document.getElementById('canc-video').value = c.linkVideo || '';
        document.getElementById('canc-activo').value = c.activo.toString();

        if (document.getElementById('canc-stem-click')) document.getElementById('canc-stem-click').value = c.stemClick || '';
        if (document.getElementById('canc-stem-bateria')) document.getElementById('canc-stem-bateria').value = c.stemBateria || '';
        if (document.getElementById('canc-stem-bajo')) document.getElementById('canc-stem-bajo').value = c.stemBajo || '';
        if (document.getElementById('canc-stem-teclado')) document.getElementById('canc-stem-teclado').value = c.stemTeclado || '';
        if (document.getElementById('canc-stem-guitarras')) document.getElementById('canc-stem-guitarras').value = c.stemGuitarras || '';
        if (document.getElementById('canc-stem-voces')) document.getElementById('canc-stem-voces').value = c.stemVoces || '';
    } else {
        cancionIdSeleccionada = null;
        document.getElementById('modal-cancion-title').innerText = "Nueva Canción";
        document.getElementById('canc-titulo').value = '';
        document.getElementById('canc-autor').value = '';
        document.getElementById('canc-tono').value = 'C';
        document.getElementById('canc-acordes').value = '';
        document.getElementById('canc-video').value = '';
        document.getElementById('canc-activo').value = "true";

        if (document.getElementById('canc-stem-click')) document.getElementById('canc-stem-click').value = '';
        if (document.getElementById('canc-stem-bateria')) document.getElementById('canc-stem-bateria').value = '';
        if (document.getElementById('canc-stem-bajo')) document.getElementById('canc-stem-bajo').value = '';
        if (document.getElementById('canc-stem-teclado')) document.getElementById('canc-stem-teclado').value = '';
        if (document.getElementById('canc-stem-guitarras')) document.getElementById('canc-stem-guitarras').value = '';
        if (document.getElementById('canc-stem-voces')) document.getElementById('canc-stem-voces').value = '';
    }
    
    modal.classList.add('active');
}

function cerrarModalCancion() {
    document.getElementById('modal-cancion').classList.remove('active');
}

function guardarCancion(event) {
    event.preventDefault();
    const titulo = document.getElementById('canc-titulo').value.trim();
    const autor = document.getElementById('canc-autor').value.trim();
    const tono = document.getElementById('canc-tono').value;
    const acordes = document.getElementById('canc-acordes').value.trim();
    const video = document.getElementById('canc-video').value.trim();
    const activo = document.getElementById('canc-activo').value === "true";
    
    const stemClick = document.getElementById('canc-stem-click') ? document.getElementById('canc-stem-click').value.trim() : '';
    const stemBateria = document.getElementById('canc-stem-bateria') ? document.getElementById('canc-stem-bateria').value.trim() : '';
    const stemBajo = document.getElementById('canc-stem-bajo') ? document.getElementById('canc-stem-bajo').value.trim() : '';
    const stemTeclado = document.getElementById('canc-stem-teclado') ? document.getElementById('canc-stem-teclado').value.trim() : '';
    const stemGuitarras = document.getElementById('canc-stem-guitarras') ? document.getElementById('canc-stem-guitarras').value.trim() : '';
    const stemVoces = document.getElementById('canc-stem-voces') ? document.getElementById('canc-stem-voces').value.trim() : '';

    if (!titulo || !autor) {
        showToast("Introduce título y autor.", "error");
        return;
    }
    
    const db = getDB();
    
    if (cancionIdSeleccionada) {
        const index = db.canciones.findIndex(item => item.id === cancionIdSeleccionada);
        if (index !== -1) {
            db.canciones[index] = {
                ...db.canciones[index],
                titulo, autor, tono, linkAcordes: acordes, linkVideo: video, activo,
                stemClick, stemBateria, stemBajo, stemTeclado, stemGuitarras, stemVoces
            };
        }
        db.canciones.push({
            id: nuevaId,
            titulo, autor, tono, linkAcordes: acordes, linkVideo: video, activo,
            stemClick, stemBateria, stemBajo, stemTeclado, stemGuitarras, stemVoces
        });
        showToast("Nueva canción guardada con Stems Multitrack", "success");
    }
    
    saveDB(db);
    cerrarModalCancion();
    renderizarDatosVista(usuarioActual ? usuarioActual.rol : 'adoracion');
}

function alternarEstadoCancion(cancionId) {
    const db = getDB();
    const index = db.canciones.findIndex(item => item.id === cancionId);
    if (index !== -1) {
        db.canciones[index].activo = !db.canciones[index].activo;
        saveDB(db);
        showToast(db.canciones[index].activo ? "Canción activada" : "Canción ocultada");
        renderizarDatosVista('adoracion');
    }
}

// -------------------------------------------------------------
// LÓGICA DE GOOGLE CLASSROOM (CREACIÓN, ENTREGA Y EVALUACIÓN DE TAREAS EN VIDEO)
// -------------------------------------------------------------
let tareaIdEntregarSeleccionada = null;
let entregaKeyEvaluarSeleccionada = null;

function guardarTareaMaestro(event) {
    event.preventDefault();
    const titulo = document.getElementById('tarea-titulo').value.trim();
    const desc = document.getElementById('tarea-desc').value.trim();
    const fecha = document.getElementById('tarea-fecha-limite').value;
    
    if (!titulo || !desc || !fecha) {
        showToast("Completa los datos de la tarea.", "error");
        return;
    }
    
    const db = getDB();
    if (!db.tareas) db.tareas = [];
    const nuevoId = 't' + (db.tareas.length + 1);
    
    db.tareas.push({
        id: nuevoId,
        area: usuarioActual.area,
        titulo,
        descripcion: desc,
        fechaLimite: fecha,
        maestro: usuarioActual.nombre
    });
    
    saveDB(db);
    document.getElementById('tarea-titulo').value = '';
    document.getElementById('tarea-desc').value = '';
    document.getElementById('tarea-fecha-limite').value = '';
    showToast("Tarea de Classroom asignada a los alumnos", "success");
    renderizarDatosVista(usuarioActual.rol);
}

function eliminarTarea(id) {
    if (confirm("¿Deseas eliminar esta tarea asignada?")) {
        const db = getDB();
        db.tareas = (db.tareas || []).filter(t => t.id !== id);
        saveDB(db);
        showToast("Tarea eliminada");
        renderizarDatosVista(usuarioActual.rol);
    }
}

function abrirModalEntregarTarea(tareaId) {
    tareaIdEntregarSeleccionada = tareaId;
    const db = getDB();
    const tarea = (db.tareas || []).find(t => t.id === tareaId);
    
    if (tarea) {
        document.getElementById('modal-entregar-tarea-title').innerText = `Entregar Tarea: ${tarea.titulo}`;
        document.getElementById('modal-entregar-tarea-desc').innerText = `Instrucciones: ${tarea.descripcion} (Fecha Límite: ${tarea.fechaLimite})`;
    }
    
    const existingKey = `${tareaId}_${usuarioActual.username}`;
    const entregaExistente = (db.entregasTareas || {})[existingKey];
    document.getElementById('tarea-video-url').value = entregaExistente ? entregaExistente.videoUrl : '';
    
    document.getElementById('modal-entregar-tarea').classList.add('active');
}

function cerrarModalEntregarTarea() {
    document.getElementById('modal-entregar-tarea').classList.remove('active');
}

function guardarEntregaTarea(event) {
    event.preventDefault();
    const videoUrl = document.getElementById('tarea-video-url').value.trim();
    if (!videoUrl) {
        showToast("Pega un enlace de video válido.", "error");
        return;
    }
    
    const db = getDB();
    if (!db.entregasTareas) db.entregasTareas = {};
    const key = `${tareaIdEntregarSeleccionada}_${usuarioActual.username}`;
    
    db.entregasTareas[key] = {
        id: 'e_' + Date.now(),
        tareaId: tareaIdEntregarSeleccionada,
        username: usuarioActual.username,
        videoUrl: videoUrl,
        fechaEntrega: new Date().toISOString().split('T')[0],
        estado: 'entregado',
        calificacion: null,
        feedback: ''
    };
    
    saveDB(db);
    cerrarModalEntregarTarea();
    showToast("¡Tarea entregada en video con éxito!", "success");
    renderizarDatosVista(usuarioActual.rol);
}

function abrirModalEvaluarTarea(entregaKey) {
    entregaKeyEvaluarSeleccionada = entregaKey;
    const db = getDB();
    const entrega = (db.entregasTareas || {})[entregaKey];
    
    if (entrega) {
        const user = db.usuarios[entrega.username] || { nombre: entrega.username };
        const tarea = (db.tareas || []).find(t => t.id === entrega.tareaId) || { titulo: 'Tarea' };
        
        document.getElementById('eval-tarea-student-tag').innerText = `Alumno: ${user.nombre} • Tarea: ${tarea.titulo}`;
        document.getElementById('eval-tarea-calificacion').value = entrega.calificacion || 90;
        document.getElementById('eval-tarea-feedback').value = entrega.feedback || '';
        
        document.getElementById('modal-evaluar-tarea').classList.add('active');
    }
}

function cerrarModalEvaluarTarea() {
    document.getElementById('modal-evaluar-tarea').classList.remove('active');
}

function guardarEvaluacionTarea(event) {
    event.preventDefault();
    const cal = parseInt(document.getElementById('eval-tarea-calificacion').value) || 0;
    const feedback = document.getElementById('eval-tarea-feedback').value.trim();
    
    const db = getDB();
    if (db.entregasTareas && db.entregasTareas[entregaKeyEvaluarSeleccionada]) {
        db.entregasTareas[entregaKeyEvaluarSeleccionada].calificacion = cal;
        db.entregasTareas[entregaKeyEvaluarSeleccionada].feedback = feedback;
        db.entregasTareas[entregaKeyEvaluarSeleccionada].estado = 'calificado';
        saveDB(db);
        showToast("Calificación de tarea guardada con éxito", "success");
        cerrarModalEvaluarTarea();
        renderizarDatosVista(usuarioActual.rol);
    }
}

// -------------------------------------------------------------
// RENDER DE ROL: ESTUDIANTE / ALUMNO, METRÓNOMO Y PLANIFICADOR
// -------------------------------------------------------------
function renderizarEstudiante(db) {
    try {
        const user = usuarioActual;
        if (!user) return;
        const username = user.username || '';
        
        const titleEl = document.getElementById('student-instrument-title');
        if (titleEl) titleEl.innerText = `Instrumento: ${user.area || 'Estudiante'}`;

        // 1. Cargar Banner de Estatus de Clase (Publicado por Producción)
        const estatusBanner = document.getElementById('student-class-status-banner');
        const estatusTitle = document.getElementById('stud-class-status-title');
        const estatusDesc = document.getElementById('stud-class-status-desc');
        const estatusIcon = document.getElementById('stud-class-status-icon');
        
        const currentClassState = (db && db.estatusClases) || { estado: 'normal', mensaje: 'Clases presenciales este Sábado.' };
        if (estatusBanner && estatusTitle && estatusDesc) {
            estatusBanner.className = `class-status-banner ${currentClassState.estado}`;
            if (currentClassState.estado === 'normal') {
                if (estatusIcon) estatusIcon.innerHTML = `<i class="fas fa-calendar-check"></i>`;
                estatusTitle.innerText = "Estatus de Clases: ✅ NORMAL";
            } else if (currentClassState.estado === 'suspendida') {
                if (estatusIcon) estatusIcon.innerHTML = `<i class="fas fa-ban"></i>`;
                estatusTitle.innerText = "Estatus de Clases: 🚫 SUSPENDIDA";
            } else {
                if (estatusIcon) estatusIcon.innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
                estatusTitle.innerText = "Estatus de Clases: ⚠️ HORARIO ESPECIAL";
            }
            estatusDesc.innerText = currentClassState.mensaje || '';
        }

        // 2. Cargar Mis Tareas de Google Classroom (Video Submissions)
        const classroomContainer = document.getElementById('student-classroom-tasks-container');
        if (classroomContainer) {
            classroomContainer.innerHTML = '';
            const misTareas = ((db && db.tareas) || []).filter(t => user.rol === 'admin' || t.area === user.area);
            const misEntregas = (db && db.entregasTareas) || {};
            
            let entregadasCount = 0;
            
            if (misTareas.length === 0) {
                classroomContainer.innerHTML = `<p class="text-muted" style="text-align:center; padding:15px 0;">No tienes tareas asignadas actualmente para ${user.area || 'tu área'}.</p>`;
            } else {
                misTareas.forEach(t => {
                    const key = `${t.id}_${username}`;
                    const entrega = misEntregas[key];
                    
                    const card = document.createElement('div');
                    card.className = 'classroom-task-card';
                    
                    let badgeHtml = `<span class="task-status-pill pendiente">🔴 Pendiente</span>`;
                    let actionBtnHtml = `<button class="btn btn-sm btn-primary" onclick="abrirModalEntregarTarea('${t.id}')"><i class="fas fa-upload"></i> Subir Video de Tarea</button>`;
                    let feedbackHtml = '';
                    
                    if (entrega) {
                        entregadasCount++;
                        if (entrega.estado === 'calificado') {
                            badgeHtml = `<span class="task-status-pill calificado">🟢 Calificada: ${entrega.calificacion}/100</span>`;
                            actionBtnHtml = `<a href="${entrega.videoUrl}" target="_blank" class="submission-video-link"><i class="fab fa-youtube"></i> Mi Video ↗</a>`;
                            if (entrega.feedback) {
                                feedbackHtml = `<div style="background:rgba(255,255,255,0.03); border-left:3px solid var(--green-accent); padding:8px 12px; margin-top:10px; border-radius:6px;">
                                    <strong style="font-size:0.8rem; color:var(--green-accent);">Retroalimentación del Profesor:</strong>
                                    <p style="font-size:0.85rem; margin:3px 0 0; color:white;">${entrega.feedback}</p>
                                </div>`;
                            }
                        } else {
                            badgeHtml = `<span class="task-status-pill entregado">🟡 Entregada (En revisión)</span>`;
                            actionBtnHtml = `<button class="btn btn-sm btn-secondary" onclick="abrirModalEntregarTarea('${t.id}')"><i class="fas fa-edit"></i> Cambiar Video</button>`;
                        }
                    } else {
                        const todayStr = new Date().toISOString().split('T')[0];
                        if (t.fechaLimite < todayStr) {
                            badgeHtml = `<span class="task-status-pill vencido">⚠️ Vencida / En Mora</span>`;
                        }
                    }

                    card.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:15px; flex-wrap:wrap;">
                            <div style="flex:1;">
                                <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                                    <h4 style="color:white; font-size:1rem; margin:0;">${t.titulo}</h4>
                                    ${badgeHtml}
                                </div>
                                <p style="font-size:0.88rem; color:var(--text-light); margin:0 0 8px;">${t.descripcion}</p>
                                <small class="text-muted"><i class="far fa-calendar-alt"></i> Fecha Límite: ${t.fechaLimite} &nbsp;&bull;&nbsp; Profesor: ${t.maestro}</small>
                                ${feedbackHtml}
                            </div>
                            <div>
                                ${actionBtnHtml}
                            </div>
                        </div>
                    `;
                    classroomContainer.appendChild(card);
                });
            }

            const progressBadge = document.getElementById('stud-homework-progress-badge');
            if (progressBadge) {
                progressBadge.innerText = `${entregadasCount} / ${misTareas.length} Completadas`;
            }
        }
        
        // Cargar Alerta Dominical si fue asignado a tocar
        const avisoServicio = document.getElementById('student-worship-alert');
        if (avisoServicio) {
            let rolAsignado = null;
            if (db && db.ensambleRoles) {
                Object.keys(db.ensambleRoles).forEach(puesto => {
                    if (db.ensambleRoles[puesto] === username) {
                        rolAsignado = puesto;
                    }
                });
            }
            
            if (rolAsignado) {
                avisoServicio.style.display = 'block';
                const roleTag = document.getElementById('stud-worship-role-tag');
                if (roleTag) roleTag.innerText = rolAsignado.toUpperCase();
            } else {
                avisoServicio.style.display = 'none';
            }
        }

        // Cargar Muro de Anuncios del Maestro de su área
        const announcementsContainer = document.getElementById('student-announcements-wall');
        if (announcementsContainer) {
            announcementsContainer.innerHTML = '';
            const anunciosArea = ((db && db.anuncios) || []).filter(a => a.area === user.area);
            
            if (anunciosArea.length > 0) {
                anunciosArea.forEach(a => {
                    const div = document.createElement('div');
                    div.className = 'announcement-banner';
                    div.innerHTML = `
                        <div class="announcement-banner-header">
                            <strong><i class="fas fa-bullhorn"></i> AVISO DE CLASE (${a.area})</strong>
                            <small>${a.fecha}</small>
                        </div>
                        <p>${a.contenido}</p>
                        <span class="announcement-author">Publicado por: ${a.autor}</span>
                    `;
                    announcementsContainer.appendChild(div);
                });
            }
        }

        // Calificaciones
        const notas = ((db && db.calificaciones) || {})[username] || { teoria: 0, tecnica: 0, notas: "Aún no se han registrado evaluaciones en el sistema para ti." };
        const teoriaVal = typeof notas.teoria === 'number' ? notas.teoria : 0;
        const tecnicaVal = typeof notas.tecnica === 'number' ? notas.tecnica : 0;
        
        const progTeoria = document.getElementById('stud-progress-teoria');
        const valTeoria = document.getElementById('stud-val-teoria');
        const progTecnica = document.getElementById('stud-progress-tecnica');
        const valTecnica = document.getElementById('stud-val-tecnica');
        const obsEl = document.getElementById('stud-observaciones');

        if (progTeoria) progTeoria.style.width = teoriaVal + "%";
        if (valTeoria) valTeoria.innerText = teoriaVal + "/100";
        if (progTecnica) progTecnica.style.width = tecnicaVal + "%";
        if (valTecnica) valTecnica.innerText = tecnicaVal + "/100";
        if (obsEl) obsEl.innerText = notas.notas || "Sin anotaciones del profesor.";
        
        // Alerta de Adeudo de colegiatura
        const billingAlert = document.getElementById('student-billing-alert');
        if (billingAlert) {
            if (user.pagoStatus === 'pendiente') {
                billingAlert.style.display = 'block';
            } else {
                billingAlert.style.display = 'none';
            }
        }

        // Asistencias
        const asistenciaObj = ((db && db.asistencia) || {})[username] || {};
        const totalFechas = Object.keys(asistenciaObj).length;
        const presentes = Object.values(asistenciaObj).filter(v => v === 'presente').length;
        const promAsistencia = totalFechas > 0 ? Math.round((presentes / totalFechas) * 100) : 0;
        
        const attPct = document.getElementById('stud-attendance-pct');
        const attDesc = document.getElementById('stud-attendance-desc');
        if (attPct) attPct.innerText = promAsistencia + "%";
        if (attDesc) attDesc.innerText = `Clases asistidas: ${presentes} de ${totalFechas}`;
        
        // Setlist activo con reproductor multimedia
        const listSetlist = document.getElementById('stud-setlist-ul');
        if (listSetlist) {
            listSetlist.innerHTML = '';
            const cancionesActivas = ((db && db.canciones) || []).filter(c => c.activo);
            
            if (cancionesActivas.length === 0) {
                listSetlist.innerHTML = `<li class="text-muted" style="padding:10px 0;">No hay canciones asignadas al ensamble actual.</li>`;
            } else {
                cancionesActivas.forEach(c => {
                    const li = document.createElement('li');
                    li.className = 'stud-song-item';
                    const safeTitulo = c.titulo.replace(/['"]/g, '');
                    const safeAutor = c.autor.replace(/['"]/g, '');
                    
                    li.innerHTML = `
                        <div>
                            <strong>${c.titulo}</strong><br>
                            <small>${c.autor}</small>
                        </div>
                        <div class="song-actions-flex">
                            <span class="tone-badge mini">${c.tono}</span>
                            <button class="btn btn-sm btn-primary" onclick="reproducirPista('${safeTitulo}', '${safeAutor}', '${c.tono}')">
                                <i class="fas fa-play"></i> Ensayar
                            </button>
                            ${c.linkAcordes ? `<a href="${c.linkAcordes}" target="_blank" class="btn btn-sm btn-secondary"><i class="fas fa-file-invoice"></i></a>` : ''}
                            ${c.linkVideo ? `<a href="${c.linkVideo}" target="_blank" class="btn btn-sm btn-video"><i class="fab fa-youtube"></i></a>` : ''}
                        </div>
                    `;
                    listSetlist.appendChild(li);
                });
            }
        }
        
        // Materiales
        const listMateriales = document.getElementById('stud-materials-ul');
        if (listMateriales) {
            listMateriales.innerHTML = '';
            const materialesFiltrados = ((db && db.materiales) || []).filter(m => m.area === user.area);
            
            if (materialesFiltrados.length === 0) {
                listMateriales.innerHTML = `<li class="text-muted" style="padding:10px 0; grid-column: 1/-1; text-align: center;">No hay guías ni materiales cargados para la especialidad de ${user.area} actualmente.</li>`;
            } else {
                materialesFiltrados.forEach(m => {
                    const li = document.createElement('li');
                    li.className = 'material-card-item';
                    li.innerHTML = `
                        <div style="flex: 1;">
                            <h4 style="color: var(--primary-red); font-size: 0.95rem; font-weight: 600;"><i class="fas fa-book-open"></i> ${m.titulo}</h4>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">${m.descripcion}</p>
                            <small class="text-muted" style="display:block; margin-top:5px; font-size:0.75rem;">Subido el: ${m.fecha}</small>
                        </div>
                        ${m.enlace ? `<a href="${m.enlace}" target="_blank" class="btn btn-sm btn-primary" style="align-self: center;"><i class="fas fa-external-link-alt"></i> Descargar</a>` : ''}
                    `;
                    listMateriales.appendChild(li);
                });
            }
        }

        // 3. Cargar Módulo de Ensamble Asignado para Estudiantes
        const ensamblePanel = document.getElementById('student-ensamble-container');
        const ensambleWall = document.getElementById('student-ensamble-cards-wall');
        const ensambleTag = document.getElementById('stud-ensamble-status-tag');
        
        const isEnsambleActivo = (db && db.ensambleActivo) || false;
        
        if (ensamblePanel && ensambleWall) {
            if (ensambleTag) {
                ensambleTag.innerText = isEnsambleActivo ? "ETAPA ACTIVA DE ENSAMBLES" : "ETAPA EN ESPERA (MITAD DE CICLO)";
                ensambleTag.style.background = isEnsambleActivo ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)";
                ensambleTag.style.color = isEnsambleActivo ? "#10b981" : "#ef4444";
            }

            ensambleWall.innerHTML = '';
            
            if (!isEnsambleActivo) {
                ensambleWall.innerHTML = `
                    <div style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; text-align: center;">
                        <i class="fas fa-hourglass-half" style="font-size: 2rem; color: var(--text-muted); margin-bottom: 10px;"></i>
                        <h4 style="color: white; margin: 0 0 6px;">Etapa de Ensambles en Espera</h4>
                        <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">La asignación de repertorio y ensambles se habilitará a mitad del ciclo escolar por la dirección académica.</p>
                    </div>
                `;
            } else {
                const asignaciones = (db && db.ensambleAsignaciones) || {};
                const misAsignaciones = Object.keys(asignaciones).filter(k => asignaciones[k].username === username);
                
                if (misAsignaciones.length === 0) {
                    ensambleWall.innerHTML = `<p class="text-muted" style="text-align: center; padding: 15px 0;">Aún no has sido asignado a canciones de ensamble para este ciclo. Revisa con tu maestro de ${user.area}.</p>`;
                } else {
                    misAsignaciones.forEach(key => {
                        const asig = asignaciones[key];
                        const song = ((db && db.canciones) || []).find(c => c.id === asig.songId) || { titulo: "Canción de Ensamble", autor: "Academia", tono: asig.tono, linkAcordes: "", linkVideo: "" };
                        
                        let lvlClass = 'basico';
                        if (asig.nivel === 'Avanzado') lvlClass = 'avanzado';
                        if (asig.nivel === 'Intermedio') lvlClass = 'intermedio';
                        if (asig.nivel === 'Junior') lvlClass = 'junior';

                        const card = document.createElement('div');
                        card.className = 'classroom-task-card';
                        card.style.borderColor = 'rgba(230,0,0,0.3)';
                        card.innerHTML = `
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:15px; flex-wrap:wrap;">
                                <div style="flex:1;">
                                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                                        <h4 style="color:white; font-size:1.1rem; margin:0;"><i class="fas fa-music" style="color:var(--primary-red);"></i> ${song.titulo}</h4>
                                        <span class="badge-level ${lvlClass}">${asig.nivel}</span>
                                    </div>
                                    <p style="font-size:0.88rem; color:var(--text-light); margin:0 0 10px;">${song.autor}</p>
                                    
                                    <div style="display:flex; gap:15px; flex-wrap:wrap; font-size:0.85rem; background:rgba(255,255,255,0.03); padding:8px 12px; border-radius:8px; margin-bottom:10px;">
                                        <span>⏱️ <strong>Tempo:</strong> ${asig.tempo}</span>
                                        <span>🎵 <strong>Tono:</strong> ${asig.tono}</span>
                                        <span>🎼 <strong>Compás:</strong> ${asig.compas}</span>
                                    </div>
                                    
                                    ${asig.notes ? `<p style="font-size:0.85rem; color:#fca5a5; font-style:italic; margin:0 0 10px;"><i class="fas fa-comment-dots"></i> <strong>Indicaciones del Maestro (${asig.maestro}):</strong> "${asig.notes}"</p>` : ''}
                                </div>
                                <div style="display:flex; flex-direction:column; gap:8px;">
                                    ${asig.playthroughUrl ? `<a href="${asig.playthroughUrl}" target="_blank" class="submission-video-link"><i class="fab fa-youtube"></i> Video Playthrough ↗</a>` : ''}
                                    ${song.linkAcordes ? `<a href="${song.linkAcordes}" target="_blank" class="cancion-link"><i class="fas fa-file-pdf"></i> Acordes Cifrados</a>` : ''}
                                    ${song.linkVideo ? `<a href="${song.linkVideo}" target="_blank" class="cancion-link" style="color:#ff333f;"><i class="fab fa-youtube"></i> Video Referencia</a>` : ''}
                                </div>
                            </div>
                        `;
                        ensambleWall.appendChild(card);
                    });
                }
            }
        }

        // Inicializar Metrónomo visual UI
        actualizarMetronomeUI();
        
        // Inicializar Estudio Playback Multitrack
        inicializarPlaybackStudio(db);
    } catch(err) {
        console.error("Error en renderizarEstudiante:", err);
    }
}

function actualizarMetronomeUI() {
    const elBpm = document.getElementById('metro-bpm-val');
    const elSlider = document.getElementById('metro-slider');
    if (elBpm) elBpm.innerText = metronomeBpm;
    if (elSlider) elSlider.value = metronomeBpm;
    actualizarBeatLedsUI();
}

// -------------------------------------------------------------
// LÓGICA DE ESTUDIO PLAYBACK MULTITRACK & SECUENCIAS (ESTILO PLAYBACK APP / PRIME)
// -------------------------------------------------------------
let playbackIsPlaying = false;
let playbackMasterVol = 80;
let playbackCurrentSongId = "1";
let playbackAudioCtx = null;
let multitrackAudioLoop = null;

const multitrackStemsDef = [
    { id: "click", nombre: "Click & Guía Vocal", icon: "fa-drum", stemTag: "Stem ST-01 (Master Click)", areaAsociada: "" },
    { id: "bateria", nombre: "Batería & Percusiones", icon: "fa-drum-steelpan", stemTag: "Stem ST-02 (Rhythm Track)", areaAsociada: "Batería" },
    { id: "bajo", nombre: "Bajo Eléctrico", icon: "fa-guitar", stemTag: "Stem ST-03 (Bass Line)", areaAsociada: "Bajo Eléctrico" },
    { id: "guitarras", nombre: "Guitarras (Elec & Acú)", icon: "fa-guitar", stemTag: "Stem ST-04 (Guitar Riffs)", areaAsociada: "Guitarra Eléctrica" },
    { id: "teclado", nombre: "Teclados & Synthesizers", icon: "fa-piano-keyboard", stemTag: "Stem ST-05 (Keys & Pads)", areaAsociada: "Teclado" },
    { id: "voces", nombre: "Voces & Coros Lead", icon: "fa-microphone-alt", stemTag: "Stem ST-06 (Backing Vocals)", areaAsociada: "Canto / Voces" }
];

let playbackTracksState = {
    click: { vol: 80, muted: false, solo: false },
    bateria: { vol: 80, muted: false, solo: false },
    bajo: { vol: 80, muted: false, solo: false },
    guitarras: { vol: 80, muted: false, solo: false },
    teclado: { vol: 80, muted: false, solo: false },
    voces: { vol: 80, muted: false, solo: false }
};

function inicializarPlaybackStudio(db) {
    const selectSong = document.getElementById('playback-song-select');
    if (!selectSong) return;
    
    selectSong.innerHTML = '';
    const canciones = (db.canciones || []).filter(c => c.activo);
    if (canciones.length === 0) {
        selectSong.innerHTML = '<option value="">No hay canciones activas</option>';
        return;
    }

    canciones.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.innerText = `${c.titulo} (${c.tono})`;
        selectSong.appendChild(opt);
    });

    playbackCurrentSongId = canciones[0].id;
    cargarCancionPlaybackStudio(playbackCurrentSongId);
}

function cargarCancionPlaybackStudio(songId) {
    const db = getDB();
    const song = (db.canciones || []).find(c => c.id === songId);
    if (!song) return;
    
    playbackCurrentSongId = songId;
    
    const titleDisp = document.getElementById('pb-song-title-display');
    const metaDisp = document.getElementById('pb-song-meta-display');
    if (titleDisp) titleDisp.innerText = song.titulo;
    if (metaDisp) metaDisp.innerText = `${song.autor} • Tono: ${song.tono} • Playback Live Multitrack Stems`;

    renderizarCanalesMultitrack();
}

function renderizarCanalesMultitrack() {
    const container = document.getElementById('playback-tracks-container');
    if (!container) return;
    container.innerHTML = '';

    multitrackStemsDef.forEach(stem => {
        const stState = playbackTracksState[stem.id] || { vol: 80, muted: false, solo: false };
        
        const card = document.createElement('div');
        card.className = `track-channel-card ${stState.muted ? 'is-muted' : ''} ${stState.solo ? 'is-solo' : ''}`;
        card.id = `track-card-${stem.id}`;

        card.innerHTML = `
            <div class="track-channel-header">
                <div class="track-title-box">
                    <i class="fas ${stem.icon} track-icon"></i>
                    <div>
                        <strong style="color:white; font-size:0.92rem; display:block;">${stem.nombre}</strong>
                        <small class="track-stem-tag" style="color:var(--text-muted); font-size:0.75rem;">${stem.stemTag}</small>
                    </div>
                </div>
                <div class="track-buttons">
                    <button class="track-btn track-mute-btn ${stState.muted ? 'active-mute' : ''}" onclick="toggleMuteTrack('${stem.id}')" title="Silenciar canal">M</button>
                    <button class="track-btn track-solo-btn ${stState.solo ? 'active-solo' : ''}" onclick="toggleSoloTrack('${stem.id}')" title="Escuchar solo este canal">S</button>
                </div>
            </div>
            
            <div class="track-waveform-box" id="waveform-${stem.id}">
                ${Array.from({length: 12}).map((_, i) => `<div class="wave-bar" style="animation-delay: ${(i * 0.07).toFixed(2)}s"></div>`).join('')}
            </div>

            <div class="track-fader-control">
                <i class="fas fa-volume-down" style="font-size:0.75rem; color:var(--text-muted);"></i>
                <input type="range" min="0" max="100" value="${stState.vol}" class="track-fader-slider" oninput="cambiarVolumenTrack('${stem.id}', this.value)">
                <span class="track-vol-readout" id="vol-val-${stem.id}">${stState.vol}%</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleMuteTrack(stemId) {
    if (!playbackTracksState[stemId]) return;
    playbackTracksState[stemId].muted = !playbackTracksState[stemId].muted;
    actualizarAudioYUIStudio();
}

function toggleSoloTrack(stemId) {
    if (!playbackTracksState[stemId]) return;
    const actual = playbackTracksState[stemId].solo;
    
    Object.keys(playbackTracksState).forEach(k => {
        playbackTracksState[k].solo = false;
    });
    playbackTracksState[stemId].solo = !actual;
    actualizarAudioYUIStudio();
}

function cambiarVolumenTrack(stemId, val) {
    if (!playbackTracksState[stemId]) return;
    playbackTracksState[stemId].vol = parseInt(val);
    const readout = document.getElementById(`vol-val-${stemId}`);
    if (readout) readout.innerText = `${val}%`;
    actualizarAudioYUIStudio();
}

function cambiarVolumenMasterPlayback(val) {
    playbackMasterVol = parseInt(val);
    const readout = document.getElementById('pb-master-vol-val');
    if (readout) readout.innerText = `${val}%`;
    actualizarAudioYUIStudio();
}

function aplicarPresetMezcla(preset) {
    if (preset === 'mi-instrumento') {
        const miArea = usuarioActual ? usuarioActual.area : '';
        let mutesCount = 0;
        
        multitrackStemsDef.forEach(stem => {
            if (stem.areaAsociada && (miArea.includes(stem.areaAsociada) || stem.areaAsociada.includes(miArea))) {
                playbackTracksState[stem.id].muted = true;
                mutesCount++;
            } else {
                playbackTracksState[stem.id].muted = false;
            }
            playbackTracksState[stem.id].solo = false;
        });

        if (mutesCount === 0) {
            if (miArea.includes('Guitarra')) playbackTracksState['guitarras'].muted = true;
            if (miArea.includes('Batería')) playbackTracksState['bateria'].muted = true;
            if (miArea.includes('Teclado') || miArea.includes('Piano')) playbackTracksState['teclado'].muted = true;
            if (miArea.includes('Canto') || miArea.includes('Voces')) playbackTracksState['voces'].muted = true;
            if (miArea.includes('Bajo')) playbackTracksState['bajo'].muted = true;
        }
        showToast("Tu instrumento (" + miArea + ") ha sido silenciado para ensayar", "success");
    } else if (preset === 'click-only') {
        Object.keys(playbackTracksState).forEach(k => {
            playbackTracksState[k].muted = (k !== 'click');
            playbackTracksState[k].solo = false;
        });
        showToast("Mezcla ajustada: Solo Click + Guía vocal", "info");
    } else if (preset === 'reset') {
        Object.keys(playbackTracksState).forEach(k => {
            playbackTracksState[k].vol = 80;
            playbackTracksState[k].muted = false;
            playbackTracksState[k].solo = false;
        });
        showToast("Mezcla restablecida al 100%", "info");
    }
    actualizarAudioYUIStudio();
}

function togglePlaybackStudio() {
    if (playbackIsPlaying) {
        detenerPlaybackStudio();
        showToast("Playback Studio pausado", "info");
    } else {
        iniciarPlaybackStudio();
        showToast("⚡ Playback Studio en Vivo Reproduciendo Stems", "success");
    }
}

function iniciarPlaybackStudio() {
    playbackIsPlaying = true;
    const playBtn = document.getElementById('pb-master-play-btn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i> PAUSAR';
        playBtn.style.background = 'var(--primary-red)';
    }

    const container = document.getElementById('playback-tracks-container');
    if (container) container.classList.add('playing-studio');

    iniciarAudioMultitrackSintetizado();
}

function detenerPlaybackStudio() {
    playbackIsPlaying = false;
    const playBtn = document.getElementById('pb-master-play-btn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i> REPRODUCIR';
        playBtn.style.background = '';
    }

    const container = document.getElementById('playback-tracks-container');
    if (container) container.classList.remove('playing-studio');

    detenerAudioMultitrackSintetizado();
}

function actualizarAudioYUIStudio() {
    renderizarCanalesMultitrack();
    if (playbackIsPlaying) {
        const container = document.getElementById('playback-tracks-container');
        if (container) container.classList.add('playing-studio');
    }
}

function iniciarAudioMultitrackSintetizado() {
    if (!playbackAudioCtx) {
        playbackAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (playbackAudioCtx.state === 'suspended') {
        playbackAudioCtx.resume();
    }

    if (multitrackAudioLoop) clearInterval(multitrackAudioLoop);
    
    multitrackAudioLoop = setInterval(() => {
        if (!playbackIsPlaying) return;
        tocarBeatMultitrackAudio();
    }, 500);
}

function detenerAudioMultitrackSintetizado() {
    if (multitrackAudioLoop) {
        clearInterval(multitrackAudioLoop);
        multitrackAudioLoop = null;
    }
}

function tocarBeatMultitrackAudio() {
    if (!playbackAudioCtx) return;

    const hasSolo = Object.values(playbackTracksState).some(s => s.solo);

    // 1. Click
    const clickSt = playbackTracksState.click;
    if (clickSt && !clickSt.muted && (!hasSolo || clickSt.solo)) {
        playSynthNote(1200, 0.03, (clickSt.vol / 100) * (playbackMasterVol / 100) * 0.4, 'triangle');
    }

    // 2. Batería
    const batSt = playbackTracksState.bateria;
    if (batSt && !batSt.muted && (!hasSolo || batSt.solo)) {
        playSynthNote(80, 0.1, (batSt.vol / 100) * (playbackMasterVol / 100) * 0.5, 'sine');
    }

    // 3. Bajo
    const bajoSt = playbackTracksState.bajo;
    if (bajoSt && !bajoSt.muted && (!hasSolo || bajoSt.solo)) {
        playSynthNote(110, 0.25, (bajoSt.vol / 100) * (playbackMasterVol / 100) * 0.4, 'sawtooth');
    }

    // 4. Guitarras
    const guitSt = playbackTracksState.guitarras;
    if (guitSt && !guitSt.muted && (!hasSolo || guitSt.solo)) {
        playSynthNote(330, 0.2, (guitSt.vol / 100) * (playbackMasterVol / 100) * 0.3, 'square');
    }

    // 5. Teclado
    const tecSt = playbackTracksState.teclado;
    if (tecSt && !tecSt.muted && (!hasSolo || tecSt.solo)) {
        playSynthNote(440, 0.3, (tecSt.vol / 100) * (playbackMasterVol / 100) * 0.35, 'sine');
    }

    // 6. Voces
    const vocSt = playbackTracksState.voces;
    if (vocSt && !vocSt.muted && (!hasSolo || vocSt.solo)) {
        playSynthNote(523.25, 0.2, (vocSt.vol / 100) * (playbackMasterVol / 100) * 0.25, 'triangle');
    }
}

function playSynthNote(freq, duration, volume, waveType) {
    if (volume <= 0) return;
    try {
        const osc = playbackAudioCtx.createOscillator();
        const gain = playbackAudioCtx.createGain();
        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, playbackAudioCtx.currentTime);
        
        gain.gain.setValueAtTime(volume, playbackAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, playbackAudioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(playbackAudioCtx.destination);
        
        osc.start();
        osc.stop(playbackAudioCtx.currentTime + duration);
    } catch(e) {}
}

// LÓGICA DE REPRODUCTOR MULTIMEDIA SIMULADO
function reproducirPista(titulo, autor, tono) {
    const player = document.getElementById('rehearsal-player');
    document.getElementById('player-song-title').innerText = titulo;
    document.getElementById('player-song-artist').innerText = autor + ` (Tono: ${tono})`;
    
    player.classList.add('active');
    progresoActual = 0;
    reproductorCorriendo = true;
    document.getElementById('player-play-btn').innerHTML = '<i class="fas fa-pause"></i>';
    
    actualizarBarraReproductor();
    
    if (audioIntervalo) clearInterval(audioIntervalo);
    audioIntervalo = setInterval(() => {
        if (reproductorCorriendo) {
            progresoActual += 1;
            if (progresoActual > 100) {
                progresoActual = 0; 
            }
            actualizarBarraReproductor();
        }
    }, 500);
}

function actualizarBarraReproductor() {
    document.getElementById('player-progress').style.width = progresoActual + "%";
    const totalSegs = Math.round((progresoActual / 100) * 210);
    const mins = Math.floor(totalSegs / 60);
    const secs = totalSegs % 60;
    document.getElementById('player-time').innerText = `${mins}:${secs.toString().padStart(2, '0')} / 3:30`;
}

function toggleReproductor() {
    reproductorCorriendo = !reproductorCorriendo;
    const playBtn = document.getElementById('player-play-btn');
    if (reproductorCorriendo) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function cerrarReproductor() {
    if (audioIntervalo) clearInterval(audioIntervalo);
    reproductorCorriendo = false;
    document.getElementById('rehearsal-player').classList.remove('active');
}

// -------------------------------------------------------------
// LÓGICA DE METRÓNOMO SINTETIZADO INTERACTIVO (WEB AUDIO API)
// -------------------------------------------------------------
let metroCompas = "4/4";
let metroSubdivision = "negras";
let metroCurrentBeat = 0;
let metroTiemposPorCompas = 4;

function cambiarCompasMetronomo(compasVal) {
    metroCompas = compasVal;
    if (compasVal === '4/4') metroTiemposPorCompas = 4;
    if (compasVal === '3/4') metroTiemposPorCompas = 3;
    if (compasVal === '6/8') metroTiemposPorCompas = 6;
    if (compasVal === '2/4') metroTiemposPorCompas = 2;
    
    metroCurrentBeat = 0;
    actualizarBeatLedsUI();
}

function actualizarBeatLedsUI() {
    const container = document.getElementById('metro-beat-indicators');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 1; i <= metroTiemposPorCompas; i++) {
        const dot = document.createElement('div');
        dot.className = `metro-led-dot ${i === 1 ? 'accent-beat' : ''}`;
        dot.innerText = i;
        dot.id = `metro-dot-${i}`;
        container.appendChild(dot);
    }
}

function cambiarBpm(valor) {
    metronomeBpm = parseInt(valor);
    document.getElementById('metro-bpm-val').innerText = metronomeBpm;
    
    if (metronomeIsPlaying) {
        detenerMetronomo();
        iniciarMetronomo();
    }
}

function playMetronomeClick() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    const isAccentBeat = (metroCurrentBeat === 0);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(isAccentBeat ? 1500 : 900, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(isAccentBeat ? 0.6 : 0.35, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
    
    const container = document.getElementById('metro-beat-indicators');
    if (container) {
        const dots = container.querySelectorAll('.metro-led-dot');
        dots.forEach((dot, index) => {
            if (index === metroCurrentBeat) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    metroCurrentBeat = (metroCurrentBeat + 1) % metroTiemposPorCompas;
}

function toggleMetronomo() {
    if (metronomeIsPlaying) {
        detenerMetronomo();
        showToast("Metrónomo detenido", "info");
    } else {
        iniciarMetronomo();
        showToast("Metrónomo activo (" + metronomeBpm + " BPM - Compás " + metroCompas + ")");
    }
}

function iniciarMetronomo() {
    metronomeIsPlaying = true;
    document.getElementById('metro-play-btn').innerHTML = '<i class="fas fa-stop"></i>';
    document.getElementById('metro-play-btn').style.backgroundColor = 'var(--primary-red)';
    
    const intervalMs = (60000 / metronomeBpm);
    
    playMetronomeClick();
    
    metronomeInterval = setInterval(() => {
        playMetronomeClick();
    }, intervalMs);
}

function detenerMetronomo() {
    metronomeIsPlaying = false;
    metroCurrentBeat = 0;
    const playBtn = document.getElementById('metro-play-btn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.backgroundColor = '';
    }
    
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
    }
    actualizarBeatLedsUI();
}

function actualizarMetronomeUI() {
    document.getElementById('metro-bpm-val').innerText = metronomeBpm;
    document.getElementById('metro-slider').value = metronomeBpm;
    actualizarBeatLedsUI();
}

// INICIALIZACIÓN
function iniciarEleccionApp() {
    const btnAlabanza = document.getElementById('btn-alabanza');
    const btnWorship  = document.getElementById('btn-worship');

    if (btnAlabanza) {
        btnAlabanza.addEventListener('click', () => {
            // Redirige a la aplicación Alabanza (estática)
            window.location.href = './alabanza/index.html';
        });
    }
    if (btnWorship) {
        btnWorship.addEventListener('click', () => {
            mostrarPantalla('login-screen');
        });
    }
};

// CONTROL DE CAPA DE GRADIENTE INTERACTIVO CON INERCIA / DELAY AL MOVER EL MOUSE (SELECCIÓN DE APP)
let mouseTargetX = window.innerWidth / 2;
let mouseTargetY = window.innerHeight / 2;
let mouseCurrentX = window.innerWidth / 2;
let mouseCurrentY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    const choiceScreen = document.getElementById('app-choice-screen');
    if (choiceScreen && choiceScreen.classList.contains('active')) {
        const rect = choiceScreen.getBoundingClientRect();
        mouseTargetX = e.clientX - rect.left;
        mouseTargetY = e.clientY - rect.top;
    }
});

document.addEventListener('touchmove', (e) => {
    const choiceScreen = document.getElementById('app-choice-screen');
    if (choiceScreen && choiceScreen.classList.contains('active') && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = choiceScreen.getBoundingClientRect();
        mouseTargetX = touch.clientX - rect.left;
        mouseTargetY = touch.clientY - rect.top;
    }
});

function animateCursorSpotlight() {
    const choiceScreen = document.getElementById('app-choice-screen');
    if (choiceScreen && choiceScreen.classList.contains('active')) {
        // Factor de inercia/delay 0.05 para un deslizamiento fluido y elegante
        mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.05;
        mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.05;
        choiceScreen.style.setProperty('--mouse-x', `${mouseCurrentX.toFixed(1)}px`);
        choiceScreen.style.setProperty('--mouse-y', `${mouseCurrentY.toFixed(1)}px`);
    }
    requestAnimationFrame(animateCursorSpotlight);
}
requestAnimationFrame(animateCursorSpotlight);

// GESTOR Y ENRUTADOR NATIVO DEL HISTORIAL Y BOTÓN DE REGRESAR EN NAVEGADOR Y GESTOS DACTILARES
function procesarRutaHash(hash, pushHistory = false) {
    const rawHash = (hash || window.location.hash || '').replace('#', '').trim().toLowerCase();
    
    if (!rawHash || rawHash === 'eleccion' || rawHash === 'inicio') {
        mostrarPantalla('app-choice-screen', pushHistory);
        return;
    }
    
    if (rawHash === 'login') {
        mostrarPantalla('login-screen', pushHistory);
        return;
    }
    
    if (rawHash === 'bienvenida') {
        if (usuarioActual) {
            mostrarPantalla('worship-intro-screen', pushHistory);
        } else {
            mostrarPantalla('login-screen', pushHistory);
        }
        return;
    }
    
    // Hash pertenece a secciones/módulos dentro del sistema activado
    if (usuarioActual) {
        mostrarPantalla('app-screen', pushHistory);
        const parts = rawHash.split('-');
        const prefix = parts[0];
        const sub = parts.slice(1).join('-');
        
        if (prefix === 'maestro') cambiarSubvistaMaestro(sub, pushHistory);
        else if (prefix === 'pastor') cambiarSubvistaPastor(sub, pushHistory);
        else if (prefix === 'produccion' || prefix === 'administracion') cambiarSubvistaProduccion(sub, pushHistory);
        else if (prefix === 'admin') cambiarSubvistaAdmin(sub, pushHistory);
        else if (prefix === 'adoracion') cambiarSubvistaAdoracion(sub, pushHistory);
        else if (prefix === 'estudiante' || prefix === 'alumno') cambiarSubvistaEstudiante(sub, pushHistory);
    } else {
        mostrarPantalla('login-screen', pushHistory);
    }
}

// CAPTURAR EL GESTO DE REGRESAR CON 2 DEDOS Y EL BOTÓN ATRÁS DEL NAVEGADOR
window.addEventListener('popstate', (e) => {
    procesarRutaHash(window.location.hash, false);
});

window.onload = function() {
    initDB();
    iniciarEleccionApp();
    
    // Auto-restaurar sesión activa al recargar la página
    try {
        const savedSession = localStorage.getItem('ws_user_session');
        if (savedSession) {
            const parsedSession = JSON.parse(savedSession);
            const db = getDB();
            if (parsedSession && parsedSession.username && db.usuarios[parsedSession.username]) {
                usuarioActual = { ...db.usuarios[parsedSession.username], username: parsedSession.username };
                configurarInterfaz(usuarioActual);
            }
        }
    } catch(e) {
        console.error("Error al restaurar la sesión del usuario:", e);
    }

    // Inicializar la ruta desde la URL actual o registrar #eleccion en el historial
    if (window.location.hash) {
        procesarRutaHash(window.location.hash, false);
    } else {
        history.replaceState({ idPantalla: 'app-choice-screen', hash: '#eleccion' }, "", "#eleccion");
    }
};