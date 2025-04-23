import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Remix!</CardTitle>
          <CardDescription>
            A modern web framework with shadcn/ui components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Hello World!</Button>
        </CardContent>
      </Card>
    </div>
  );
}
