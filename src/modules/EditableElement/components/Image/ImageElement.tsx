import React from "react";
import EditableWrapper from "../EditableWrapper";
import EditImageForm from "./EditImageForm";
import { useImageEditor } from "../../hooks/useImageEditor";
import type { ImageProps } from "../../types/Image.type";

const defaultValues: Required<Pick<ImageProps,
   "title" | "src" | "alt" | "width" | "position" | "shape">
> = {
  title: "Title Image",
  src: "https://placehold.co/300x200",
  alt: "Description Image",
  width: "50%",
  position: "left",
  shape: "rectangle",
};

const ImageElement: React.FC<ImageProps> = React.memo((props) => {
  const {
    id,
    onSave,
    onDelete,
    canEdit = false,
    name,
    ...rest
  } = props;

  const mergedProps: ImageProps = {
    id,
    name,
    onSave,
    onDelete,
    ...defaultValues,
    ...rest,
  };

  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSave,
    handleDiscard,
    handleDelete,
    getShapeClass,
  } = useImageEditor(mergedProps, onSave, onDelete);

  return (
    <EditableWrapper
      width={values.width}
      id={values.id}
      position={values.position}
      canEdit={canEdit}
      editView={
        <EditImageForm
          values={values}
          errors={errors}
          onChange={handleChange}
          setValues={setValues}
        />
      }
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
