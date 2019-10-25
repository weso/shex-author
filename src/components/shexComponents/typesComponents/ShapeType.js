
import React,{Component} from 'react';

let TypesFactory = require('../../../entities/shexEntities/types/typesFactory.js')

class ShapeType extends Component {

   
    constructor(props) {
        super(props);
        this.type = props.type;
        this.state = {value: this.type.getTypeName()};

        this.handleChange = this.handleChange.bind(this);
        this.typesFactory = new TypesFactory();
    
    }

    handleChange(event) {
        let type = event.target.value;
        this.setState({value: type});
        this.type = this.typesFactory.createType(type,'shapeName');
        this.forceUpdate();
    }


    getType(shape){
        return { __html: this.type.getHtml()}
    }
    
    render(){
        return <div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" value={this.state.value} onChange={this.handleChange}>
                        <option value="iriRef">IriRef</option>
                        <option value="prefixedIri">Prefixed</option>
                        <option value="bnode">BNode</option>
                    </select>

                    <div className="row col-sm" dangerouslySetInnerHTML={this.getType()} />
                
                </div>

                                   
    }

}

export default ShapeType;

