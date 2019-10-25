
import React,{Component} from 'react';

import TripleComponent from './TripleComponent';

class ShapeComponent extends Component {

   
    getType(shape){
        return { __html: shape.type.getHtml()}
    }

    render(){
        return <div className="shapes-container">
                    <div className="row shapes-header">
                        <label className="col-sm-2">Shape </label>
                        <select className="col-sm-2 form-control shapeType">
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                        </select>

                        <div className="row col-sm-2" dangerouslySetInnerHTML={this.getType(this.props.shape)} />

                        <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger">delete</button>
                    </div>
                    <button className="btn-primary addPropButton col-xs-3">+ Triple</button>
                    
                    <div className="triples-container col-xs">
                        {this.props.shape.triples.map(triple =>

                            <TripleComponent key={triple.id} triple={triple} /> 
                            
                        )}
                    </div>
                </div>
                                   
    }

}

export default ShapeComponent;

