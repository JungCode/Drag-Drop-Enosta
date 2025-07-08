import  { useEffect, useState } from "react";
import HeadingElement from "../components/elements/HeadingElement";
import InputElement from "../components/elements/InputElement";
import ButtonElement from "../components/elements/ButtonElement";
import ImageElement from "../components/elements/ImageElement";
import SelectElement from "../components/elements/SelectElement";

import type { ButtonData, ElementItem, InputData } from "../types/ElementTypes";
import { updateElement, saveElements } from "../ultis/storage";
import { useLocation } from "react-router-dom";

const Create = ({ items = [] } : { items: string[]}) => {
  const [elements, setElements] = useState<ElementItem[]>([]);
  const location = useLocation();
  const canEdit = location.pathname === "/";

  useEffect(() => {
    const saved = localStorage.getItem("elements");
    if (saved) {
      try {
        setElements(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse localStorage data:", err);
      }
    }
  }, [items]);

  return (
      <>
        {elements.map((item) => {
          switch (item.type) {
            case "Heading":
              return (
                <HeadingElement
                  key={item.id}
                  id={item.id}
                  {...item.data}
                  canEdit={canEdit}
                  onSave={(updated) => updateElement(item.id, updated)}
                  onDelete={() =>
                    setElements((prev) => {
                      const updatedElements = prev.filter(
                        (el) => el.id !== item.id
                      );
                      saveElements(updatedElements);
                      return updatedElements;
                    })
                  }
                />
              );
            case "Input":
              return (
                <InputElement
                  key={item.id}
                  id={item.id}
                  canEdit={canEdit}
                  {...(item.data as InputData)}
                  onSave={(updated) => updateElement(item.id, updated)}
                  onDelete={() =>
                    setElements((prev) => {
                      const updatedElements = prev.filter(
                        (el) => el.id !== item.id
                      );
                      saveElements(updatedElements);
                      return updatedElements;
                    })
                  }
                />
              );
            case "Button":
              return (
                <ButtonElement
                  key={item.id}
                  id={item.id}
                  canEdit={canEdit}
                  {...(item.data as ButtonData)}
                  onSave={(updated) => updateElement(item.id, updated)}
                  onDelete={() =>
                    setElements((prev) => {
                      const updatedElements = prev.filter(
                        (el) => el.id !== item.id
                      );
                      saveElements(updatedElements);
                      return updatedElements;
                    })
                  }
                />
              );

            case "Image":
              return (
                <ImageElement
                  key={item.id}
                  id={item.id}
                  canEdit={canEdit}
                  {...(item.data || {})}
                  onSave={(updated) => updateElement(item.id, updated)}
                  onDelete={() =>
                    setElements((prev) => {
                      const updatedElements = prev.filter(
                        (el) => el.id !== item.id
                      );
                      saveElements(updatedElements);
                      return updatedElements;
                    })
                  }
                />
              );

            case "Selection":
              return (
                <SelectElement
                  key={item.id}
                  id={item.id}
                  canEdit={canEdit}
                  data={{
                    ...item.data,
                    options:
                      item.type === "Selection" && "options" in item.data
                        ? item.data.options ?? []
                        : [],
                  }}
                  onSave={(updated) =>
                    setElements((prev) => {
                      const updatedElements = prev.map((el) =>
                        el.id === item.id
                          ? {
                              ...el,
                              data: { ...el.data, ...updated },
                            }
                          : el
                      );
                      saveElements(updatedElements);
                      return updatedElements;
                    })
                  }
                  onDelete={() =>
                    setElements((prev) => {
                      const updatedElements = prev.filter(
                        (el) => el.id !== item.id
                      );
                      saveElements(updatedElements);
                      return updatedElements;
                    })
                  }
                />
              );

            default:
              return null;
          }
        })}
      </>
  );
};

export default Create;
