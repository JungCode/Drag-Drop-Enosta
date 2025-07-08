export type PositionType = "left" | "center" | "right";

export const ELEMENT_TYPES = {
  Heading: "Heading",
  Input: "Input",
  Button: "Button",
  Image: "Image",
  Selection: "Selection",
} as const;

export type ElementType = keyof typeof ELEMENT_TYPES;

export interface SelectOption {
  id: string;
  value: string;
}

export interface HeadingData {
  title?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  name?: string;
  position?: PositionType;
  color?: string;
}

export type InputType =
  | "text"
  | "password"
  | "number"
  | "tel"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "month"
  | "range"
  | "tel"
  | "time"
  | "week";

export interface InputData {
  name?: string;
  title?: string;
  type?: InputType;
  width?: string;
  position?: PositionType;
  placeholder?: string;
  required?: boolean;
}

export type ButtonType = "button" | "submit" | "reset";

export interface ButtonData {
  content?: string;
  type?: ButtonType;
  name?: string;
  position?: PositionType;
}

export interface ImageData {
  name?: string;
  title?: string;
  width?: string;
  src?: string;
  alt?: string;
  position?: PositionType;
  shape?: "circle" | "square" | "rectangle";
}

export interface SelectData {
  name?: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  position?: PositionType;
  options?: SelectOption[];
}

export type ElementData =
  | HeadingData
  | InputData
  | ButtonData
  | ImageData
  | SelectData;

export interface ElementItem {
  id: string;
  type: ElementType;
  data: ElementData;
}
