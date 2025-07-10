export const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm";
  
export const getPositionClass = (position?: string) => {
  switch (position) {
    case "center":
      return "mx-auto";
    case "right":
      return "ml-auto";
    default:
      return "";
  }
};

export const getJustifyClass = (position?: string): string => {
  switch (position) {
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
    default:
      return "justify-start";
  }
};

export const getTextAlignClass = (position?: string): string => {
  switch (position) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

export const getHeadingSizeClass = (size?: number): string => {
  const sizeClasses: Record<number, string> = {
    1: "text-5xl",
    2: "text-4xl",
    3: "text-3xl",
    4: "text-2xl",
    5: "text-xl",
  };
  return sizeClasses[size || 2] || "text-4xl";
};

