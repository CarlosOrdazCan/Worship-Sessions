const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

window.onload = () => {
  const btnAdd = document.getElementById("btnAdd");
  if (btnAdd) btnAdd.addEventListener("click", addSection);
};

function addSection() {
  const container = document.getElementById("sections");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "section-block animate-fade";
  div.style.marginBottom = "15px";

  div.innerHTML = `
    <div style="display:flex; gap:10px; margin-bottom:8px; align-items:center;">
      <select class="section-type" style="width:30%;">
        <option>Intro</option>
        <option>Verso</option>
        <option>Coro</option>
        <option>Puente</option>
        <option>Tag</option>
        <option>Outro</option>
        <option>Personalizado</option>
      </select>

      <input class="custom-name" placeholder="Nombre personalizado" style="display:none; width:30%;">

      <input class="chords" placeholder="Ej: C-D-Em-G" style="flex-grow:1; font-family:var(--font-chords); color:var(--accent-blue);">
      <button onclick="this.parentElement.parentElement.remove()" class="danger" style="padding:8px 12px;">✕</button>
    </div>
  `;

  const select = div.querySelector(".section-type");
  const custom = div.querySelector(".custom-name");

  select.addEventListener("change", () => {
    if (select.value === "Personalizado") {
      custom.style.display = "block";
    } else {
      custom.style.display = "none";
    }
  });

  container.appendChild(div);
}

async function saveSong() {
  const name = document.getElementById("name").value;
  const artist = document.getElementById("artist").value;
  const key = document.getElementById("key").value;
  const tempo = document.getElementById("tempo").value;

  const sectionsDOM = document.querySelectorAll(".section-block");
  const sections = [];

  sectionsDOM.forEach(sec => {
    const type = sec.querySelector(".section-type").value;
    const custom = sec.querySelector(".custom-name").value;
    const chords = sec.querySelector(".chords").value;

    sections.push({
      name: type === "Personalizado" ? custom : type,
      chords: chords.split(/[\s\-]+/).filter(c => c.trim() !== "")
    });
  });

  const song = { name, artist, key, tempo, sections };

  try {
    const res = await fetch("/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(song)
    });

    if (res.status === 401) {
      alert("Sesión expirada");
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }

    if (!res.ok) {
      alert("Error al guardar la canción.");
      return;
    }

    window.location.href = "overview.html";
  } catch (err) {
    alert("Error de conexión al servidor.");
  }
}