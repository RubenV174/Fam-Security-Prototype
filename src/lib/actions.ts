'use server';

import { generateRiskAssessmentReport as generateRiskAssessmentReportFlow } from '@/ai/flows/generate-risk-assessment-report';
import type { GenerateRiskAssessmentReportInput, GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';

/**
 * Server action to generate the risk assessment report using the Genkit flow.
 * @param input The test responses as a JSON string.
 * @returns The generated report and resources, or an error structure.
 */
export async function generateRiskAssessmentReportAction(
  input: GenerateRiskAssessmentReportInput
): Promise<GenerateRiskAssessmentReportOutput> {
  try {
    // Basic input validation
    if (!input.testResponses || typeof input.testResponses !== 'string' || input.testResponses.trim() === '') {
      throw new Error('Entrada inválida: Las respuestas del test no pueden estar vacías.');
    }

    // Attempt to parse JSON early to catch format errors before calling the flow
    try {
        JSON.parse(input.testResponses);
    } catch (e: any) {
        console.error("Invalid JSON format in input:", e.message);
        throw new Error(`Formato de entrada inválido: Las respuestas deben ser un JSON válido. (${e.message})`);
    }


    console.log('Llamando al flujo Genkit con entrada:', input.testResponses);
    const result = await generateRiskAssessmentReportFlow(input);
    console.log('Flujo Genkit retornó:', result);

     // Check for error message potentially embedded in the report by the flow itself
     if (result && result.report && result.report.startsWith('Error generando informe:')) {
       console.error('Flow returned an error message in report:', result.report);
       // Propagate the error message from the flow
       return {
         report: result.report,
         resources: result.resources || 'No se pudieron obtener recursos debido a un error.',
       };
     }

     // Ensure the output structure is correct after the flow call
    if (!result || typeof result.report !== 'string' || typeof result.resources !== 'string') {
      console.error('El flujo Genkit retornó una estructura inesperada:', result);
      throw new Error('Error al generar el informe debido a un formato de salida de IA inesperado.');
    }

    return result;
  } catch (error: any) {
    console.error('Error en generateRiskAssessmentReportAction:', error);
    // Return a structured error response in Spanish
    return {
      report: `Error generando informe: ${error.message || 'Ocurrió un error desconocido.'}`,
      resources: 'No se pudieron obtener recursos debido a un error.',
    };
  }
}
