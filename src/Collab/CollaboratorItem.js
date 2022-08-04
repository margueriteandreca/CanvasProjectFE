import "../css/Collab.css";

function CollaboratorItem({collaborator, handleClick}) {

    function handleClickCollab() {
        if (handleClick) {
        handleClick({name: collaborator.name, username: collaborator.username})
    }
}

console.log(collaborator)

console.log(collaborator.first_name, collaborator.username)
    
    return (
        <div id="collaborator-whole">
            <div id="collab-name-user">
                <a href="#"><p id="name">{collaborator.first_name}</p> <p id="username">{collaborator.username}</p><i class="uil uil-arrow-right"></i></a>
            </div>

            {handleClick ? 
                <button id="add-collab" className="collab-buttons" onClick={handleClickCollab}>Add</button>
                : <button id="delete-collab">✕</button>}

        </div>         
    )
}

export default CollaboratorItem;