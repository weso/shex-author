
import React,{Component} from 'react';

import TripleComponent from './TripleComponent';
import ShapeType from './typesComponents/ShapeType';

class ShapeComponent extends Component {

   
    constructor(props) {
        super(props);
        this.shape = props.shape;
        this.state = {value: this.shape.type.getTypeName()};

        this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange(event) {
        this.setState({value: event.target.value});
         console.log(this.state.value)
    }

    getType(shape){
        return { __html: shape.type.getHtml()}
    }

    
    render(){
        return <div className="shapes-container">
                    <div className="row shapes-header">
                        <label className="col-sm-2">Shape </label>
                        
                        <ShapeType type={this.shape.type} />

                        <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger">delete</button>
                    </div>
                    <button className="btn-primary addPropButton col-xs-3">+ Triple</button>
                    
                    <div className="triples-container col-xs">
                        {this.shape.triples.map(triple =>

                            <TripleComponent key={triple.id} triple={triple} /> 
                            
                        )}
                    </div>
                </div>
                                   
    }

}

export default ShapeComponent;

