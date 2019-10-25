
import React,{Component} from 'react';


class ShapeTypeComp extends Component {

   
    constructor(props) {
        super(props);
        this.shape = props.shape;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
   
        let type = event.target.value;
        this.shape.setType(type);
        this.forceUpdate();

    }




    getType(shape){
        return { __html: this.shape.type.getHtml()}
    }
    
    render(){
        return <div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={this.shape.type.getTypeName()} 
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

