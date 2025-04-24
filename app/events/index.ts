import mitt from "mitt";

type Events = {
  "chat:updated": { id: string; question: string; answer: string };
  "chat:created": { id: string; question: string; answer: string };
};

export const emitter = mitt<Events>();
