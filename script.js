// Selección de elementos del DOM
const sourceLangSelect = document.getElementById('source-lang');
const targetLangInput = document.getElementById('target-lang');
const inputCode = document.getElementById('input-code');
const outputCode = document.getElementById('output-code');
const convertBtn = document.getElementById('convert-btn');
const copyBtn = document.getElementById('copy-btn');
const loader = document.getElementById('loader');

// Mapeo de lenguajes
const langMap = {
    tidal: "Tidal Cycles (Haskell)",
    strudel: "Strudel (JavaScript)"
};

// Actualiza el placeholder y el lenguaje de destino al cambiar la selección
sourceLangSelect.addEventListener('change', () => {
    const selected = sourceLangSelect.value;
    if (selected === 'tidal') {
        targetLangInput.value = langMap.strudel;
        inputCode.placeholder = 'Pega tu código de Tidal aquí...\nd1 $ sound "bd sd hh cp"';
    } else {
        targetLangInput.value = langMap.tidal;
        inputCode.placeholder = 'Pega tu código de Strudel aquí...\nmini.parse("bd sd hh cp")';
    }
});

// Lógica del botón de conversión (la llamada a la API va aquí)
convertBtn.addEventListener('click', async () => {
    const sourceCode = inputCode.value;
    if (!sourceCode.trim()) {
        alert("Por favor, introduce algo de código para convertir.");
        return;
    }

    // Muestra el loader y deshabilita el botón
    loader.classList.remove('hidden');
    convertBtn.disabled = true;
    outputCode.value = "Convirtiendo...";

    // --- AQUÍ VA LA LÓGICA DE LA API ---
    // Simulación de llamada a la API con un delay
    setTimeout(() => {
        // Esta es una respuesta Falsa. Debe ser reemplazada por la respuesta real de la API.
        const fakeApiResponse = 'mini.parse("bd sd hh cp")'; 
        outputCode.value = fakeApiResponse;
        
        // Oculta el loader y habilita el botón
        loader.classList.add('hidden');
        convertBtn.disabled = false;
    }, 2000); // Simula 2 segundos de espera
});

// Lógica del botón de copiar
copyBtn.addEventListener('click', () => {
    if (outputCode.value) {
        navigator.clipboard.writeText(outputCode.value)
            .then(() => alert("¡Código copiado!"))
            .catch(err => console.error('Error al copiar:', err));
    }
});
