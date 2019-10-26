
import React,{Component} from 'react';


class TripleTypeComp extends Component {

   
    constructor(props) {
        super(props);
        this.triple = props.triple;
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            type:this.triple.type.getTypeName()

        }
    }

    handleChange(event) {
   
        let type = event.target.value;
        this.triple.setType(type);
        this.setState({type:type})

    }




    getType(triple){
        return { __html: this.triple.type.getHtml()}
    }
    
    render(){
        return <div className="row col-sm-6">
                    <select className="col-sm form-control tripleType" 
                            value={this.state.type} 
                            onChange={this.handleChange}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                             
                    </select>

                    <div className="row col-sm" 
                        dangerouslySetInnerHTML={this.getType()} />
                
                </div>

                                   
    }

}

export default TripleTypeComp;

