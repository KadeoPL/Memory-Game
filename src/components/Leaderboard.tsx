import { LeaderboardProps } from "../types/ResultProps";

export default function Leaderboard({ results }: LeaderboardProps) {
  if (!results || results.length <= 0) {
    return <div className="text-white text-2xl">No results</div>;
  }

  const firstPlace = results[0];
  const secondPlace = results[1];
  const thirdPlace = results[2];
  const otherPlaces = results.slice(3);
  return (
    <>
      <div className="flex gap-8 mb-4 md:mb-10 text-xl md:text-3xl text-center md:w-full justify-center md:gap-20">
        <div className="text-gray-300">
          <div>2.</div>
          <div className="font-pirata text-2xl md:text-4xl mt-2">
            {secondPlace.name}
          </div>
          <div>{secondPlace.result}</div>
        </div>
        <div className="font-bold transform -translate-y-8 text-amber-400">
          <div>1.</div>
          <div className="font-pirata text-2xl md:text-4xl mt-2">
            {firstPlace.name}
          </div>
          <div>{firstPlace.result}</div>
        </div>
        <div className="text-orange-900">
          <div>3.</div>
          <div className="font-pirata text-2xl md:text-4xl mt-2">
            {thirdPlace.name}
          </div>
          <div>{thirdPlace.result}</div>
        </div>
      </div>
      <div className="flex flex-col items-center text-lg md:flex-row md:gap-5">
        {otherPlaces.map((place, index) => (
          <div key={place.id} className="flex gap-2 mb-1">
            <div>
              <span className="mr-2">{index + 4}.</span>
              {place.name}
            </div>
            <div>{place.result}</div>
          </div>
        ))}
      </div>
    </>
  );
}
