const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

function addSection() {
  const container = document.getElementById("sections");
  if (!container) return;
  const div = document.createElement("div");
  div.className = "glass-card section-block animate-fade";
  div.style.marginBottom = "15px";
  
  div.innerHTML = `
    <div style="display:flex; gap:10px; margin-bottom:10px">
      <select class="section-type" style="width:30%">
        <option>Intro</option><option>Verso</option><option>Coro</option>
        <option>Puente</option><option>Outro</option>
      </select>
      <input class="chords" placeholder="Acordes (Ej: G D Em C)" style="flex-grow:1; font-family:var(--font-chords); font-weight:bold; color:var(--accent-blue);">
      <button onclick="this.parentElement.parentElement.remove()" class="danger" style="padding:8px 12px;">✕</button>
    </div>
  `;
  container.appendChild(div);
}

async function saveSong() {
  const sectionBlocks = document.querySelectorAll(".section-block");
  const sections = Array.from(sectionBlocks).map(block => ({
    name: block.querySelector(".section-type").value,
    chords: block.querySelector(".chords").value.split(/\s+/).filter(c => c.trim() !== "")
  }));

  const songData = {
    name: document.getElementById("name").value,
    artist: document.getElementById("artist").value,
    key: document.getElementById("key").value,
    tempo: document.getElementById("tempo").value,
    sections: sections
  };

  try {
    const res = await fetch("/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(songData)
    });

    if (res.ok) {
      window.location.href = "overview.html";
    } else {
      alert("Error al guardar la canción. Revisa los datos.");
    }
  } catch(e) {
    alert("Error de conexión al servidor.");
  }
}