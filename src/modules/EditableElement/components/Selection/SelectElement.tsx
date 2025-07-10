import React, { useState, useCallback, useMemo } from "react";
import EditSelectionForm from "./EditSelectionForm";
import EditableWrapper from "../EditableWrapper";
import FormLabel from "../../../common/FormLabel";
import type { SelectData, SelectProps } from "../../types/Select.type";
import { getJustifyClass } from "../../../../ultis/cssClassHelpers";

const SelectElement: React.FC<SelectProps> = React.memo(
  ({ id, data = {}, canEdit = false, onSave, onDelete }) => {
    const initialData: SelectData = useMemo(
      () => ({
        name: "select",
        title: "Title Select",
        placeholder: "",
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

    const positionClass = useMemo(
      () => getJustifyClass(values.position),
      [values.position]
    );

    const preview = (
      <div className={positionClass}>
        {values.title && (
          <FormLabel>
            {values.title}{" "}
            {values.required && <span className="text-red-600">*</span>}
          </FormLabel>
        )}
        <select
          name={values.name}
          required={values.required}
          className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          {values.placeholder && <option value="">{values.placeholder}</option>}
          {values.options?.map((opt) => (
            <option key={opt.id} value={opt.value}>
              {opt.value}
            </option>
          ))}
        </select>
      </div>
    );

    return (
      <EditableWrapper
        canEdit={canEdit}
        id={id}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onDelete={onDelete}
        editView={
          <EditSelectionForm
            values={values}
            errors={errors}
            onChange={handleInputChange}
            handleOptionChange={handleOptionChange}
            removeOption={removeOption}
            addOption={addOption}
          />
        }
        width={values.width}
        position={values.position}
      >
        {preview}
      </EditableWrapper>
    );
  }
);

export default SelectElement;
