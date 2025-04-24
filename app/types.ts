export interface Chat {
  id: string;
  title: string;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Chats {
  [key: string]: Chat;
}
