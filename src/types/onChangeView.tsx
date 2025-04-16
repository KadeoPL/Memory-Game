export type ViewType = "menu" | "game";

export type OnChangeViewFunction = (newView: ViewType) => void;

export interface OnChangeViewProps {
  onButtonClick: OnChangeViewFunction;
}
