import React from "react";
import HeadingElement from "./HeadingElement";
import InputElement from "./InputElement";
import ButtonElement from "./ButtonElement";
import ImageElement from "./ImageElement";
import SelectElement from "./SelectElement";

import {
  type ButtonData,
  type ElementItem,
  type InputData,
  type SelectData,
  type ElementType,
  ELEMENT_TYPES,
} from "../../types/ElementTypes";

interface RenderElementItemProps {
  item: ElementItem;
  canEdit?: boolean;
  onSave?: (data: Partial<ElementItem["data"]>) => void;
  onDelete?: () => void;
}

const RenderElementItem: React.FC<RenderElementItemProps> = ({
  item,
  canEdit = false,
  onSave,
  onDelete,
}) => {
  const commonProps = {
    id: item.id,
    canEdit,
    onSave,
    onDelete,
  };

  switch (item.type as ElementType) {
    case ELEMENT_TYPES.Heading:
      return <HeadingElement {...commonProps} {...item.data} />;

    case ELEMENT_TYPES.Input:
      return <InputElement {...commonProps} {...(item.data as InputData)} />;

    case ELEMENT_TYPES.Button:
      return <ButtonElement {...commonProps} {...(item.data as ButtonData)} />;

    case ELEMENT_TYPES.Image:
      return <ImageElement {...commonProps} {...(item.data || {})} />;

    case ELEMENT_TYPES.Selection:
      return (
        <SelectElement
          {...commonProps}
          data={{
            ...(item.data as SelectData),
            options: "options" in item.data ? item.data.options ?? [] : [],
          }}
        />
      );

    default:
      return null;
  }
};

export default React.memo(RenderElementItem, (prev, next) => {
  return (
    prev.item.id === next.item.id &&
    JSON.stringify(prev.item.data) === JSON.stringify(next.item.data) &&
    prev.canEdit === next.canEdit
  );
});
