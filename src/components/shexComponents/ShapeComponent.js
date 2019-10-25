
import React,{Component} from 'react';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';

class ShapeComponent extends Component {


    render(){
        return <div className="shapes-container">
                    <div className="row shapes-header">
                        <label className="col-sm-2">Shape </label>
                        
                        <ShapeTypeComp shape={this.props.shape} />

                        <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger">delete</button>
                    </div>
                    <button className="btn-primary addPropButton col-xs-3">+ Triple</button>
                    
                    <div className="triples-container col-xs">
                        {this.props.shape.triples.map(triple =>

                            <TripleComponent key={triple.id} triple={triple} /> 
                            
                        )}
                    </div>
                </div>
                                   
    }

}

export default ShapeComponent;

