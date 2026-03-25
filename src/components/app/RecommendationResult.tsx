import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  MapPin,
  Layers,
  Leaf,
  FlaskConical,
  Wheat,
  Droplets,
} from "lucide-react";

export function RecommendationResult() {
  return (
    <div className="space-y-6">

      {/* ---------------- SUMMARY ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <MapPin className="h-5 w-5" />
            Location Overview
          </CardTitle>
          <CardDescription>
            AI analysis based on your inputs
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Anantapur, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Loamy Soil</span>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- CROPS ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Leaf className="h-5 w-5" />
            Recommended Crops
          </CardTitle>
          <CardDescription>
            Suitable for semi-arid climate & rainfall pattern
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">🌰 Groundnut</div>
          <div className="flex items-center gap-2">🌽 Maize</div>
          <div className="flex items-center gap-2">🌾 Sorghum</div>
          <div className="flex items-center gap-2">🌾 Pearl Millet (Bajra)</div>
          <div className="flex items-center gap-2">🌿 Pulses (Red, Green, Black gram)</div>
        </CardContent>
      </Card>

      {/* ---------------- FERTILIZER: GROUNDNUT ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <FlaskConical className="h-5 w-5" />
            Fertilizer – Groundnut
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>N: 20 kg/ha</li>
            <li>P₂O₅: 40–60 kg/ha</li>
            <li>K₂O: 40–60 kg/ha</li>
            <li>
              <span className="font-medium">Gypsum:</span> 250–500 kg/ha at flowering (30–45 DAS)
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Gypsum supplies Calcium & Sulfur for proper pod filling.
          </p>
        </CardContent>
      </Card>

      {/* ---------------- FERTILIZER: CEREALS ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Wheat className="h-5 w-5" />
            Fertilizer – Maize, Sorghum & Bajra
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>N: 40–80 kg/ha</li>
            <li>P₂O₅: 30–40 kg/ha</li>
            <li>K₂O: 30–40 kg/ha</li>
            <li>Apply P & K basal, split Nitrogen</li>
            <li>Zinc Sulphate: 25 kg/ha (if deficient)</li>
          </ul>
        </CardContent>
      </Card>

      {/* ---------------- FERTILIZER: PULSES ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Droplets className="h-5 w-5" />
            Fertilizer – Pulses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>Starter N: 10–20 kg/ha</li>
            <li>P₂O₅: 40–60 kg/ha</li>
            <li>K₂O: 20–30 kg/ha</li>
            <li>Sulfur: 20 kg/ha (SSP or Gypsum)</li>
          </ul>
        </CardContent>
      </Card>

      {/* ---------------- BEST PRACTICES ---------------- */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">
            🌾 Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✔ Incorporate basal fertilizers before sowing</p>
          <p>✔ Avoid overuse of nitrogen</p>
          <p>✔ Combine with organic manure</p>
          <p>✔ Always adjust doses using soil test report</p>
        </CardContent>
      </Card>

    </div>
  );
}
