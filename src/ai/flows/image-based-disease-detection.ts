'use server';
/**
 * @fileOverview Image-based disease detection flow for identifying crop diseases from uploaded images.
 *
 * - detectCropDisease - Function to initiate the disease detection process.
 * - DetectCropDiseaseInput - Input type for the detectCropDisease function.
 * - DetectCropDiseaseOutput - Return type for the detectCropDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectCropDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectCropDiseaseInput = z.infer<typeof DetectCropDiseaseInputSchema>;

const DetectCropDiseaseOutputSchema = z.object({
  diseaseDetected: z.string().describe('The disease detected in the crop.'),
  remedies: z.string().describe('Suggested remedies for the detected disease.'),
});
export type DetectCropDiseaseOutput = z.infer<typeof DetectCropDiseaseOutputSchema>;

export async function detectCropDisease(input: DetectCropDiseaseInput): Promise<DetectCropDiseaseOutput> {
  return detectCropDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectCropDiseasePrompt',
  input: {schema: DetectCropDiseaseInputSchema},
  output: {schema: DetectCropDiseaseOutputSchema},
  prompt: `You are an expert in plant pathology. A farmer has uploaded an image of their crop.

Analyze the image and identify any diseases present. Provide specific remedies for the detected disease.

Image: {{media url=photoDataUri}}

Respond with the disease detected and suggested remedies for the farmer.`,
});

const detectCropDiseaseFlow = ai.defineFlow(
  {
    name: 'detectCropDiseaseFlow',
    inputSchema: DetectCropDiseaseInputSchema,
    outputSchema: DetectCropDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
