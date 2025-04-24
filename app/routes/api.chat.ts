import { json } from "@remix-run/node";
import { promises as fs } from "fs";
import path from "path";
import { emitter } from "@/events";

const CHATS_FILE = path.join(process.cwd(), "data/chats.json");

type Chat = {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

type ChatsData = {
  chats: Chat[];
};

async function readChats(): Promise<ChatsData> {
  try {
    const data = await fs.readFile(CHATS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { chats: [] };
  }
}

async function writeChats(data: ChatsData): Promise<void> {
  await fs.writeFile(CHATS_FILE, JSON.stringify(data, null, 2));
}

export async function loader() {
  const data = await readChats();
  return json(data);
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const id = formData.get("id") as string;

    if (!question || !answer) {
      return json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const data = await readChats();
    const newChat = {
      question,
      answer,
    };

    data[id] = newChat;
    const queriesResolved = Object.entries(data).length;

    await writeChats(data);
    emitter.emit("chat:created", queriesResolved);
    return json(data);
  }

  return json({ error: "Invalid intent" }, { status: 400 });
}
