
import React,{Component} from 'react';


class BNodeComp extends Component {

   
    render(){
        let value = this.props.shape.type.value;
        if(value == ''){
            value = 'example';
        }

        return <input   className={this.props.shape.type.context+' form-control col-sm'} 
                        context="text" 
                        value={value}/>

                                      
    }

}

export default BNodeComp;

