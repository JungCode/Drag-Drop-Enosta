import React, { useState, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import EditableWrapper from "./EditableWrapper";
import type { PositionType } from "../../types/ElementTypes";
import EditFormWrapper from "./EditFormWrapper";
import FormLabel from "../common/FormLabel";

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

const SelectElement: React.FC<SelectProps> = React.memo(
  ({ id, data = {}, canEdit = false, onSave, onDelete }) => {
    const initialData: SelectData = useMemo(
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

    const handleChange = useCallback(<K extends keyof SelectData>(
      key: K,
      value: SelectData[K]
    ) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    }, []);

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

    const positionClass = useMemo(() => {
      return values.position === "center"
        ? "justify-center"
        : values.position === "right"
        ? "justify-end"
        : "justify-start";
    }, [values.position]);

    const inputClass = "w-full border border-gray-300 rounded px-3 py-2";

    const renderEditView = (
      <EditFormWrapper>
        <div className="space-y-4 mb-4">
          {/* Name */}
          <div>
            <FormLabel
              htmlFor="name"
              className={errors.name ? "text-red-600" : ""}
            >
              Name <span className="text-red-600">*</span>
            </FormLabel>
            <input
              type="text"
              name="name"
              value={values.name || ""}
              onChange={handleInputChange}
              className={`w-full rounded px-3 py-2 text-sm border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <FormLabel>Title</FormLabel>
            <input
              type="text"
              name="title"
              value={values.title || ""}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>

          {/* Placeholder */}
          <div>
            <FormLabel>Placeholder</FormLabel>
            <input
              type="text"
              name="placeholder"
              value={values.placeholder || ""}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>

          {/* Required */}
          <div>
            <FormLabel>Required</FormLabel>
            <select
              name="required"
              value={values.required ? "yes" : "no"}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Position */}
          <div>
            <FormLabel>Position</FormLabel>
            <select
              name="position"
              value={values.position || "left"}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Width */}
          <div>
            <FormLabel>Width</FormLabel>
            <select
              name="width"
              value={values.width || "100%"}
              onChange={handleInputChange}
              className={inputClass}
            >
              {["100%", "90%", "80%", "70%", "60%", "50%", "40%", "30%", "20%", "10%"].map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Options Section */}
        <div>
          <FormLabel>Options</FormLabel>
          {values.options?.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={opt.value}
                onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                className={inputClass + " flex-1"}
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
      </EditFormWrapper>
    );

    const preview = (
      <div className={positionClass}>
        {values.title && 
        <FormLabel>
          {values.title} {values.required && <span className="text-red-600">*</span>}
        </FormLabel>}
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
  }
);

export default SelectElement;
