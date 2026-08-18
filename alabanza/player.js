async function loadPlayer() {
    const id = localStorage.getItem("selectedSongId");
    const container = document.getElementById("chordsContainer");

    if (!id) {
        window.location.href = "overview.html";
        return;
    }

    try {
        const res = await fetch(`/songs/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const song = await res.json();

        document.getElementById("songTitle").innerText = (song.name || "Sin título").toUpperCase();
        document.getElementById("songArtist").innerText = song.artist || "CAN Worship";
        document.getElementById("songKey").innerText = `TONO: ${song.key || 'C'}`;

        container.innerHTML = "";

        if (song.sections && song.sections.length > 0) {
            song.sections.forEach(section => {
                const sectionDiv = document.createElement("div");
                sectionDiv.className = "glass-card animate-fade";
                sectionDiv.style = "margin-bottom:24px; border-left:5px solid var(--accent-red); padding:24px;";

                const chordsText = Array.isArray(section.chords) ? section.chords.join(" - ") : (section.chords || "");

                sectionDiv.innerHTML = `
                    <div style="color:var(--accent-red); font-family:var(--font-title); font-weight:900; font-size:13px; letter-spacing:2px; text-transform:uppercase; margin-bottom:12px;">${(section.name || section.type || "SECCIÓN").toUpperCase()}</div>
                    <div class="chords-box">
                        ${chordsText}
                    </div>
                    ${section.lyrics ? `<div style="margin-top:14px; font-size:15px; color:rgba(255,255,255,0.85); line-height:1.6; white-space:pre-line;">${section.lyrics}</div>` : ''}
                `;
                container.appendChild(sectionDiv);
            });
        } else {
            container.innerHTML = "<p style='color:var(--text-muted); text-align:center; padding:40px;'>Esta canción no tiene acordes cargados.</p>";
        }

    } catch (e) {
        container.innerHTML = "<h3 style='text-align:center; color:var(--status-red); padding:40px;'>Error al cargar la partitura desde el servidor.</h3>";
    }
}

loadPlayer();