
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function ShapeRefComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    const [value,setValue] = useState(triple.value);

    const handleChange = (e) =>{
          setValue(e.target.value);
          context.setTripleValue(shape.id,triple.id,e.target.value); 
    }
    

    return (<div className='row col-sm-8'>
                <select className="col-6 form-control valueInlineShape"/>
                <select className="col-6 form-control valueInlineShape">
                    <option>Iri</option>
                    <option>Literal</option>
                    <option>NonLiteral</option>
                    <option>BNode</option>
                </select>
            </div>

    
    
    
    );
    
}

export default ShapeRefComp;

