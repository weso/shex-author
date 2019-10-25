
import React,{Component} from 'react';

import TripleTypeComp from './types/TripleTypeComp';
import CardinalityComp from './cardinality/CardinalityComp';

import ValueComponent from './ValueComponent';

class TripleComponent extends Component {

    render(){
        return <div className="row tripleRow">
                    <div className="row triples-header">
                        <label className="col-sm-1 tripleLabel">Triple</label>                        
                        
                        <TripleTypeComp triple={this.props.triple} />
                      
                        <CardinalityComp triple={this.props.triple} />

                        <button className="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger">delete</button>
                        <div className="checkbox valuesCheck">
                            <label>Values 
                                <input className="check" type="checkbox" value=""/>
                            </label>
                        </div>
                        
                        <ValueComponent triple={this.props.triple} />
                       
                    </div>
                </div>
                                   
    }

}

export default TripleComponent;

