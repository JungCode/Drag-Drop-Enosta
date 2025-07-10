import type { ElementItem } from "../../../types/ElementTypes";

export interface RenderElementItemProps {
  item: ElementItem;
  canEdit?: boolean;
  onSave?: (data: Partial<ElementItem["data"]>) => void;
  onDelete?: () => void;
}