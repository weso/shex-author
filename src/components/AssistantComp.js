import React,{useContext} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';

function AssistantComp (props) {

    const context = useContext(ShapesContext);

    return (<div id='assistant-container'> 
                <div className='col row assisTitleDiv'>
                    <span className="assisTitle" style={context.style}>Assistant</span>
                </div>
                
                {context.shapes.map(shape =>{return <ShapeComponent key={shape.id} shape={shape}/>})}

                <button id='addShapeButton' className="btn-primary addShapeButton" onClick={context.addShape}>+ Shape</button>
            </div>);

    
}

export default AssistantComp;