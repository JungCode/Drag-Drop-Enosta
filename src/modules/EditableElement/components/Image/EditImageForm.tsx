import React, { useMemo } from "react";
import EditFormWrapper from "../../../common/EditFormWrapper";
import { Icon } from "@iconify/react/dist/iconify.js";
import FormLabel from "../../../common/FormLabel";
import type { EditImageFormProps } from "../../types/Image.type";

const EditImageForm: React.FC<EditImageFormProps> = ({
  values,
  errors,
  onChange,
  setValues
}) => {
  const widthOptions = useMemo(
    () => Array.from({ length: 10 }, (_, i) => `${100 - i * 10}%`),
    []
  );

  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm";
  return (
    <EditFormWrapper>
      {/* Title */}
      <div>
        <FormLabel>Title</FormLabel>
        <input
          name="title"
          value={values.title}
          onChange={onChange}
          placeholder="Image title"
          className={inputClass}
        />
      </div>

      {/* Name */}
      <div>
        <FormLabel className={errors.name ? "text-red-600" : ""} htmlFor="name">
          Name <span className="text-red-600">*</span>
        </FormLabel>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
};

export default EditImageForm;
