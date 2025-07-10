import type { ButtonType, PositionType } from "../../../types/ElementTypes";

export interface ButtonProps {
  id: string;
  content?: string;
  name?: string;
  type?: ButtonType;
  position?: PositionType;
  canEdit?: boolean;
  onSave?: (updated: ButtonProps) => void;
  onDelete?: () => void;
}

export interface EditButtonFormProps {
  values: ButtonProps;
  errors: { name?: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export interface EditableFieldErrors {
  name?: string;
}