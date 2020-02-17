import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

function ShapeHeader (props) {

    const context = useContext(ShapesContext); 
    const {shape,customizeShape,collapseTriples,colapseBtn} = props;
    const [name,setName] = useState(shape.type.value);

    const handleChange = function(e){
        const name = e.target.value;
        shape.type.setValue(name);
        context.emit();
        setName(name);
    }

    return (
        <div className="header">            
            <label  className="shapeNameLabel">Shape</label>
            <input  type="text" 
                    className="form-control shapeName"
                    value={name}
                    onChange={handleChange}/>

            <button className="accordion mdc-icon-button material-icons" onClick={customizeShape}>build</button>
            <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>context.deleteShape(shape.id)}>delete</button>
            <button className="triplesBtn mdc-icon-button material-icons" onClick={collapseTriples}>{colapseBtn}</button>
        </div>
    );
                                   
    
}


export default ShapeHeader;

