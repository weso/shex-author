
import React,{Component} from 'react';
import '../App.css';
import ShapeComponent from './shexComponents/ShapeComponent';

let Shape = require('../entities/shexEntities/shape.js');
let Triple = require('../entities/shexEntities/triple.js');
let PrefixedIri = require('../entities/shexEntities/types/concreteTypes/prefixedIri.js');

let shapes = [];

let shape0 = new Shape(0);
shape0.addTriple(new Triple(0));
shape0.addTriple(new Triple(1,new PrefixedIri('tripleName')));
shape0.addTriple(new Triple(2));

shapes.push(shape0);




class Assistant extends Component {

    state = {

        shapes:shapes

    }

    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                <button id='addShapeButton' className="btn-primary addShapeButton">+ Shape</button>
                {this.state.shapes.map(shape =>
                
                    <ShapeComponent key={shape.id} shape={shape} />

                )}
            </div>
        
    }

}

export default Assistant;

