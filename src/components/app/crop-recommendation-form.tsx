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
   SMART LOCATIONS (Editable)
------------------------------------------ */
const SMART_LOCATIONS = [
  {
    label: 'Maharashtra',
    value: 'Maharashtra, India',
  },
  {
    label: 'Tamil Nadu',
    value: 'Tamil Nadu, India',
  },
  {
    label: 'Uttar Pradesh',
    value: 'Uttar Pradesh, India',
  },
  {
    label: 'Telangana',
    value: 'Telangana, India',
  },
  {
    label: 'Karnataka',
    value: 'Karnataka, India',
  },
  {
    label: 'Andhra Pradesh',
    value: 'Andhra Pradesh, India',
  },
  {
    label: 'Madhya Pradesh',
    value: 'Madhya Pradesh, India',
  },
  {
    label: 'West Bengal',
    value: 'West Bengal, India',
  },
  {
    label: 'Rajasthan',
    value: 'Rajasthan, India',
  },
  {
    label: 'Gujarat',
    value: 'Gujarat, India',
  },
];


/* -----------------------------------------
   ACTION STATE
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
  const { toast } = useToast();

  /* Error toast */
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

      {/* ---------------- CARD: FORM ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
          <CardDescription>
            Select your location and soil type to receive AI-powered crop and
            fertilizer recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-4">

            {/* LOCATION */}
            <div className="space-y-2">
              <Label>
                <Globe className="mr-2 inline h-4 w-4" />
                Location
              </Label>

              {/* Smart location select */}
              <Select onValueChange={setLocationValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Smart select a location (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {SMART_LOCATIONS.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      <MapPin className="mr-2 inline h-4 w-4" />
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Manual / auto-filled input */}
              <Input
                name="location"
                placeholder="e.g., Punjab, India"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                required
              />
            </div>

            {/* SOIL TYPE */}
            <div className="space-y-2">
              <Label>
                <Layers className="mr-2 inline h-4 w-4" />
                Soil Type
              </Label>

              <Select name="soilType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Loamy">Loamy</SelectItem>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Silty">Silty</SelectItem>
                  <SelectItem value="Alluvial">Alluvial</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Red">Red</SelectItem>
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
            <p className="whitespace-pre-wrap">
              {state.cropRecommendation}
            </p>
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
            <p className="whitespace-pre-wrap">
              {state.fertilizerRecommendation}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
