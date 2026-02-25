
'use server';

/**
 * @fileOverview A soil suitability and crop guide AI agent.
 *
 * - getSoilGuide - A function that provides crop suitability for a specific soil type.
 * - SoilGuideInput - The input type for the getSoilGuide function.
 * - SoilGuideOutput - The return type for the getSoilGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SoilGuideInputSchema = z.object({
  soilType: z.string().describe('The type of soil to get information for.'),
});
export type SoilGuideInput = z.infer<typeof SoilGuideInputSchema>;

const SoilGuideOutputSchema = z.object({
  characteristics: z.string().describe('Key characteristics of the soil type.'),
  suitableCrops: z.array(z.string()).describe('List of 5-7 crops that grow easily in this soil. Return just the names.'),
  improvementTips: z.string().describe('Advice on how to improve this soil for better yield.'),
});
export type SoilGuideOutput = z.infer<typeof SoilGuideOutputSchema>;

export async function getSoilGuide(input: SoilGuideInput): Promise<SoilGuideOutput> {
  return soilGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'soilGuidePrompt',
  input: {schema: SoilGuideInputSchema},
  output: {schema: SoilGuideOutputSchema},
  prompt: `You are an expert soil scientist and agricultural consultant. 
  The user is asking for a guide on a specific soil type: {{{soilType}}}.

  Please provide:
  1. Characteristics: Describe the texture, drainage, and nutrient profile of this soil.
  2. Suitable Crops: Provide a list of 5-7 crop names (e.g., ["Rice", "Wheat", "Sugarcane", "Cotton"]) that grow easily and naturally in this soil.
  3. Improvement Tips: Provide 3 actionable tips for a small-scale farmer to improve this soil's health.

  Keep the language simple and encouraging for a farmer.`,
});

const soilGuideFlow = ai.defineFlow(
  {
    name: 'soilGuideFlow',
    inputSchema: SoilGuideInputSchema,
    outputSchema: SoilGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
