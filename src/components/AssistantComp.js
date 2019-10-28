
import React,{Component} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';


let Triple = require('../entities/shexEntities/triple.js');


class AssistantComp extends Component {


    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                    {this.props.shapes.map(shape =>
                                
                            <ShapeComponent key={shape.id} 
                                            shape={shape}
                                            addTriple={this.props.addTriple}
                                            deleteShape={this.props.deleteShape}
                                            deleteTriple={this.props.deleteTriple}
                                            changeShapeType={this.props.changeShapeType}
                                            changeShapeValue={this.props.changeShapeValue}
                                            changeTripleType={this.props.changeTripleType}
                                            changeTripleValue={this.props.changeTripleValue}
                                            />
                        )
                    }

                    <button id='addShapeButton' 
                            className="btn-primary addShapeButton"
                            onClick={this.props.addShape.bind(this)}>
                            + Shape
                    </button>
                </div>

    }

}

export default AssistantComp;