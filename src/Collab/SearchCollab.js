
import CollaboratorItem from "./CollaboratorItem"
import { useEffect, useState } from "react"
import "../css/Collab.css";
import { Cookies, useCookies } from "react-cookie";


function SearchCollab({ collaborators, handleClick }) {

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [cookies, setCookie] = useCookies(["apiToken"])

    useEffect(() => {
        fetch(`http://localhost:9292/users`)
        .then(res => res.json())
        .then(data => {
            const users = data.filter(item => item.api_token != cookies.apiToken) 
            setUsers(users)
        })

    }, [])

    const filteredUsers = users.filter(user => user.first_name ? user.first_name.toLowerCase().includes(search.toLowerCase()) : false).slice(0, 5)


    // filteredUsers - minus myself and current collaborators - cookies userId / if userId === fetch user.id -> ignore 
    // loop through collaborators array and ignore all the userscollaborator with the same id as userId
    // console.log(filteredCollaborators)

    const dropDown = filteredUsers.map(user => {
        return (
            <CollaboratorItem key={user.id} collaborator={user} handleClick={handleClick} />
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