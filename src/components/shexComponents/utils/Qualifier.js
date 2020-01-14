import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

import shexUtils from '../../../utils/shexUtils';


function Qualifier (props) {

    const context = useContext(ShapesContext);
    const {element} = props;
    const [valueType,setValueType] = useState(element.qualifier.getTypeName())

    const handleTypeChange = (e) =>{
        let newType = e.target.value;
        element.setQualifier(newType);
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

