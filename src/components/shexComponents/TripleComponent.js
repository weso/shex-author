import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../App';

import TripleTypeComp from './types/TripleTypeComp';

import ValueComponent from './ValueComponent';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    
    const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
    }

    return ( 
        <div>
            <div className="tripleHeader">
                <label>Triple </label>
                <input type="text" className="form-control shapeName"/>
                <select className="customSelector">
                        <option value="0">String</option>
                        <option value="1">Integer</option>
                        <option value="2">Boolean</option>
                        <option value="2">Date</option>
                </select>                                            
                <select className="customSelector">
                    <option value="">Exactly one</option>
                    <option value="*">Zero or more</option>
                    <option value="+">One at least</option>
                    <option value="?">One or none</option>
                </select>                        
                <button className="accordion mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
                <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>deleteTriple(triple.id)}>delete</button>
            </div>

                    
            <Collapse isOpen={isTripleCustomOpen} className='customColapse'>
                <div className="customTriple">
                    <div className="gridTriplesBox">
                        <div/>
                        <label>Type </label>
                        <select className="customSelector" >
                            <option value="0">IriRef</option>
                            <option value="1" selected>PrefixedIri</option>
                            <option value="2">Bnode</option>
                        </select>
                    </div>

                    <Collapse className="gridTriplesBox">
                        <div/>
                        <label>Prefix </label>
                        <select className="customSelector">
                            <option value="0">default</option>
                            <option value="1">xsd</option>
                            <option value="2">schema</option>
                        </select>
                    </Collapse>


                    <div className="gridTriplesBox">
                        <div/>
                        <label>Value </label>
                        <select className="customSelector" >
                            <option value="0">IriRef</option>
                            <option value="1" selected>PrefixedIri</option>
                            <option value="2">Shape</option>
                            <option value="3">Literal</option>
                            <option value="4">NonLiteral</option>
                            <option value="5">IRI</option>
                            <option value="6">BNode</option>
                        </select>
                    </div>
        
                </div>
            </Collapse> 
        </div>);                          
}

export default TripleComponent;

