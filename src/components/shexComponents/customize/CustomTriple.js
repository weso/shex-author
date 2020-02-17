import React,{useState} from 'react';
import { Collapse } from 'reactstrap';

function CustomTriple (props) {

    const {triple,isTripleCustomOpen} = props;

    let initialPrefix=false;
    if(triple.type.getTypeName()=='prefixedIri'){
        initialPrefix = true;
    }

    const [isPrefix,setPrefix] = useState(initialPrefix);

    const handleTypeChange = function(evt){
        if(evt.target.value=='1'){
            setPrefix(true);
        }else{
            setPrefix(false);
        }   
    }

    return (
        <Collapse isOpen={isTripleCustomOpen} className='customColapse'>
                <div className="customTriple">
                    <div className="gridTriplesBox">
                        <div/>
                        <label>Type </label>
                        <select className="customSelector" onChange={handleTypeChange}>
                            <option value="0">IriRef</option>
                            <option value="1" selected>PrefixedIri</option>
                            <option value="2">Bnode</option>
                        </select>
                    </div>

                    <Collapse isOpen={isPrefix} className="gridTriplesBox">
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
    );
                                   
    
}


export default CustomTriple;

