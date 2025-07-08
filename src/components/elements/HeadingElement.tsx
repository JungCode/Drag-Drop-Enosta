import React, { useState } from "react";
import type { JSX } from "react";
import EditableWrapper from "./EditableWrapper";

export interface HeadingData {
  title?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  name?: string;
  position?: "left" | "center" | "right";
  color?: string;
  canEdit?: boolean;
  id: string;
}

interface HeadingProps extends HeadingData {
  onSave?: (updated: HeadingData) => void;
  onDelete?: () => void;
}

const HeadingElement: React.FC<HeadingProps> = ({
  title = "Heading",
  size = 2,
  name = "title",
  position = "left",
  color = "#000000",
  canEdit = false,
  onSave,
  onDelete,
  id
}) => {
  const [values, setValues] = useState({
    title,
    size,
    name,
    position,
    color,
    id
  });

  const [backup, setBackup] = useState({
    title,
    size,
    name,
    position,
    color,
    id
  });

  // console.log('id', id)

  const handleChange = (
    key: keyof typeof values,
    value: string | number | undefined
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setBackup(values);
    onSave?.(values);
  };

  const handleDiscard = () => {
    setValues(backup);
  };

  const sizeClasses: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: "text-5xl",
    2: "text-4xl",
    3: "text-3xl",
    4: "text-2xl",
    5: "text-xl",
  };

  const positionClasses: Record<"left" | "center" | "right", string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Tag = `h${values.size}` as keyof JSX.IntrinsicElements;

  return (
    <EditableWrapper
      canEdit={canEdit}
      onSave={handleSave}
      onDelete={onDelete}
      onDiscard={handleDiscard}
      position={values.position}
      id={values.id}
      editView={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Heading Text</label>
            <input
              value={values.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <select
              value={values.size}
              onChange={(e) =>
                handleChange("size", Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <option key={s} value={s}>
                  Size {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <select
              value={values.position}
              onChange={(e) =>
                handleChange("position", e.target.value as "left" | "center" | "right")
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={values.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="w-20 h-10 border-none"
            />
          </div>
        </div>
      }
    >
      <Tag
        style={{ color: values.color }}
        className={`font-bold ${sizeClasses[values.size]} ${positionClasses[values.position]} w-full`}
        {...(values.name ? { name: values.name } : {})}
      >
        {values.title}
      </Tag>
    </EditableWrapper>
  );
};

export default HeadingElement;
