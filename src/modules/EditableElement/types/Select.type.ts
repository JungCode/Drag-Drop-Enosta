import type { PositionType } from "../../../types/ElementTypes";

export interface Option {
  id: string;
  value: string;
}

export interface SelectData {
  name?: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  position?: PositionType;
  options?: Option[];
}

export interface SelectProps {
  id: string;
  data: SelectData;
  canEdit?: boolean;
  onSave?: (data: SelectData) => void;
  onDelete?: () => void;
}

export interface EditSelectionFormProps {
  values: SelectData;
  errors: { name?: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleOptionChange: (id: string, value: string) => void;
  removeOption: (id: string) => void;
  addOption: () => void;
}
