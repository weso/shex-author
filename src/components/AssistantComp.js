import React,{useContext} from 'react';
import { Collapse } from 'reactstrap';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';

import '../css/Assistant.css';

function AssistantComp (props) {

    const context = useContext(ShapesContext);
    const {assistantToggle} = props;

    return (
        <div className="globalAssis">
               <div className="assisTitle">
                        <div className="title">ShEx Assistant</div>
                        <div className="asisTitleClose">
                                <button className="closeAsisBtn" title="Close Assistant" onClick={assistantToggle}>x</button>
                        </div>
                </div>
             
                <div className={context.asist}>
                        <div id='assistant-container' className='assistantContainer'> 
                                {context.shapes.map(shape =>{return  <ShapeComponent shape={shape} key={shape.id}/> })}
                                <div className="addCont">
                                        <button className={context.addBtns+" addShapeButton"} 
                                                onClick={context.addShape}
                                                title="Add Shape">
                                                + Shape</button>
                                </div>
                        </div>
                </div>

                <div className={context.loading}>
                        <div className="loader"></div>
                </div>
        </div>);

    
}

/*

   <div className={context.valid}>
                        <p><strong>[Error]</strong> This Shape is very complex for me...</p>
                </div>
*/

export default AssistantComp;
