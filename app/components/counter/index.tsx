import { useEffect } from "react";
import useQueryStore from "@/store/queries";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { fetchResolvedQueries } from "@/service/api";

export default function LandingPage() {
  const { queries, setQueries } = useQueryStore();

  useEffect(() => {
    async function loadQueries() {
      const data = await fetchResolvedQueries();
      setQueries(data);
    }

    window.addEventListener("focus", loadQueries);
    return () => window.removeEventListener("focus", loadQueries);
  }, [setQueries]);

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
            {Object.entries(queries).length}
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            and counting...
          </p>
        </Card>
      </div>
    </div>
  );
}
