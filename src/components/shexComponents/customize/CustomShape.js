import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';

function CustomShape (props) {

    const context = useContext(ShapesContext);
    const {shape,isCustomOpen,isPrefix} = props;
    const [type,setType] = useState(shape.type.getTypeName());

    const handleTypeChange = function(e){
        const type  = e.target.value;
        const value = shape.type.value;
        shape.setType(type);
        shape.type.value = value;
        context.emit();
        setType(type);
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
                    <select className="customSelector">
                        <option value="1">None</option>
                        <option value="2">Iri</option>
                        <option value="3">Literal</option>
                        <option value="4">NonLiteral</option>
                        <option value="5">Bnode</option>
                    </select>
                </div>
            </div>
        </Collapse>                 
    );
                                   
    
}


export default CustomShape;

