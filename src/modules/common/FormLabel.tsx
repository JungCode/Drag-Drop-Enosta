interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ children, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium mb-1 text-gray-700 ${className || ""}`}
    >
      {children}
    </label>
  );
};

export default FormLabel;