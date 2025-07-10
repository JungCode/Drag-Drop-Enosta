import React, { useMemo } from "react";
import EditableWrapper from "../EditableWrapper";
import EditInputForm from "./EditInputForm";
import FormLabel from "../../../common/FormLabel";
import { useInputEditor } from "../../hooks/useInputEditor";
import type { InputProps } from "../../types/Input.type";
import { getJustifyClass } from "../../../../ultis/cssClassHelpers";

const defaultValues: Required<Pick<
  InputProps,
  "name" | "title" | "type" | "placeholder" | "required" | "width" | "position"
>> = {
  name: "input",
  title: "Input title",
  type: "text",
  placeholder: "",
  required: false,
  width: "100%",
  position: "left",
};

const getAutoComplete = (name?: string, type?: string): string | undefined => {
  const n = name?.toLowerCase() || "";
  const t = type?.toLowerCase() || "";
  if (["email"].includes(n) || t === "email") return "email";
  if (["name", "fullname", "username"].includes(n)) return "name";
  if (["password"].includes(n) || t === "password") return "new-password";
  if (["phone", "tel"].includes(n) || t === "tel") return "tel";
  if (["url", "website"].includes(n) || t === "url") return "url";
  return "off";
};

const InputElement: React.FC<InputProps> = React.memo((props) => {
  const {
    id,
    onSave,
    onDelete,
    canEdit = false,
    ...rest
  } = props;

  const merged: InputProps = {
    id,
    onSave,
    onDelete,
    canEdit,
    ...defaultValues,
    ...rest,
  };

  const {
    values,
    errors,
    handleInputChange,
    handleCheckbox,
    handleSave,
    handleDiscard,
    handleDelete,
  } = useInputEditor(merged, onSave, onDelete);

  const preview = useMemo(() => {
    const positionClass = getJustifyClass(values.position);

    return (
      <div className={positionClass}>
        {values.title && (
          <FormLabel>
            {values.title} {values.required && <span className="text-red-600">*</span>}
          </FormLabel>
        )}
        <input
          name={values.name}
          placeholder={values.placeholder}
          type={values.type}
          required={values.required}
          className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          autoComplete={getAutoComplete(values.name, values.type)}
        />
      </div>
    );
  }, [values]);

  return (
    <EditableWrapper
      id={values.id}
      width={values.width}
      canEdit={canEdit}
      editView={
        <EditInputForm
          values={values}
          errors={errors}
          onChange={handleInputChange}
          handleCheckbox={handleCheckbox}
        />
      }
      onSave={handleSave}
      onDiscard={handleDiscard}
      onDelete={handleDelete}
      position={values.position}
    >
      {preview}
    </EditableWrapper>
  );
});

export default InputElement;
