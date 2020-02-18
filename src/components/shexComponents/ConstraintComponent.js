import React,{useState,useContext} from 'react';

import {ShapesContext} from '../../App';

const primitives = ['String','Integer','Date','Boolean'];

function ConstraintComponent (props) {
    
    const context = useContext(ShapesContext);
    const {triple} = props;
    const [primitive,setPrimitive] = useState(triple.value.value);

  

       const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
    }


    return ( <div className="constraintHeader">
                <label>Constraint </label>
                <select className="customSelector" 
                    value={primitive} 
                    onChange={handlePrimitiveChange}>
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>
            <button className="buildBtn buildConstraintBtn mdc-icon-button material-icons">build</button>
        </div>);
                                   


}


/*

const [primitive,setPrimitive] = useState(triple.value.value);
    const [cardinality,setCardinality] = useState(triple.cardinality.toString());  

const [constraint,setConstraint] = useState(triple.value.getTypeName());

<select className="customSelector"
                        value={constraint}
                        onChange={handleConstraintChange}>
                    <option value="iriRef">IriRef</option>
                    <option value="prefixedIri">PrefixedIri</option>
                    <option value="shape">Shape</option>
                    <option value="literal">Literal</option>
                    <option value="nonliteral">NonLiteral</option>
                    <option value="iri">IRI</option>
                    <option value="bnode">BNode</option>
                </select>



<select className="customSelector" 
                    value={primitive} 
                    onChange={handlePrimitiveChange}>
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>

            <select className="customSelector" 
                    value={cardinality}
                    onChange={handleCardinalityChange}>

                <option value="">Exactly one</option>
                <option value="*">Zero or more</option>
                <option value="+">One at least</option>
                <option value="?">One or none</option>
            </select>    



    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
    }

    const handleCardinalityChange = function(e){
        let cardinality = e.target.value;
        triple.setCardinality(cardinality);
        context.emit();
        setCardinality(cardinality)
    }

      const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        if(newConstraint!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        triple.setValue(newConstraint);
        context.emit();
        setConstraint(newConstraint);
    }
*/

export default ConstraintComponent;

