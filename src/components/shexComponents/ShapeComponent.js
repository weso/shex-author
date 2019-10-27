
import React,{Component} from 'react';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';

let Triple = require('../../entities/shexEntities/triple.js');
let ShapeStore = require('../../entities/shapeStore.js');

class ShapeComponent extends Component {

    constructor(props){
        super(props);

        
        
        /*
        this.shape = this.props.shape;
        this.state = {

            triples:this.props.shape.triples

        }
        */

    }



    render(){
        // <ShapeTypeComp shape={this.shape} />
        //deleteTriple={this.deleteTriple}
        return <div className="shapes-container">
                    <div className="row shapes-header">
                        <label className="col-sm-2">Shape </label>
                        
                       

                        <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger" 
                                onClick={this.props.deleteShape.bind(this,this.props.shape.id)}>
                                delete
                        </button>
                    </div>
                    <button className="btn-primary addPropButton col-xs-3"
                            onClick={this.props.addTriple.bind(this,this.props.shape.id)}>
                            + Triple</button>
                    
                    <div className="triples-container col-xs">
                        {this.props.shape.triples.map(triple =>

                            <TripleComponent key={triple.id}
                                            shapeId={this.props.shape.id} 
                                            triple={triple}
                                            deleteTriple={this.props.deleteTriple} 
                                            /> 
                            
                        )}
                    </div>
                </div>
                                   
    }

}

export default ShapeComponent;

