'use server';

/**
 * @fileOverview Recommends fertilizers based on the suggested crops.
 *
 * - fertilizerRecommendation - A function that suggests fertilizers for the crops.
 * - FertilizerRecommendationInput - The input type for the fertilizerRecommendation function.
 * - FertilizerRecommendationOutput - The return type for the fertilizerRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerRecommendationInputSchema = z.object({
  cropRecommendations: z
    .string()
    .describe('The recommended crops for the farmer.'),
  soilType: z.string().describe('The type of soil the farmer has.'),
  location: z.string().describe('The location of the farm.'),
});
export type FertilizerRecommendationInput = z.infer<
  typeof FertilizerRecommendationInputSchema
>;

const FertilizerRecommendationOutputSchema = z.object({
  fertilizerRecommendations: z
    .string()
    .describe('The recommended fertilizers for the crops.'),
});
export type FertilizerRecommendationOutput = z.infer<
  typeof FertilizerRecommendationOutputSchema
>;

export async function fertilizerRecommendation(
  input: FertilizerRecommendationInput
): Promise<FertilizerRecommendationOutput> {
  return fertilizerRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerRecommendationPrompt',
  input: {schema: FertilizerRecommendationInputSchema},
  output: {schema: FertilizerRecommendationOutputSchema},
  prompt: `You are an expert agricultural advisor.

  Based on the recommended crops, soil type and location, provide fertilizer recommendations.

  Recommended Crops: {{{cropRecommendations}}}
  Soil Type: {{{soilType}}}
  Location: {{{location}}}
  `,
});

const fertilizerRecommendationFlow = ai.defineFlow(
  {
    name: 'fertilizerRecommendationFlow',
    inputSchema: FertilizerRecommendationInputSchema,
    outputSchema: FertilizerRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
