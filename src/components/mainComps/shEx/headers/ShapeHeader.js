import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

import '../../../../css/shexComponents/headers/ShapeHeader.css';


function ShapeHeader (props) {

    const context = useContext(ShapesContext); 
    const {shape,customizeShape,collapseTriples,colapseBtn,rounded} = props;
    const [name,setName] = useState(shape.type.value);

    const handleChange = function(e){
        const name = e.target.value;
        shape.type.setValue(name);
        context.emit();
        setName(name);
    }

    return (
        <div className={rounded+' header '+context.shapeClass}>            
            <label  className={context.shapeLabel+" shapeNameLabel"}>Shape</label>
            <input  type="text" 
                    className="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="eg: User"
                    title="Shape Name"/>

            <button className="buildBtn mdc-icon-button material-icons" 
                    onClick={customizeShape} 
                    title="Customize Shape">
                    build
            </button>

            <button className="deleteShapeBtn mdc-icon-button material-icons" 
                    onClick={()=>context.deleteShape(shape.id)} 
                    title="Delete Shape">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    onClick={collapseTriples} 
                    title="Show Triples">
                    {colapseBtn}
            </button>
        </div>
    );
                                   
    
}


export default ShapeHeader;

