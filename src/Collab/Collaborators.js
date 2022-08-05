
import "../css/Collab.css"
import CollaboratorItem from "./CollaboratorItem";
import SearchCollab from "./SearchCollab";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import {
    useParams
} from "react-router-dom";


function Collaborators() {
    const [collaborators, setCollaborators] = useState([])
    const [cookies, setCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName', 'loginToggle']);

    let { canvasIdentifier } = useParams();
    
    useEffect(() => {
        if (!canvasIdentifier) {
            return;
        }
        fetch(`http://localhost:9292/canvasboards/${canvasIdentifier}`) 
            .then(res => res.json())
            .then(board => {
                console.log('!!! fetch board respsonse', board)
                console.log('!!! fetch users respsonse', board.users)
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

    function handleClick(newCollaboration) {
        console.log('!!! handle click ', newCollaboration);
        fetch(`http://localhost:9292/canvasboards/${canvasIdentifier}/users/${newCollaboration.id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            })
            .then(res => res.json())
            .then(data => {
                setCollaborators(data.users);
            }) 
    }

    return (
        <div id="collab-div">

            <div id="entire-dropdown">
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                <label className="for-dropdown" htmlFor="dropdown">Collaborators<i className="uil uil-arrow-down"></i></label>
                <div className="section-dropdown">
                    {collaborators.map(collab => <CollaboratorItem key={collab.id} collaborator={collab} setCollaborators={setCollaborators}/>)}

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




