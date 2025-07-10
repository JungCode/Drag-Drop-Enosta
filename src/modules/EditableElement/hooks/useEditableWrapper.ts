import { useCallback, useState, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export const useEditableWrapper = ({
  id,
  canEdit,
  onSave,
  onDiscard,
}: {
  id: string;
  canEdit?: boolean;
  onSave?: () => boolean | void;
  onDiscard?: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? "0.4" : "1",
    }),
    [transform, transition, isDragging]
  );

  const handleDiscard = useCallback(() => {
    onDiscard?.();
    setIsEditing(false);
    setIsHovered(false);
  }, [onDiscard]);

  const handleSave = useCallback(() => {
    const result = onSave?.();
    if (result === false) return;
    setIsEditing(false);
    setIsHovered(false);
  }, [onSave]);

  const handleMouseEnter = useCallback(() => {
    if (canEdit) setIsHovered(true);
  }, [canEdit]);

  const handleMouseLeave = useCallback(() => {
    if (canEdit) setIsHovered(false);
  }, [canEdit]);

  const handleDoubleClick = useCallback(() => {
    if (canEdit) setIsEditing(true);
  }, [canEdit]);

  return {
    isEditing,
    isHovered,
    setIsEditing,
    style,
    handleSave,
    handleDiscard,
    handleMouseEnter,
    handleMouseLeave,
    handleDoubleClick,
    attributes,
    listeners,
    setNodeRef,
  };
};
