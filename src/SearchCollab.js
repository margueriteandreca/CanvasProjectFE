
import CollaboratorItem from "./CollaboratorItem"
import { useState } from "react"
import "./css/Collab.css";

// const collaborators = [
//     {
//         name: "Koji",
//         username: "Kojirules"

// },
// {
//     name: "Chett",
//     username: "Brewchetta"
// }
// ]

function SearchCollab({ collaborators, handleClick }) {
    console.log(collaborators)

    const [search, setSearch] = useState("")

    const filteredCollaborators = collaborators.filter(collab => collab.first_name ? collab.first_name.toLowerCase().includes(search.toLowerCase()) : false).slice(0, 5)

    // console.log(filteredCollaborators)

    const dropDown = filteredCollaborators.map(collab => {
        return (
            <CollaboratorItem key={collab.id} collaborator={collab} handleClick={handleClick} />
        )
    })

    function handleOnChange(e) {
        setSearch(e.target.value)
    }

    return (
        <form className="search-bar">
            <div>
                <div className="search-inputs">
                    <input type="text" id="search" placeholder="add a friend" value={search} onChange={handleOnChange} />
                </div>
                <div className="dropdown-results">
                    {search === "" ? null : dropDown}

                </div>
            </div>
        </form>
    )
}

export default SearchCollab;