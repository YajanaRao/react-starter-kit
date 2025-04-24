import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useIsOnline } from "@/hooks/useIsOnline";

export function OfflineAlert() {
  const isOnline = useIsOnline();

  if (isOnline) return;

  return (
    <Alert
      variant="destructive"
      className="fixed bottom-4 right-4 w-auto z-50 w-1/2 bg-background"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Offline</AlertTitle>
      <AlertDescription>
        You are currently offline. Changes will be saved locally and synced when
        you're back online.
      </AlertDescription>
    </Alert>
  );
}
