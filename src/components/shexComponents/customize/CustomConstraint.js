import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';
import {getPrefix} from '../../../utils/prefixUtils';


function CustomConstraint (props) {

    const context = useContext(ShapesContext);
    const {triple,isCustomOpen} = props;

    const [constraint,setConstraint] = useState(triple.value.getTypeName());
    const [isNameOpen,setNameOpen] = useState(true);
    const [isPrefixOpen,setPrefixOpen] = useState(true);

    const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        if(newConstraint!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        triple.setValue(newConstraint);
        context.emit();
        setConstraint(newConstraint);

        setNameOpen(false);
        setPrefixOpen(false);


        if(newConstraint == 'iriRef'){
            setNameOpen(true);
        }

        if(newConstraint == 'prefixedIri'){
            setNameOpen(true);
            setPrefixOpen(true);
        }

    }


    return (
         <Collapse isOpen={isCustomOpen} className='customColapse'>
                <div className="customConstraint">
                    <div className="gridTriplesBox">
                        <label className="customLabel">Type </label>
                        <select className="customSelector"
                                value={constraint}
                                onChange={handleConstraintChange}>
                            <option value="primitive">Primitive</option>
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">PrefixedIri</option>
                            <option value="shape">Shape</option>
                            <option value="literal">Literal</option>
                            <option value="nonliteral">NonLiteral</option>
                            <option value="iri">IRI</option>
                            <option value="bnode">BNode</option>
                        </select>

                        <Collapse isOpen={isNameOpen} className="gridTriplesBox">
                            <label className="customLabel">Name</label>
                             <input  type="text" 
                                className="form-control shapeName"
                               /> 
                        </Collapse>

                        <Collapse isOpen={isPrefixOpen}>
                            <label className="customLabel">Prefix </label>
                            <select className="customSelector">
                                <option value="example">example</option>
                                { 
                                context.prefixes.map((pre) =>{
                                    if(pre.key!=''){
                                        return <option key={pre.key} value={pre.val}>{pre.key}</option>
                                    }                        
                                })
                            }
                            </select>
                        </Collapse>
                    </div>                                    
                </div>
            </Collapse>             
    );
                                   
    
}


export default CustomConstraint;

