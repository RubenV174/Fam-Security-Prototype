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

const GenerateRiskAssessmentReportInputSchema = z.object({
  testResponses: z
    .string()
    .describe('A string containing the user responses from the gamified test.'),
});
export type GenerateRiskAssessmentReportInput =
  z.infer<typeof GenerateRiskAssessmentReportInputSchema>;

const GenerateRiskAssessmentReportOutputSchema = z.object({
  report: z.string().describe('The generated risk assessment report.'),
  resources: z
    .string() // Assuming resources are returned as a string, adjust as needed.
    .describe('Relevant external resources for the user.'),
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
  description: 'Finds relevant external resources based on the user responses.',
  inputSchema: z.object({
    testResponses: z
      .string()
      .describe('A string containing the user responses from the gamified test.'),
  }),
  outputSchema: z.string().describe('A list of relevant external resources.'),
},
async input => {
  // TODO: Implement the logic to find relevant external resources based on the user responses.
  // This could involve calling external APIs or querying a database.
  return `Placeholder resource: https://example.com`;
});


const prompt = ai.definePrompt({
  name: 'generateRiskAssessmentReportPrompt',
  input: {
    schema: z.object({
      testResponses: z
        .string()
        .describe('A string containing the user responses from the gamified test.'),
    }),
  },
  output: {
    schema: z.object({
      report: z.string().describe('The generated risk assessment report.'),
      resources: z
        .string()
        .describe('Relevant external resources for the user.'),
    }),
  },
  prompt: `You are an AI assistant designed to generate risk assessment reports based on user test responses related to family violence prevention.  Based on the user's test responses, generate a risk assessment report and suggest relevant external resources using the findRelevantResources tool.

Test Responses: {{{testResponses}}}

Report:
`, // Removed Handlebars try at calling tool.
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
  async input => {
    const { output } = await prompt(input);
    //console.log("prompt output: ", output);
    return {
      report: output?.report ?? 'Failed to generate report.',
      resources: output?.resources ?? 'No resources found.',
    };
  }
);
