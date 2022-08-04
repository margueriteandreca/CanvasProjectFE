import "../css/Home.css"
import paintBrushSmall from "../icons/paint-brush.png"
import paintBrushLarge from "../icons/paintbrush.png"
import Eraser from "../icons/eraser.png"
import { ReactSketchCanvas } from 'react-sketch-canvas';

function ToolBar({strokeColor, setStrokeColor, strokeWidth, setStrokeWidth, eraser, setEraser}) {

    const handleClickRed = () => {
        setStrokeColor("red")
        setStrokeWidth(2)
    }
    const handleClickOrange = () => {
        setStrokeColor("orange")
        setStrokeWidth(2)
    }
    const handleClickGreen = () => {
        setStrokeColor("green")
        setStrokeWidth(2)
    }
    const handleClickBlue = () => {
        setStrokeColor("blue")
        setStrokeWidth(2)
    }

    const handleClickBlack = () => {
        setStrokeColor("black")
        setStrokeWidth(2)
    }

    const handleClickPink = () => {
        setStrokeColor("pink")
        setStrokeWidth(2)
    }

    const handleClickPurple = () => {
        setStrokeColor("purple")
        setStrokeWidth(2)
    }

    const handleClickThin = () => setStrokeWidth(2)
    const handleClickThick = () => setStrokeWidth(5)
    const handleClickEraser = () => {
        setStrokeColor("white") 
        setStrokeWidth(12)
    }

    //stretchgoal- color picker


    return (
        <div id="tool-bar-div">
            <div id="brushes">
                <img src={paintBrushSmall} className="brush-buttons" onClick={handleClickThin}></img>
                <img src={paintBrushLarge} className="brush-buttons" onClick={handleClickThick}></img>
                <img src={Eraser} className="brush-buttons" onClick={handleClickEraser}></img>
            </div>
            <div className="vl"></div>
            <div id="colors">
                <button className="color-buttons" style={{backgroundColor: "black"}} onClick={handleClickBlack}></button>
                <button className="color-buttons" style={{backgroundColor: "red"}} onClick={handleClickRed}></button>
                <button className="color-buttons" style={{backgroundColor: "orange"}} onClick={handleClickOrange}></button>
                <button className="color-buttons" style={{backgroundColor: "green"}} onClick={handleClickGreen}></button>
                <button className="color-buttons" style={{backgroundColor: "blue"}} onClick={handleClickBlue}></button>
                <button className="color-buttons" style={{backgroundColor: "pink"}} onClick={handleClickPink}></button>
                <button className="color-buttons" style={{backgroundColor: "purple"}} onClick={handleClickPurple}></button>
                
            </div>

        </div>
    )

}


export default ToolBar;