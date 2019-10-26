
import React,{Component} from 'react';


class ShapeTypeComp extends Component {

   
    constructor(props) {
        super(props);
        this.shape = props.shape;
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            type:this.shape.type.getTypeName()

        }

    }

    handleChange(event) {
   
        let type = event.target.value;
        this.shape.setType(type);
        this.setState({type:type});
     
    }




    getType(shape){
        return { __html: this.shape.type.getHtml()}
    }
    
    render(){
        return <div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={this.state.type} 
                            onChange={this.handleChange}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                    </select>

                    <div className="row col-sm" 
                        dangerouslySetInnerHTML={this.getType()} />
                
                </div>

                                   
    }

}

export default ShapeTypeComp;

