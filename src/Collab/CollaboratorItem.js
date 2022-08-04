import "../css/Collab.css";

function CollaboratorItem({collaborator, handleClick}) {

    function handleClickCollab() {
        if (handleClick) {
        handleClick({name: collaborator.name, username: collaborator.username})
    }
}

    function handleDelete () {
        fetch(`/canvasboards/${identifier}/users/${collaborator.id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => console.log("DELTED ITEM:", data))
    }

console.log(collaborator)

console.log(collaborator.first_name, collaborator.username)
    
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