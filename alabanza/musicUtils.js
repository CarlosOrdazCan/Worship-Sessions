/* =========================================================
   CAN ALABANZA - UTILIDADES MUSICALES (CHARTBUILDER TRANSPOSER)
   ========================================================= */

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatToSharp = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#", "Cb": "B", "Fb": "E" };

/**
 * Transporta un acorde individual (ej: Bb, G#m7, D/F#)
 * @param {string} chord - El acorde original
 * @param {number} steps - Cantidad de semitonos a mover
 */
function transposeChord(chord, steps) {
    if (!chord || steps === 0) return chord;
    
    // Si tiene bajo alterado (ej. D/F#)
    if (chord.includes('/')) {
        const parts = chord.split('/');
        return `${transposeChord(parts[0], steps)}/${transposeChord(parts[1], steps)}`;
    }

    // Normalizar raíz
    let match = chord.match(/^([A-G][b#]?)(.*)$/);
    if (!match) return chord;

    let root = match[1];
    let suffix = match[2];

    let normRoot = flatToSharp[root] || root;
    let i = notes.indexOf(normRoot);
    if (i === -1) return chord;

    let newIndex = (i + steps) % 12;
    if (newIndex < 0) newIndex += 12;

    return notes[newIndex] + suffix;
}

/**
 * Transporta una línea completa de acordes respetando espacios y columnas
 * @param {string} line - Línea de texto con acordes espaciados
 * @param {number} steps - Semitonos
 */
function transposeAlignedLine(line, steps) {
    if (!line || steps === 0) return line;
    const chordRegex = /\b([A-G][b#]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]|M?[0-9]*(?:-[0-9]+)?)*(?:\/[A-G][b#]?)?)\b/g;
    return line.replace(chordRegex, match => transposeChord(match, steps));
}

/**
 * Mapeo y normalización bilingüe de secciones (Inglés / Español / Variantes)
 */
const SECTION_MAP = {
    // Versos
    "verse": "Verso 1", "verse 1": "Verso 1", "verse 2": "Verso 2", "verse 3": "Verso 3", "verse 4": "Verso 4",
    "verso": "Verso 1", "verso 1": "Verso 1", "verso 2": "Verso 2", "verso 3": "Verso 3", "verso 4": "Verso 4",
    "estrofa": "Verso 1", "estrofa 1": "Verso 1", "estrofa 2": "Verso 2", "estrofa 3": "Verso 3",
    "v1": "Verso 1", "v2": "Verso 2", "v3": "Verso 3", "v4": "Verso 4",

    // Coros
    "chorus": "Coro", "chorus 1": "Coro", "chorus 2": "Coro 2", "chorus 3": "Coro 3", "chorus 4": "Coro 4", "chorus 5": "Coro 5",
    "coro": "Coro", "coro 1": "Coro", "coro 2": "Coro 2", "coro 3": "Coro 3", "coro 4": "Coro 4", "coro 5": "Coro 5", "estribillo": "Coro",
    "c1": "Coro", "c2": "Coro 2", "c3": "Coro 3", "c4": "Coro 4", "c5": "Coro 5", "hook": "Coro",

    // Pre-Coros
    "pre-chorus": "Pre-Coro", "pre-chorus 1": "Pre-Coro", "pre-chorus 2": "Pre-Coro 2",
    "pre-coro": "Pre-Coro", "pre-coro 1": "Pre-Coro", "pre-coro 2": "Pre-Coro 2",
    "precoro": "Pre-Coro", "prechorus": "Pre-Coro", "pre": "Pre-Coro",

    // Puentes
    "bridge": "Puente", "bridge 1": "Puente", "bridge 2": "Puente 2", "bridge 3": "Puente 3", "bridge 4": "Puente 4",
    "puente": "Puente", "puente 1": "Puente", "puente 2": "Puente 2", "puente 3": "Puente 3", "puente 4": "Puente 4", "b1": "Puente", "b2": "Puente 2",

    // Refrain / Estribillo
    "refrain": "Refrain", "refrain 1": "Refrain", "refrain 2": "Refrain 2",

    // Intro / Outro / Final
    "intro": "Intro", "introduction": "Intro", "introduccion": "Intro", "introducción": "Intro",
    "outro": "Outro", "ending": "Outro", "final": "Outro", "coda": "Outro",

    // Instrumentales y Solos
    "instrumental": "Instrumental", "inst": "Instrumental", "interlude": "Interludio", "interludio": "Interludio",
    "solo": "Solo (Guitarra)", "guitar solo": "Solo (Guitarra)", "solo guitarra": "Solo (Guitarra)", "piano solo": "Solo (Piano)", "solo piano": "Solo (Piano)",

    // Tags & Extras
    "tag": "Tag", "tag 1": "Tag", "tag 2": "Tag", "vamp": "Tag",
    "spontaneous": "Espontáneo / Ministración", "espontaneo": "Espontáneo / Ministración",
    "espontáneo": "Espontáneo / Ministración", "ministracion": "Espontáneo / Ministración",
    "ministración": "Espontáneo / Ministración", "free praise": "Alabanza Libre",
    "alabanza libre": "Alabanza Libre", "oracion": "Oración", "oración": "Oración"
};

function normalizeSectionName(rawName) {
    if (!rawName) return "Verso 1";
    const clean = rawName.trim().toLowerCase()
        .replace(/^\[|\]$/g, '')
        .replace(/:$/, '')
        .replace(/\s+/g, ' ');
    
    if (SECTION_MAP[clean]) return SECTION_MAP[clean];
    
    // Si tiene número ej "Verso 5" o "Bridge 3" o "Puente4" o "Coro3"
    const matchNumbered = clean.match(/^(verse|verso|estrofa|chorus|coro|bridge|puente|pre-chorus|pre-coro|precoro|refrain|tag)\s*(\d+)$/i);
    if (matchNumbered) {
        const type = matchNumbered[1].toLowerCase();
        const num = matchNumbered[2];
        if (type.startsWith('v') || type.startsWith('e')) return `Verso ${num}`;
        if (type.startsWith('c')) return `Coro ${num}`;
        if (type.startsWith('b') || type.startsWith('pue')) return `Puente ${num}`;
        if (type.startsWith('pre')) return `Pre-Coro ${num}`;
        if (type.startsWith('ref')) return `Refrain ${num}`;
        if (type.startsWith('tag')) return `Tag ${num}`;
    }

    // Capitalizar primera letra de cada palabra como fallback
    return rawName.replace(/^\[|\]$/g, '').replace(/:$/, '').trim();
}

/**
 * Regex universal para acordes
 */
const CHORD_TOKEN_REGEX = /^[A-Ga-g][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]|M?[0-9]*(?:-[0-9]+)?)*(?:\/[A-Ga-g][#b]?)?$/;
const CHORD_INLINE_REGEX = /\b([A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]|M?[0-9]*(?:-[0-9]+)?)*(?:\/[A-G][#b]?)?)\b/g;

function isSectionHeader(line) {
    if (!line || !line.trim()) return false;
    const trimmed = line.trim();
    const match = trimmed.match(headerRegex);
    if (!match) return false;
    const rawSec = (match[1] || match[2] || match[3] || '').trim();
    if (!rawSec) return false;
    // Si es un acorde único entre corchetes tipo [C] o [G/B], no es encabezado
    if (CHORD_TOKEN_REGEX.test(rawSec)) return false;
    return rawSec;
}

/**
 * Detecta si una línea de texto está compuesta principalmente por acordes
 */
function isLineOfChords(line) {
    if (!line || !line.trim()) return false;
    if (isSectionHeader(line)) return false;
    const tokens = line.trim().split(/\s+/).filter(t => t.length > 0);
    if (tokens.length === 0) return false;
    let chordCount = 0;
    tokens.forEach(t => {
        // Remover paréntesis, corchetes, comas, barras o signos
        const cleanT = t.replace(/[\[\]\(\),\|\/\-]/g, '');
        if (cleanT && CHORD_TOKEN_REGEX.test(cleanT)) {
            chordCount++;
        }
    });
    return (chordCount / tokens.length) >= 0.5;
}

/**
 * Limpia 100% las letras para ProPresenter, Producción y la Vista de Cantantes.
 * Elimina líneas de acordes alineados, marcas ChordPro [C], acordes en paréntesis (Am7),
 * tablaturas y directivas, dejando únicamente la letra limpia.
 * @param {string} rawText - Texto con acordes o formato ChordPro/Chart
 * @returns {string} Letra 100% pura y limpia
 */
function cleanPureLyrics(rawText) {
    if (!rawText || typeof rawText !== 'string') return "";
    
    // Normalizar saltos de línea
    const lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const cleanLines = [];

    // Regex para acordes entre corchetes tipo ChordPro: [C], [G/B], [Am7], [1], [5/7]
    const bracketChordRegex = /\[(?:[A-Ga-g][#b]?[^\]]*|[0-9]+(?:\/[0-9]+)?)\]/g;

    // Regex para acordes entre paréntesis tipo (C), (G/B), (Am7)
    const parenChordRegex = /\(([A-Ga-g][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]|M?[0-9]*(?:-[0-9]+)?)*(?:\/[A-Ga-g][#b]?)?)\)/g;

    // Regex para directivas ChordPro tipo {comment: ...}, {c: ...}, {start_of_chorus}, etc.
    const chordProDirectiveRegex = /^\{.*\}$/;

    for (let line of lines) {
        let trimmed = line.trim();
        if (!trimmed) continue;

        // 1. Ignorar directivas ChordPro
        if (chordProDirectiveRegex.test(trimmed)) continue;

        // 2. Ignorar líneas de tablatura (e|---, B|---, etc.)
        if (/^[eEaAdDgGbB]\|/.test(trimmed) || /^\|-+\|/.test(trimmed)) continue;

        // 3. Detectar si la línea completa es solo de acordes (acordes sobre letra)
        if (isLineOfChords(line)) continue;

        // 4. Si es una línea de letra, remover cualquier acorde inline [C], [G/B]
        let cleanedLine = line.replace(bracketChordRegex, '');

        // 5. Remover acordes en paréntesis (C), (Am7)
        cleanedLine = cleanedLine.replace(parenChordRegex, '');

        // 6. Limpiar dobles espacios que hayan quedado
        cleanedLine = cleanedLine.replace(/\s{2,}/g, ' ').trim();

        // 7. Si después de limpiar quedó vacía (era una línea con solo [C] [G]), ignorar
        if (cleanedLine.length > 0) {
            cleanLines.push(cleanedLine);
        }
    }

    return cleanLines.join('\n');
}

const SECTION_KEYWORDS = [
    "intro", "introduction", "introducci[oó]n",
    "verse\\s*\\d*", "verso\\s*\\d*", "estrofa\\s*\\d*", "v\\d+",
    "pre-?chorus\\s*\\d*", "pre-?coro\\s*\\d*", "prechorus\\s*\\d*", "precoro\\s*\\d*", "pre\\s*\\d*",
    "chorus\\s*\\d*", "coro\\s*\\d*", "estribillo\\s*\\d*", "c\\d+", "hook",
    "refrain\\s*\\d*",
    "bridge\\s*\\d*", "puente\\s*\\d*", "b\\d+",
    "instrumental\\s*\\d*", "inst\\.?\\s*\\d*", "interlude\\s*\\d*", "interludio\\s*\\d*",
    "solo(?:\\s+(?:de\\s+)?(?:guitarra?|piano|bater[ií]a|saxo?|sintetizador|teclado|voz))?",
    "tag\\s*\\d*", "vamp\\s*\\d*",
    "outro", "ending", "final", "coda",
    "espont[aá]neo.*", "spontaneous.*", "ministraci[oó]n.*", "alabanza\\s+libre", "free\\s+praise",
    "oraci[oó]n", "lectura"
];

const headerRegex = new RegExp(
    `^\\s*(?:\\[([^\\]]+)\\]\\s*$|([A-Za-zÁÉÍÓÚáéíóú0-9\\s\\(\\)\\/\\-]+)\\s*:\\s*$|(${SECTION_KEYWORDS.join('|')})\\s*$)`,
    'i'
);

/**
 * Parser inteligente de canciones (Multi-formato: ChordPro, Acordes sobre letra, Cifrado libre)
 * @param {string} text - Texto crudo pegado por el usuario
 * @returns {Array} Array de secciones estructuradas { name, chords, lyrics, chordSheet }
 */
function smartSongParser(text) {
    if (!text || !text.trim()) return [];

    const lines = text.split('\n');
    const sections = [];
    let currentName = "";
    let currentLines = [];
    let currentChords = new Set();

    function flush() {
        if (currentLines.length > 0 || currentChords.size > 0) {
            const rawBody = currentLines.join('\n').trim();
            if (rawBody || currentChords.size > 0) {
                sections.push({
                    name: currentName || "Verso 1",
                    chords: Array.from(currentChords).join(' - '),
                    lyrics: cleanPureLyrics(rawBody),
                    chordSheet: rawBody
                });
            }
            currentLines = [];
            currentChords = new Set();
        }
    }

    lines.forEach(rawLine => {
        const trimmed = rawLine.trim();
        if (!trimmed) {
            if (currentLines.length > 0) currentLines.push("");
            return;
        }
        
        // Detectar si es un encabezado de sección
        const rawSecName = isSectionHeader(rawLine);
        if (rawSecName) {
            flush();
            currentName = normalizeSectionName(rawSecName);
            return;
        }

        // Si es una línea de acordes, extraer los acordes para la lista rápida
        if (isLineOfChords(rawLine)) {
            const tokens = rawLine.trim().split(/\s+/);
            tokens.forEach(t => {
                const cleanT = t.replace(/[\[\]\(\),]/g, '');
                if (CHORD_TOKEN_REGEX.test(cleanT)) currentChords.add(cleanT);
            });
        } else {
            const chordProMatches = rawLine.match(/\[([A-Ga-g][#b]?[^\]]*)\]|\(([A-Ga-g][#b]?[^\)]*)\)/g);
            if (chordProMatches) {
                chordProMatches.forEach(m => {
                    const c = m.replace(/[\[\]\(\)]/g, '');
                    if (CHORD_TOKEN_REGEX.test(c)) currentChords.add(c);
                });
            }
        }

        if (!currentName) {
            currentName = isLineOfChords(rawLine) ? "Intro" : "Verso 1";
        }

        currentLines.push(rawLine);
    });

    flush();
    return sections;
}
