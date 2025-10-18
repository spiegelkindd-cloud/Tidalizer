## Alcances y descripción del proyecto

### **1. Brief del Proyecto: "Tidalizer"**

* **Contexto:** El *live coding* es una práctica de performance artística donde se crea música y/o visuales escribiendo código en tiempo real. **Tidal Cycles** (basado en Haskell) y **Strudel** (basado en JavaScript) son dos de los entornos más populares para la creación de patrones musicales algorítmicos. Ambos comparten conceptos fundamentales inspirados en la música de patrones, pero utilizan sintaxis completamente diferentes, lo que crea una barrera para la colaboración y el aprendizaje entre sus comunidades.

* **Problema:** Un músico o artista que trabaja en Tidal Cycles no puede compartir fácilmente sus patrones con un colaborador que usa Strudel, y viceversa. La traducción manual es tediosa y propensa a errores, especialmente con patrones complejos. No existe una herramienta directa y accesible para esta conversión.

* **Objetivo del Proyecto:** Desarrollar un sitio web **MVP (Producto Mínimo Viable)** en 3 días que actúe como un traductor bidireccional de patrones de código entre Tidal Cycles y Strudel. La herramienta debe ser intuitiva para un público técnico-artístico que ya está familiarizado con al menos uno de los dos lenguajes.

* **Alcance:**
    * **Incluido (In-Scope):**
        * Una interfaz web con dos áreas de texto: una para el código de entrada y otra para el de salida.
        * Botones para seleccionar la dirección de la conversión (Tidal -> Strudel o Strudel -> Tidal).
        * Integración con una API de un Modelo de Lenguaje Grande (LLM como GPT u otro) para realizar la lógica de traducción.
        * Manejo de patrones musicales básicos y de complejidad media (secuencias, polifonía, efectos simples).
    * **Excluido (Out-of-Scope):**
        * Un intérprete o validador de código completo. La herramienta asumirá que el código de entrada es sintácticamente correcto.
        * Sistemas de cuentas de usuario, guardado de patrones en la nube.
        * Traducción de funciones personalizadas o configuraciones complejas de `startup`.

---

### **2. Criterios de Éxito Medibles**

1.  **Funcionalidad del Traductor:** El sistema debe traducir correctamente al menos el **80% de los patrones comunes** (ver tabla de ejemplos) con una fidelidad musical reconocible.
2.  **Usabilidad de la Interfaz:** Un usuario debe poder realizar una conversión de código en **menos de 3 clics** desde que carga la página.
3.  **Rendimiento:** El tiempo total desde que se presiona "Convertir" hasta que se muestra el resultado no debe exceder los **5 segundos** en promedio.
4.  **Despliegue:** El sitio web funcional debe estar desplegado en un servicio de hosting gratuito (como Netlify, Vercel o GitHub Pages) al final del tercer día.

---

### **3. Plan de Acción en 3 Días**

#### **Paso 1: Diseño de Interfaz y Maquetado Front-End (Día 1)**
* **Descripción:** Crear la estructura visual y funcional de la página. El objetivo es tener una interfaz con la que el usuario pueda interactuar, aunque la lógica de conversión aún no esté conectada.
* **Tareas:**
    1.  **Mock-up:** Diseñar un boceto simple que muestre las dos áreas de texto, los selectores de lenguaje y el botón de "Convertir". 
    2.  **HTML:** Escribir la estructura semántica de la página (`index.html`).
    3.  **CSS:** Aplicar estilos básicos para que la interfaz sea clara y usable (`style.css`). Un diseño minimalista y oscuro suele ser bien recibido en la comunidad de *creative coding*.
    4.  **JavaScript (DOM):** Escribir el código JS inicial para manejar los eventos de los botones y leer/escribir en las áreas de texto (`script.js`).
* **Dependencias:** Ninguna. Este es el punto de partida.

#### **Paso 2: Ingeniería de Prompt y Lógica de API (Día 2)**
* **Descripción:** Este es el núcleo del proyecto. En lugar de construir un traductor desde cero (imposible en 3 días), usaremos un LLM. El trabajo consiste en "enseñarle" a la API cómo hacer la conversión mediante un *prompt* muy bien diseñado.
* **Tareas:**
    1.  **Obtener API Key:** Registrarse en una plataforma como OpenAI o Google AI Studio para obtener una clave de API.
    2.  **Diseñar el "System Prompt":** Este es el conjunto de instrucciones maestras para la IA. Debe incluir:
        * **Rol:** "Actúa como un experto en live coding, especializado en Tidal Cycles y Strudel."
        * **Tarea:** "Tu función es traducir patrones musicales de un lenguaje a otro. Recibirás un objeto JSON con el código fuente y la dirección de la traducción, y deberás devolver un objeto JSON con el código traducido."
        * **Reglas:** "No expliques el código. No añadas comentarios. Si no puedes traducir el código, devuelve un mensaje de error claro. Mantén la estructura musical intacta."
        * **Ejemplos (Few-shot learning):** Proporcionar 3-5 ejemplos claros de conversiones correctas (usar la tabla de abajo).
    3.  **Probar el Prompt:** Usar una herramienta como Postman o el Playground de la API para enviar peticiones de prueba y refinar el prompt hasta que las respuestas sean consistentemente buenas.
* **Dependencias:** Front-end básico para tener una idea clara de la interacción.

#### **Paso 3: Integración, Pruebas y Despliegue (Día 3)**
* **Descripción:** Conectar el front-end con la lógica de la API y subir el proyecto a internet.
* **Tareas:**
    1.  **Integración JS:** En `script.js`, escribir la función `async` que use `fetch()` para llamar a la API del LLM. Esta función debe:
        * Construir el cuerpo de la petición (el prompt y el código del usuario).
        * Enviar la petición con la API Key (¡cuidado de no exponerla en el código público!). Se recomienda usar una función serverless o un proxy simple.
        * Manejar la respuesta: parsear el JSON y mostrar el código traducido o el error en el área de texto de salida.
    2.  **Pruebas End-to-End:** Probar la aplicación completa con una variedad de patrones.
    3.  **Despliegue:** Usar un servicio como Netlify o Vercel para desplegar el sitio web desde un repositorio de GitHub.
* **Dependencias:** Un prompt de API funcional y el front-end completo.

---

### **4. Riesgos y Mitigaciones**

| Riesgo | Probabilidad | Impacto | Mitigación |
| :--- | :--- | :--- | :--- |
| **Traducciones Inconsistentes de la API** | Alta | Alto | **Ingeniería de Prompt Robusta:** El prompt debe ser muy específico, con múltiples ejemplos (few-shot) y restricciones claras. Definir un formato de salida estricto como JSON ayuda a la IA a ser más predecible. |
| **Costos o Límites de la API** | Media | Medio | **Gestión de la API Key:** Usar los créditos gratuitos que ofrecen las plataformas. Implementar un "debounce" en el front-end para evitar envíos múltiples y accidentales. Establecer alertas de presupuesto en la plataforma de la API. |
| **Manejo de Código Complejo o Erróneo** | Alta | Medio | **Aceptar las Limitaciones del MVP:** El prompt debe instruir a la IA para que devuelva un mensaje de error claro como `{"error": "Sintaxis no reconocida o demasiado compleja para traducir."}`. La interfaz debe mostrar este error de forma amigable. |
| **Exposición de la API Key en el Cliente**| Alta | Crítico | **Uso de Funciones Serverless:** Desplegar una función serverless (en Netlify, Vercel, etc.) que actúe como intermediario. El front-end llama a esta función, y la función (que corre en el servidor) es la que llama de forma segura a la API del LLM con la clave. |

---

### **5. Tabla de Conversión de Patrones (Para el Prompt de la API)**

| Concepto Musical | Código en Tidal Cycles (Haskell) | Código en Strudel (JavaScript) |
| :--- | :--- | :--- |
| **Secuencia Simple** | `d1 $ sound "bd sd hh cp"` | `mini.parse('bd sd hh cp')` |
| **Polifonía / Múltiples Pistas** | `d1 $sound "bd sd"<br>d2$ sound "arpy*4"` | `stack(<br>  s("bd sd"),<br>  s("arpy*4")<br>)` |
| **Definir Samples (Uso de `s`)**| `d1 $ s "kick snare:2"` | `s("kick snare:2")` |
| **Aplicar un Efecto** | `d1 $ sound "bd sd" # lpf 800` | `s("bd sd").lpf(800)` |
| **Manipulación de Patrones** | `d1 $every 4 (rev)$ sound "bd sd hh cp"` | `s("bd sd hh cp").every(4, rev)` |
| **Euclidean Rhythms** | `d1 $ s "bd(3,8)"` | `s("bd(3,8)")` |
| **Silencios** | `d1 $ sound "bd ~ sd ~"` | `s("bd ~ sd ~")` |
| **Combinar Patrones** | `d1 $ sound "<bd sd> cp"` | `s("<bd sd> cp")` |

> **Consejo de estratega:** El éxito de este proyecto depende casi en un 90% de la calidad de tu *system prompt* para la API. Dedicar la mayor parte del Día 2 a experimentar y refinar esas instrucciones.
