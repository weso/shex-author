import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import '../App.css';
import '../css/grid.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';



function AssistantComp (props) {

    const context = useContext(ShapesContext);
    
    /*
 

               

         <div className='col row assisTitleDiv'>
                        <span className="assisTitle" style={context.style}>Assistant</span>
                    </div>
                    {context.shapes.map(shape =>{
                                
                            return <ShapeComponent key={shape.id} shape={shape}/>
                        })
                    }

                    <button id='addShapeButton' 
                            className="btn-primary addShapeButton"
                            onClick={context.addShape}>
                            + Shape
                    </button>

    
    */


    


    return (<div id='assistant-container' className='assistantContainer'> 

                {context.shapes.map(shape =>{return  <ShapeComponent shape={shape}/> })}
                
                <button id='addShapeButton' 
                        className="addShapeButton" 
                        onClick={context.addShape}>
                        + Shape</button>
        </div>);

    
}

export default AssistantComp;