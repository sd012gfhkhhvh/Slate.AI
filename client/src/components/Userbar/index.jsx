/* eslint-disable react/prop-types */
import "./index.css"

export const Userbar = (prop) => {
    const {usersInRoom, user, setIsChatBox, setIsUserPanel} = prop
    console.log("Prop: " + prop);
    return (
        <div className="main-panel d-flex flex-column justify-content-start border border-black rounded-4">
            <div className="d-flex justify-content-end my-2 me-2">
                <button className="btn btn-primary" onClick={() => { setIsUserPanel(false); setIsChatBox(false) }}>X</button>
            </div>
            <div className="users-box container-fluid h-100">
                <h4 className="text-center text-danger border border-dark py-1">Peoples Online : {usersInRoom.length}</h4>
                {usersInRoom.map(usr => <>
                    {(usr.userId === user.userId) ? <p>{usr.name + "(You)"}</p> : <p>{usr.name}</p>}
                </>)}
            </div>
        </div>
    )
}
