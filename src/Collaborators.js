
import "./css/Collab.css"
import CollaboratorItem from "./CollaboratorItem";


function Collaborators() {
    return (
        <div id="collab-div">

            <div id="entire-dropdown"> 	
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                <label className="for-dropdown" htmlFor="dropdown">Collaborators<i className="uil uil-arrow-down"></i></label>
                <div className="section-dropdown"> 
                    <CollaboratorItem />
                    <input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub"/>
                    <label className="for-dropdown-sub" htmlFor="dropdown-sub">Add Collaborator:<i className="uil uil-plus"></i></label>
                    <div className="section-dropdown-sub"> 
                        <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
                        <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
                    </div>
                </div>
            </div>

        
            
        </div>
    )
}


export default Collaborators;




