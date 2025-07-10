import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEditableWrapper } from "../hooks/useEditableWrapper";
import type { EditableWrapperProps } from "../types/EditableWrapper.type";
import { getPositionClass } from "../../../ultis/cssClassHelpers";
import DragHandlerButton from "./DragHandlerButton";

const EditableWrapper: React.FC<EditableWrapperProps> = React.memo(
  ({
    children,
    editView,
    width = "100%",
    position = "left",
    canEdit = false,
    onSave,
    onDelete,
    onDiscard,
    id,
  }) => {
    const {
      isEditing,
      isHovered,
      style,
      handleSave,
      handleDiscard,
      handleMouseEnter,
      handleMouseLeave,
      handleDoubleClick,
      attributes,
      listeners,
      setNodeRef,
    } = useEditableWrapper({ id, canEdit, onSave, onDiscard });

    const wrapperClass = `relative p-2 rounded border transition-colors duration-300 border-dashed flex flex-col justify-center cursor-pointer ${
      canEdit && isHovered ? " border-gray-400" : "border-transparent "
    } ${getPositionClass(position)}`;

    if (isEditing && canEdit) {
      return (
        <div
          style={{ width, ...style }}
          ref={setNodeRef}
          {...attributes}
          id={id}
          className={`border border-gray-400 border-dashed p-4 rounded space-y-4 transition-all duration-300 ${getPositionClass(
            position
          )}`}
        >
          {editView}
          <div className="flex flex-wrap gap-2 mt-4 justify-end">
            <button
              onClick={handleDiscard}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
            >
              <Icon icon="mdi:undo" className="text-lg" />
              Discard
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <Icon icon="mdi:content-save-outline" className="text-lg" />
              Save
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <Icon icon="mdi:trash-can-outline" className="text-lg" />
              Delete
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleDoubleClick}
        className={wrapperClass}
        style={{ width, ...style }}
        ref={setNodeRef}
        {...attributes}
        id={id}
      >
        <DragHandlerButton isHovered={isHovered} listeners={listeners} />
        {children}
      </div>
    );
  }
);

export default EditableWrapper;
