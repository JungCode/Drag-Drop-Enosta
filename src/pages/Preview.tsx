import React, { useEffect, useState } from "react";
import HeadingElement from "../components/elements/HeadingElement";
import InputElement from "../components/elements/InputElement";
import ButtonElement from "../components/elements/ButtonElement";
import ImageElement from "../components/elements/ImageElement";
import SelectElement from "../components/elements/SelectElement";
import type { ButtonData, ElementItem, InputData } from "../types/ElementTypes";

const Preview = () => {
  const [elements, setElements] = useState<ElementItem[]>([]);
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    FormDataEntryValue
  > | null>(null);

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
      case "Heading":
        return (
          <HeadingElement
            id={item.id}
            key={item.id}
            {...item.data}
            canEdit={false}
          />
        );
      case "Input":
        return (
          <InputElement
            key={item.id}
            id={item.id}
            {...(item.data as InputData)}
            canEdit={false}
          />
        );
      case "Selection":
        return (
          <SelectElement
            key={item.id}
            id={item.id}
            canEdit={false}
            data={{
              ...item.data,
              options:
                item.type === "Selection" && "options" in item.data
                  ? item.data.options ?? []
                  : [],
            }}
          />
        );
      case "Button":
        return (
          <ButtonElement
            key={item.id}
            id={item.id}
            canEdit={false}
            {...(item.data as ButtonData)}
          />
        );
      case "Image":
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
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const entries = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", entries);
    setSubmittedData(entries);
  };

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
          </ul>
        </div>
      )}
    </div>
  );
};

export default Preview;
