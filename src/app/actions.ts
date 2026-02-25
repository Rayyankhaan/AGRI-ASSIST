'use server';

import { z } from 'zod';
import { recommendCrops } from '@/ai/flows/crop-recommendation';
import { fertilizerRecommendation } from '@/ai/flows/fertilizer-recommendation';
import { detectCropDisease } from '@/ai/flows/image-based-disease-detection';
import { weatherBasedAlerts } from '@/ai/flows/weather-based-alerts';

const cropRecommedationSchema = z.object({
  location: z.string().min(3, 'Location is required.'),
  soilType: z.string().min(3, 'Soil type is required.'),
});

export async function getCropAndFertilizerRecommendations(
  prevState: any,
  formData: FormData
) {
  try {
    const input = cropRecommedationSchema.parse({
      location: formData.get('location'),
      soilType: formData.get('soilType'),
    });

    const cropResult = await recommendCrops(input);

    const fertilizerResult = await fertilizerRecommendation({
      cropRecommendations: cropResult.crops,
      soilType: input.soilType,
      location: input.location,
    });

    return {
      cropRecommendation: cropResult.crops,
      fertilizerRecommendation: fertilizerResult.fertilizerRecommendations,
      error: null,
    };
  } catch (e: any) {
    return {
      cropRecommendation: null,
      fertilizerRecommendation: null,
      error: e.message || 'An unexpected error occurred.',
    };
  }
}

const diseaseDetectionSchema = z.object({
  photoDataUri: z.string().min(1, 'Image data is missing.'),
});

export async function getDiseaseDetection(prevState: any, formData: FormData) {
  try {
    const input = diseaseDetectionSchema.parse({
      photoDataUri: formData.get('photoDataUri'),
    });

    const result = await detectCropDisease(input);

    return {
      ...result,
      error: null,
    };
  } catch (e: any) {
    return {
      diseaseDetected: null,
      remedies: null,
      error: e.message || 'An unexpected error occurred.',
    };
  }
}

const weatherAlertSchema = z.object({
  location: z.string().min(3, 'Location is required.'),
  crop: z.string().min(3, 'Crop type is required.'),
});

export async function getWeatherAlert(prevState: any, formData: FormData) {
  try {
    const input = weatherAlertSchema.parse({
      location: formData.get('location'),
      crop: formData.get('crop'),
    });

    const result = await weatherBasedAlerts(input);

    return {
      ...result,
      error: null,
    };
  } catch (e: any) {
    return {
      alert: null,
      error: e.message || 'An unexpected error occurred.',
    };
  }
}


const soilGuideSchema = z.object({
  soilType: z.string().min(1, 'Soil type is required.'),
});

export async function getSoilGuideAction(prevState: any, formData: FormData) {
  try {
    const input = soilGuideSchema.parse({
      soilType: formData.get('soilType'),
    });

    const result = await getSoilGuide(input);

    return {
      ...result,
      error: null,
    };
  } catch (e: any) {
    return {
      characteristics: null,
      suitableCrops: null,
      improvementTips: null,
      error: e.message || 'An unexpected error occurred.',
    };
  }
}
