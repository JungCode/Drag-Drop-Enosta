import RenderElementItems from "../../EditableElement/components/RenderElementItems";
import { ELEMENT_TYPES } from "../../../types/ElementTypes";
import { useFormPreview } from "../hooks/useFormPreview";

const FormPreview = () => {
  const { elements, submittedData, handleSubmit, imageData } = useFormPreview();

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-1">
        {elements.map((item) => (
          <RenderElementItems key={item.id} item={item} />
        ))}

        {!elements.some((el) => el.type === ELEMENT_TYPES.Button) && (
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit (Default)
            </button>
          </div>
        )}
      </form>

      {submittedData && (
        <div className="mt-8 p-4 bg-green-50 border border-green-300 rounded">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Submitted Data:
          </h2>
          <ul className="space-y-1 text-sm text-gray-800">
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}

            {imageData?.map((img, idx) => (
              <li key={`img-${idx}`}>
                <strong>{img.name}:</strong> {img.src}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FormPreview;
