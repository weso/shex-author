
import React,{Component} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';


class AssistantComp extends Component {


    constructor(props){
        super(props);
      
        this.state = {

            shapes:props.shapes

        }
    }
   

    deleteShape = (shapeId) =>{
        var response = window.confirm('Are you sure?');
        if (response == true) {
            const newShapes = this.state.shapes.filter(shape => shape.id != shapeId);
            this.setState({shapes:newShapes});
        }
    }

  
    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                <button id='addShapeButton' className="btn-primary addShapeButton">+ Shape</button>
                {this.state.shapes.map(shape =>
                
                    <ShapeComponent key={shape.id} shape={shape} deleteShape={this.deleteShape}/>

                )}
            </div>
        
    }

}

export default AssistantComp;

