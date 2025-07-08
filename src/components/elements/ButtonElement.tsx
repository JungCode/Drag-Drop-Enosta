import React, { useState } from "react";
import EditableWrapper from "./EditableWrapper";

type ButtonType = "button" | "submit" | "reset";
type ButtonPosition = "left" | "center" | "right";

interface ButtonProps {
  content?: string;
  name?: string;
  type?: ButtonType;
  position?: ButtonPosition;
  canEdit?: boolean;
  onSave?: (updated: {
    content?: string;
    name?: string;
    type?: ButtonType;
    position?: ButtonPosition;
  }) => void;
  onDelete?: () => void;
  id: string
}

const ButtonElement: React.FC<ButtonProps> = ({
  content = "Button",
  name = "submitButton",
  type = "submit",
  position = "left",
  canEdit = false,
  onSave,
  onDelete,
  id
}) => {
  const [values, setValues] = useState({
    content,
    name,
    type,
    position,
    id
  });

  const [backup, setBackup] = useState({ ...values });

  const handleChange = (key: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleDiscard = () => {
    setValues(backup);
  };

  const handleSave = () => {
    setBackup(values);
    onSave?.(values);
  };

  const positionClass =
    values.position === "center"
      ? "justify-center"
      : values.position === "right"
      ? "justify-end"
      : "justify-start";

  return (
    <EditableWrapper
      canEdit={canEdit}
      id={values.id}
      width="100%"
      position={values.position}
      onSave={handleSave}
      onDelete={onDelete}
      onDiscard={handleDiscard}
      editView={
        <div className="grid grid-cols-2 gap-4">
          {/* Button Label */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Button Label</label>
            <input
              value={values.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Button Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Button Name</label>
            <input
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Button Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Button Type</label>
            <select
              value={values.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {/* <option value="button">button</option> */}
              <option value="submit">submit</option>
              {/* <option value="reset">reset</option> */}
            </select>
          </div>

          {/* Button Align */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Button Align</label>
            <select
              value={values.position}
              onChange={(e) => handleChange("position", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </div>
        </div>
      }
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
};

export default ButtonElement;
