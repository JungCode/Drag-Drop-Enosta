import { useMemo } from "react";
import type { KindOfElementType } from "../../../types/ElementTypes";
import { useDraggable, type DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Transform } from "@dnd-kit/utilities";

export default function useDraggableCustom(
  name: string,
  dependencies: React.DependencyList
): [
  DraggableAttributes,
  SyntheticListenerMap | undefined,
  (element: HTMLElement | null) => void,
  Transform | null,
  React.CSSProperties
] {
  const elementTypeInfo: KindOfElementType = useMemo(
    () => ({
      id: name + "-" + Date.now().toString(),
      type: name.toLowerCase() as KindOfElementType["type"],
    }),
    [...dependencies]
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: elementTypeInfo.id,
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
  };

  return [attributes, listeners, setNodeRef, transform, style];
}
