import React,{Component} from 'react';

class ValueTypeComp extends Component {

    constructor(props) {
        super(props);
        this.triple = props.triple;
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            type:this.triple.value.getTypeName()

        }

    }

    handleChange(event) {
   
        let value = event.target.value;
        this.triple.setValue(value);
        this.setState({value:value})

    }


    getValue(value){
        return { __html: value.getHtml()}
    }


    render(){
        return  <div className="row col-6">
                    <select className="col form-control valueType"
                                    value={this.state.value} 
                                    onChange={this.handleChange}>

                                    <option value="primitive">Primitive</option>
                                    <option value="shape">Shape</option>
                                    <option value="iriRef">IriRef</option>
                                    <option value="prefixedIri">Prefixed</option>
                                    <option value="literal">Literal</option>
                                    <option value="nonLiteral">NonLiteral</option>
                                    <option value="iriKind">IRI</option>
                                    <option value="bnodeKind">BNODE</option>
                                </select>

                    <div className="row col" 
                         dangerouslySetInnerHTML={this.getValue(this.triple.value)} /> 
                </div>
                                    
                                   
    }

}

export default ValueTypeComp;

