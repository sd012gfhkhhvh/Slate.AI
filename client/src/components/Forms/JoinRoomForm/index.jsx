/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GeneraterandString } from "../../../helper/GeneraterandString";

const JoinRoom = ({ socket, setUser }) => {
   
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();

        const userData = {
            name,
            roomId,
            userId: GeneraterandString(5),
            host: true,
            presenter: true,
        }

        console.log(userData);
        
        setUser(userData);
        // navigate to the whiteboard page
        navigate(`/${roomId}`);

        //emit user details
        socket.emit("userJoinedRoom", userData)
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

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Room Id"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="form-control my-2"
                    ></input>
                </div>

                <button
                    className="mt-4 btn btn-primary btn-block form-control"
                    onClick={handleJoinRoom}
                >
                    Enter Room
                </button>
            </form>
        </>
    )
}

export default JoinRoom