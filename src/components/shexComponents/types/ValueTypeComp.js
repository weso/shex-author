import React,{useContext,useState} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';

function ValueTypeComp(props) {
    
    const {shape,triple} = props;

    const context = useContext(ShapesContext);
    const [value,setValue] = useState(triple.value.getTypeName())
    
    const handleChange = (event) =>{
        let newValue = event.target.value;
        context.setTripleValue(shape.id,triple.id,newValue);
        setValue(newValue);
    }

    return  (<div className="row col-6">
                    <select className="col form-control valueType"
                                    value={value} 
                                    onChange={handleChange}>

                                    <option value="primitive">Primitive</option>
                                    <option value="shape">Shape</option>
                                    <option value="iriRef">IriRef</option>
                                    <option value="prefixedIri">Prefixed</option>
                                    <option value="literal">Literal</option>
                                    <option value="nonLiteral">NonLiteral</option>
                                    <option value="iriKind">IRI</option>
                                    <option value="bnodeKind">BNODE</option>
                                </select>


                                <FactoryTypeComp shape={shape} 
                                    triple={triple}
                                    type='value'
                                    instance={triple.value.getTypeName()}/>

                    </div>);

}

export default ValueTypeComp;

