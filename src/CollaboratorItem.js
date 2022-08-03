import "./css/Collab.css";

function CollaboratorItem({name, username, handleClick}) {


    function handleClickCollab() {
        if (handleClick) {
        handleClick({name, username})
    }
}
    
    return (
        <div id="collaborator-whole">
            <a href="#">{`${name} ${username}`}<i class="uil uil-arrow-right"></i></a>

            {handleClick ? 
                <button id="add-collab" onClick={handleClickCollab}>Add</button>
                : null}
        <a href="#">Kai kailin1234<i className="uil uil-arrow-right"></i></a>
    

        </div>         
    )


}


export default CollaboratorItem;