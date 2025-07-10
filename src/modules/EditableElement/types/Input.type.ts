import type { InputType, PositionType } from "../../../types/ElementTypes";

export interface InputProps {
  id: string;
  name?: string;
  title?: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  width?: string;
  canEdit?: boolean;
  position?: PositionType;
  onSave?: (updated: InputProps) => void;
  onDelete?: () => void;
}

export interface EditInputFormProps {
  values: InputProps;
  errors: { name?: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const inputTypes: InputType[] = [
  "text",
  "email",
  "password",
  "number",
  "tel",
  "date",
  "datetime-local",
  "file",
  "month",
  "range",
  "time",
  "week",
];