import type { PositionType } from "../../../types/ElementTypes";

export interface EditableWrapperProps {
  children: React.ReactNode;
  editView: React.ReactNode;
  width?: string;
  position?: PositionType;
  canEdit?: boolean;
  onSave?: () => boolean | void;
  onDelete?: () => void;
  onDiscard?: () => void;
  id: string;
}
