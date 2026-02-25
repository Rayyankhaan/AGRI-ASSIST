'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getDiseaseDetection } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, UploadCloud, Microscope, TestTube2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const initialState = {
  diseaseDetected: null,
  remedies: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Detecting Disease...
        </>
      ) : (
        'Detect Disease'
      )}
    </Button>
  );
}

export default function DiseaseDetectionForm() {
  const [state, formAction] = useActionState(getDiseaseDetection, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [dataUri, setDataUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setDataUri(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleUrlAsFile = async (url: string) => {
    try {
      setPreview(url);
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataUri(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load image",
        description: "Could not load the example image. Please try again.",
      });
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Disease & Pest Detection</CardTitle>
          <CardDescription>
            Upload a picture of a crop to get an instant diagnosis and
            remediation advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input
              type="hidden"
              name="photoDataUri"
              value={dataUri || ''}
            />
            <div className="space-y-2">
              <label
                htmlFor="crop-image"
                onDragOver={onDragOver}
                onDrop={onDrop}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/50 p-8 text-center transition-colors hover:border-accent hover:bg-accent/10"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Crop preview"
                    width={200}
                    height={200}
                    className="h-48 w-auto max-w-full rounded-md object-contain"
                  />
                ) : (
                  <>
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    <span className="font-semibold">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-sm text-muted-foreground">
                      PNG, JPG, or WEBP
                    </span>
                  </>
                )}
              </label>
              <input
                id="crop-image"
                ref={fileInputRef}
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileChange(e.target.files[0])
                }
              />
            </div>
            {preview && <SubmitButton />}
          </form>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Or try an example:</p>
            <div className="grid grid-cols-3 gap-2">
              {PlaceHolderImages.map(img => (
                <button key={img.id} onClick={() => handleUrlAsFile(img.imageUrl)} className="overflow-hidden rounded-md border-2 border-transparent hover:border-primary focus:border-primary focus:outline-none">
                  <Image
                    data-ai-hint={img.imageHint}
                    src={img.imageUrl}
                    alt={img.description}
                    width={200}
                    height={150}
                    className="aspect-video w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {state.diseaseDetected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Microscope className="mr-2 h-5 w-5 text-primary" />
              Disease Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{state.diseaseDetected}</p>
          </CardContent>
        </Card>
      )}

      {state.remedies && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TestTube2 className="mr-2 h-5 w-5 text-primary" />
              Suggested Remedies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{state.remedies}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
