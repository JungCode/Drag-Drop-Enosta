import React, { useEffect, useState } from "react";
import HeadingElement from "../components/elements/HeadingElement";
import InputElement from "../components/elements/InputElement";
import ButtonElement from "../components/elements/ButtonElement";
import ImageElement from "../components/elements/ImageElement";
import SelectElement from "../components/elements/SelectElement";
import {
  ELEMENT_TYPES,
  type ButtonData,
  type ElementItem,
  type InputData,
} from "../types/ElementTypes";

const Preview = () => {
  const [elements, setElements] = useState<ElementItem[]>([]);
  const [submittedData, setSubmittedData] = useState<
    Record<string, FormDataEntryValue> | null
  >(null);

  useEffect(() => {
    const stored = localStorage.getItem("elements");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setElements(parsed);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
      }
    }
  }, []);

  const renderElement = (item: ElementItem) => {
    switch (item.type) {
      case ELEMENT_TYPES.Heading:
        return (
          <HeadingElement
            id={item.id}
            key={item.id}
            {...item.data}
            canEdit={false}
          />
        );
      case ELEMENT_TYPES.Input:
        return (
          <InputElement
            key={item.id}
            id={item.id}
            {...(item.data as InputData)}
            canEdit={false}
          />
        );
      case ELEMENT_TYPES.Selection:
        return (
          <SelectElement
            key={item.id}
            id={item.id}
            canEdit={false}
            data={{
              ...item.data,
              options:
                item.type === ELEMENT_TYPES.Selection && "options" in item.data
                  ? item.data.options ?? []
                  : [],
            }}
          />
        );
      case ELEMENT_TYPES.Button:
        return (
          <ButtonElement
            key={item.id}
            id={item.id}
            canEdit={false}
            {...(item.data as ButtonData)}
          />
        );
      case ELEMENT_TYPES.Image:
        return (
          <ImageElement
            id={item.id}
            key={item.id}
            canEdit={false}
            {...(item.data || {})}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const entries: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
      entries[key] = value;
    }
    setSubmittedData(entries);
  };

  const imageData =
    submittedData &&
    elements
      .filter((item) => item.type === ELEMENT_TYPES.Image)
      .map((item) => {
        const name = (item.data as { name?: string })?.name || "unknown";
        const src = (item.data as { src?: string })?.src || "";
        return { name, src };
      });

  return (
    <div className="m-16 max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-1">
        {elements.map((item) => renderElement(item))}
      </form>

      {submittedData && (
        <div className="mt-8 p-4 bg-green-50 border border-green-300 rounded">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Submitted Data:
          </h2>
          <ul className="space-y-1 text-sm text-gray-800">
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}

            {imageData?.map((img, idx) => (
              <li key={`img-${idx}`}>
                <strong>{img.name}:</strong> {img.src}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Preview;
