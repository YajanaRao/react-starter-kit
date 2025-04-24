import { useEffect, useState } from "react";
import useQueryStore from "@/store/queries";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { fetchResolvedQueries } from "@/service/api";
import { useIsOnline } from "@/hooks/useIsOnline";

export default function LandingPage() {
  const isOnline = useIsOnline();
  const { queries, setQueries } = useQueryStore();
  const [queriesResolved, setQueriesResolved] = useState(0);


  useEffect(() => {
    setQueriesResolved(Object.entries(queries).length);

    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setQueriesResolved(data.count);
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
      eventSource.close(); // Close on error
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-background flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <Card className="p-8 text-center bg-white/50 backdrop-blur-sm border-purple-100 dark:bg-gray-900/50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Queries Resolved
            </h2>
          </div>
          <p className="text-5xl font-bold text-purple-600 tracking-tight">
            {queriesResolved}
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            and counting...
          </p>
        </Card>
      </div>
    </div>
  );
}
