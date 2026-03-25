import { Header } from '@/components/app/header';
import CropRecommendationForm from '@/components/app/crop-recommendation-form';
import DiseaseDetectionForm from '@/components/app/disease-detection-form';
import WeatherAlertForm from '@/components/app/weather-alert-form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <div className="w-full max-w-4xl">
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">

              {/* 🌱 Recommendations */}
              <TabsTrigger value="recommendations" className="flex items-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="mr-2 h-4 w-4 object-contain"
                >
                  <source src="/icons/plant.webm" type="video/webm" />
                  <source src="/icons/plant.mp4" type="video/mp4" />
                </video>
                Recommendations
              </TabsTrigger>

              {/* 🐛 Disease Detection */}
              <TabsTrigger value="disease-detection" className="flex items-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="mr-2 h-4 w-4 object-contain"
                >
                  <source src="/icons/bug.webm" type="video/webm" />
                  <source src="/icons/bug.mp4" type="video/mp4" />
                </video>
                Disease Detection
              </TabsTrigger>

              {/* ☁️ Weather Alerts */}
              <TabsTrigger value="weather-alerts" className="flex items-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="mr-2 h-4 w-4 object-contain"
                >
                  <source src="/icons/cloud.webm" type="video/webm" />
                  <source src="/icons/cloud.mp4" type="video/mp4" />
                </video>
                Weather Alerts
              </TabsTrigger>

            </TabsList>

            <TabsContent value="recommendations" className="mt-6">
              <CropRecommendationForm />
            </TabsContent>

            <TabsContent value="disease-detection" className="mt-6">
              <DiseaseDetectionForm />
            </TabsContent>

            <TabsContent value="weather-alerts" className="mt-6">
              <WeatherAlertForm />
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}
