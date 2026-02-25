
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSoilGuideAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Info, CheckCircle2, Lightbulb, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const initialState = {
  characteristics: null,
  suitableCrops: null,
  improvementTips: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing Soil...
        </>
      ) : (
        'Get Soil Guide'
      )}
    </Button>
  );
}

export default function SoilGuideForm() {
  const [state, formAction] = useActionState(getSoilGuideAction, initialState);
  const [selectedSoilType, setSelectedSoilType] = useState<string>('');
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

  const getSoilImage = (type: string) => {
    const soilId = `soil-${type.toLowerCase()}`;
    const img = PlaceHolderImages.find(p => p.id === soilId);
    return img || PlaceHolderImages.find(p => p.id === 'soil-loamy');
  };

  const getCropImage = (cropName: string) => {
    const cropId = `crop-${cropName.toLowerCase()}`;
    const img = PlaceHolderImages.find(p => p.id === cropId);
    // Fallback to a generic crop image or placeholder
    return img || { 
      imageUrl: `https://picsum.photos/seed/${cropName.toLowerCase()}/600/400`, 
      description: cropName, 
      imageHint: "growing crop" 
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Soil Suitability Guide</CardTitle>
          <CardDescription>
            Learn about your soil type and discover which crops will thrive in your farm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="soilType-guide">
                <Layers className="mr-2 inline h-4 w-4" /> Select Your Soil Type
              </Label>
              <Select 
                name="soilType" 
                required 
                onValueChange={(val) => setSelectedSoilType(val)}
              >
                <SelectTrigger id="soilType-guide">
                  <SelectValue placeholder="Choose soil type" />
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

      {state.characteristics && (
        <div className="grid gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-48 w-full md:h-64">
              {selectedSoilType && (
                <Image
                  data-ai-hint={getSoilImage(selectedSoilType)?.imageHint || "soil texture"}
                  src={getSoilImage(selectedSoilType)?.imageUrl || ""}
                  alt={selectedSoilType}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h2 className="text-3xl font-bold text-white font-headline">{selectedSoilType} Soil</h2>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="mr-2 h-5 w-5 text-primary" />
                Soil Characteristics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {state.characteristics}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                Best Crops for this Soil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {state.suitableCrops && (state.suitableCrops as string[]).map((crop, idx) => {
                  const cropImg = getCropImage(crop);
                  return (
                    <div key={idx} className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
                      <div className="aspect-square relative w-full">
                        <Image
                          data-ai-hint={cropImg.imageHint}
                          src={cropImg.imageUrl}
                          alt={crop}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <span className="text-xs font-semibold">{crop}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                Improvement Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {state.improvementTips}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
