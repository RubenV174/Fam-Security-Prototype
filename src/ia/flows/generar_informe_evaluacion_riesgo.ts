'use server';
/**
 * @fileOverview Generates a risk assessment report based on user test responses.
 *
 * - generateRiskAssessmentReport - A function that generates a risk assessment report.
 * - GenerateRiskAssessmentReportInput - The input type for the generateRiskAssessmentReport function.
 * - GenerateRiskAssessmentReportOutput - The return type for the generateRiskAssessmentReport function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Updated input schema to expect a JSON string of answers
const GenerateRiskAssessmentReportInputSchema = z.object({
  testResponses: z
    .string()
    .describe('A JSON string representing an array of user responses. Each object in the array should have "id", "question", "type", and "answer" properties.'),
});
export type GenerateRiskAssessmentReportInput =
  z.infer<typeof GenerateRiskAssessmentReportInputSchema>;

const GenerateRiskAssessmentReportOutputSchema = z.object({
  report: z.string().describe('El informe de evaluación de riesgos generado en español.'),
  resources: z
    .string()
    .describe('Recursos externos relevantes para el usuario en español, preferiblemente de fuentes locales o confiables en el ámbito de la violencia familiar. Separar cada recurso con una nueva línea.'),
});
export type GenerateRiskAssessmentReportOutput =
  z.infer<typeof GenerateRiskAssessmentReportOutputSchema>;

export async function generateRiskAssessmentReport(
  input: GenerateRiskAssessmentReportInput
): Promise<GenerateRiskAssessmentReportOutput> {
  return generateRiskAssessmentReportFlow(input);
}

const findRelevantResources = ai.defineTool({
  name: 'findRelevantResources',
  description: 'Encuentra recursos externos relevantes basados en las respuestas del usuario. Prioriza recursos en español y locales si es posible.',
  inputSchema: z.object({
    analysisSummary: z
      .string()
      .describe('Un resumen del análisis de las respuestas del usuario, destacando áreas de riesgo o preocupación.'),
  }),
  // Output schema changed to return an array of strings
   outputSchema: z.array(z.string().describe('Una URL o descripción de un recurso relevante.')).describe('Una lista de recursos externos relevantes (URLs o descripciones).'),
},
async (input) => {
  // Placeholder: In a real app, this would query a database or API
  // based on keywords extracted from input.analysisSummary.
  console.log('findRelevantResources tool called with summary:', input.analysisSummary);

  const resources: string[] = [];

  // Example keyword matching (very basic)
  if (input.analysisSummary.includes('miedo') || input.analysisSummary.includes('control') || input.analysisSummary.includes('físico') || input.analysisSummary.includes('physical')) {
      resources.push('Línea de ayuda nacional contra la violencia doméstica: [Número de teléfono o sitio web local]');
      resources.push('Centro local de apoyo a víctimas de violencia: [Buscar información local]');
  }
  if (input.analysisSummary.includes('ansioso') || input.analysisSummary.includes('tenso') || input.analysisSummary.includes('discusión')) {
      resources.push('Servicios de consejería familiar o de pareja: [Buscar información local]');
  }
  if (input.analysisSummary.includes('apoyado') || input.analysisSummary.includes('supported')) {
       // Could add resources for strengthening family bonds if low support is indicated.
       resources.push('Talleres sobre comunicación familiar: [Buscar información local]');
  }


  // Always include a general resource if specific ones aren't found or as a fallback
  if (resources.length === 0) {
      resources.push('Recurso general de salud mental y bienestar familiar: [Sitio web gubernamental o de ONG reconocida]');
  }
  // Add a default example if still empty, indicating placeholder nature
   if (resources.length === 0) {
      resources.push('Placeholder: https://ejemplo.com/recursos-ayuda');
   }


  console.log('findRelevantResources tool returning:', resources);
  return resources; // Return array of strings
});


const prompt = ai.definePrompt({
  name: 'generateRiskAssessmentReportPrompt_es', // Renamed for clarity
  input: {
    schema: z.object({
      testResponses: z
        .string()
        .describe('Un JSON string con las respuestas del usuario: [{"id": 1, "question": "...", "type": "...", "answer": "..."}, ...]'),
    }),
  },
  output: {
    schema: z.object({
      report: z.string().describe('El informe de evaluación de riesgos generado en español. Debe ser comprensivo, empático y evitar lenguaje alarmista. Incluir un análisis de las respuestas y posibles áreas de riesgo.'),
      // The prompt output still expects a single string for resources,
      // but the flow will handle the array returned by the tool.
      resources: z
        .string()
        .describe('Un resumen o lista de recursos externos relevantes sugeridos por la herramienta `findRelevantResources`.'),
    }),
  },
  prompt: `Eres un asistente de IA experto en psicología y prevención de violencia familiar, con fluidez nativa en español. Tu tarea es generar un informe de evaluación de riesgo basado en las respuestas del usuario a un test gamificado. El informe debe ser escrito en español, ser empático, claro y evitar lenguaje clínico o alarmista.

Analiza las siguientes respuestas del usuario (en formato JSON):
{{{testResponses}}}

Basándote en estas respuestas:
1.  **Analiza las respuestas:** Identifica patrones, posibles áreas de preocupación (tensión, miedo, control, conflicto, falta de apoyo, interpretación de imágenes) y aspectos positivos. Considera la combinación de respuestas.
2.  **Genera el Informe:** Escribe un informe conciso y fácil de entender en español. Resume los hallazgos principales. Señala áreas que podrían indicar riesgo potencial, pero hazlo de manera sensible y orientadora, no diagnóstica. Sugiere la reflexión sobre estos puntos. Termina con una nota de apoyo, recordando que esto es una herramienta de autoconciencia.
3.  **Identifica Recursos:** Resume los puntos clave del análisis que indiquen necesidad de apoyo (p. ej., "indicios de tensión y miedo", "posible comportamiento controlador", "necesidad de mejorar comunicación"). Usa la herramienta \`findRelevantResources\` SÓLO SI el análisis identifica áreas claras de preocupación o riesgo. Pasa tu resumen de análisis como input a la herramienta. La herramienta devolverá una lista de recursos.
4.  **Formatea la Salida:** Asegúrate de que la salida JSON contenga las claves "report" (con el informe en español) y "resources" (con la lista de recursos obtenida de la herramienta, formateada como un string, o un mensaje indicando que no se sugieren recursos específicos si la herramienta no fue usada o no devolvió nada).

Informe:
`,
  tools: [findRelevantResources]
});

const generateRiskAssessmentReportFlow = ai.defineFlow<
  typeof GenerateRiskAssessmentReportInputSchema,
  typeof GenerateRiskAssessmentReportOutputSchema
>(
  {
    name: 'generateRiskAssessmentReportFlow',
    inputSchema: GenerateRiskAssessmentReportInputSchema,
    outputSchema: GenerateRiskAssessmentReportOutputSchema,
  },
  async (input) => {
    console.log("Flow input:", input);

    try {
      // Attempt to parse the JSON input string
      let parsedResponses;
      try {
        parsedResponses = JSON.parse(input.testResponses);
        if (!Array.isArray(parsedResponses)) {
          throw new Error('Input testResponses is not a valid JSON array.');
        }
         // Add basic validation for expected structure within the array
         if (parsedResponses.length > 0 && (typeof parsedResponses[0].question !== 'string' || typeof parsedResponses[0].answer !== 'string')) {
            throw new Error('JSON array items lack expected "question" or "answer" properties.');
         }

      } catch (e) {
        console.error("Error parsing input JSON:", e);
        // Provide a more informative error if JSON parsing fails
        return {
          report: `Error interno: Las respuestas proporcionadas no tienen el formato JSON esperado. (${e.message})`,
          resources: 'No se pudieron obtener recursos debido a un error de formato de entrada.',
        };
      }

      // Call the prompt with the original JSON string input
      const { output, toolRequests, toolResponses } = await prompt(input);

      console.log("Prompt raw output:", output);
      console.log("Tool requests:", toolRequests);
      console.log("Tool responses:", toolResponses);


      let finalReport = output?.report ?? 'No se pudo generar el informe.';
      let finalResources = 'No se sugieren recursos específicos en este momento.'; // Default message

      // Process tool responses if any
       if (toolResponses && toolResponses.length > 0) {
          const resourceToolResponse = toolResponses.find(response => response.toolName === 'findRelevantResources');
          if (resourceToolResponse && resourceToolResponse.response) {
            // The tool returns an array of strings
            const resourceList = resourceToolResponse.response as string[];
            if (Array.isArray(resourceList) && resourceList.length > 0) {
              // Join the array into a newline-separated string for the final output schema
              finalResources = resourceList.join('\n');
            } else {
               console.log("Tool findRelevantResources returned empty or invalid data:", resourceToolResponse.response);
            }
          }
       }


      // Ensure output matches the schema, even if prompt hallucinates structure slightly
      if (typeof finalReport !== 'string') {
        console.error('Generated report is not a string:', finalReport);
        finalReport = 'Error: El formato del informe generado es inválido.';
      }
       if (typeof finalResources !== 'string') {
        console.error('Generated resources are not a string:', finalResources);
         // Attempt to stringify if it's an array, otherwise use default
         if(Array.isArray(finalResources)) {
            finalResources = finalResources.join('\n');
         } else {
             finalResources = 'Error: El formato de los recursos generados es inválido.';
         }
      }


      console.log("Final structured output:", { report: finalReport, resources: finalResources });
      return {
        report: finalReport,
        resources: finalResources,
      };

    } catch (error: any) {
        console.error('Error within generateRiskAssessmentReportFlow:', error);
        return {
            report: `Error generando informe: ${error.message || 'Ocurrió un error desconocido en el flujo.'}`,
            resources: 'No se pudieron obtener recursos debido a un error interno.',
        };
    }
  }
);
