import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function PrimitiveComp (props) {

    const context = useContext(ShapesContext);
    const {value} = props;

    const [type,setType] = useState(value.type);

    const handleChange = (e) =>{
          const newValue = e.target.value;
          value.type.value = newValue;
          context.emit();
          setType(newValue);
    }
    

    return (<select className="col-sm-4 form-control tripleValue"
                    value={type}
                    onChange={handleChange}>
            {
                primitives.map(prim =>{
                    return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                })
            }
            </select>);
    
}

export default PrimitiveComp;

