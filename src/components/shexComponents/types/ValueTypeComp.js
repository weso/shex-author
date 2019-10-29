import React,{useContext,useState} from 'react';

import {ShapesContext} from '../../../App';

import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';
import PrimitiveComp from './concrete/PrimitiveComp';
import ShapeRefComp from './concrete/ShapeRefComp';


let IriRef = require('../../../entities/shexEntities/types/concreteTypes/iriRef.js');
let PrefixedIri = require('../../../entities/shexEntities/types/concreteTypes/prefixedIri.js');
let Primitive = require('../../../entities/shexEntities/types/concreteTypes/primitive.js');
let ShapeRef = require('../../../entities/shexEntities/types/concreteTypes/shapeReference.js');

function ValueTypeComp(props) {
    
    const {shape,triple} = props;

    const context = useContext(ShapesContext);
    const [value,setValue] = useState(triple.value.getTypeName())
    
    let valueComp;
    let valueType = triple.value;
    if(valueType instanceof IriRef){
        
        valueComp = <IriComp shape={shape}triple={triple}type='triple'/>

    }else if(valueType instanceof PrefixedIri){
        
        valueComp = <PrefixedComp shape={shape}triple={triple}type='triple'/>

    }else if(valueType instanceof Primitive){
        
        valueComp = <PrimitiveComp shape={shape}triple={triple}/>

    }else if(valueType instanceof ShapeRef){
        
        valueComp = <ShapeRefComp shape={shape}triple={triple}/>

    }else{
        valueComp = null;
    }
    

    const handleChange = (event) =>{
        let newValue = event.target.value;
        context.setTripleValue(shape.id,triple.id,newValue);
        setValue(newValue);
    }

    return  (<div className="row col-6">
                    <select className="col form-control valueType"
                                    value={value} 
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


                                {valueComp}

                    </div>);

}

export default ValueTypeComp;

