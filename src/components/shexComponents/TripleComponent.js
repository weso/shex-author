
import React,{Component} from 'react';

import TripleTypeComp from './types/TripleTypeComp';
import CardinalityComp from './cardinality/CardinalityComp';

import ValueComponent from './ValueComponent';

class TripleComponent extends Component {

    constructor(props){
        super(props);
        this.deleteTriple = this.props.deleteTriple;
        this.state = {
            triple:this.props.triple
        }
    }

    render(){
        return <div className="row tripleRow">
                    <div className="row triples-header">
                        <label className="col-sm-1 tripleLabel">Triple</label>                        
                        
                        <TripleTypeComp triple={this.state.triple} />
                      
                        <CardinalityComp triple={this.state.triple} />

                        <button className="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger"
                                onClick={this.deleteTriple.bind(this,this.state.triple.id)}>
                                delete
                        </button>

                        <div className="checkbox valuesCheck">
                            <label>Values 
                                <input className="check" type="checkbox" value=""/>
                            </label>
                        </div>
                        
                        <ValueComponent triple={this.state.triple} />
                       
                    </div>
                </div>
                                   
    }

}

export default TripleComponent;

