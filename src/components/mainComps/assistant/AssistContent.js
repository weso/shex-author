import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import ShapeComponent from '../shEx/ShapeComponent';
import PrefixComp from '../../prefixAssist/PrefixComp';

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
                <PrefixComp/>
            </div>
        </div>);
}


export default AssistContent;

