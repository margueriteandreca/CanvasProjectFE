import CanvasChangeName from "./CanvasChangeName";
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "../css/Home.css"




function CanvasTitle({canvasName, setCanvasName, changeName}) {

    let { canvasIdentifier } = useParams();

    
    
    return(
        <div id="canvas-title-div">
            <div id="title-only">{canvasName}</div>
            <CanvasChangeName changeName={changeName}/>
        </div>

    )

}

export default CanvasTitle;