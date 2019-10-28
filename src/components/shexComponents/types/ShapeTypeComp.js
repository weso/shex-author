
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
            type = <IriComp shape={shape}type='shape'/>
        }
        if(type instanceof PrefixedIri){
            type = <PrefixedComp shape={shape} type='shape'/>
        }
        if(type instanceof BNode){
            type = <BNodeComp shape={shape}/>
        }
       
        return (<div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={shape.type.getTypeName()} 
                            onChange={ (e) => context.changeShapeType(shape.id,e)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                    </select>

                   {type}
                
                </div>);

                                   

}

export default ShapeTypeComp;

