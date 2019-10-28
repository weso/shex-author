
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
   
   /*
        let typeComp;
        let type = this.props.shape.type;
        if(type instanceof IriRef){
            type = <IriComp shape={this.props.shape}
                            type='shape'
                            changeShapeValue={this.props.changeShapeValue}/>
        }
        if(type instanceof PrefixedIri){
            type = <PrefixedComp shape={this.props.shape}
                                type='shape'
                                changeShapeValue={this.props.changeShapeValue}/>
        }
        if(type instanceof BNode){
            type = <BNodeComp shape={this.props.shape}
                                changeShapeValue={this.props.changeShapeValue}/>
        }
        */


        return (<div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={props.shape.type.getTypeName()} 
                            onChange={ (e) => context.changeShapeType(props.shape.id,e)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                    </select>

                   {/*type*/}
                
                </div>);

                                   

}

export default ShapeTypeComp;

