
import React,{Component} from 'react';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';

class ShapeComponent extends Component {

    constructor(props){
        super(props);
        this.deleteShape = this.props.deleteShape;
        this.shape = this.props.shape;
        this.state = {

            triples:this.props.shape.triples

        }

    }


    deleteTriple = (tripleId) =>{
    
        const newTriples = this.state.triples.filter( triple => triple.id != tripleId);
        this.shape.setTriples(newTriples);
        this.setState({triples:newTriples})
        
    }




    render(){
        return <div className="shapes-container">
                    <div className="row shapes-header">
                        <label className="col-sm-2">Shape </label>
                        
                        <ShapeTypeComp shape={this.shape} />

                        <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger" 
                                onClick={this.deleteShape.bind(this,this.shape.id)}>
                                delete
                        </button>
                    </div>
                    <button className="btn-primary addPropButton col-xs-3">+ Triple</button>
                    
                    <div className="triples-container col-xs">
                        {this.state.triples.map(triple =>

                            <TripleComponent key={triple.id} triple={triple} deleteTriple={this.deleteTriple}/> 
                            
                        )}
                    </div>
                </div>
                                   
    }

}

export default ShapeComponent;

