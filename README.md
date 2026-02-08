📄 LegalLens AI - Analizador de Contratos Inteligente
LegalLens AI es una aplicación Full-Stack que utiliza Inteligencia Artificial de última generación para analizar contratos legales en segundos, identificando cláusulas de riesgo y sugiriendo mejoras para proteger al usuario.

🚀 Demo
Frontend: https://legal-lens-jade.vercel.app

Backend API: https://legallens-e004.onrender.com

🛠️ Stack Tecnológico
Frontend
Framework: Angular 19 (Uso de Signals para una reactividad eficiente).

Estilos: Tailwind CSS (Diseño responsivo y moderno).

Iconografía: Lucide Angular.

Despliegue: Vercel.

Backend
Framework: NestJS (Arquitectura modular y escalable).

IA: Llama 3.3 70B vía Groq Cloud API (Inferencia de ultra-baja latencia).

Lenguaje: TypeScript.

Despliegue: Render.

🌟 Características Principales
Análisis Predictivo: Identificación automática de cláusulas abusivas o de alto riesgo.

Resumen Ejecutivo: Generación de una síntesis clara del documento para no expertos legales.

Sugerencias de Negociación: Recomendaciones accionables para modificar términos desfavorables.

Arquitectura Full-Stack: Separación total entre cliente y servidor con comunicación segura vía CORS.

Velocidad Extrema: Gracias al motor de inferencia de Groq, los análisis se completan en menos de 2 segundos.

⚙️ Configuración Local
Si deseas ejecutar este proyecto localmente:

1. Clonar el repositorio
Bash
git clone https://github.com/MarianoJSH/legalLens.git
cd legalLens

3. Backend
Bash
cd backend
npm install
# Crea un archivo .env y añade tu API Key:
# GROQ_API_KEY=tu_clave_aqui
npm run start:dev

3. Frontend
Bash
cd frontend
npm install
ng serve
📈 Desafíos Técnicos Superados
Gestión de CORS: Configuración de seguridad para permitir comunicación entre diferentes proveedores de Cloud (Vercel & Render).

Prompt Engineering: Diseño de instrucciones precisas para que la IA devuelva un análisis legal estructurado y profesional.

Optimización de Producción: Configuración de entornos dinámicos en Angular para alternar entre API local y de producción.

👨‍💻 Autor
Mariano - Desarrollador Full-Stack
