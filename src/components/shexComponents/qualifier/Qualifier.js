import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

import shexUtils from '../../../utils/shexUtils';


function Qualifier (props) {

    const context = useContext(ShapesContext);
    const {shape,triple,value,scope} = props;

    let initialValue;
    if(scope=='shape'){
        initialValue = shape.qualifier.getTypeName();
    }else{
         initialValue = triple.value.value;
    }


    const [valueType,setValueType] = useState(initialValue)

    const handleTypeChange = (e) =>{
        let newType = e.target.value;
        if(scope=='shape'){
            shape.setQualifier(newType);
        }else{
            triple.value.value =newType;
        }

        context.emit();
        setValueType(newType);
    }


    return (<select className="col form-control valueInlineShape"
                        value={valueType}
                        onChange={handleTypeChange}>
                    <option value='shape'></option>
                    <option value='iri'>IRI</option>
                    <option value="literal">Literal</option>
                    <option value="nonliteral">NonLiteral</option>
                    <option value="bnode">BNODE</option>
                </select>

    );
    
}

export default Qualifier;

