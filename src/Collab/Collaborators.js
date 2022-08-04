
import "../css/Collab.css"
import CollaboratorItem from "./CollaboratorItem";
import SearchCollab from "./SearchCollab";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';



function Collaborators() {
    const [collaborators, setCollaborators] = useState([])
    const [cookies, setCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName', 'loginToggle']);
    
    useEffect(() => {
        fetch("http://localhost:9292/canvasboards/2")
            .then(res => res.json())
            .then(board => {
                console.log(board)
                console.log(board.users)
                const set = new Set();
                setCollaborators(board.users.filter((user) => {
                    if (set.has(user.id)) {
                        return false;
                    } else {
                        set.add(user.id);
                        return true;
                    }
                }));
            })
    }, [])

    function handleClick(newCollaborator) {
        fetch(`http://localhost:9292/user/${cookies.userId}/collaborators`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(newCollaborator)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div id="collab-div">

            <div id="entire-dropdown">
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                <label className="for-dropdown" htmlFor="dropdown">Collaborators<i className="uil uil-arrow-down"></i></label>
                <div className="section-dropdown">
                    {collaborators.map(collab => <CollaboratorItem key={collab.id} collaborator={collab} />)}

                    <input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub" />
                    <label className="for-dropdown-sub" htmlFor="dropdown-sub">Add Collaborator:<i className="uil uil-plus"></i></label>
                    <div className="section-dropdown-sub">
                        <div>
                            <SearchCollab handleClick={handleClick} collaborators={collaborators} /><i className="uil uil-arrow-right"></i>
                        </div>
                        {/* <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a> */}
                    </div>
                </div>
            </div>



        </div>
    )
}


export default Collaborators;




