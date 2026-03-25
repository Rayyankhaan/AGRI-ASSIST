'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing weather-based alerts to farmers.
 *
 * - WeatherBasedAlertsInput: The input type for the weatherBasedAlerts function.
 * - WeatherBasedAlertsOutput: The output type for the weatherBasedAlerts function.
 * - weatherBasedAlerts: A function that triggers the weather alert flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherBasedAlertsInputSchema = z.object({
  location: z.string().describe('The location (name or coordinates) for which to fetch weather data.'),
  crop: z.string().describe('The type of crop planted.'),
});
export type WeatherBasedAlertsInput = z.infer<typeof WeatherBasedAlertsInputSchema>;

const WeatherBasedAlertsOutputSchema = z.object({
  alert: z.string().describe('A real-time alert message based on weather conditions and crop type.'),
});
export type WeatherBasedAlertsOutput = z.infer<typeof WeatherBasedAlertsOutputSchema>;

export async function weatherBasedAlerts(input: WeatherBasedAlertsInput): Promise<WeatherBasedAlertsOutput> {
  return weatherBasedAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherBasedAlertsPrompt',
  input: {schema: WeatherBasedAlertsInputSchema},
  output: {schema: WeatherBasedAlertsOutputSchema},
  prompt: `You are an agricultural expert providing real-time weather alerts to farmers.

  The user has provided their location: {{{location}}}. If this location is provided as coordinates (latitude, longitude), identify the general region.

  Based on the current weather conditions for this location and the crop type: {{{crop}}}, 
  generate a concise alert message that informs the farmer of any potential weather-related risks and provides actionable advice. 
  
  Consider seasonal patterns, temperature, precipitation, wind speed, and humidity in relation to the specific needs of the crop.
  `,
});

const weatherBasedAlertsFlow = ai.defineFlow(
  {
    name: 'weatherBasedAlertsFlow',
    inputSchema: WeatherBasedAlertsInputSchema,
    outputSchema: WeatherBasedAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);