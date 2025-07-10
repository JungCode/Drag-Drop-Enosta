import React, { useMemo } from "react";
import type { JSX } from "react";
import EditableWrapper from "../EditableWrapper";
import EditHeadingForm from "./HeadingEditForm";
import { useHeadingEditor } from "../../hooks/useEditHeading";
import type { HeadingProps } from "../../types/Heading.type";
import {
  getHeadingSizeClass,
  getTextAlignClass,
} from "../../../../ultis/cssClassHelpers";

const HeadingElement: React.FC<HeadingProps> = React.memo((props) => {
  const {
    id,
    title = "Heading",
    size = 2,
    name,
    position = "left",
    color = "#000000",
    canEdit = false,
    onSave,
    onDelete,
  } = props;

  const { values, errors, handleInputChange, handleSave, handleDiscard } =
    useHeadingEditor({ id, title, size, name, position, color }, onSave);

  const Tag = useMemo(
    () => `h${values.size}` as keyof JSX.IntrinsicElements,
    [values.size]
  );

  const headingSizeClass = useMemo(
    () => getHeadingSizeClass(values.size),
    [values.size]
  );

  const textAlignClass = useMemo(
    () => getTextAlignClass(values.position),
    [values.position]
  );

  return (
    <EditableWrapper
      id={values.id}
      canEdit={canEdit}
      onSave={handleSave}
      onDiscard={handleDiscard}
      onDelete={onDelete}
      position={values.position}
      editView={
        <EditHeadingForm
          values={values}
          errors={errors}
          onChange={handleInputChange}
        />
      }
    >
      <Tag
        style={{ color: values.color }}
        className={`font-bold ${headingSizeClass} ${textAlignClass} w-full`}
      >
        {values.title}
      </Tag>
    </EditableWrapper>
  );
});

export default HeadingElement;
