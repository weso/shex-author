
import React,{Component} from 'react';


class TripleComponent extends Component {

   
    getType(triple){
        return { __html: triple.type.getHtml()}
    }

    getValue(triple){
        return { __html: triple.value.getHtml()}
    }


    render(){
        return <div className="row tripleRow">
                    <div className="row triples-header">
                        <label className="col-sm-1 tripleLabel">Triple</label>                        
                        <select className="col-sm-2 form-control tripleType">
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                        </select>
            
                        <div className="row col-sm-4" dangerouslySetInnerHTML={this.getType(this.props.triple)} /> 
                    
                        <select className="col-sm-3  form-control tripleCardinality">
                            <option value="">Exactly one</option>
                            <option value="*">Zero or more</option>
                            <option value="+">One at least</option>
                            <option value="?">One or none</option>
                        </select>

                        <button className="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger">delete</button>
                        <div className="checkbox valuesCheck">
                            <label>Values 
                                <input className="check" type="checkbox" value=""/>
                            </label>
                        </div>
                        
                        <div className="col-12 valuesCol"  >
                            <div className="row values-container">
                                <div className="col-10 triplesVal ">
                                    <div className="row">
                                        <label className="col-3 valueLabel">Value</label>
                                        <select className="col-3 form-control valueType">
                                            <option value="primitive">Primitive</option>
                                            <option value="shape">Shape</option>
                                            <option value="iriRef">IriRef</option>
                                            <option value="prefixedIri">Prefixed</option>
                                            <option value="literal">Literal</option>
                                            <option value="nonLiteral">NonLiteral</option>
                                            <option value="iriKind">IRI</option>
                                            <option value="bnodeKind">BNODE</option>
                                        </select>

                                        <div className="row col-sm-3" dangerouslySetInnerHTML={this.getValue(this.props.triple)} /> 
                                        <select className="col-4 form-control valueInlineShape"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                   
    }

}

export default TripleComponent;

