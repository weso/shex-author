
import React,{Component} from 'react';
import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';


let IriRef = require('../../../entities/shexEntities/types/concreteTypes/iriRef.js');
let PrefixedIri = require('../../../entities/shexEntities/types/concreteTypes/prefixedIri.js');


class TripleTypeComp extends Component {

    
    render(){

        let typeComp;
        let type = this.props.triple.type;
        if(type instanceof IriRef){
            type = <IriComp shape={this.props.shape}
                            triple={this.props.triple}
                            type='triple'
                            changeTripleValue={this.props.changeTripleValue}/>
        }
        if(type instanceof PrefixedIri){
            type = <PrefixedComp shape={this.props.shape}
                                triple={this.props.triple}
                                type='triple'
                                changeTripleValue={this.props.changeTripleValue}/>
        }
     

        return <div className="row col-sm-6">
                    <select className="col-sm form-control tripleType" 
                            value={this.props.triple.type.getTypeName()} 
                            onChange={this.props.changeTripleType.bind(this,this.props.shape.id,this.props.triple.id)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                             
                    </select>

                   {type}
                
                </div>

                                   
    }

}

export default TripleTypeComp;

