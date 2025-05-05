import { useEffect, useState } from "react";
import { ResultProps } from "../types/ResultProps";
import { supabase } from "../lib/supabaseClient";

export function useResults(level: string) {
  const [results, setResults] = useState<ResultProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from(`leaderboard-${level}`)
        .select("*")
        .order("result", { ascending: false })
        .limit(8);

      if (error) {
        console.error(error);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };

    fetchResults();
  }, [level]);

  return { results, loading };
}
