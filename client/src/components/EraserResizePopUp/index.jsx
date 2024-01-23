import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
} from "react";
import { EraserSizeContext } from "../../context/EraserSize";
import { Dialog, Transition } from "@headlessui/react";

// Placeholder CloseIcon component, replace with your actual implementation or icon library
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Popup = forwardRef((props, ref) => {
  const { eraserSize, setEraserSize } = useContext(EraserSizeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEraserSizeChange = (e) => {
    setEraserSize(parseInt(e.target.value, 10));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Expose a method to update the eraser size from the parent component
  useImperativeHandle(
    ref,
    () => ({
      updateEraserSize: (size) => {
        setEraserSize(size);
      },
      openModal: () => {
        console.log("Called");
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
      },
    }),
    [setEraserSize]
  );

  if (isModalOpen) {
    return (
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          onClose={handleClose}
          className="fixed inset-0 z-40 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-x-full sm:translate-x-0 sm:scale-95"
            enterTo="opacity-100 translate-x-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0 sm:scale-100"
            leaveTo="opacity-0 translate-x-full sm:translate-x-0 sm:scale-95"
          >
            <div
              className={`absolute left-36 bg-white border rounded p-4 shadow-md transition-transform your-modal-class`}
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
          </Transition.Child>
        </Dialog>
      </Transition>
    );
  } else {
    return null; // Render nothing if the modal is not open
  }
});

export default Popup;
