
import React,{useContext} from 'react';
import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';
import BNodeComp from './concrete/BNodeComp';

import {ShapesContext} from '../../../App';

let IriRef = require('../../../entities/shexEntities/types/concreteTypes/iriRef.js');
let PrefixedIri = require('../../../entities/shexEntities/types/concreteTypes/prefixedIri.js');
let BNode = require('../../../entities/shexEntities/types/concreteTypes/bNode.js');


function ShapeTypeComp (props) {

        const context = useContext(ShapesContext);
        const {shape} = props;
   
        let typeComp;
        let type = shape.type;
        if(type instanceof IriRef){
            typeComp = <IriComp shape={shape}type='shape'/>
        }
        if(type instanceof PrefixedIri){
            typeComp = <PrefixedComp shape={shape} type='shape'/>
        }
        if(type instanceof BNode){
            typeComp = <BNodeComp shape={shape}/>
        }
       
        return (<div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={shape.type.getTypeName()} 
                            onChange={ (e) => context.setShapeType(shape.id,e)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                    </select>

                   {typeComp}
                
                </div>);

                                   

}

export default ShapeTypeComp;

