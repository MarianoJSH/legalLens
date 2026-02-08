import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: "root"
})
export class AnalysisService {
    // Inyectamos el cliente HTTP en Angular
    private readonly http = inject(HttpClient);

    // URL del backend
    private readonly apiUrl = `${environment.apiUrl}/analysis/analyze`;

    /**
     * Envía el texto del contrato al backend para ser analizado por Gemini.
     * Usamos 'firstValueFrom' para convertir el Observable en una Promesa,
     * lo cual es más sencillo de manejar con async/await.
     */

    async getLegalAnalysis(contractText: string) {
        return firstValueFrom (
            this.http.post<{ analysis: string }>(this.apiUrl, { text: contractText})
        );
    }
}