import React,{useContext,useState} from 'react';
import ComponentTypeFactory from './ComponentTypeFactory';

import {ShapesContext} from '../../../App';

function ValueTypeComp(props) {
    
    const {shape,triple,value} = props;

    const context = useContext(ShapesContext);
    const [valueType,setValueType] = useState(value.type.getTypeName())

    const handleChange = (event) =>{
        let newType = event.target.value;
        if(newType!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        value.setType(newType);
        context.emit();
        setValueType(newType);
    }

    return  (<div className="row col-10">
                <select className="col-5 form-control valueType" value={valueType} onChange={handleChange}>
                    <option value="primitive">Primitive</option>
                    <option value="shape">Shape</option>
                    <option value="iriValue">IriRef</option>
                    <option value="prefixedValue">Prefixed</option>
                    <option value="literal">Literal</option>
                    <option value="nonliteral">NonLiteral</option>
                    <option value="iri">IRI</option>
                    <option value="bnode">BNODE</option>
                </select>

                <ComponentTypeFactory shape={shape} triple={triple} value={value} instance={value.type.getTypeName()}/>

            </div>);

}

export default ValueTypeComp;

