import React from "react";
import EditFormWrapper from "../../../common/EditFormWrapper";
import FormLabel from "../../../common/FormLabel";
import { inputTypes, type EditInputFormProps } from "../../types/Input.type";
import { inputClass } from "../../../../ultis/cssClassHelpers";

const EditInputForm: React.FC<EditInputFormProps> = ({
  values,
  errors,
  onChange,
  handleCheckbox
}) => {

  return (
      <EditFormWrapper>
        <div className="w-full">
          <FormLabel>Title</FormLabel>
          <input
            name="title"
            value={values.title || ""}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div className="w-full">
          <FormLabel
            htmlFor="name"
            className={errors.name ? "text-red-600" : ""}
          >
            Name <span className="text-red-600">*</span>
          </FormLabel>
          <input
            name="name"
            value={values.name || ""}
            onChange={onChange}
            className={`w-full rounded px-3 py-2 text-sm border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <div className="text-red-500 text-xs mt-1">{errors.name}</div>
          )}
        </div>

        <div className="w-full">
          <FormLabel>Placeholder</FormLabel>
          <input
            name="placeholder"
            value={values.placeholder || ""}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div className="w-full">
          <FormLabel>Type</FormLabel>
          <select
            name="type"
            value={values.type || ""}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select type</option>
            {inputTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <FormLabel>Width</FormLabel>
          <select
            name="width"
            value={values.width}
            onChange={onChange}
            className={inputClass}
          >
            {[
              "100%",
              "90%",
              "80%",
              "70%",
              "60%",
              "50%",
              "40%",
              "30%",
              "20%",
              "10%",
            ].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <FormLabel>Position</FormLabel>
          <select
            name="position"
            value={values.position || "left"}
            onChange={onChange}
            className={inputClass}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
          <input
            type="checkbox"
            checked={values.required || false}
            onChange={handleCheckbox}
            className="form-checkbox h-4 w-4"
          />
          Required
        </label>
      </EditFormWrapper>
  );
};

export default EditInputForm;
