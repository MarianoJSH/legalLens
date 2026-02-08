import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk'; // Importamos la SDK de Groq

/**
 * Servicio encargado de la comunicación con la API de Groq Cloud.
 * Centralizamos aquí la lógica de IA para que pueda ser reutilizada en otros módulos.
 */
@Injectable()
export class AnalysisService {
  // El cliente de Groq. Se inicializa con la API KEY en el constructor.
  private readonly groq: Groq;

  // Definimos el modelo a utilizar. 
  // 'llama-3.3-70b-versatile' es excelente para razonamiento legal y es muy veloz.
  private readonly modelId = 'llama-3.3-70b-versatile';

  constructor(private readonly configService: ConfigService) {
    // Leemos la clave desde el archivo .env usando el ConfigService
    const apiKey = this.configService.get<string>('GROQ_API_KEY');

    // Validamos que la API Key esté definida para evitar errores en tiempo de ejecución
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }

    // Inicializamos el cliente de Groq con la clave de nuestra configuración
    this.groq = new Groq({
      apiKey: apiKey,
    });
  }

  /**
   * Recibe un texto, construye un prompt y solicita el análisis a Groq.
   * @param text Contrato legal pegado por el usuario.
   * @returns Objeto con el análisis generado por la IA.
   */
  async analyzeText(text: string) {
    try {
      // Definimos el "rol" y las instrucciones para la IA.
      // Un prompt bien estructurado garantiza una respuesta útil y profesional.
      const prompt = `
            Eres un asistente legal experto en derecho contractual.
            Tu tarea es analizar el siguiente texto y proporcionar un informe estructurado.
            
            Por favor, responde en español y utiliza el siguiente formato:
            1. **Resumen ejecutivo**: De qué trata el documento en 2 o 3 frases como máximo.
            2. **Cláusulas de riesgo**: Identifica puntos que podrían perjudicar al firmante o a la persona que acepta este contrato.
            3. **Sugerencias**: Qué cambios o preguntas debería hacer el usuario antes de firmar.
            
            TEXTO DEL CONTRATO:
            ${text}
            `;

      // Enviamos el prompt al modelo mediante una completación de chat.
      // Groq procesa esto a una velocidad increíble comparado con otros proveedores.
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: this.modelId,
        temperature: 0.3, // Temperatura baja para que la respuesta sea más precisa y menos creativa
      });

      // Extraemos el contenido del mensaje de la respuesta de Groq.
      const analysisText = chatCompletion.choices[0]?.message?.content || 'No se pudo generar un análisis.';

      // Devolvemos un objeto estructurado para que el Frontend lo maneje fácilmente.
      return {
        success: true,
        analysis: analysisText,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // Es vital capturar errores (límites de cuota, fallos de red, etc.)
      console.error('Error en AnalysisService (Groq):', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al procesar el análisis',
      };
    }
  }
}