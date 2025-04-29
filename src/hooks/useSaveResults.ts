import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useSaveResults(level: string) {
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const saveResult = async (playerName: string, result: number) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from(`leaderboard-${level}`)
        .insert([{ name: playerName, result: result }]);

      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Error"));
    } finally {
      setSaving(false);
    }
  };

  return { saveResult, saving, error, success };
}
