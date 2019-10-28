
import React,{Component} from 'react';


class BNodeComp extends Component {

    constructor(props){
        super(props);
        
        let value = this.props.shape.type.value;
        if(value == ''){
            value = 'example';
            this.props.changeShapeValue(this.props.shape.id,value);
        }

        this.state = {
            value:value
        }
        
    }

    change = e =>{
          this.setState({value:e.target.value})
          this.props.changeShapeValue(this.props.shape.id,e.target.value);
    }
   
    render(){
        

        return <input   className={this.props.shape.type.context+' form-control col-sm'} 
                        context="text" 
                        value={this.state.value}
                        onChange={this.change.bind(this)}/>

                                      
    }

}

export default BNodeComp;

