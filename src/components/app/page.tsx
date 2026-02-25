import CropRecommendationWithImages from '@/components/app/CropRecommendationWithImages';

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">AgriAssist</h1>
      <CropRecommendationWithImages />
    </div>
  );
}
