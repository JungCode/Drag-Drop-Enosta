import { useCallback, useState } from "react";
import type { EditableFieldErrors } from "../types/Button.type";

export function useButtonEditor<T extends { id: string; name?: string }>(
  initialValues: T,
  validate?: (values: T) => EditableFieldErrors
) {
  const [values, setValues] = useState<T>(initialValues);
  const [backup, setBackup] = useState<T>(initialValues);
  const [errors, setErrors] = useState<EditableFieldErrors>({});

  const handleChange = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      handleChange(name as keyof T, value as T[keyof T]);
    },
    [handleChange]
  );

  const handleSave = useCallback(
    (onSave?: (values: T) => void): boolean => {
      const validationErrors = validate?.(values) || {};
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }
      setErrors({});
      setBackup(values);
      onSave?.(values);
      return true;
    },
    [values, validate]
  );

  const handleDiscard = useCallback(() => {
    setValues(backup);
    setErrors({});
  }, [backup]);

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleInputChange,
    handleSave,
    handleDiscard,
  };
}
