'use server';

import { generateRiskAssessmentReport as generateRiskAssessmentReportFlow } from '@/ai/flows/generate-risk-assessment-report';
import type { GenerateRiskAssessmentReportInput, GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';

/**
 * Server action to generate the risk assessment report using the Genkit flow.
 * @param input The test responses.
 * @returns The generated report and resources.
 */
export async function generateRiskAssessmentReportAction(
  input: GenerateRiskAssessmentReportInput
): Promise<GenerateRiskAssessmentReportOutput> {
  try {
    // Basic input validation (can be expanded)
    if (!input.testResponses || typeof input.testResponses !== 'string' || input.testResponses.trim() === '') {
      throw new Error('Invalid input: Test responses cannot be empty.');
    }

    console.log('Calling Genkit flow with input:', input.testResponses);
    const result = await generateRiskAssessmentReportFlow(input);
    console.log('Genkit flow returned:', result);

     // Ensure the output structure is correct
    if (!result || typeof result.report !== 'string' || typeof result.resources !== 'string') {
      console.error('Genkit flow returned unexpected structure:', result);
      throw new Error('Failed to generate report due to unexpected AI output format.');
    }

    return result;
  } catch (error: any) {
    console.error('Error in generateRiskAssessmentReportAction:', error);
    // Return a structured error response
    return {
      report: `Error generating report: ${error.message || 'An unknown error occurred.'}`,
      resources: 'Could not fetch resources due to an error.',
    };
  }
}
