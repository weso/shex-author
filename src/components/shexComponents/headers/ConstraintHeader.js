import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';


const primitives = ['String','Integer','Date','Boolean'];

function ConstraintHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,customizeConstraint} = props;

    const [primitive,setPrimitive] = useState(triple.value.value);
   
    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
    }
   
    return (
       <div className="constraintHeader">
                <label>Constraint </label>
                <select className="customSelector" 
                    value={primitive} 
                    onChange={handlePrimitiveChange}>
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>
            <button className="buildBtn buildConstraintBtn mdc-icon-button material-icons" onClick={customizeConstraint}>build</button>
        </div>
    );
                                   
    
}


export default ConstraintHeader;

