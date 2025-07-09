import React, { useState, useCallback, useMemo } from "react";
import type { ChangeEvent } from "react";
import type { InputType, PositionType } from "../../types/ElementTypes";
import EditableWrapper from "./EditableWrapper";
import EditFormWrapper from "./EditFormWrapper";
import FormLabel from "../common/FormLabel";

interface InputProps {
  id: string;
  name?: string;
  title?: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  width?: string;
  canEdit?: boolean;
  position?: PositionType
  onSave?: (updated: InputProps) => void;
  onDelete?: () => void;
}

const inputTypes: InputType[] = [
  "text",
  "email",
  "password",
  "number",
  "tel",
  "date",
  "datetime-local",
  "file",
  "month",
  "range",
  "time",
  "week",
];

const getAutoComplete = (name?: string, type?: string): string | undefined => {
  const n = name?.toLowerCase() || "";
  const t = type?.toLowerCase() || "";
  if (["email"].includes(n) || t === "email") return "email";
  if (["name", "fullname", "username"].includes(n)) return "name";
  if (["password"].includes(n) || t === "password") return "new-password";
  if (["phone", "tel"].includes(n) || t === "tel") return "tel";
  if (["url", "website"].includes(n) || t === "url") return "url";
  return "off";
};

const InputElement: React.FC<InputProps> = React.memo(({
  id,
  name = "input",
  title = "Input title",
  type = "text",
  placeholder = "Nhập gì đó...",
  required = true,
  width = "100%",
  canEdit = false,
  position = "left",
  onSave,
  onDelete,
}) => {
  const initial = {
    id,
    name,
    title,
    type,
    placeholder,
    required,
    width,
    position,
  };
  const [values, setValues] = useState<InputProps>(initial);
  const [backup, setBackup] = useState<InputProps>(initial);
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
    setErrors({});
    setBackup(values);
    onSave?.(values);
    return true;
  }, [values, onSave]);

  const handleDiscard = useCallback(() => {
    setValues(backup);
    setErrors({});
  }, [backup]);

  const editView = useMemo(
    () => (
      <EditFormWrapper>
        <div className="w-full">
          <FormLabel>Title</FormLabel>
          <input
            name="title"
            value={values.title || ""}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="w-full">
          <FormLabel
            htmlFor="name"
            className={errors.name ? "text-red-600" : ""}
          >
            Name <span className="text-red-600">*</span>
          </FormLabel>
          <input
            name="name"
            value={values.name || ""}
            onChange={handleInputChange}
            className={`w-full rounded px-3 py-2 text-sm border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <div className="text-red-500 text-xs mt-1">{errors.name}</div>
          )}
        </div>

        <div className="w-full">
          <FormLabel>Placeholder</FormLabel>
          <input
            name="placeholder"
            value={values.placeholder || ""}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="w-full">
          <FormLabel>Type</FormLabel>
          <select
            name="type"
            value={values.type || ""}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Select type</option>
            {inputTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <FormLabel>Width</FormLabel>
          <select
            name="width"
            value={values.width}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {[
              "100%",
              "90%",
              "80%",
              "70%",
              "60%",
              "50%",
              "40%",
              "30%",
              "20%",
              "10%",
            ].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <FormLabel>Position</FormLabel>
          <select
            name="position"
            value={values.position || "left"}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
          <input
            type="checkbox"
            checked={values.required || false}
            onChange={handleCheckbox}
            className="form-checkbox h-4 w-4"
          />
          Required
        </label>
      </EditFormWrapper>
    ),
    [values, errors, handleChange, handleCheckbox]
  );

  const preview = useMemo(() => {
    const positionClass =
      values.position === "center"
        ? "justify-center"
        : values.position === "right"
        ? "justify-end"
        : "justify-start";

    return (
      <div className={`${positionClass}`}>
        {values.title && 
        <FormLabel>
          {values.title} {values.required && <span className="text-red-600">*</span>}
        </FormLabel>}
        <input
          name={values.name}
          placeholder={values.placeholder}
          type={values.type}
          required={values.required}
          className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          autoComplete={getAutoComplete(values.name, values.type)}
        />
      </div>
    );
  }, [values]);

  return (
    <EditableWrapper
      id={values.id}
      width={values.width}
      canEdit={canEdit}
      editView={editView}
      onSave={handleSave}
      onDiscard={handleDiscard}
      onDelete={onDelete}
      position={values.position}
    >
      {preview}
    </EditableWrapper>
  );
});

export default InputElement;
