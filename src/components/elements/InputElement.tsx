import React, { useState } from "react";
import type { InputType } from "../../types/ElementTypes";
import EditableWrapper from "./EditableWrapper";

interface InputProps {
  id: string;
  name?: string;
  title?: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  width?: string;
  canEdit?: boolean;
  position?: "left" | "center" | "right";
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
  const normalizedName = name?.toLowerCase() || "";
  const normalizedType = type?.toLowerCase() || "";
  if (["email"].includes(normalizedName) || normalizedType === "email")
    return "email";
  if (["name", "fullname", "username"].includes(normalizedName)) return "name";
  if (["password"].includes(normalizedName) || normalizedType === "password")
    return "new-password";
  if (["phone", "tel"].includes(normalizedName) || normalizedType === "tel")
    return "tel";
  if (["url", "website"].includes(normalizedName) || normalizedType === "url")
    return "url";
  return "off";
};

const InputElement: React.FC<InputProps> = ({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, required: e.target.checked }));
  };

  const handleSave = () => {
    setBackup(values);
    onSave?.(values);
  };

  const handleDiscard = () => {
    setValues(backup);
  };

  const editView = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            value={values.title || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Placeholder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placeholder
          </label>
          <input
            name="placeholder"
            value={values.placeholder || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={values.type || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Select type</option>
            {inputTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <select
            name="width"
            value={values.width}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
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

        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <select
            name="position"
            value={values.position || "left"}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      {/* Required Checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={values.required || false}
          onChange={handleCheckbox}
          className="form-checkbox h-4 w-4"
        />
        Required
      </label>
    </div>
  );

  const positionClass =
    values.position === "center"
      ? "justify-center"
      : values.position === "right"
      ? "justify-end"
      : "justify-start";

  const preview = (
    <div className={`space-y-1 p-2 ${positionClass}`}>
      {values.title && (
        <label className="block text-sm font-medium text-gray-700">
          {values.title}
        </label>
      )}
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
};

export default InputElement;
