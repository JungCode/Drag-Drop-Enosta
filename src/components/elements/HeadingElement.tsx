import React, { useState } from "react";
import type { JSX } from "react";
import EditableWrapper from "./EditableWrapper";

export interface HeadingData {
  title?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  name?: string;
  position?: "left" | "center" | "right";
  color?: string;
  id: string;
}

interface HeadingProps extends HeadingData {
  canEdit?: boolean;
  onSave?: (updated: HeadingData) => void;
  onDelete?: () => void;
}

const HeadingElement: React.FC<HeadingProps> = ({
  title = "Heading",
  size = 2,
  name = "title",
  position = "left",
  color = "#000000",
  id,
  canEdit = false,
  onSave,
  onDelete,
}) => {
  const initial = { title, size, name, position, color, id };
  const [values, setValues] = useState<HeadingData>(initial);
  const [backup, setBackup] = useState<HeadingData>(initial);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "size") {
      setValues((prev) => ({ ...prev, size: Number(value) as HeadingData["size"] }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
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

  const editView = (
    <div className="grid grid-cols-2 gap-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Heading Text</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium mb-1">Size</label>
        <select
          name="size"
          value={values.size}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              Heading {s}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium mb-1">Position</label>
        <select
          name="position"
          value={values.position}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <input
          type="color"
          name="color"
          value={values.color}
          onChange={handleChange}
          className="w-20 h-10 border-none"
        />
      </div>
    </div>
  );

  return (
    <EditableWrapper
      id={values.id}
      canEdit={canEdit}
      onSave={handleSave}
      onDiscard={handleDiscard}
      onDelete={onDelete}
      position={values.position}
      editView={editView}
    >
      <Tag
        style={{ color: values.color }}
        className={`font-bold ${sizeClasses[values.size || 2]} ${positionClasses[values.position || 'left']} w-full`}
        {...(values.name ? { name: values.name } : {})}
      >
        {values.title}
      </Tag>
    </EditableWrapper>
  );
};

export default HeadingElement;
