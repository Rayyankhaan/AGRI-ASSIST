'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { getCropAndFertilizerRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Leaf,
  FlaskConical,
  Loader2,
  Globe,
  Layers,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* -----------------------------------------
   SMART LOCATIONS
------------------------------------------ */
const SMART_LOCATIONS = [
  { label: 'Maharashtra', value: 'Maharashtra, India' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu, India' },
  { label: 'Uttar Pradesh', value: 'Uttar Pradesh, India' },
  { label: 'Telangana', value: 'Telangana, India' },
  { label: 'Karnataka', value: 'Karnataka, India' },
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh, India' },
  { label: 'Madhya Pradesh', value: 'Madhya Pradesh, India' },
  { label: 'West Bengal', value: 'West Bengal, India' },
  { label: 'Rajasthan', value: 'Rajasthan, India' },
  { label: 'Gujarat', value: 'Gujarat, India' },
];

/* -----------------------------------------
   CROP IMAGES (Example: Replace URLs with your actual images)
------------------------------------------ */
const CROP_IMAGES = [
  { name: 'Wheat', image: '/images/crops/wheat.png' },
  { name: 'Rice', image: '/images/crops/rice.png' },
  { name: 'Maize', image: '/images/crops/maize.png' },
  { name: 'Sugarcane', image: '/images/crops/sugarcane.png' },
  { name: 'Soybean', image: '/images/crops/soybean.png' },
  { name: 'Groundnut', image: '/images/crops/groundnut.png' },
  { name: 'Millets', image: '/images/crops/millets.png' },
  { name: 'Cotton', image: '/images/crops/cotton.png' },
  { name: 'Vegetables', image: '/images/crops/vegetables.png' },
];

/* -----------------------------------------
   INITIAL STATE
------------------------------------------ */
const initialState = {
  cropRecommendation: null,
  fertilizerRecommendation: null,
  error: null,
};

/* -----------------------------------------
   SUBMIT BUTTON
------------------------------------------ */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Recommendations...
        </>
      ) : (
        'Get Recommendations'
      )}
    </Button>
  );
}

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------ */
export default function CropRecommendationForm() {
  const [state, formAction] = useActionState(
    getCropAndFertilizerRecommendations,
    initialState
  );

  const [locationValue, setLocationValue] = useState('');
  const [soilType, setSoilType] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="space-y-6">

      {/* ---------------- FORM ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
          <CardDescription>
            Select your location and soil type to receive AI-powered crop and fertilizer recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">

            {/* Location */}
            <div className="space-y-2">
              <Label>
                <Globe className="mr-2 inline h-4 w-4" />
                Location
              </Label>
              <Select onValueChange={setLocationValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent>
                  {SMART_LOCATIONS.map(loc => (
                    <SelectItem key={loc.value} value={loc.value}>
                      <MapPin className="mr-2 inline h-4 w-4" />
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                name="location"
                placeholder="Or type location"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                required
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label>
                <Layers className="mr-2 inline h-4 w-4" />
                Soil Type
              </Label>
              <Select name="soilType" onValueChange={setSoilType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {['Loamy', 'Sandy', 'Clay', 'Silty', 'Alluvial', 'Black', 'Red'].map(
                    type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {/* ---------------- RESULTS ---------------- */}
      {state.cropRecommendation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-primary" />
              Recommended Crops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CROP_IMAGES.map(crop => (
                <Card key={crop.name} className="text-center p-2 border shadow-sm">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <p className="mt-2 font-semibold">{crop.name}</p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {state.fertilizerRecommendation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FlaskConical className="mr-2 h-5 w-5 text-primary" />
              Fertilizer Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{state.fertilizerRecommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
