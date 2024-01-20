/* eslint-disable react/prop-types */
import "./index.css";

export const Userbar = (prop) => {
  const { usersInRoom, user, setIsChatBox, setIsUserPanel } = prop;
  console.log("Prop: " + prop);
  return (
    <div className="fixed bottom-[6rem] right-[1rem] h-[71%] w-[20rem] z-0 bg-[#e1e1ea]  flex flex-col justify-start border-2 border-solid border-black rounded-md">
      <div className="flex justify-end my-2">
        <button
          className="p-2 mr-2 rounded-md bg-[#4454b4] text-white font-bold"
          onClick={() => {
            setIsUserPanel(false);
            setIsChatBox(false);
          }}
        >
          X
        </button>
      </div>
      <div className="p-2 rounded-md h-100">
        <h4 className="text-center text-red-600 border-2 border-[#c32f57] py-1">
          People Online : {usersInRoom.length}
        </h4>
        {usersInRoom.map((usr) => (
          <>
            {usr.userId === user.userId ? (
              <p>{usr.name + "(You)"}</p>
            ) : (
              <p>{usr.name}</p>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
