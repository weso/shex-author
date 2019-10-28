
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function Primitive (props) {

    const context = useContext(ShapesContext);
    const {shape,triple,type} = props;

    const [value,setValue] = useState(triple.value);

    const handleChange = (e) =>{
          setValue(e.target.value);
          if(type == 'shape'){
            context.setShapeTypeValue(shape.id,e.target.value);
          }else{
            context.setTripleTypeValue(shape.id,triple.id,e.target.value);
          }
          
    }
    

    return (<select className="col-sm-2 form-control tripleValue">
            {
                primitives.map(prim =>{
                    return <option value={prim.toLowerCase()}>{prim}</option>
                })
            }
            </select>);
    
}

export default Primitive;

