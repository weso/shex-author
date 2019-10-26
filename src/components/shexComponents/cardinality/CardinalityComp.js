
import React,{Component} from 'react';


class CardinalityComp extends Component {

   
    constructor(props) {
        super(props);
        this.triple = props.triple;
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            cardinality:this.triple.cardinality.toString()

        }

    }

    handleChange(event) {
   
        let cardinality = event.target.value;
        this.triple.setCardinality(cardinality);
        this.setState({cardinality:cardinality})

    }


    
    render(){
        return  <select className="col-sm-3  form-control tripleCardinality"
                        value={this.state.cardinality}
                        onChange={this.handleChange}>

                            <option value="">Exactly one</option>
                            <option value="*">Zero or more</option>
                            <option value="+">One at least</option>
                            <option value="?">One or none</option>
                </select>

                                   
    }

}

export default CardinalityComp;

