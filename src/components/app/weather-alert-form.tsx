'use client';

import { useActionState, useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { getWeatherAlert } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  Loader2,
  Globe,
  Sprout,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  alert: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Checking Weather...
        </>
      ) : (
        'Get Weather Alert'
      )}
    </Button>
  );
}

export default function WeatherAlertForm() {
  const [state, formAction] = useActionState(getWeatherAlert, initialState);
  const [locationValue, setLocationValue] = useState('');
  const [isLocating, setIsLocating] = useState(false);
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

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Not Supported',
        description: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationValue(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setIsLocating(false);
        toast({
          title: 'Location set',
          description: 'Your current coordinates have been captured.',
        });
      },
      (error) => {
        setIsLocating(false);
        let message = 'Could not get your location.';
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Please enable location permissions in your browser.';
        }
        toast({
          variant: 'destructive',
          title: 'Location Error',
          description: message,
        });
      }
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Weather Alerts</CardTitle>
          <CardDescription>
            Get instant, crop-specific alerts based on real-time weather data
            for your location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location-weather">
                <Globe className="mr-2 inline h-4 w-4" /> Location
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location-weather"
                  name="location"
                  placeholder="e.g., Napa Valley, USA or 40.71, -74.00"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  title="Use My Location"
                >
                  {isLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop">
                <Sprout className="mr-2 inline h-4 w-4" /> Crop Type
              </Label>
              <Input
                id="crop"
                name="crop"
                placeholder="e.g., Grapes"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.alert && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Weather Advisory</AlertTitle>
          <AlertDescription>{state.alert}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}