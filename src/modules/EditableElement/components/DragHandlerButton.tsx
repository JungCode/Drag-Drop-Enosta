import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";

const DragHandlerButton = ({
  isHovered,
  listeners,
}: {
  isHovered: boolean;
  listeners: SyntheticListenerMap | undefined;
}) => {
  return (
    <div
      className={`absolute w-full top-0 flex ${
        isHovered ? "opacity-100" : "opacity-0"
      } justify-center transition-all duration-300 `}
    >
      <Icon
        {...listeners}
        icon="ic:round-drag-handle"
        className="text-xl transition-colors rounded-sm"
      />
    </div>
  );
};

export default DragHandlerButton;
