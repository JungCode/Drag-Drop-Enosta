import React, { useEffect, useState } from "react";
import {
  ELEMENT_TYPES,
  type ElementItem,
} from "../types/ElementTypes";
import RenderElementItem from "../components/elements/RenderElementItems";

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
        {elements.map((item) => (
          <RenderElementItem key={item.id} item={item} canEdit={false} />
        ))}

        {!elements.some((el) => el.type === ELEMENT_TYPES.Button) && (
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit (Default)
            </button>
          </div>
        )}
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
