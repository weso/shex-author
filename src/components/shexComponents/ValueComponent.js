
import React,{useContext} from 'react';

import {ShapesContext} from '../../App';

import ValueTypeComp from './types/ValueTypeComp';
import IriComp from './types/concrete/IriComp';
import PrefixedComp from './types/concrete/PrefixedComp';
import PrimitiveComp from './types/concrete/PrimitiveComp';

let IriRef = require('../../entities/shexEntities/types/concreteTypes/iriRef.js');
let PrefixedIri = require('../../entities/shexEntities/types/concreteTypes/prefixedIri.js');
let Primitive = require('../../entities/shexEntities/types/concreteTypes/primitive.js');

function ValueComponent (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    let valueComp;
    let value = triple.type;
    if(value instanceof IriRef){
        valueComp = <IriComp shape={shape}triple={triple}type='triple'/>
    }
    if(value instanceof PrefixedIri){
        valueComp = <PrefixedComp shape={shape}triple={triple}type='triple'/>
    }
     
           
    return (<div className="col-12 valuesCol"  >
                    <div className="row values-container">
                        <div className="col-10 triplesVal ">
                            <div className="row">
                                <label className="col-3 valueLabel">Value</label>
                               
                                <ValueTypeComp shape={shape} triple={triple}/>

                                 {valueComp}

                                <select className="col-2 form-control valueInlineShape"/>

                               
                                
                            </div>
                       </div>
                    </div>
                </div>);
                                   


}

export default ValueComponent;

