import React,{useContext} from 'react';
import '../App.css';
import '../css/grid.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';

function AssistantComp (props) {

    const context = useContext(ShapesContext);

    /*
 

                       <div className="shape">

            <div className="header">
                <label className="">Shape </label>
                <input className="form-control"/>
                <button className="mdc-icon-button material-icons btn-primary">+</button>
                <button className="mdc-icon-button material-icons btn-primary">-</button>
            </div>
            

        </div>

    */

    return (<div id='assistant-container' className='assistantContainer'> 

 
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

                   
        </div>);

    
}

export default AssistantComp;