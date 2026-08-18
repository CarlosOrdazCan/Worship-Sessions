// BASE DE DATOS LOCAL INICIALIZADA CON VALORES POR DEFECTO
const defaultDB = {
    usuarios: {
        "admin": { password: "1234", rol: "admin", nombre: "Carlos Ordaz", area: "Sistemas" },
        "pastor": { password: "1234", rol: "pastor", nombre: "Pastor General", area: "Administración" },
        "maestro1": { password: "1234", rol: "maestro", nombre: "Juan Carlos (Teclado)", area: "Teclado" },
        "maestro2": { password: "1234", rol: "maestro", nombre: "Marcos (Batería)", area: "Batería" },
        "pablo": { password: "1234", rol: "adoracion", nombre: "Pablo Ensamble", area: "Ensamble" },
        "alumno1": { password: "1234", rol: "estudiante", nombre: "Juan Pérez", area: "Teclado", pagoStatus: "solvente" },
        "alumno2": { password: "1234", rol: "estudiante", nombre: "Ana Gómez", area: "Batería", pagoStatus: "pendiente" },
        "alumno3": { password: "1234", rol: "estudiante", nombre: "Luis Flores", area: "Teclado", pagoStatus: "solvente" },
    // Nuevos usuarios maestros y pastores
    "ilopez": { password: "worship2026**", rol: "maestro", nombre: "Ivan Lopez", area: "Bajo" },
    "cordaz": { password: "worship2026**", rol: "maestro", nombre: "Carlos Ordaz", area: "Batería" },
    "egonzalezg": { password: "worship2026**", rol: "maestro", nombre: "Enoc Gonzalez", area: "Batería" },
    "avazquez": { password: "worship2026**", rol: "maestro", nombre: "Asael Vazquez", area: "Batería Junior" },
    "aurdapilleta": { password: "worship2026**", rol: "maestro", nombre: "Aaron Urdapilleta", area: "Guitarra" },
    "aaviles": { password: "worship2026**", rol: "maestro", nombre: "Andrea Aviles", area: "Canto" },
    "mdiaz": { password: "worship2026**", rol: "maestro", nombre: "Manuel Diaz", area: "Piano" },
    "fgonzalez": { password: "worship2026**", rol: "maestro", nombre: "Fe Gonzalez", area: "Piano" },
    // Pendientes (por confirmar)
    "agutierrez": { password: "worship2026**", rol: "maestro", nombre: "Andrea Gutierrez", area: "" },
    "fmendez": { password: "worship2026**", rol: "maestro", nombre: "Fernanda Mendez", area: "" },
    "ewisser": { password: "worship2026**", rol: "maestro", nombre: "Emmanuel Wisser", area: "" },
    "dgranados": { password: "worship2026**", rol: "maestro", nombre: "Debora Granados", area: "" },
    // Pastores
    "egonzalez": { password: "worship2026**", rol: "pastor", nombre: "Efrain Gonzalez", area: "Pastoral" },
    "mgonzalez": { password: "worship2026**", rol: "pastor", nombre: "Martha Gonzalez", area: "Pastoral" },
    };
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
    cursos: [], // will hold course objects with materias and asignaciones
    }
};

// MOTOR DE BASE DE DATOS LOCAL
function initDB() {
    if (!localStorage.getItem('worship_sessions_db')) {
        localStorage.setItem('worship_sessions_db', JSON.stringify(defaultDB));
    }
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
        usuarioActual = { ...db.usuarios[inputUser], username: inputUser };
        
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('app-screen').classList.add('active');
        
        configurarInterfaz(usuarioActual);
        showToast(`¡Bienvenido de vuelta, ${usuarioActual.nombre}!`, 'success');
    } else {
        errorMsg.style.display = 'block';
        errorMsg.style.animation = 'shake 0.3s ease';
        setTimeout(() => { errorMsg.style.animation = ''; }, 300);
        showToast("Error de credenciales", 'error');
    }
}

function cerrarSesion() {
    usuarioActual = null;
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
    document.getElementById('app-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    cerrarReproductor();
    detenerMetronomo();
    showToast("Sesión cerrada con éxito", 'info');
}

// CONFIGURACIÓN DE LA INTERFAZ SEGÚN EL ROL
function configurarInterfaz(usuario) {
    const rol = usuario.rol;
    const nombre = usuario.nombre;
    
    document.getElementById('lbl-rol-actual').innerText = rol.toUpperCase();
    document.getElementById('nav-username').innerText = nombre;
    document.getElementById('app-welcome-title').innerText = "Hola, " + nombre;
    document.getElementById('app-welcome-subtitle').innerText = "Área / Especialidad: " + usuario.area;
    
    document.getElementById('nav-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=d90429&color=fff&bold=true`;
    document.getElementById('dynamic-menu').innerHTML = menusConfig[rol];
    
    cambiarVista(rol);
}

// CAMBIO DE VISTAS DENTRO DEL PANEL PRINCIPAL
function cambiarVista(rolVista) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('#dynamic-menu .nav-link').forEach(link => link.classList.remove('active'));
    
    const targetView = document.getElementById('view-' + rolVista);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    renderizarDatosVista(rolVista);
}

// RENDERIZAR DATOS EN LAS VISTAS ESPECÍFICAS
function renderizarDatosVista(rolVista) {
    const db = getDB();
    
    if (rolVista === 'admin') {
        renderizarAdmin(db);
    } else if (rolVista === 'pastor') {
        renderizarPastor(db);
    } else if (rolVista === 'maestro') {
        renderizarMaestro(db);
    } else if (rolVista === 'adoracion') {
        renderizarAdoracion(db);
    } else if (rolVista === 'estudiante') {
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
        if(rol === 'estudiante') {
            db.usuarios[editandoUsuarioUsername].pagoStatus = pago;
        }
        showToast("Usuario editado correctamente");
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
            pagoStatus: (rol === 'estudiante' ? pago : undefined)
        };
        showToast("Usuario registrado con éxito");
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
    
    // Calcular asistencia promedio
    let totalClasesMarcadas = 0;
    let totalAsistencias = 0;
    Object.values(db.asistencia).forEach(fechasObj => {
        Object.values(fechasObj).forEach(estado => {
            totalClasesMarcadas++;
            if (estado === 'presente') totalAsistencias++;
        });
    });
    const promAsistencia = totalClasesMarcadas > 0 ? Math.round((totalAsistencias / totalClasesMarcadas) * 100) : 100;
    
    document.getElementById('pastor-total-students').innerText = totalEstudiantes;
    document.getElementById('pastor-global-attendance').innerText = promAsistencia + "%";
    
    // Estadísticas Financieras
    const solventes = estudiantesArr.filter(e => e.pagoStatus !== 'pendiente').length;
    const deudores = totalEstudiantes - solventes;
    document.getElementById('pastor-solvent-count').innerText = solventes;
    document.getElementById('pastor-debtor-count').innerText = deudores;
    
    const recaudacionPct = totalEstudiantes > 0 ? Math.round((solventes / totalEstudiantes) * 100) : 100;
    document.getElementById('pastor-recaudacion-progress').style.width = recaudacionPct + "%";
    document.getElementById('pastor-recaudacion-tag').innerText = recaudacionPct + "% Solvencia";

    // 1. Filtrado de alumnos
    const busqueda = document.getElementById('pastor-search-input').value.trim().toLowerCase();
    const filtroInst = document.getElementById('pastor-filter-instrument').value;
    
    const tbody = document.getElementById('pastor-summary-tbody');
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
                tr.innerHTML = `
                    <td>
                        <strong class="user-realname">${user.nombre}</strong>
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
                    <td><strong class="asist-pct-text">${asistPct !== 'N/A' ? asistPct + '%' : 'S/R'}</strong></td>
                    <td>
                        <span class="badge badge-estado ${user.pagoStatus === 'pendiente' ? 'ausente' : 'presente'}">
                            ${(user.pagoStatus || 'solvente').toUpperCase()}
                        </span>
                    </td>
                    <td><em class="text-muted text-truncate" style="max-width: 200px; display: inline-block;">${notasObj.notas}</em></td>
                `;
                tbody.appendChild(tr);
            }
        }
    });

    // 2. Gráfico estadístico de distribución
    const conteoInstrumentos = {
        "Teclado": 0,
        "Batería": 0,
        "Guitarra Eléctrica": 0,
        "Bajo Eléctrico": 0,
        "Canto / Voces": 0
    };
    
    Object.values(db.usuarios).forEach(u => {
        if (u.rol === 'estudiante' && conteoInstrumentos[u.area] !== undefined) {
            conteoInstrumentos[u.area]++;
        }
    });

    const chartContainer = document.getElementById('pastor-chart-container');
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

function filtrarPastorData() {
    const db = getDB();
    renderizarPastor(db);
}

// -------------------------------------------------------------
// RENDER DE ROL: MAESTRO (MATERIALES Y ANUNCIOS GENERALES)
// -------------------------------------------------------------
function renderizarMaestro(db) {
    const areaMaestro = usuarioActual.area;
    document.getElementById('area-maestro').innerText = areaMaestro;
    
    // Tabla Alumnos
    const tbody = document.getElementById('maestro-students-tbody');
    tbody.innerHTML = '';
    
    let count = 0;
    Object.keys(db.usuarios).forEach(username => {
        const user = db.usuarios[username];
        if (user.rol === 'estudiante' && user.area === areaMaestro) {
            count++;
            
            const notasObj = db.calificaciones[username] || { teoria: 'Sin calificar', tecnica: 'Sin calificar', notas: '' };
            const asistenciasAlumno = db.asistencia[username] || {};
            const asistenciasTotales = Object.values(asistenciasAlumno).length;
            const presentes = Object.values(asistenciasAlumno).filter(val => val === 'presente').length;
            const asistPct = asistenciasTotales > 0 ? Math.round((presentes / asistenciasTotales) * 100) : 0;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="user-cell">
                        <span class="user-icon-badge accent">${user.nombre.charAt(0)}</span>
                        <div>
                            <strong>${user.nombre}</strong><br>
                            <small class="text-muted">Asistencia: ${asistPct}% | ${user.pagoStatus === 'pendiente' ? 'Deuda' : 'Solvente'}</small>
                        </div>
                    </div>
                </td>
                <td><strong class="note-pill">${notasObj.teoria}</strong></td>
                <td><strong class="note-pill">${notasObj.tecnica}</strong></td>
                <td style="max-width: 200px;"><span class="text-muted text-truncate-custom">${notasObj.notas || 'Sin anotaciones'}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="abrirModalCalificar('${username}')"><i class="fas fa-edit"></i> Evaluar</button>
                    <button class="btn btn-sm btn-secondary" onclick="abrirModalAsistencia('${username}')"><i class="fas fa-calendar-check"></i> Asistencia</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
    
    document.getElementById('maestro-students-count').innerText = count;

    // Tabla Materiales Cargados
    const materialsTbody = document.getElementById('maestro-materials-tbody');
    materialsTbody.innerHTML = '';
    const materialesFiltrados = db.materiales.filter(m => m.area === areaMaestro);
    
    if (materialesFiltrados.length === 0) {
        materialsTbody.innerHTML = `<tr><td colspan="3" style="text-align: center;" class="text-muted">No has subido ningún material didáctico todavía.</td></tr>`;
    } else {
        materialesFiltrados.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${m.titulo}</strong><br><small class="text-muted">${m.descripcion}</small></td>
                <td><a href="${m.enlace}" target="_blank" class="cancion-link"><i class="fas fa-external-link-alt"></i> Descargar</a></td>
                <td>
                    <button class="btn btn-sm btn-delete" onclick="eliminarMaterial('${m.id}')"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            materialsTbody.appendChild(tr);
        });
    }

    // Tabla Anuncios Publicados
    const bulletinsTbody = document.getElementById('maestro-bulletins-tbody');
    bulletinsTbody.innerHTML = '';
    const anunciosFiltrados = db.anuncios.filter(a => a.area === areaMaestro);
    
    if (anunciosFiltrados.length === 0) {
        bulletinsTbody.innerHTML = `<tr><td colspan="3" style="text-align: center;" class="text-muted">No has publicado avisos informativos.</td></tr>`;
    } else {
        anunciosFiltrados.forEach(a => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${a.contenido}</strong><br><small class="text-muted">Subido: ${a.fecha}</small></td>
                <td>
                    <button class="btn btn-sm btn-delete" onclick="eliminarAnuncio('${a.id}')"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            bulletinsTbody.appendChild(tr);
        });
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

function renderizarAdoracion(db) {
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
    } else {
        cancionIdSeleccionada = null;
        document.getElementById('modal-cancion-title').innerText = "Nueva Canción";
        document.getElementById('canc-titulo').value = '';
        document.getElementById('canc-autor').value = '';
        document.getElementById('canc-tono').value = 'C';
        document.getElementById('canc-acordes').value = '';
        document.getElementById('canc-video').value = '';
        document.getElementById('canc-activo').value = "true";
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
                titulo, autor, tono, linkAcordes: acordes, linkVideo: video, activo
            };
        }
        showToast("Canción modificada");
    } else {
        const nuevaId = (db.canciones.length > 0 ? Math.max(...db.canciones.map(item => parseInt(item.id))) + 1 : 1).toString();
        db.canciones.push({
            id: nuevaId,
            titulo, autor, tono, linkAcordes: acordes, linkVideo: video, activo
        });
        showToast("Nueva canción agregada");
    }
    
    saveDB(db);
    cerrarModalCancion();
    renderizarDatosVista('adoracion');
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
// RENDER DE ROL: ESTUDIANTE / ALUMNO, METRÓNOMO Y PLANIFICADOR
// -------------------------------------------------------------
function renderizarEstudiante(db) {
    const user = usuarioActual;
    const username = user.username;
    
    document.getElementById('student-instrument-title').innerText = `Instrumento: ${user.area}`;
    
    // Cargar Alerta Dominical si fue asignado a tocar
    const avisoServicio = document.getElementById('student-worship-alert');
    let rolAsignado = null;
    Object.keys(db.ensambleRoles).forEach(puesto => {
        if (db.ensambleRoles[puesto] === username) {
            rolAsignado = puesto;
        }
    });
    
    if (rolAsignado) {
        avisoServicio.style.display = 'block';
        document.getElementById('stud-worship-role-tag').innerText = rolAsignado.toUpperCase();
    } else {
        avisoServicio.style.display = 'none';
    }

    // Cargar Muro de Anuncios del Maestro de su área
    const announcementsContainer = document.getElementById('student-announcements-wall');
    announcementsContainer.innerHTML = '';
    const anunciosArea = db.anuncios.filter(a => a.area === user.area);
    
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

    // Calificaciones
    const notas = db.calificaciones[username] || { teoria: 0, tecnica: 0, notas: "Aún no se han registrado evaluaciones en el sistema para ti." };
    const teoriaVal = typeof notas.teoria === 'number' ? notas.teoria : 0;
    const tecnicaVal = typeof notas.tecnica === 'number' ? notas.tecnica : 0;
    
    document.getElementById('stud-progress-teoria').style.width = teoriaVal + "%";
    document.getElementById('stud-val-teoria').innerText = teoriaVal + "/100";
    document.getElementById('stud-progress-tecnica').style.width = tecnicaVal + "%";
    document.getElementById('stud-val-tecnica').innerText = tecnicaVal + "/100";
    document.getElementById('stud-observaciones').innerText = notas.notas || "Sin anotaciones del profesor.";
    
    // Alerta de Adeudo de colegiatura
    const billingAlert = document.getElementById('student-billing-alert');
    if (user.pagoStatus === 'pendiente') {
        billingAlert.style.display = 'block';
    } else {
        billingAlert.style.display = 'none';
    }

    // Asistencias
    const asistenciaObj = db.asistencia[username] || {};
    const totalFechas = Object.keys(asistenciaObj).length;
    const presentes = Object.values(asistenciaObj).filter(v => v === 'presente').length;
    const promAsistencia = totalFechas > 0 ? Math.round((presentes / totalFechas) * 100) : 0;
    
    document.getElementById('stud-attendance-pct').innerText = promAsistencia + "%";
    document.getElementById('stud-attendance-desc').innerText = `Clases asistidas: ${presentes} de ${totalFechas}`;
    
    // Setlist activo con reproductor multimedia
    const listSetlist = document.getElementById('stud-setlist-ul');
    listSetlist.innerHTML = '';
    const cancionesActivas = db.canciones.filter(c => c.activo);
    
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
    
    // Materiales
    const listMateriales = document.getElementById('stud-materials-ul');
    listMateriales.innerHTML = '';
    const materialesFiltrados = db.materiales.filter(m => m.area === user.area);
    
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

    // Inicializar Metrónomo visual UI
    actualizarMetronomeUI();
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
    
    // Previene errores de seguridad de navegadores (User Interaction constraint)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "triangle"; // tono agradable de campana / clic
    osc.frequency.setValueAtTime(1000, audioCtx.currentTime); // Pitch alto
    
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05); // Se extingue rápido en 50ms
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
    
    // Destello visual sutil del indicador luminoso
    const dot = document.getElementById('metro-light-dot');
    if (dot) {
        dot.classList.add('flash-active');
        setTimeout(() => {
            dot.classList.remove('flash-active');
        }, 60);
    }
}

function toggleMetronomo() {
    if (metronomeIsPlaying) {
        detenerMetronomo();
        showToast("Metrónomo detenido", "info");
    } else {
        iniciarMetronomo();
        showToast("Metrónomo activo (" + metronomeBpm + " BPM)");
    }
}

function iniciarMetronomo() {
    metronomeIsPlaying = true;
    document.getElementById('metro-play-btn').innerHTML = '<i class="fas fa-stop"></i>';
    document.getElementById('metro-play-btn').style.backgroundColor = 'var(--primary-red)';
    
    const intervalMs = (60000 / metronomeBpm);
    
    // Primer clic instantáneo
    playMetronomeClick();
    
    metronomeInterval = setInterval(() => {
        playMetronomeClick();
    }, intervalMs);
}

function detenerMetronomo() {
    metronomeIsPlaying = false;
    const playBtn = document.getElementById('metro-play-btn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.backgroundColor = '';
    }
    
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
    }
}

function actualizarMetronomeUI() {
    document.getElementById('metro-bpm-val').innerText = metronomeBpm;
    document.getElementById('metro-slider').value = metronomeBpm;
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
            // Oculta la pantalla de elección y muestra el login de Worship Sessions
            const choiceScreen = document.getElementById('app-choice-screen');
            if (choiceScreen) {
                choiceScreen.classList.remove('active');
                choiceScreen.style.display = 'none';
            }
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                loginScreen.classList.add('active');
                loginScreen.style.display = 'block';
            }
        });
    }
};

window.onload = function() {
    initDB();
    iniciarEleccionApp();
};