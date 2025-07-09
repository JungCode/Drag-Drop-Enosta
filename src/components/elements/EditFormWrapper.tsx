import React from "react";

interface EditFormWrapperProps {
  children: React.ReactNode;
}

const EditFormWrapper: React.FC<EditFormWrapperProps> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
};

export default EditFormWrapper;
