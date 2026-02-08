import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

/**
 * El Controlador define las rutas (endpoints) de la API.
 * Al usar @Controller('analysis'), todas las rutas dentro de este archivo
 * empezarán por http://localhost:3000/analysis
 */

@Controller('analysis')
export class AnalysisController {

    // Inyectamos el servicio de análisis mediante el constructor.
    // NestJS se encarga de crear una instancia de AnalysisService automáticamente.
    constructor(private readonly analysisServicie: AnalysisService) {}

    /**
     * Endpoint de tipo POST para recibir el texto del contrato.
     * Ruta final: POST http://localhost:3000/analysis/text
     * * @Body('text') es un decorador que busca la propiedad "text"
     * dentro del cuerpo (JSON) de la petición que envía Angular.
     */

    @Post('text')
    async analyze(@Body('text') text: string) {

        // 1. Validación básica de seguridad:
        // Si el usuario envía el campo vacío, no perdemos tiempo (ni dinero de API)
        if (!text || text.trim().length < 10) {
            // Lanzamos  una excepción estándar de NestJS (error 400)
            throw new BadRequestException('El texto del contrato es demasiado corto o está vacío');
        }

        // 2. Registro de actividad (Logging):
        // Útil para saber que está pasando en el servidor de desarrollo
        console.log(`[Análisis] Nueva petición recibida. Longitud del texto: ${text.length} caracteres`);

        // 3. Llamamos al servicio:
        // Delegamos la lógica pesada (la comunicación de la IA) al servicio
        const result = await this.analysisServicie.analyzeText(text);

        // 4. Respuesta al cliente:
        // Devolvemos el resultado que viene del servicio directamente del Frontend.
        return result;
    }
}
