import React,{useContext} from 'react';
import {ShapesContext} from '../../App';
import ShapeComponent from './shexComponents/ShapeComponent';

function AssistContent (props) {

    const context = useContext(ShapesContext);

    return ( 
    <div className={context.asist}>
        <div id='assistant-container' className='assistantContainer'> 
            {context.shapes.map(shape =>{return  <ShapeComponent shape={shape} key={shape.id}/> })}
                <div className="addCont">
                    <button className={context.addBtns+" addShapeButton"} 
                            onClick={context.addShape}
                            title="Add Shape">
                            + Shape
                    </button>
                </div>
            </div>
        </div>);
}


export default AssistContent;

