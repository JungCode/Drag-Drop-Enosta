import { useEffect, useState } from "react";
import { ELEMENT_TYPES, type ElementItem } from "../../../types/ElementTypes";

export const useFormPreview = () => {
  const [elements, setElements] = useState<ElementItem[]>([]);
  const [submittedData, setSubmittedData] = useState<Record<string, FormDataEntryValue> | null>(null);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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

  return {
    elements,
    submittedData,
    handleSubmit,
    imageData,
  };
};
