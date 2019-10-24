
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

                            <div className="row col-sm-2" dangerouslySetInnerHTML={this.getType(shape)} />

                            <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger">delete</button>
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
                            
                                        <div className="row col-sm-4" dangerouslySetInnerHTML={this.getType(triple)} /> 
                                    
                                        <select className="col-sm-3  form-control tripleCardinality">
                                            <option value="">Exactly one</option>
                                            <option value="*">Zero or more</option>
                                            <option value="+">One at least</option>
                                            <option value="?">One or none</option>
                                        </select>

                                        <button className="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger">delete</button>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                )}
            </div>
        
    }

}

export default Assistant;

