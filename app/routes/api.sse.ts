// app/routes/sse.tsx
import { LoaderFunction } from "@remix-run/node";
import { emitter } from "@/events";

export let loader: LoaderFunction = async ({ request }) => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const encoder = new TextEncoder();

  const send = (data: any) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  emitter.on("chat:created", (e) => {
    send({ count: e });
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
