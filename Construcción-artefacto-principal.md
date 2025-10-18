# Construcción (artefacto principal)

### **1. Mock-up del Sitio Web: "Tidalizer"**

El diseño es minimalista, funcional y utiliza un tema oscuro, popular en entornos de desarrollo y *creative coding*. La prioridad es la claridad y la facilidad de uso.

**Estructura y Componentes:**

1.  **Título Principal (`<h1>`):** "Tidalizer" con un subtítulo: "Un traductor de patrones entre Tidal Cycles y Strudel".
2.  **Área de Conversión (Contenedor Principal):** Un `div` que ocupa la mayor parte de la pantalla y contiene dos columnas.
3.  **Columna de Entrada (`Izquierda`):**
      * **Selector de Lenguaje (`<select>`):** Un menú desplegable para elegir el lenguaje de entrada ("Tidal Cycles (Haskell)" o "Strudel (JavaScript)").
      * **Área de Texto (`<textarea>`):** Un editor de texto grande donde el usuario pega su código. Tendrá numeración de líneas y una fuente monoespaciada para legibilidad.
4.  **Columna Central (Acciones):**
      * **Botón de Conversión (`<button>`):** Un botón grande con el ícono "→" o el texto "Convertir". Al hacer clic, se activa la llamada a la API. Estará deshabilitado mientras la conversión está en proceso para evitar envíos duplicados.
      * **Indicador de Carga:** Un pequeño *spinner* o animación que aparece junto al botón cuando la conversión está en curso.
5.  **Columna de Salida (`Derecha`):**
      * **Título del Lenguaje (`<h2>`):** Muestra el lenguaje de destino (ej. "Strudel (JavaScript)").
      * **Área de Texto de Salida (`<textarea>`):** Muestra el código traducido. Es de solo lectura (`readonly`) para evitar que el usuario lo edite por error.
      * **Botón de Copiar:** Un pequeño ícono para copiar el código de salida al portapapeles con un solo clic.
6.  **Pie de Página (`<footer>`):** Información breve sobre el proyecto, un enlace a su repositorio de GitHub y una nota sobre el uso de una API para la traducción.

-----

### **2. Estructura Front-End Básica (HTML, CSS, JavaScript)**

Este código crea la estructura visual y la interactividad del lado del cliente.

#### **`index.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tidalizer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Tidalizer 🎹</h1>
        <p>Traductor de patrones entre Tidal Cycles y Strudel</p>
    </header>

    <main class="converter-container">
        <div class="code-column">
            <label for="source-lang">Desde:</label>
            <select id="source-lang">
                <option value="tidal" selected>Tidal Cycles (Haskell)</option>
                <option value="strudel">Strudel (JavaScript)</option>
            </select>
            <textarea id="input-code" placeholder="Pega tu código de Tidal aquí...&#10;d1 $ sound &quot;bd sd hh cp&quot;"></textarea>
        </div>

        <div class="action-column">
            <button id="convert-btn">Convertir →</button>
            <div id="loader" class="loader hidden"></div>
        </div>

        <div class="code-column">
            <label for="target-lang">Hacia:</label>
            <input type="text" id="target-lang" value="Strudel (JavaScript)" readonly>
            <textarea id="output-code" placeholder="Aquí aparecerá el código traducido..." readonly></textarea>
            <button id="copy-btn" title="Copiar al portapapeles">📋</button>
        </div>
    </main>

    <footer>
        <p>Creado como un MVP. La traducción es realizada por una IA.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

#### **`style.css`**

```css
/* Estilos generales y tema oscuro */
body {
    background-color: #1a1a1a;
    color: #f0f0f0;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    min-height: 100vh;
}

header, footer { text-align: center; margin: 20px 0; }
header h1 { margin: 0; }

/* Contenedor principal del conversor */
.converter-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 90%;
    max-width: 1200px;
}

.code-column { display: flex; flex-direction: column; flex: 1; }
.action-column { display: flex; flex-direction: column; align-items: center; margin-top: 50px; }

/* Estilos para áreas de texto y inputs */
textarea, select, input {
    background-color: #2a2a2a;
    color: #f0f0f0;
    border: 1px solid #444;
    border-radius: 5px;
    padding: 10px;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
}

textarea { height: 40vh; resize: vertical; }

/* Estilos de botones y loader */
button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
}
button:hover { background-color: #0056b3; }
#copy-btn { align-self: flex-end; margin-top: 5px; padding: 5px 10px; }
.loader { border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite; margin-top: 10px; }
.hidden { display: none; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
```

#### **`script.js`**

```javascript
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
```

-----

### **3. Manual de Integración de API (LLM)**

Este manual detalla cómo usar un Modelo de Lenguaje Grande (como GPT-4, Claude 3 o Gemini) para la lógica de conversión.

#### **Supuestos**

1.  **API Key Segura:** Se asume que tienes una clave de API de un proveedor (OpenAI, Google, etc.). **NUNCA** debes poner esta clave directamente en el `script.js`. La mejor práctica es usar una **función serverless** (Netlify Functions, Vercel Serverless Functions) que actúe como un proxy seguro. El front-end llama a tu función serverless, y esta (en el backend) llama de forma segura a la API del LLM.
2.  **API Asíncrona:** La comunicación con la API es asíncrona. El front-end debe manejar estados de "carga" para informar al usuario que la traducción está en proceso.
3.  **Formato JSON:** La comunicación con la API se realizará en formato JSON para estructurar las peticiones y respuestas de manera predecible.

#### **Estructura de la Petición y el Prompt (Input)**

El front-end enviará a la función serverless un objeto JSON simple. La función serverless construirá un *prompt* detallado para el LLM.

  * **Prompt del Sistema (System Prompt):** Esta es la instrucción maestra que define el comportamiento de la IA. Se envía una sola vez al inicio de una conversación o como parte de cada petición.

    ```
    Eres "Tidalizer", un asistente experto en "live coding" especializado en la traducción precisa de patrones musicales entre Tidal Cycles (Haskell) y Strudel (JavaScript).

    Tu única función es traducir el código que se te proporciona. Sigue estas reglas estrictamente:
    1.  **Entrada y Salida en JSON:** Recibirás una solicitud con el código fuente y deberás responder únicamente con un objeto JSON que contenga la clave "translated_code" con el código traducido, o la clave "error" si no puedes traducirlo.
    2.  **Sin Explicaciones:** No añadas comentarios, explicaciones, markdown, ni ningún texto introductorio o de despedida. Solo el objeto JSON.
    3.  **Fidelidad Musical:** Prioriza mantener la estructura rítmica y melódica del patrón original.
    4.  **Manejo de Errores:** Si el código de entrada es sintácticamente incorrecto o demasiado complejo para traducir, devuelve un JSON con una clave "error".
    ```

  * **Prompt del Usuario (User Prompt):** Este es el contenido específico para cada conversión. Incluye ejemplos para guiar a la IA (*few-shot prompting*).

    ```
    Traduce el siguiente código. Aquí tienes algunos ejemplos de referencia:

    ### Ejemplo 1: Tidal a Strudel
    - Entrada: `d1 $ sound "bd sd hh*2"`
    - Salida: `{"translated_code": "s(\"bd sd hh*2\")"}`

    ### Ejemplo 2: Strudel a Tidal
    - Entrada: `stack(s("bd(3,8)"), s("arpy*4").lpf(800))`
    - Salida: `{"translated_code": "d1 $ stack [s \"bd(3,8)\", s \"arpy*4\" # lpf 800]"}`

    ### Ejemplo 3: Error
    - Entrada: `una función muy compleja que no sabes traducir`
    - Salida: `{"error": "La sintaxis es demasiado compleja o no es soportada."}`

    ---

    ### Tarea Actual:
    - Lenguaje Fuente: [tidal/strudel]
    - Código a Traducir:
    \`\`\`
    [Aquí va el código del usuario]
    \`\`\`

    Tu respuesta debe ser solo el objeto JSON final.
    ```

#### **Implementación en `script.js` (Llamando a la Función Serverless)**

```javascript
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
```

#### **Notas para Mantenimiento e Iteración**

  * **Refinamiento del Prompt:** La calidad de la traducción depende al 100% del prompt. Si encuentras traducciones incorrectas, **añade ese caso específico como un nuevo ejemplo** en el "User Prompt" para corregir el comportamiento de la IA en futuras peticiones.
  * **Actualización de Librerías:** Tidal Cycles y Strudel evolucionan. Periódicamente, revisa si hay cambios de sintaxis importantes en cualquiera de los dos y actualiza los ejemplos en el prompt.
  * **Análisis de Errores:** Si muchos usuarios reciben errores en patrones similares, considera añadir ejemplos específicos que enseñen a la IA cómo manejar esa estructura, o aclara en la UI que esa sintaxis no está soportada.
  * **Cambio de Modelo:** Puedes experimentar con diferentes modelos de IA (GPT-3.5, GPT-4, Claude, Gemini, etc.) para ver cuál ofrece mejores resultados o es más rentable. La lógica de la aplicación no cambiará, solo el endpoint de la API y quizás el formato del prompt.
