import React from "react";
import EditFormWrapper from "../../../common/EditFormWrapper";
import FormLabel from "../../../common/FormLabel";
import type { EditHeadingFormProps } from "../../types/Heading.type";
import { inputClass } from "../../../../ultis/cssClassHelpers";

const EditHeadingForm: React.FC<EditHeadingFormProps> = ({
  values,
  errors,
  onChange,
}) => {
  return (
    <EditFormWrapper>
      <div className="w-full">
        <FormLabel htmlFor="heading-title">Heading Text</FormLabel>
        <input
          id="heading-title"
          name="title"
          value={values.title}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div className="w-full">
        <FormLabel htmlFor="heading-size">Size</FormLabel>
        <select
          id="heading-size"
          name="size"
          value={values.size}
          onChange={onChange}
          className={inputClass}
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
          onChange={onChange}
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
          onChange={onChange}
          className={inputClass}
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
          onChange={onChange}
          className="w-20 h-10 border-none"
        />
      </div>
    </EditFormWrapper>
  );
};

export default EditHeadingForm;
