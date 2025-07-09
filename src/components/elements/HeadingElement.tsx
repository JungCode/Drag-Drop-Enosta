import React, { useState, useCallback, useMemo } from "react";
import type { JSX } from "react";
import EditableWrapper from "./EditableWrapper";
import EditFormWrapper from "./EditFormWrapper";
import FormLabel from "../common/FormLabel";
import type { PositionType } from "../../types/ElementTypes";

export interface HeadingData {
  title?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  name?: string;
  position?: PositionType;
  color?: string;
  id: string;
}

interface HeadingProps extends HeadingData {
  canEdit?: boolean;
  onSave?: (updated: HeadingData) => void;
  onDelete?: () => void;
}

const HeadingElement: React.FC<HeadingProps> = React.memo(({
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
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = useCallback(<K extends keyof HeadingData>(
    key: K,
    value: HeadingData[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === "size") {
        handleChange("size", Number(value) as HeadingData["size"]);
      } else {
        handleChange(name as keyof HeadingData, value);
      }
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

  const Tag = useMemo(() => `h${values.size}` as keyof JSX.IntrinsicElements, [values.size]);

  const sizeClasses = useMemo(() => ({
    1: "text-5xl",
    2: "text-4xl",
    3: "text-3xl",
    4: "text-2xl",
    5: "text-xl",
  }), []);

  const positionClasses = useMemo(() => ({
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }), []);

  const editView = useMemo(() => (
    <EditFormWrapper>
      <div className="w-full">
        <FormLabel htmlFor="heading-title">Heading Text</FormLabel>
        <input
          id="heading-title"
          name="title"
          value={values.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="w-full">
        <FormLabel htmlFor="heading-size">Size</FormLabel>
        <select
          id="heading-size"
          name="size"
          value={values.size}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              Heading {s}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <FormLabel
          htmlFor="heading-name"
          className={errors.name ? "text-red-600" : ""}
        >
          Name <span className="text-red-600">*</span>
        </FormLabel>
        <input
          id="heading-name"
          name="name"
          required
          value={values.name}
          onChange={handleInputChange}
          className={`w-full rounded px-3 py-2 text-sm ${
            errors.name ? "border border-red-500" : "border border-gray-300"
          }`}
        />
        {errors.name && (
          <span className="text-xs text-red-600 mt-1 block">{errors.name}</span>
        )}
      </div>

      <div className="w-full">
        <FormLabel htmlFor="heading-position">Position</FormLabel>
        <select
          id="heading-position"
          name="position"
          value={values.position}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="w-full">
        <FormLabel htmlFor="heading-color">Color</FormLabel>
        <input
          id="heading-color"
          type="color"
          name="color"
          value={values.color}
          onChange={handleInputChange}
          className="w-20 h-10 border-none"
        />
      </div>
    </EditFormWrapper>
  ), [values, errors, handleInputChange]);

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
        className={`font-bold ${sizeClasses[values.size || 2]} ${
          positionClasses[values.position || "left"]
        } w-full`}
      >
        {values.title}
      </Tag>
    </EditableWrapper>
  );
});

export default HeadingElement;
