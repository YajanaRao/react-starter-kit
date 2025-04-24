import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { fetchResolvedQueries } from "@/service/api";
import { useIsOnline } from "@/hooks/useIsOnline";
import useQueryStore from "@/store/queries";

type Chat = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const chats = await fetchResolvedQueries();
  return json(chats);
}

export default function Index() {
  const chats = useLoaderData<typeof loader>();
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  );
  const isOnline = useIsOnline();
  const { queries, setQueries } = useQueryStore();
  const [newQuestion, setNewQuestion] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (isOnline) setQueries(chats);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      console.log(Object.entries(chats).length + 2);
      fetcher.submit(
        {
          intent: "create",
          id: Object.entries(chats).length + 1,
          question: newQuestion,
          answer: "This is a placeholder answer",
        },
        { method: "POST", action: "/api/chat" }
      );
      setNewQuestion("");
    }
  };

  return (
    <div class="chat flex flex-col h-full">
      <div className="flex items-center ml-4">
        <h2>Chats</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 border-r border-border overflow-hidden`}
        >
          {/* Sidebar Toggle */}

          <div className="p-4 h-full flex flex-1 flex-col">
            <div className="flex-1 overflow-y-auto space-y-2">
              {Object.entries(queries).map(([id, item]) => (
                <Button
                  key={id}
                  variant={selectedChatId === id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedChatId(id)}
                >
                  {item.question}
                </Button>
              ))}
            </div>
            <Form onSubmit={handleSubmit} className="mt-4">
              <div className="flex gap-2">
                <Input
                  value={newQuestion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewQuestion(e.target.value)
                  }
                  placeholder="Ask a question..."
                  className="flex-1"
                />
                <Button type="submit">Add</Button>
              </div>
            </Form>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {selectedChatId ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{queries[selectedChatId]?.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {queries[selectedChatId]?.answer}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Welcome to Chat</CardTitle>
                  <CardDescription>
                    Select a question from the sidebar to view its answer
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
