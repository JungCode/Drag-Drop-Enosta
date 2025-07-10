import type { PositionType } from "../../../types/ElementTypes";

export interface HeadingData {
  title?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  name?: string;
  position?: PositionType;
  color?: string;
  id: string;
}

export interface HeadingProps extends HeadingData {
  canEdit?: boolean;
  onSave?: (updated: HeadingData) => void;
  onDelete?: () => void;
}

export interface HeadingErrors {
  name?: string;
}

export interface EditHeadingFormProps {
  values: HeadingProps;
  errors: { name?: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}