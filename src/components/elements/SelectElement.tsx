import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditableWrapper from "./EditableWrapper";
import type { PositionType } from "../../types/ElementTypes";

interface Option {
  id: string;
  value: string;
}

export interface SelectData {
  name?: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  position?: PositionType;
  options?: Option[];
}

interface SelectProps {
  id: string;
  data: SelectData;
  canEdit?: boolean;
  onSave?: (data: SelectData) => void;
  onDelete?: () => void;
}

const SelectElement: React.FC<SelectProps> = ({
  id,
  data = {},
  canEdit = false,
  onSave,
  onDelete,
}) => {
  const initialData: SelectData = {
    name: "select",
    title: "Title Select",
    placeholder: "Chọn gì đó",
    required: false,
    width: "100%",
    position: "left",
    options: [],
    ...data,
  };
  const [values, setValues] = useState<SelectData>(initialData);
  const [backup, setBackup] = useState<SelectData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, required: e.target.value === "yes" }));
  };

  const handleOptionChange = (id: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      options: prev.options?.map((opt) =>
        opt.id === id ? { ...opt, value } : opt
      ),
    }));
  };

  const addOption = () => {
    const newId = Date.now().toString();
    setValues((prev) => ({
      ...prev,
      options: [...(prev.options || []), { id: newId, value: "" }],
    }));
  };

  const removeOption = (id: string) => {
    setValues((prev) => ({
      ...prev,
      options: prev.options?.filter((opt) => opt.id !== id),
    }));
  };

  const handleSave = () => {
    setBackup(values);
    onSave?.(values);
  };

  const handleDiscard = () => {
    setValues(backup);
  };

  const getPositionClass = () => {
    switch (values.position) {
      case "center":
        return "mx-auto";
      case "right":
        return "ml-auto";
      default:
        return "";
    }
  };

  const renderEditView = (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={values.title || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Placeholder</label>
          <input
            type="text"
            name="placeholder"
            value={values.placeholder || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Required</label>
          <select
            value={values.required ? "yes" : "no"}
            onChange={handleRequiredChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Position</label>
          <select
            name="position"
            value={values.position || "left"}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Width</label>
          <select
            name="width"
            value={values.width || "100%"}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {["100%", "90%", "75%", "50%", "33%", "25%"].map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Options</label>
        {values.options?.map((opt) => (
          <div key={opt.id} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={opt.value}
              onChange={(e) => handleOptionChange(opt.id, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={() => removeOption(opt.id)}
              type="button"
              className="text-red-600 hover:text-red-800"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          type="button"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
        >
          <Icon icon="mdi:plus" className="w-5 h-5" />
          Add Option
        </button>
      </div>
    </>
  );

  const preview = (
    <div className={`space-y-1 p-2 ${getPositionClass()}`}>
      {values.title && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {values.title}
        </label>
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
      editView={renderEditView}
      width={values.width}
      position={values.position}
    >
      {preview}
    </EditableWrapper>
  );
};

export default SelectElement;
