import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function TripleHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,deleteTriple,customizeTriple} = props;

    const [name,setName] = useState(triple.type.value);
    
    const handleNameChange = function(e){
        const name = e.target.value;
        triple.type.setValue(name);
        context.emit();
        setName(name);
    }

   
    return (
        <div className="tripleHeader">            
            <label  className="shapeNameLabel">Triple</label>
            <input  type="text" 
                    className="form-control shapeName"
                    value={name}
                    onChange={handleNameChange}/>

            <button className="accordion mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
            <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>deleteTriple(triple.id)}>delete</button>
            <button className="triplesBtn mdc-icon-button material-icons" >asd</button>
        </div>
    );
                                   
    
}


export default TripleHeader;

