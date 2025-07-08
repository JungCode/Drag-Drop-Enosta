import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditableWrapper from "./EditableWrapper";

interface ImageProps {
  name?: string;
  title?: string;
  src?: string;
  alt?: string;
  width?: string;
  canEdit?: boolean;
  position?: "left" | "center" | "right";
  shape?: "circle" | "square" | "rectangle";
  onSave?: (updated: ImageProps) => void;
  onDelete?: () => void;
  id: string
}

const ImageElement: React.FC<ImageProps> = ({
  name = "image",
  title = "Title Image",
  src = "https://placehold.co/300x200",
  alt = "Mô tả gì đó đi",
  width = "50%",
  position = "left",
  shape = "rectangle",
  canEdit = false,
  onSave,
  onDelete,
  id
}) => {
  const [values, setValues] = useState({
    name,
    title,
    src,
    alt,
    width,
    position,
    shape,
    id
  });
  const [backup, setBackup] = useState(values);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDiscard = () => {
    setValues(backup);
  };

  const handleSave = () => {
    setBackup(values);
    onSave?.(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const getShapeClass = () => {
    switch (values.shape) {
      case "circle":
        return "rounded-full aspect-square";
      case "square":
        return "aspect-square rounded";
      case "rectangle":
      default:
        return "aspect-video rounded";
    }
  };

  const widthOptions = Array.from({ length: 10 }, (_, i) => `${100 - i * 10}%`);

  const editView = (
    <div className="grid grid-cols-2 gap-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Image title"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Form Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Form name"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Alt */}
      <div>
        <label className="block text-sm font-medium mb-1">Alt Text</label>
        <input
          name="alt"
          value={values.alt}
          onChange={handleChange}
          placeholder="Alt text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Image URL + Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          name="src"
          value={values.src}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <label className="mt-2 flex items-center gap-2 cursor-pointer text-blue-600 text-sm hover:underline">
          <Icon icon="mdi:upload" className="text-base" />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setValues((prev) => ({ ...prev, src: url }));
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm font-medium mb-1">Width</label>
        <select
          name="width"
          value={values.width}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          {widthOptions.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium mb-1">Align</label>
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

      {/* Shape */}
      <div>
        <label className="block text-sm font-medium mb-1">Shape</label>
        <select
          name="shape"
          value={values.shape}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="rectangle">Rectangle</option>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
        </select>
      </div>
    </div>
  );

  return (
    <EditableWrapper
      width={values.width}
      id={values.id}
      position={values.position}
      canEdit={canEdit}
      editView={editView}
      onSave={handleSave}
      onDelete={handleDelete}
      onDiscard={handleDiscard}
    >
      <div>
        {values.title && (
          <p className="text-sm text-gray-600 mb-1">{values.title}</p>
        )}
        <img
          src={values.src}
          alt={values.alt}
          loading="lazy"
          style={{ width: "100%", objectFit: "cover" }}
          className={getShapeClass()}
        />
      </div>
    </EditableWrapper>
  );
};

export default ImageElement;
