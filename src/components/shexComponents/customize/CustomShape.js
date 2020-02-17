import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';

function CustomShape (props) {

    const context = useContext(ShapesContext);
    const {shape,isCustomOpen,isPrefix} = props;
    const [type,setType] = useState(shape.type.getTypeName());
    const [qualifier,setQualifier] = useState(shape.qualifier.getTypeName())

    const handleTypeChange = function(e){
        const type  = e.target.value;
        const value = shape.type.value;
        shape.setType(type);
        shape.type.value = value;
        context.emit();
        setType(type);
    }

    const handleQualifierChange = function(e){
        let newType = e.target.value;
        shape.setQualifier(newType);
        context.emit();
        setQualifier(newType);
    }

    return (
        <Collapse isOpen={isCustomOpen} >
            <div className="custom">
                <div className="box1 gridBox">
                    <label className="customLabel">Type </label>
                    <select className="customSelector" value={type} onChange={handleTypeChange}>
                        <option value="iriRef">IriRef</option>
                        <option value="prefixedIri">PrefixedIri</option>
                        <option value="bnodeType">Bnode</option>
                    </select>
                </div>
                <Collapse isOpen={isPrefix} className="box2 gridBox">
                    <label className="customLabel">Prefix </label>
                    <select className="customSelector">
                        <option value="0">default</option>
                        <option value="1">xsd</option>
                        <option value="2">schema</option>
                    </select>
                </Collapse>
                <div className="box3 gridBox">
                    <label className="customLabel">Qualifier </label>
                    <select className="customSelector" value={qualifier} onChange={handleQualifierChange}>
                        <option value="shape">None</option>
                        <option value="iri">Iri</option>
                        <option value="literal">Literal</option>
                        <option value="nonliteral">NonLiteral</option>
                        <option value="bnode">Bnode</option>
                    </select>
                </div>
            </div>
        </Collapse>                 
    );
                                   
    
}


export default CustomShape;

