import React, { useState, useCallback, useMemo } from "react";
import EditableWrapper from "./EditableWrapper";
import type { ButtonType, PositionType } from "../../types/ElementTypes";
import EditFormWrapper from "./EditFormWrapper";
import FormLabel from "../common/FormLabel";

export interface ButtonProps {
  id: string;
  content?: string;
  name?: string;
  type?: ButtonType;
  position?: PositionType;
  canEdit?: boolean;
  onSave?: (updated: ButtonProps) => void;
  onDelete?: () => void;
}

const ButtonElement: React.FC<ButtonProps> = React.memo(
  ({
    id,
    content = "Button",
    name = "submitButton",
    type = "submit",
    position = "left",
    canEdit = false,
    onSave,
    onDelete,
  }) => {
    const initial = { id, content, name, type, position };
    const [values, setValues] = useState<ButtonProps>(initial);
    const [backup, setBackup] = useState<ButtonProps>(initial);
    const [errors, setErrors] = useState<{ name?: string }>({});

    const handleChange = useCallback(
      <K extends keyof ButtonProps>(key: K, value: ButtonProps[K]) => {
        setValues((prev) => ({ ...prev, [key]: value }));
      },
      []
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        handleChange(name as keyof ButtonProps, value);
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      },
      [handleChange]
    );

    const handleSave = useCallback(() => {
      const newErrors: { name?: string } = {};
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

    const positionClass = useMemo(() => {
      return values.position === "center"
        ? "justify-center"
        : values.position === "right"
        ? "justify-end"
        : "justify-start";
    }, [values.position]);

    const editView = useMemo(() => (
      <EditFormWrapper>
        <div>
          <FormLabel htmlFor="button-content">Content</FormLabel>
          <input
            id="button-content"
            name="content"
            value={values.content}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <FormLabel
            htmlFor="button-name"
            className={errors.name ? "text-red-600" : ""}
          >
            Name <span className="text-red-600">*</span>
          </FormLabel>
          <input
            id="button-name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className={`w-full rounded px-3 py-2 text-sm border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <FormLabel htmlFor="button-type">Type</FormLabel>
          <select
            id="button-type"
            name="type"
            value={values.type}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="submit">submit</option>
            {/* <option value="reset">reset</option>
            <option value="button">button</option> */}
          </select>
        </div>

        <div>
          <FormLabel htmlFor="button-position">Align</FormLabel>
          <select
            id="button-position"
            name="position"
            value={values.position}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="left">left</option>
            <option value="center">center</option>
            <option value="right">right</option>
          </select>
        </div>
      </EditFormWrapper>
    ), [values, errors, handleInputChange]);

    return (
      <EditableWrapper
        canEdit={canEdit}
        id={values.id}
        width="100%"
        position={values.position}
        onSave={handleSave}
        onDelete={onDelete}
        onDiscard={handleDiscard}
        editView={editView}
      >
        <div className={`w-full flex ${positionClass}`}>
          <button
            type={values.type}
            name={values.name}
            className="w-full max-w-xs px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            {values.content}
          </button>
        </div>
      </EditableWrapper>
    );
  }
);

export default ButtonElement;
