import React,{useContext,useState} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';

function ValueTypeComp(props) {
    
    const {shape,triple} = props;

    const context = useContext(ShapesContext);
    const [valueType,setValueType] = useState(triple.value.getTypeName())
    
    const handleChange = (event) =>{
        let newType = event.target.value;
        if(newType!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        triple.setValue(newType);
        context.emit();
        setValueType(newType);
    }

    return  (<div className="row col-8">
                    <select className="col-5 form-control valueType"
                                    value={valueType} 
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

