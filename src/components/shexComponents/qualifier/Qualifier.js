
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

let shexUtils = require('../../../utils/shexUtils.js');


function Qualifier (props) {

    const context = useContext(ShapesContext);
    const {shape,triple,scope} = props;

    let initialValue;
    if(scope=='shape'){
        initialValue = shape.qualifier.getTypeName();
    }else{
        initialValue = triple.value.getTypeName();
    }

    const [valueType,setValueType] = useState(initialValue)


    const handleTypeChange = (e) =>{
        let newType = e.target.value;
        if(scope=='shape'){
            shape.setQualifier(newType);
        }else{
            triple.setValue(newType);
        }

        context.emit();
        setValueType(newType);
    }


    return (<select className="col form-control valueInlineShape"
                        value={valueType}
                        onChange={handleTypeChange}>
                    <option value='shape'></option>
                    <option value='iriKind'>IRI</option>
                    <option value="literalKind">Literal</option>
                    <option value="nonliteralKind">NonLiteral</option>
                    <option value="bnodeKind">BNODE</option>
                </select>

    );
    
}

export default Qualifier;

