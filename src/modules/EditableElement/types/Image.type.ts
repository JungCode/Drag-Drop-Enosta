import type { PositionType } from "../../../types/ElementTypes";

export interface EditImageFormProps {
  values: ImageProps;
  errors: { name?: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setValues: React.Dispatch<React.SetStateAction<ImageProps>>;
}

export interface ImageProps {
  name?: string;
  title?: string;
  src?: string;
  alt?: string;
  width?: string;
  canEdit?: boolean;
  position?: PositionType;
  shape?: "circle" | "square" | "rectangle";
  onSave?: (updated: ImageProps) => void;
  onDelete?: () => void;
  id: string;
}