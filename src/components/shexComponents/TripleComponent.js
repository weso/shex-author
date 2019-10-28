
import React,{Component} from 'react';

import TripleTypeComp from './types/TripleTypeComp';
import CardinalityComp from './cardinality/CardinalityComp';

import ValueComponent from './ValueComponent';

class TripleComponent extends Component {

    constructor(props){
        super(props);
        //this.deleteTriple = this.props.deleteTriple;
   
    }

    render(){
        // onClick={this.deleteTriple.bind(this,this.state.triple.id)}
        // <CardinalityComp shape={this.props.shape} />
        //  <ValueComponent shape={this.props.shape} />
        return <div className="row tripleRow">
                    <div className="row triples-header">
                        <label className="col-sm-1 tripleLabel">Triple</label>                        
                        
                        <TripleTypeComp shape={this.props.shape}
                                        triple={this.props.triple}
                                        changeTripleType={this.props.changeTripleType}
                                        changeTripleValue={this.props.changeTripleValue} />
                      
                       

                        <button className="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger"
                               onClick={this.props.deleteTriple.bind(this,this.props.shape.id,this.props.triple.id)}>
                                delete
                        </button>

                        <div className="checkbox valuesCheck">
                            <label>Values 
                                <input className="check" type="checkbox" value=""/>
                            </label>
                        </div>
                        
                      
                       
                    </div>
                </div>
                                   
    }

}

export default TripleComponent;

