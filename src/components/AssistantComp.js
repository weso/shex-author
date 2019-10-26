
import React,{Component} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';

let Editor = require('../entities/editor.js');
let ShapeStore = require('../entities/shapeStore.js');

let Shape = require('../entities/shexEntities/shape.js');



class AssistantComp extends Component {


    constructor(props){
        super(props);
      
        this.state = {

            shapes:ShapeStore.getInstance().getShapes()

        }
    }
   
    addShape = () =>{

        const id =  ShapeStore.getInstance().getShapeCount();
        const newShape = new Shape(id);

        this.setState({ 
            shapes: [...this.state.shapes,newShape]
        });

        ShapeStore.getInstance().addShape(newShape);

    }


    deleteShape = (shapeId) =>{

        var response = window.confirm('Are you sure?');
        if (response == true) {
            const newShapes = this.state.shapes.filter(shape => shape.id != shapeId);
            this.setState({shapes:newShapes});
            ShapeStore.getInstance().setShapes(newShapes);
        }
        
    }


  
    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                {this.state.shapes.map(shape =>
                
                    <ShapeComponent key={shape.id} shape={shape} addShape={this.addShape} deleteShape={this.deleteShape}/>

                )}
                 <button className="btn-primary addShapeButton col-xs-3"
                        onClick={this.addShape}>
                        + Shape
                </button>
            </div>
        
    }

}

export default AssistantComp;

