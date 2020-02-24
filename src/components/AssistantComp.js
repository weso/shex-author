import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import '../App.css';
import '../css/grid.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';



function AssistantComp (props) {

    const context = useContext(ShapesContext);
    const {assistantToggle} = props;

    return (
        <div className="globalAssis">
               <div className="assisTitle">
                        <div className="title">
                                ShEx Assistant
                        </div>
                        <div className="asisTitleClose">
                                <button className="closeAsis" title="Close Assistant" onClick={assistantToggle}>x</button>
                        </div> 
                
                </div>

                <div className="paddingDiv">
                        <div id='assistant-container' className='assistantContainer'> 
                        
                                {context.shapes.map(shape =>{return  <ShapeComponent shape={shape} key={shape.id}/> })}
                                
                                <div className="addCont">
                                        <button id='addShapeButton' 
                                                className={context.addBtns+" addShapeButton"} 
                                                onClick={context.addShape}
                                                title="Add Shape">
                                                + Shape</button>
                                </div>
                        </div>
                </div>
        </div>);

    
}

export default AssistantComp;


/*

 <div className="col assisTitleCont">
                        <div className="assisTitle">
                                ShEx Assistant
                        </div>
                        <div className="asisTitleClose">
                                <button className="closeAsis" title="Close Assistant" onClick={assistantToggle}>x</button>
                        </div> 
                </div>
                <div id='assistant-container' className='assistantContainer'> 
                
                        {context.shapes.map(shape =>{return  <ShapeComponent shape={shape} key={shape.id}/> })}
                        
                        <div className="addCont">
                                <button id='addShapeButton' 
                                        className={context.addBtns+" addShapeButton"} 
                                        onClick={context.addShape}
                                        title="Add Shape">
                                        + Shape</button>
                        </div>
                </div>
*/