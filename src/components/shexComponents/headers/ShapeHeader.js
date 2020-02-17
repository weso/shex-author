import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';

function ShapeHeader (props) {

    const context = useContext(ShapesContext); 
    const {shape,customize,triplesMenu,colapseBtn} = props;

    return (
        <div className="header">            
            <label className="shapeNameLabel">Shape </label>
            <input type="text" className="form-control shapeName"/>
            <button className="accordion mdc-icon-button material-icons" onClick={customize}>build</button>
            <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>context.deleteShape(shape.id)}>delete</button>
            <button className="triplesBtn mdc-icon-button material-icons" onClick={triplesMenu}>{colapseBtn}</button>
        </div>
    );
                                   
    
}


export default ShapeHeader;

