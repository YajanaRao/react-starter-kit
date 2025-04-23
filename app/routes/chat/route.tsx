import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const data = await response.json();
  return json(data);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div className="min-h-screen flex  bg-background p-4">
      <div className="flex-none flex-col  items-start">
        {data.map((item: { id: number; title: string }) => (
          <Form key={item.id} method="post">
            <p>{item.title}</p>
          </Form>
        ))}
      </div>
      <div className="flex-1 flex-col justify-center items-center">
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
    </div>
  );
}
