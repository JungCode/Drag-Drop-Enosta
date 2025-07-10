import React from "react";
import HeadingElement from "./Heading/HeadingElement";
import ButtonElement from "./Button/ButtonElement";
import ImageElement from "./Image/ImageElement";
import SelectElement from "./Selection/SelectElement";

import {
  type ButtonData,
  type InputData,
  type SelectData,
  type ElementType,
  ELEMENT_TYPES,
} from "../../../types/ElementTypes";
import InputElement from "./Input/InputElement";
import type { RenderElementItemProps } from "../types/RenderElementItems.type";

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
      return (
        <InputElement {...commonProps} {...(item.data as InputData)} />
      );

    case ELEMENT_TYPES.Button:
      return (
        <ButtonElement {...commonProps} {...(item.data as ButtonData)} />
      );

    case ELEMENT_TYPES.Image:
      return <ImageElement {...commonProps} {...(item.data || {})} />;

    case ELEMENT_TYPES.Selection:
      return (
        <SelectElement
          {...commonProps}
          data={{
            ...(item.data as SelectData),
            options:
              "options" in item.data ? item.data.options ?? [] : [],
          }}
        />
      );

    default:
      return null;
  }
};

export default React.memo(RenderElementItem);
