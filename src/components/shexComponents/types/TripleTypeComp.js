
import React,{useContext} from 'react';
import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';

import {ShapesContext} from '../../../App';

let IriRef = require('../../../entities/shexEntities/types/concreteTypes/iriRef.js');
let PrefixedIri = require('../../../entities/shexEntities/types/concreteTypes/prefixedIri.js');


function TripleTypeComp (props){

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    let typeComp;
    let type = triple.type;
    if(type instanceof IriRef){
        type = <IriComp shape={shape}triple={triple}type='triple'/>
    }
    if(type instanceof PrefixedIri){
        type = <PrefixedComp shape={shape}triple={triple}type='triple'/>
    }
     
    return (<div className="row col-sm-6">
                    <select className="col-sm form-control tripleType" 
                            value={triple.type.getTypeName()} 
                            onChange={()=>context.changeTripleType(shape.id,triple.id)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                             
                    </select>

                   {type}
                
            </div>);

}

export default TripleTypeComp;

