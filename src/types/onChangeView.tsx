export type ViewType = "menu" | "game" | "level";

export type OnChangeViewFunction = (newView: ViewType) => void;

export interface OnChangeViewProps {
  onButtonClick: OnChangeViewFunction;
}
