import { config } from 'dotenv';
config();

import '@/ai/flows/crop-recommendation.ts';
import '@/ai/flows/fertilizer-recommendation.ts';
import '@/ai/flows/weather-based-alerts.ts';
import '@/ai/flows/image-based-disease-detection.ts';
import '@/ai/flows/soil-guide.ts';