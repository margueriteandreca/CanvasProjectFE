
import "./css/Collab.css"
import CollaboratorItem from "./CollaboratorItem";
import SearchCollab from "./SearchCollab";
import { useState } from "react";

const testArray = [
    {
        name: "Kai",
        username: "kai1234"
    
},
    {
    name: "Marg",
    username: "Marg1234"

}, 
    {
    name: "Alan",
    username: "Koji420"

}] 


function Collaborators() {
    const [collaborators, setCollaborators] = useState("")

    // useEffect(() => {
    //     fetch("http://localhost:3001/canvasboard/:id")
    //     .then(res => res.json())
    //     .then(board => {
    //         console.log(board)
    //         setCollaborators(board.users)
    //     })

    // }, [])

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

    // collaborators.map(collab => <CollaboratorItem name={collab.name} username={collab.username}/>)

    return (
        <div id="collab-div">

            <div id="entire-dropdown"> 	
                <input class="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                <label class="for-dropdown" for="dropdown">Collaborators<i class="uil uil-arrow-down"></i></label>
                <div class="section-dropdown"> 
                {testArray.map(item => <CollaboratorItem name={item.name} username={item.username}/>)}
                    
                    <input class="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub"/>
                    <label class="for-dropdown-sub" for="dropdown-sub">Add Collaborator:<i class="uil uil-plus"></i></label>
                    <div class="section-dropdown-sub"> 
                        <a href="#"><SearchCollab handleClick={handleClick}/><i class="uil uil-arrow-right"></i></a>
                        {/* <a href="#">Dropdown Link <i class="uil uil-arrow-right"></i></a> */}
                    </div>
                </div>
            </div>

        
            
        </div>
    )
}


export default Collaborators;




