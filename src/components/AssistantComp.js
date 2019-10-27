
import React,{Component} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {connect} from 'react-redux';



let Triple = require('../entities/shexEntities/triple.js');


class AssistantComp extends Component {


    constructor(props){
        super(props);
        this.addShape = this.props.addShape.bind(this);
    }
  

   
    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                {this.props.shapes.map(shape =>
                
                    <ShapeComponent key={shape.id} 
                                    shape={shape}
                                    addTriple={this.props.addTriple}
                                    deleteShape={this.props.deleteShape}
                                    deleteTriple={this.props.deleteTriple} 
                                    />

                )}

                <button id='addShapeButton' 
                        className="btn-primary addShapeButton"
                        onClick={this.addShape}>
                        + Shape
                </button>
            </div>
        
    }

}

/*
const mapStateToProps = (state) =>{
    return {
        shapes:state.shapes
    };
}


export default connect(mapStateToProps)(AssistantComp);

*/
export default AssistantComp;