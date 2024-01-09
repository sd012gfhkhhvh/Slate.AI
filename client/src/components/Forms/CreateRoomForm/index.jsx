/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";

const CreateRoom = ({socket, setUser}) => {
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    //generating random ID
    const generateRandomString = (length) => {
        return GeneraterandString(length)
    };

    const handleGenerateRoomId = () => {
        setRoomId(generateRandomString(10))
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(roomId);
    }

    const handleGenerateRoom = (e) => {
        e.preventDefault(); //to prevent the default behaviour

        const userData = {
            name,
            roomId,
            userId: generateRandomString(5),
            host: true,
            presenter: true,
        }

        setUser(userData);
        console.log(userData);
        
        //emit user details
        socket.emit("userJoinedRoom", userData)

        // navigate to the whiteboard page
        navigate(`/${roomId}`);
    }

    return (
        <>
            <form className="form col-md-12 mt-5">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control my-2"
                    ></input>
                </div>
                <div className="from-group border">
                    <div className="input-group d-flex align-items-center justify-content-center">
                        <input
                            type="text"
                            placeholder="Generate room code"
                            value={roomId}
                            className="form-control my-2 border-0"
                            disabled
                        ></input>
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm me-1"
                                onClick={handleGenerateRoomId}
                            >
                                Generate
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm me-1"
                                onClick={handleCopy}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    className="mt-4 btn btn-primary btn-block form-control"
                    onClick={handleGenerateRoom}
                >
                    Generate Room
                </button>
            </form>
        </>
    )
}

export default CreateRoom