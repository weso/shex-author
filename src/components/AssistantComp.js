import React,{useContext} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';

function AssistantComp (props) {

    const context = useContext(ShapesContext);
    const {colapse} = props;

    return (<div ref={colapse} id='assistant-container' className="assistant col-lg-6" style={context.currentStyle}> 
                    {context.shapes.map(shape =>{
                                
                            return <ShapeComponent key={shape.id} shape={shape}/>
                    })
                    }

                    <button id='addShapeButton' 
                            className="btn-primary addShapeButton"
                            onClick={context.addShape}>
                            + Shape
                    </button>
                </div>);

    
}

export default AssistantComp;