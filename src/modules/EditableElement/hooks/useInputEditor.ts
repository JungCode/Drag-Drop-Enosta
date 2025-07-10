import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import type { InputProps } from "../types/Input.type";

export const useInputEditor = (
  initialValues: InputProps,
  onSave?: (updated: InputProps) => void,
  onDelete?: () => void
) => {
  const [values, setValues] = useState<InputProps>(initialValues);
  const [backup, setBackup] = useState<InputProps>(initialValues);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = useCallback(
    <K extends keyof InputProps>(key: K, value: InputProps[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      handleChange(name as keyof InputProps, value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [handleChange]
  );

  const handleCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, required: e.target.checked }));
  }, []);

  const handleSave = useCallback(() => {
    if (!values.name?.trim()) {
      setErrors({ name: "This field is required." });
      return false;
    }
    setBackup(values);
    setErrors({});
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
    setValues,
    handleInputChange,
    handleCheckbox,
    handleSave,
    handleDiscard,
    handleChange,
    handleDelete: () => onDelete?.(),
  };
};
