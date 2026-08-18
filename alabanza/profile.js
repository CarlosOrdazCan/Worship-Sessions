const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

let photoFile = null;

function applySavedWallpaper() {
    const savedWallpaper = localStorage.getItem("cordaz_wallpaper");
    if (savedWallpaper) {
        document.body.classList.add("ios-wallpaper-active");
        document.body.style.setProperty("--ios-bg-image", `url(${savedWallpaper})`);
        const removeBtn = document.getElementById("removeWallpaperBtn");
        if (removeBtn) removeBtn.style.display = "inline-flex";
    }
}
applySavedWallpaper();

async function loadProfile() {
    try {
        const res = await fetch("/profile", { headers: { "Authorization": `Bearer ${token}` } });
        if (res.status === 401) {
            localStorage.clear();
            window.location.href = "login.html";
            return;
        }
        
        const user = await res.json();
        
        document.getElementById("display-name").innerText = (user.name || user.username || "Usuario").toUpperCase();
        document.getElementById("display-username").innerText = `@${user.username}`;
        document.getElementById("display-role").innerText = user.instrument || user.role;
        
        const affil = user.ministry === "Hibrido" ? "PRINCIPAL / KIDS" : (user.ministry || "Principal");
        document.getElementById("display-affiliation").innerText = affil.toUpperCase();

        document.getElementById("userName").value = user.name || "";
        document.getElementById("userPhone").value = user.phone || "";
        document.getElementById("userBio").value = user.bio || "";
        
        const photoSrc = user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=0c0a0c&color=ff2a4b&size=200&bold=true`;
        document.getElementById("avatarPreview").src = photoSrc;

        // Renderizar mezclador In-Ear si es músico de Alabanza Principal (48 Canales)
        const minStr = user.ministry || "Principal";
        const isPrincipalMusician = (minStr === "Principal" || minStr === "Hibrido") && user.ministry !== "Produccion" && user.ministry !== "Pastoral";
        const iemCard = document.getElementById("iemMixerCard");
        const fadersCont = document.getElementById("userFadersContainer");

        if (isPrincipalMusician && iemCard && fadersCont) {
            iemCard.style.display = "block";
            fadersCont.innerHTML = "";
            const currentMix = Array.isArray(user.personalMix) && user.personalMix.length === 48 ? user.personalMix : new Array(48).fill(0);
            
            const CH_LABELS_48 = [
                "Kick In", "Kick Out", "Snare T", "Snare B", "Hi-Hat", "Tom 1", "Tom 2", "Fl Tom",
                "OH L", "OH R", "Bass DI", "Bass Mic", "Gtr El 1", "Gtr El 2", "Gtr Ac", "Piano L",
                "Piano R", "Synth L", "Synth R", "Pad L", "Pad R", "Tracks L", "Tracks R", "Click",
                "Guide", "Voz Lead", "Voz 2", "Voz 3", "Voz 4", "Voz 5", "Pastor D", "Pastor M",
                "Altar 1", "Altar 2", "Amb L", "Amb R", "Talk FOH", "Talk Stg", "Rev Voc", "Dly Voc",
                "Rev Inst", "FX 4", "Video L", "Video R", "Aux 1", "Aux 2", "Aux 3", "Aux 4"
            ];

            for (let i = 0; i < 48; i++) {
                const val = currentMix[i] !== undefined ? currentMix[i] : 0;
                const label = CH_LABELS_48[i] || `CH${i+1}`;
                fadersCont.innerHTML += `
                    <div style="display:flex; flex-direction:column; align-items:center; min-width:55px;">
                        <span style="font-size:9px; color:var(--text-muted); font-weight:800; text-transform:uppercase; margin-bottom:6px; white-space:nowrap;">${label}</span>
                        <input type="range" orient="vertical" min="-60" max="10" value="${val}" class="user-iem-fader" data-ch="${i}" oninput="this.nextElementSibling.innerText = (this.value > 0 ? '+' : '') + this.value + 'dB'" style="writing-mode:bt-lr; appearance:slider-vertical; height:110px; accent-color:var(--accent-red);">
                        <span style="font-size:10px; color:var(--accent-red); font-family:var(--font-chords); margin-top:6px; font-weight:bold;">${val > 0 ? '+' : ''}${val}dB</span>
                    </div>
                `;
            }
        }

        const wpInput = document.getElementById("wallpaperInput");
        if (wpInput) {
            wpInput.addEventListener("change", function(event) {
                if (event.target.files && event.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const base64Img = e.target.result;
                        localStorage.setItem("cordaz_wallpaper", base64Img);
                        document.body.classList.add("ios-wallpaper-active");
                        document.body.style.setProperty("--ios-bg-image", `url(${base64Img})`);
                        document.getElementById("removeWallpaperBtn").style.display = "inline-flex";
                    };
                    reader.readAsDataURL(event.target.files[0]);
                }
            });
        }
    } catch(err) {
        console.error("Error al cargar perfil:", err);
    }
}

const photoInput = document.getElementById("photoInput");
if (photoInput) {
    photoInput.addEventListener("change", function(event) {
        if (event.target.files && event.target.files[0]) {
            photoFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("avatarPreview").src = e.target.result;
            };
            reader.readAsDataURL(photoFile);
        }
    });
}

function clearWallpaper() {
    localStorage.removeItem("cordaz_wallpaper");
    document.body.classList.remove("ios-wallpaper-active");
    document.body.style.removeProperty("--ios-bg-image");
    const removeBtn = document.getElementById("removeWallpaperBtn");
    if (removeBtn) removeBtn.style.display = "none";
}

async function saveProfileData() {
    const faders = Array.from(document.querySelectorAll(".user-iem-fader"));
    const personalMix = faders.map(f => parseInt(f.value, 10));

    const updateData = {
        name: document.getElementById("userName").value.trim(),
        phone: document.getElementById("userPhone").value.trim(),
        bio: document.getElementById("userBio").value.trim(),
        personalMix: personalMix.length > 0 ? personalMix : undefined
    };

    const pass = document.getElementById("userPass").value;
    if (pass) updateData.password = pass;

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = async function() {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                
                // Aspect ratio 1:1 cuadrado para avatar perfecto
                const size = Math.min(img.width, img.height);
                const startX = (img.width - size) / 2;
                const startY = (img.height - size) / 2;
                
                const TARGET_SIZE = 350;
                canvas.width = TARGET_SIZE;
                canvas.height = TARGET_SIZE;
                
                ctx.drawImage(img, startX, startY, size, size, 0, 0, TARGET_SIZE, TARGET_SIZE);
                updateData.photo = canvas.toDataURL("image/jpeg", 0.85);
                
                await sendUpdateToServer(updateData);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(photoFile);
    } else {
        await sendUpdateToServer(updateData);
    }
}

async function sendUpdateToServer(data) {
    try {
        const res = await fetch("/profile-update", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("¡Perfil actualizado con éxito!");
            location.reload();
        } else {
            alert("Error al actualizar el perfil en el servidor.");
        }
    } catch(e) {
        alert("Error de conexión al guardar cambios.");
    }
}

async function loadAbsenceSetlists() {
    const select = document.getElementById("absenceSetlistSelect");
    if (!select) return;

    try {
        const res = await fetch("/setlists", { headers: { "Authorization": `Bearer ${token}` } });
        const sets = await res.json();
        const activeSets = Array.isArray(sets) ? sets.filter(s => s && !s.archived).reverse() : [];

        if (activeSets.length === 0) {
            select.innerHTML = "<option value=''>No hay servicios activos</option>";
            return;
        }

        select.innerHTML = activeSets.map(s => {
            return `<option value="${s._id}">${(s.name || 'Servicio').toUpperCase()} (${s.date || ''})</option>`;
        }).join('');
    } catch(e) {
        console.warn("Error cargando setlists para inasistencia:", e);
    }
}

async function submitAbsenceReason() {
    const select = document.getElementById("absenceSetlistSelect");
    const reasonInput = document.getElementById("absenceReasonInput");

    const setId = select ? select.value : "";
    const reason = reasonInput ? reasonInput.value.trim() : "";

    if (!setId) {
        alert("Selecciona un servicio.");
        return;
    }
    if (!reason) {
        alert("Por favor escribe el motivo de tu inasistencia.");
        return;
    }

    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    const memberName = userObj.name || "Usuario";

    try {
        const res = await fetch(`/setlists/${setId}/absence`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ memberName, reason })
        });

        if (res.ok) {
            alert("✅ Notificación enviada con éxito. El Pastor y tu Director verán tu justificación en el resumen del culto.");
            if (reasonInput) reasonInput.value = "";
        } else {
            alert("Error al registrar la justificación.");
        }
    } catch(e) {
        alert("Error de conexión con el servidor.");
    }
}

loadProfile();
loadAbsenceSetlists();

