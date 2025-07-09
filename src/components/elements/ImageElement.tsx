import React, { useState, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import EditableWrapper from "./EditableWrapper";
import EditFormWrapper from "./EditFormWrapper";
import FormLabel from "../common/FormLabel";
import type { PositionType } from "../../types/ElementTypes";

interface ImageProps {
  name?: string;
  title?: string;
  src?: string;
  alt?: string;
  width?: string;
  canEdit?: boolean;
  position?: PositionType;
  shape?: "circle" | "square" | "rectangle";
  onSave?: (updated: ImageProps) => void;
  onDelete?: () => void;
  id: string;
}

const ImageElement: React.FC<ImageProps> = React.memo(({
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
  id,
}) => {
  const [values, setValues] = useState({
    name,
    title,
    src,
    alt,
    width,
    position,
    shape,
    id,
  });

  const [backup, setBackup] = useState(values);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      if (e.target.name === "name" && e.target.value.trim()) {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    },
    [values]
  );

  const handleDiscard = useCallback(() => {
    setValues(backup);
    setErrors({});
  }, [backup]);

  const handleSave = useCallback(() => {
    const newErrors: { name?: string } = {};
    if (!values.name.trim()) {
      newErrors.name = "This field is required.";
      setErrors(newErrors);
      return false;
    }

    setBackup(values);
    setErrors({});
    onSave?.(values);
  }, [values, onSave]);

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const getShapeClass = useCallback(() => {
    switch (values.shape) {
      case "circle":
        return "rounded-full aspect-square";
      case "square":
        return "aspect-square rounded";
      case "rectangle":
      default:
        return "aspect-video rounded";
    }
  }, [values.shape]);

  const widthOptions = useMemo(
    () => Array.from({ length: 10 }, (_, i) => `${100 - i * 10}%`),
    []
  );

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm";

  const editView = useMemo(
    () => (
      <EditFormWrapper>
        {/* Title */}
        <div>
          <FormLabel>Title</FormLabel>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Image title"
            className={inputClass}
          />
        </div>

        {/* Name */}
        <div>
          <FormLabel 
            className={errors.name ? "text-red-600" : ""}
            htmlFor="name"
          >
            Name <span className="text-red-600">*</span>
            </FormLabel>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Form name"
            className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Alt */}
        <div>
          <FormLabel>Alt Text</FormLabel>
          <input
            name="alt"
            value={values.alt}
            onChange={handleChange}
            placeholder="Alt text"
            className={inputClass}
          />
        </div>

        {/* Width */}
        <div>
          <FormLabel>Width</FormLabel>
          <select
            name="width"
            value={values.width}
            onChange={handleChange}
            className={inputClass}
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
          <FormLabel>Align</FormLabel>
          <select
            name="position"
            value={values.position}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        {/* Shape */}
        <div>
          <FormLabel>Shape</FormLabel>
          <select
            name="shape"
            value={values.shape}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="rectangle">Rectangle</option>
            <option value="square">Square</option>
            <option value="circle">Circle</option>
          </select>
        </div>

        {/* Image URL + Upload */}
        <div>
          <FormLabel>Image URL</FormLabel>
          <input
            name="src"
            value={values.src}
            onChange={handleChange}
            placeholder="Image URL"
            className={inputClass}
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
      </EditFormWrapper>
    ),
    [values, handleChange, errors, widthOptions]
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
});

export default ImageElement;
