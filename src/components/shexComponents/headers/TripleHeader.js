import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function TripleHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,deleteTriple,customizeTriple,colapseBtn,collapseConstraints} = props;

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

            <button className="buildBtn buildTripleBtn mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
            <button className="deleteTripleBtn mdc-icon-button material-icons" onClick={()=>deleteTriple(triple.id)}>delete</button>
            <button className="collapseBtn mdc-icon-button material-icons" onClick={collapseConstraints}>{colapseBtn}</button>
        </div>
    );
                                   
    
}


export default TripleHeader;

