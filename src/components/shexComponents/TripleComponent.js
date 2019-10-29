
import React,{useContext} from 'react';

import TripleTypeComp from './types/TripleTypeComp';

import ValueComponent from './ValueComponent';



function TripleComponent (props) {

    const {shape,triple,deleteTriple} = props;
//
    return (<div className="row tripleRow">
                <div className="row triples-header">
                    <label className="col-sm-1 tripleLabel">Triple</label>                        
                    
                    <TripleTypeComp shape={shape} triple={triple} deleteTriple={deleteTriple}/>
                
                </div>
                 <ValueComponent shape={shape} triple={triple}/>
            </div>);
                                   

}

export default TripleComponent;

