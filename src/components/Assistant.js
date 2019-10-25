
import React,{Component} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';





class Assistant extends Component {

  
    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                <button id='addShapeButton' className="btn-primary addShapeButton">+ Shape</button>
                {this.props.shapes.map(shape =>
                
                    <ShapeComponent key={shape.id} shape={shape} />

                )}
            </div>
        
    }

}

export default Assistant;

