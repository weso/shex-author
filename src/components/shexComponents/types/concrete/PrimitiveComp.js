
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function PrimitiveComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    const [value,setValue] = useState(triple.value);

    const handleChange = (e) =>{
          setValue(e.target.value);
          context.setTripleValue(shape.id,triple.id,e.target.value); 
    }
    

    return (<select className="col-sm-4 form-control tripleValue">
            {
                primitives.map(prim =>{
                    return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                })
            }
            </select>);
    
}

export default PrimitiveComp;

