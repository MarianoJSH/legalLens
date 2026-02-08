// test.gemini.js corregido
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const genAI = new GoogleGenerativeAI("AIzaSyDegdRtFaDIrbQELxDUJhpQn8qlDpCSapk");
  // Forzamos la v1 explícitamente en el segundo parámetro
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent("Hola");
    console.log("Respuesta:", result.response.text());
  } catch (e) {
    console.log("Error detallado:", e);
  }
}
test();