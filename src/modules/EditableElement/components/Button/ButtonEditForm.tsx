import React from "react";
import EditFormWrapper from "../../../common/EditFormWrapper";
import FormLabel from "../../../common/FormLabel";
import type { EditButtonFormProps } from "../../types/Button.type";
import { inputClass } from "../../../../ultis/cssClassHelpers";

const EditButtonForm: React.FC<EditButtonFormProps> = ({
  values,
  errors,
  onChange,
}) => {
  return (
    <EditFormWrapper>
      <div>
        <FormLabel htmlFor="button-content">Content</FormLabel>
        <input
          id="button-content"
          name="content"
          value={values.content}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div>
        <FormLabel
          htmlFor="button-name"
          className={errors.name ? "text-red-600" : ""}
        >
          Name <span className="text-red-600">*</span>
        </FormLabel>
        <input
          id="button-name"
          name="name"
          value={values.name}
          onChange={onChange}
          className={`w-full rounded px-3 py-2 text-sm border ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <FormLabel htmlFor="button-type">Type</FormLabel>
        <select
          id="button-type"
          name="type"
          value={values.type}
          onChange={onChange}
          className={inputClass}
        >
          <option value="submit">submit</option>
          {/* <option value="reset">reset</option>
            <option value="button">button</option> */}
        </select>
      </div>

      <div>
        <FormLabel htmlFor="button-position">Align</FormLabel>
        <select
          id="button-position"
          name="position"
          value={values.position}
          onChange={onChange}
          className={inputClass}
        >
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>
      </div>
    </EditFormWrapper>
  );
};

export default EditButtonForm;
