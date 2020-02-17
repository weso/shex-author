import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../App';

import TripleHeader from './headers/TripleHeader';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    
    const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
    }

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple} 
                          customizeTriple={customizeTriple}/>

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

