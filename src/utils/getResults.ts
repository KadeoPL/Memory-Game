import { useEffect, useState } from "react";
import { ResultProps } from "../types/ResultProps";
import { supabase } from "../lib/supabaseClient";

export default function getResults(level: string) {
  const [results, setResults] = useState<ResultProps[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from(`leaderboard-${level}`)
        .select("*")
        .order("results", { ascending: false });

      error ? console.error(error) : setResults(data);
    };

    fetchResults();
  }, []);

  return results;
}
