import React, { useMemo } from "react";
import EditableWrapper from "../EditableWrapper";
import EditButtonForm from "./ButtonEditForm";
import { useButtonEditor } from "../../hooks/useEditButton";
import type { ButtonProps } from "../../types/Button.type";
import { getJustifyClass } from "../../../../ultis/cssClassHelpers";

const ButtonElement: React.FC<ButtonProps> = React.memo((props) => {
  const {
    id,
    content = "Button",
    name = "submitButton",
    type = "submit",
    position = "left",
    canEdit = false,
    onSave,
    onDelete,
  } = props;

  const initial = { id, content, name, type, position };

  const { values, errors, handleInputChange, handleSave, handleDiscard } =
    useButtonEditor<ButtonProps>(initial, (values) => {
      const newErrors: { name?: string } = {};
      if (!values.name?.trim()) {
        newErrors.name = "This field is required.";
      }
      return newErrors;
    });

  const positionClass = useMemo(
    () => getJustifyClass(values.position),
    [values.position]
  );

  return (
    <EditableWrapper
      canEdit={canEdit}
      id={values.id}
      width="100%"
      position={values.position}
      onSave={() => handleSave(onSave)}
      onDelete={onDelete}
      onDiscard={handleDiscard}
      editView={
        <EditButtonForm
          values={values}
          errors={errors}
          onChange={handleInputChange}
        />
      }
    >
      <div className={`w-full flex ${positionClass}`}>
        <button
          type={values.type}
          name={values.name}
          className="w-full max-w-xs px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {values.content}
        </button>
      </div>
    </EditableWrapper>
  );
});

export default ButtonElement;
