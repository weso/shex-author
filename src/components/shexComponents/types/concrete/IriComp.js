
import React,{Component} from 'react';


class IriComp extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            value:this.props.shape.type.value
        }
        
    }



    change = e =>{
          this.setState({value:e.target.value})
          this.props.changeShapeValue(this.props.shape.id,e.target.value);
    }
    

    render(){

        return <input className={this.props.shape.type.context+' form-control col-sm'} 
                      context="text" 
                      value={this.state.value}
                      onChange={this.change.bind(this)}/>
    
                                   
    }

}

export default IriComp;

