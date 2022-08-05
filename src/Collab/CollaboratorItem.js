import "../css/Collab.css";
import { Cookies, useCookies } from "react-cookie";
import {useParams} from "react-router-dom"

function CollaboratorItem({collaborator, setCollaborators, handleClick}) {
    const [cookies, setCookie] = useCookies(["apiToken", "userId"]) 

    function handleClickCollab() {
        if (handleClick) {
            handleClick({ id: collaborator.id })
        }
}

    let { canvasIdentifier } = useParams();
 
    function handleDelete () {
        console.log('Handle Delete: ', canvasIdentifier, collaborator.id);
        fetch(`http://localhost:9292/canvasboards/${canvasIdentifier}/users/${collaborator.id}`, 
        {     
            method: "DELETE" 
        })
        .then(res => res.json())
        .then(data => {
            console.log("DELTED ITEM:", data)
            setCollaborators(data.users)
        }).catch(e => console.log('Error: ', e))
    }
    
    return (
        <div id="collaborator-whole">
            <div id="collab-name-user">
                <a href="#"><p id="name">{collaborator.first_name}</p> <p id="username">{collaborator.username}</p><i className="uil uil-arrow-right"></i></a>
            </div>

            {handleClick ? 
                <button id="add-collab" className="collab-buttons" onClick={handleClickCollab}>Add</button>
                : <button id="delete-collab" onClick={handleDelete}>✕</button>}

        </div>         
    )
}

export default CollaboratorItem;