import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";

const Modal = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("socketUserData"));

  const onClose = () => {
    localStorage.removeItem("socketUserData");
    localStorage.removeItem("firstLoadDone");
    navigate("/form");
  };

  const onRejoinRoom = () => {
    socket.emit("userJoinedRoom", userData);
    navigate(`/${userData?.roomId}`);
  };
  if (userData?.name) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative z-20 bg-white p-8 rounded shadow-md">
          <span
            className="text-3xl absolute -top-5 -right-2 m-4 text-gray-600 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </span>
          <h2 className="text-2xl font-bold mb-4">Leave or Rejoin Room?</h2>
          <p className="mb-4">
            You have left the room. Do you want to leave the room or rejoin it?
          </p>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={onRejoinRoom}
            >
              Rejoin Room
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/form");
  }
};

export default Modal;
