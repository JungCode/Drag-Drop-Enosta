import React from "react";
import EditFormWrapper from "../../../common/EditFormWrapper";
import { Icon } from "@iconify/react/dist/iconify.js";
import FormLabel from "../../../common/FormLabel";
import type { EditSelectionFormProps } from "../../types/Select.type";
import { inputClass } from "../../../../ultis/cssClassHelpers";

const EditSelectionForm: React.FC<EditSelectionFormProps> = ({
  values,
  errors,
  onChange,
  handleOptionChange,
  removeOption,
  addOption,
}) => (
  <EditFormWrapper>
    <div className="space-y-4 mb-4">
      {/* Name */}
      <div>
        <FormLabel htmlFor="name" className={errors.name ? "text-red-600" : ""}>
          Name <span className="text-red-600">*</span>
        </FormLabel>
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={onChange}
          className={`w-full rounded px-3 py-2 text-sm border ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Title */}
      <div>
        <FormLabel>Title</FormLabel>
        <input
          type="text"
          name="title"
          value={values.title || ""}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      {/* Placeholder */}
      <div>
        <FormLabel>Placeholder</FormLabel>
        <input
          type="text"
          name="placeholder"
          value={values.placeholder || ""}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      {/* Required */}
      <div>
        <FormLabel>Required</FormLabel>
        <select
          name="required"
          value={values.required ? "yes" : "no"}
          onChange={onChange}
          className={inputClass}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {/* Position */}
      <div>
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

      {/* Width */}
      <div>
        <FormLabel>Width</FormLabel>
        <select
          name="width"
          value={values.width || "100%"}
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
    </div>

    {/* Options Section */}
    <div>
      <FormLabel>Options</FormLabel>
      {values.options?.map((opt) => (
        <div key={opt.id} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={opt.value}
            onChange={(e) => handleOptionChange(opt.id, e.target.value)}
            className={inputClass + " flex-1"}
          />
          <button
            onClick={() => removeOption(opt.id)}
            type="button"
            className="text-red-600 hover:text-red-800"
          >
            <Icon icon="mdi:close" className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={addOption}
        type="button"
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
      >
        <Icon icon="mdi:plus" className="w-5 h-5" />
        Add Option
      </button>
    </div>
  </EditFormWrapper>
);

export default EditSelectionForm;
