import "../css/Home.css"
import {useState} from "react"

function CanvasChangeName({changeName}) {
    const [newName, setNewName] = useState("")

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleSubmit = () => {
        console.log(newName)
        changeName({canvas_name: newName})
    }


    return (
        <div id="canvas-change-name">
            <form onSubmit={handleSubmit}>
                <input type="text" id="newname" name="newname" placeholder="Change Canvas Name" onChange={handleNameChange} value={newName}/>
            </form>


        </div>
    )
}

export default CanvasChangeName;