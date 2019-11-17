import React,{useContext} from 'react';

import {ShapesContext} from '../../App';

import ValueTypeComp from './types/ValueTypeComp';
import CardinalityComp from './utils/CardinalityComp';

function ValueComponent (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;


           
    return (<div className="col-12 valuesCol"  >
                    <div className="row values-container">
                        <div className="col-10 triplesVal ">
                            <div className="row">
                                <label className="col-3 valueLabel">Value</label>
                                <ValueTypeComp shape={shape} triple={triple}/>
                                
                                <label className="col-3 cardiLabel">Cardinality</label>
                                <CardinalityComp shape={shape} triple={triple}/>
                            </div>
                       </div>
                    </div>
                </div>);
                                   


}

export default ValueComponent;

