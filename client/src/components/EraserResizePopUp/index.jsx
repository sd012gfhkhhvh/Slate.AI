import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { EraserSizeContext } from "../../context/EraserSize";

const Popup = forwardRef((props, ref) => {
  const { eraserSize, setEraserSize } = useContext(EraserSizeContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleEraserSizeChange = (e) => {
    setEraserSize(parseInt(e.target.value, 10));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Expose a method to update the eraser size from the parent component
  useImperativeHandle(
    ref,
    () => ({
      updateEraserSize: (size) => {
        setEraserSize(size);
      },
    }),
    [setEraserSize]
  );

  return (
    <div
      className={`absolute left-32 bg-white border rounded p-4 shadow-md transition-transform transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <label
        htmlFor="eraserSize"
        className="block text-gray-700 font-semibold mb-2"
      >
        Eraser Size
      </label>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-semibold">{eraserSize}</span>
        </div>
        <input
          type="range"
          id="eraserSize"
          name="eraserSize"
          min="1"
          max="100"
          step="1"
          value={eraserSize}
          onChange={handleEraserSizeChange}
          className="flex-grow focus:outline-none bg-gray-300"
        />
      </div>
    </div>
  );
});

export default Popup;
