import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function PrimitiveComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    const [value,setValue] = useState(triple.value.value);

    const handleChange = (e) =>{
          const value = e.target.value;
          triple.value.setValue(value);
          context.emit();
          setValue(value);
    }
    

    return (<select className="col-sm-4 form-control tripleValue"
                    value={value}
                    onChange={handleChange}>
            {
                primitives.map(prim =>{
                    return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                })
            }
            </select>);
    
}

export default PrimitiveComp;

