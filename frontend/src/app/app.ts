import { Component, signal, inject } from '@angular/core';
import { AnalysisService } from './services/analysis.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly analysisService = inject(AnalysisService);

  // Definimos exactamente lo que el HTML reclama
  contractText = signal('');
  analysisResult = signal('');
  isLoading = signal(false);

  async onAnalyze() {
    if (!this.contractText().trim()) return;

    this.isLoading.set(true);
    this.analysisResult.set('Analizando documento... por favor espera.');

    try {
      const response = await this.analysisService.getLegalAnalysis(this.contractText());
      this.analysisResult.set(response.analysis);
    } catch (error) {
      this.analysisResult.set('Error al conectar con el servidor. ¿Está el backend encendido?');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
