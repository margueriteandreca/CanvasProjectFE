
import "../css/Collab.css"
import CollaboratorItem from "./CollaboratorItem";
import SearchCollab from "./SearchCollab";
import { useState, useEffect } from "react";



function Collaborators() {
    const [collaborators, setCollaborators] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/canvasboards/2")
        .then(res => res.json())
        .then(board => {
            console.log(board)
            console.log(board.users)
            setCollaborators(board.users)
        })
    }, [])

    console.log(collaborators)

    function handleClick(newCollaborator) {
        fetch(`http://localhost:9292/user/:id/collaborators`,
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
    // testArray.map(item => <CollaboratorItem key= {item.id} name={item.name} username={item.username}/>)

    return (
        <div id="collab-div">

            <div id="entire-dropdown"> 	
                <input class="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                <label class="for-dropdown" for="dropdown">Collaborators<i class="uil uil-arrow-down"></i></label>
                <div class="section-dropdown"> 
                {collaborators.map(collab => <CollaboratorItem key={collab.id} collaborator={collab}/>)}
                    
                    <input class="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub"/>
                    <label class="for-dropdown-sub" for="dropdown-sub">Add Collaborator:<i class="uil uil-plus"></i></label>
                    <div class="section-dropdown-sub"> 
                        <a href="#"><SearchCollab handleClick={handleClick} collaborators={collaborators}/><i class="uil uil-arrow-right"></i></a>
                        {/* <a href="#">Dropdown Link <i class="uil uil-arrow-right"></i></a> */}
                    </div>
                </div>
            </div>

        
            
        </div>
    )
}


export default Collaborators;




