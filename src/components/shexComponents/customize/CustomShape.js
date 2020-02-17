import React from 'react';
import { Collapse } from 'reactstrap';

function CustomShape (props) {

    const {isCustomOpen,isPrefix,collapsePrefix} = props;

    return (
        <Collapse isOpen={isCustomOpen} >
            <div className="custom">
                <div className="box1 gridBox">
                    <label className="customLabel">Type </label>
                    <select className="customSelector" onChange={collapsePrefix}>
                        <option value="0">IriRef</option>
                        <option value="1" selected>PrefixedIri</option>
                        <option value="2">Bnode</option>
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

