import "./css/Home.css"
import paintBrushSmall from "./icons/paint-brush.png"
import paintBrushLarge from "./icons/paintbrush.png"

function ToolBar({strokeColor, setStrokeColor, strokeWidth, setStrokeWidth}) {

    const handleClickRed = () => setStrokeColor("red")
    const handleClickOrange = () => setStrokeColor("orange")
    const handleClickGreen = () => setStrokeColor("green")
    const handleClickBlue = () => setStrokeColor("blue")
    const handleClickBlack = () => setStrokeColor("black")
    const handleClickPink = () => setStrokeColor("pink")
    const handleClickPurple = () => setStrokeColor("purple")

    const handleClickThin = () => setStrokeWidth(2)
    const handleClickThick = () => setStrokeWidth(5)

    //stretchgoal- color picker


    return (
        <div id="tool-bar-div">
            <div id="brushes">
                <img src={paintBrushSmall} className="brush-buttons" onClick={handleClickThin}></img>
                <img src={paintBrushLarge} className="brush-buttons" onClick={handleClickThick}></img>
            </div>
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