
// Reemplaza el bloque de 'setTimeout' en el script.js anterior con esto:

try {
    const response = await fetch('/.netlify/functions/translate', { // URL de tu función serverless
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source_lang: sourceLangSelect.value,
            code: sourceCode,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
        outputCode.value = `Error en la traducción: ${data.error}`;
    } else {
        outputCode.value = data.translated_code;
    }

} catch (error) {
    console.error("Fallo al llamar a la API:", error);
    outputCode.value = "Ocurrió un error. Por favor, intenta de nuevo.";
} finally {
    // Oculta el loader y habilita el botón
    loader.classList.add('hidden');
    convertBtn.disabled = false;
}
