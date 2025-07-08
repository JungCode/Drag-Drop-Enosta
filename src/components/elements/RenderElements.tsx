import { useEffect, useState } from "react";
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
import { saveElements } from "../../ultis/storage";

const RenderElemment = ({
  items = [],
  setEditableElementsId,
}: {
  items: string[];
  setEditableElementsId: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [elements, setElements] = useState<ElementItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("elements");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ElementItem[];
        setElements(parsed);
      } catch (err) {
        console.error("Failed to parse localStorage data:", err);
      }
    }
  }, [items]);

  const handleSave = (
    id: string,
    updatedData: Partial<ElementItem["data"]>
  ) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, data: { ...el.data, ...updatedData } } : el
    );
    saveElements(updated);
    setElements(updated);
  };

  const handleDelete = (id: string) => {
    const updated = elements.filter((el) => el.id !== id);
    saveElements(updated);
    setElements(updated);
    setEditableElementsId(updated.map((el) => el.id));
  };

  return (
    <>
      {elements.map((item) => {
        const commonProps = {
          id: item.id,
          canEdit: true,
          onSave: (updated: Partial<ElementItem["data"]>) =>
            handleSave(item.id, updated),
          onDelete: () => handleDelete(item.id),
        };

        switch (item.type as ElementType) {
          case ELEMENT_TYPES.Heading:
            return (
              <HeadingElement {...commonProps} {...item.data} key={item.id} />
            );

          case ELEMENT_TYPES.Input:
            return (
              <InputElement
                {...commonProps}
                {...(item.data as InputData)}
                key={item.id}
              />
            );

          case ELEMENT_TYPES.Button:
            return (
              <ButtonElement
                {...commonProps}
                {...(item.data as ButtonData)}
                key={item.id}
              />
            );

          case ELEMENT_TYPES.Image:
            return (
              <ImageElement
                {...commonProps}
                {...(item.data || {})}
                key={item.id}
              />
            );

          case "Selection":
            return (
              <SelectElement
                {...commonProps}
                data={
                  {
                    ...(item.data as SelectData),
                    options:
                      "options" in item.data ? item.data.options ?? [] : [],
                  } as SelectData
                }
                key={item.id}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default RenderElemment;
