
import React,{useContext} from 'react';

import {ShapesContext} from '../../App';

import TripleTypeComp from './types/TripleTypeComp';
import CardinalityComp from './cardinality/CardinalityComp';

import ValueComponent from './ValueComponent';



function TripleComponent (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

        /* onClick={this.deleteTriple.bind(this,this.state.triple.id)}
         <CardinalityComp shape={this.props.shape} />
          <ValueComponent shape={this.props.shape} />
*/

    return (<div className="row tripleRow">
                <div className="row triples-header">
                    <label className="col-sm-1 tripleLabel">Triple</label>                        
                    
                    <TripleTypeComp shape={shape} triple={triple}/>
            
                    <button className="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger"
                            onClick={() => context.deleteTriple(shape.id,triple.id)}>
                            delete
                    </button>

                    <div className="checkbox valuesCheck">
                        <label>Values 
                            <input className="check" type="checkbox" value=""/>
                        </label>
                    </div>
                    
                    
                    
                </div>
            </div>);
                                   

}

export default TripleComponent;

