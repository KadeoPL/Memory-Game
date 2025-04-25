export interface ResultProps {
  id: number;
  name: string;
  result: number;
}

export type LeaderboardProps = {
  results: ResultProps[];
};
