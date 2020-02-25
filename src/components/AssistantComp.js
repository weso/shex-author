import React,{useContext} from 'react';
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
                <div className={context.valid}>
                        <p><strong>[Error]</strong> This Shape is very complex for me...</p>
                </div>

                <div className={context.asist}>

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

                <div className={context.loading}>
                                <div class="loader"></div>
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