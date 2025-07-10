import { useCallback, useState } from "react";
import type { ImageProps } from "../types/Image.type";

export const useImageEditor = (
  initialValues: ImageProps,
  onSave?: (updated: ImageProps) => void,
  onDelete?: () => void
) => {
  const [values, setValues] = useState<ImageProps>(initialValues);
  const [backup, setBackup] = useState(initialValues);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (name === "name" && value.trim()) {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    },
    []
  );

  const handleDiscard = useCallback(() => {
    setValues(backup);
    setErrors({});
  }, [backup]);

  const handleSave = useCallback(() => {
    const newErrors: { name?: string } = {};
    if (!values?.name?.trim()) {
      newErrors.name = "This field is required.";
      setErrors(newErrors);
      return false;
    }

    setBackup(values);
    setErrors({});
    onSave?.(values);
  }, [values, onSave]);

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const getShapeClass = useCallback(() => {
    switch (values.shape) {
      case "circle":
        return "rounded-full aspect-square";
      case "square":
        return "aspect-square rounded";
      case "rectangle":
      default:
        return "aspect-video rounded";
    }
  }, [values.shape]);

  return {
    values,
    setValues,
    errors,
    handleChange,
    handleSave,
    handleDiscard,
    handleDelete,
    getShapeClass,
  };
};
