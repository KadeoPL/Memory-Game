import { ResultProps } from "../types/ResultProps";
import getResults from "../utils/getResults";

export default function Leaderboard() {
  const results: ResultProps[] = getResults("hard");

  if (results.length > 0) {
    console.log(results);
  }

  return (
    <div className="bg-[url(/public/home_bg.png)] bg-cover bg-top bg-no-repeat w-dvw h-dvh flex flex-col justify-center items-center">
      {results.map((result) => (
        <div key={result.id} className="text-white text-2xl">
          <div>{result.name}</div>
          <div>{result.results}</div>
        </div>
      ))}
    </div>
  );
}
