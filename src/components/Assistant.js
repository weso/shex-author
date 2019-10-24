
import React,{Component} from 'react';
import '../App.css';

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

    getType(element){
        return { __html: element.type.getHtml()}
    }

    render(){
        return <div id='assistant-container' className="assistant col-lg-6" > 
                <button id='addShapeButton' className="btn-primary addShapeButton">+ Shape</button>
                {this.state.shapes.map(shape =>
                
                    <div key={shape.id} className="shapes-container">
                        <div className="row shapes-header">
                            <label className="col-sm-2">Shape </label>
                            <select className="col-sm-2 form-control shapeType">
                                <option value="iriRef">IriRef</option>
                                <option value="prefixedIri">Prefixed</option>
                                <option value="bnode">BNode</option>
                            </select>

                            <div className="row col-lg" dangerouslySetInnerHTML={this.getType(shape)} />
                        </div>
                        <button className="btn-primary addPropButton col-xs-3">+ Triple</button>
                        
                        <div className="triples-container col-xs">
                            {shape.triples.map(triple =>
                            
                                <div key={triple.id} className="row tripleRow">
                                    <div className="row triples-header">
                                        <label className="col-sm-1 tripleLabel">Triple</label>                        
                                        <select className="col-sm-2 form-control tripleType">
                                            <option value="iriRef">IriRef</option>
                                            <option value="prefixedIri">Prefixed</option>
                                        </select>

                                        <div className="row col-lg" dangerouslySetInnerHTML={this.getType(triple)} />                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
            </div>
        
    }

}

export default Assistant;

