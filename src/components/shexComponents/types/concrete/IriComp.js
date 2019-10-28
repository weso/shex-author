
import React,{Component} from 'react';


class IriComp extends Component {

    constructor(props){
        super(props);
        
        let value=this.props.shape.type.value
        if(this.props.type !='shape'){
          value = this.props.triple.type.value
        }
        this.state = {
            value:value
        }
        
    }



    change = e =>{
          this.setState({value:e.target.value})
          if(this.props.type == 'shape'){
            this.props.changeShapeValue(this.props.shape.id,e.target.value);
          }else{
            this.props.changeTripleValue(this.props.shape.id,this.props.triple.id,e.target.value);
          }
          
    }
    

    render(){

        return <input className={this.props.shape.type.context+' form-control col-sm'} 
                      context="text" 
                      value={this.state.value}
                      onChange={this.change.bind(this)}/>
    
                                   
    }

}

export default IriComp;

