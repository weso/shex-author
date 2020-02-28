import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import ShapeComponent from '../shEx/ShapeComponent';

function AssistContent (props) {

    const context = useContext(AppContext);

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

