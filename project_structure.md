# Project Structure: AgriAssist

This document provides an overview of the file and folder layout for the AgriAssist smart crop advisory system.

## Root Directory
- `components.json`: ShadCN UI configuration.
- `next.config.ts`: Next.js configuration settings.
- `package.json`: Project dependencies and scripts.
- `tailwind.config.ts`: Tailwind CSS theme and styling configuration.
- `tsconfig.json`: TypeScript compiler configuration.
- `.env`: (Local only) Environment variables for API keys.

## Source Code (`src/`)

### AI Logic (`src/ai/`)
- `genkit.ts`: Initialization of the Genkit AI framework.
- `dev.ts`: Entry point for Genkit development tools.
- `flows/`: Contains AI agent definitions.
    - `crop-recommendation.ts`: Suggests crops based on soil/location.
    - `fertilizer-recommendation.ts`: Suggests fertilizers.
    - `image-based-disease-detection.ts`: Vision-based crop diagnosis.
    - `weather-based-alerts.ts`: Location-based weather advisories.

### App Router (`src/app/`)
- `layout.tsx`: Root layout with fonts and providers.
- `page.tsx`: Main dashboard with tabs for different services.
- `actions.ts`: Server-side actions that bridge the UI and AI flows.
- `globals.css`: Global styles and ShadCN theme variables.

### Components (`src/components/`)
- `app/`: Custom application-specific components.
    - `header.tsx`: App branding and navigation header.
    - `crop-recommendation-form.tsx`: Input and results for crop advice.
    - `disease-detection-form.tsx`: Image upload and diagnosis display.
    - `weather-alert-form.tsx`: Input and alerts for weather.
- `ui/`: Reusable Radix-based UI components (buttons, cards, inputs, etc.) provided by ShadCN.

### Hooks & Utilities (`src/lib/`, `src/hooks/`)
- `lib/utils.ts`: Tailwind CSS class merging utility.
- `lib/placeholder-images.ts`: Logic for managing example images.
- `hooks/use-toast.ts`: Hook for displaying UI notifications.
- `hooks/use-mobile.tsx`: Hook for responsive design detection.

### Public (images)

- Icons 
- MP4 and Webm  
- Images        
- Favicon.ico  
- Favicon.png  
- Favicon.svg  
- Favicon.svg   
