
import CollaboratorItem from "./CollaboratorItem"
import {useState} from "react"
import "./css/Collab.css";

const collaborators = [
    {
        name: "Koji",
        username: "Kojirules"

},
{
    name: "Chett",
    username: "Brewchetta"
}
]

function SearchCollab({collaborator, handleClick}) {
    const [search, setSearch] = useState("")


    const filteredCollaborators = collaborators.filter(collab => collab.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5)


    console.log(filteredCollaborators)

    const dropDown = filteredCollaborators.map(collab => {
        return (

            <CollaboratorItem key={collab.name} name={collab.name} username={collab.username} collaborator={collaborator} handleClick={handleClick}/>
        )
    })
    

    function handleOnChange(e){
        setSearch(e.target.value)
    }

    return(
        <form className="search-bar">
            <div>
                <div className="searchInputs">
                    <input type="text" id="search" placeholder="add a friend" value={search} onChange={handleOnChange}/>
                </div>
                <div className="dropdown-results">
                    {search === "" ? null: dropDown}

                </div>


            </div>
            

        </form>
    )
}

export default SearchCollab;