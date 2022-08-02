
import "./css/Collab.css"
import CollaboratorItem from "./CollaboratorItem";


function Collaborators() {
    return (
        <div id="collab-div">

            <div id="entire-dropdown"> 	
                <input class="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                <label class="for-dropdown" for="dropdown">Collaborators<i class="uil uil-arrow-down"></i></label>
                <div class="section-dropdown"> 
                    <CollaboratorItem />
                    <input class="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub"/>
                    <label class="for-dropdown-sub" for="dropdown-sub">Add Collaborator:<i class="uil uil-plus"></i></label>
                    <div class="section-dropdown-sub"> 
                        <a href="#">Dropdown Link <i class="uil uil-arrow-right"></i></a>
                        <a href="#">Dropdown Link <i class="uil uil-arrow-right"></i></a>
                    </div>
                </div>
            </div>

        
            
        </div>
    )
}


export default Collaborators;




