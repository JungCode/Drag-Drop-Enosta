import { useCallback, useState } from "react";
import type { HeadingData, HeadingErrors } from "../types/Heading.type";

export function useHeadingEditor(
  initial: HeadingData,
  onSave?: (updated: HeadingData) => void
) {
  const [values, setValues] = useState<HeadingData>(initial);
  const [backup, setBackup] = useState<HeadingData>(initial);
  const [errors, setErrors] = useState<HeadingErrors>({});

  const handleChange = useCallback(
    <K extends keyof HeadingData>(key: K, value: HeadingData[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === "size") {
        handleChange("size", Number(value) as HeadingData["size"]);
      } else {
        handleChange(name as keyof HeadingData, value);
      }
    },
    [handleChange]
  );

  const handleSave = useCallback(() => {
    const newErrors: HeadingErrors = {};
    if (!values.name?.trim()) {
      newErrors.name = "This field is required.";
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    setBackup(values);
    onSave?.(values);
    return true;
  }, [values, onSave]);

  const handleDiscard = useCallback(() => {
    setValues(backup);
    setErrors({});
  }, [backup]);

  return {
    values,
    errors,
    handleInputChange,
    handleSave,
    handleDiscard,
  };
}
