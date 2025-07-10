import { useCallback, useMemo, useState } from "react";
import type { SelectData } from "../types/Select.type";
import { getJustifyClass } from "../../../ultis/cssClassHelpers";

export const useSelectEditor = (
  data: SelectData,
  onSave?: (data: SelectData) => void,
  onDelete?: () => void
) => {
  const initialData = useMemo<SelectData>(
    () => ({
      name: "select",
      title: "Title Select",
      placeholder: "Chọn gì đó",
      required: false,
      width: "100%",
      position: "left",
      options: [],
      ...data,
    }),
    [data]
  );

  const [values, setValues] = useState<SelectData>(initialData);
  const [backup, setBackup] = useState<SelectData>(initialData);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = useCallback(
    <K extends keyof SelectData>(key: K, value: SelectData[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === "required") {
        handleChange("required", value === "yes");
      } else {
        handleChange(name as keyof SelectData, value);
      }

      if (name === "name") {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    },
    [handleChange]
  );

  const handleOptionChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      options: prev.options?.map((opt) =>
        opt.id === id ? { ...opt, value } : opt
      ),
    }));
  }, []);

  const addOption = useCallback(() => {
    const newId = Date.now().toString();
    setValues((prev) => ({
      ...prev,
      options: [...(prev.options || []), { id: newId, value: "" }],
    }));
  }, []);

  const removeOption = useCallback((id: string) => {
    setValues((prev) => ({
      ...prev,
      options: prev.options?.filter((opt) => opt.id !== id),
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (!values.name?.trim()) {
      setErrors({ name: "This field is required." });
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

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const positionClass = useMemo(
    () => getJustifyClass(values.position),
    [values.position]
  );

  return {
    values,
    setValues,
    errors,
    handleInputChange,
    handleChange,
    handleOptionChange,
    addOption,
    removeOption,
    handleSave,
    handleDiscard,
    handleDelete,
    positionClass,
  };
};
