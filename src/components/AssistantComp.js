import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import '../App.css';
import '../css/grid.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';



function AssistantComp (props) {

    const context = useContext(ShapesContext);
    
    return (<div id='assistant-container' className='assistantContainer'> 

                {context.shapes.map(shape =>{return  <ShapeComponent shape={shape} key={shape.id}/> })}
                
               <div className="addCont">
                        <button id='addShapeButton' 
                                className={context.addBtns+" addShapeButton"} 
                                onClick={context.addShape}
                                title="Add Shape">
                                + Shape</button>
              </div>
        </div>);

    
}

export default AssistantComp;