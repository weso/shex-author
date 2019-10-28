
import React,{Component} from 'react';
import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';
import BNodeComp from './concrete/BNodeComp';

let IriRef = require('../../../entities/shexEntities/types/concreteTypes/iriRef.js');
let PrefixedIri = require('../../../entities/shexEntities/types/concreteTypes/prefixedIri.js');
let BNode = require('../../../entities/shexEntities/types/concreteTypes/bNode.js');


class ShapeTypeComp extends Component {

   
    render(){

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


        return <div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={this.props.shape.type.getTypeName()} 
                            onChange={this.props.changeShapeType.bind(this,this.props.shape.id)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                    </select>

                   {type}
                
                </div>

                                   
    }

}

export default ShapeTypeComp;

