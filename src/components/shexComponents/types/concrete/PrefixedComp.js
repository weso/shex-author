
import React,{Component} from 'react';


class PrefixedComp extends Component {

   getPrefixContex(){
        let prefix = 'prefixShape';
        let context = this.props.shape.type.context;
        if( context == 'tripleName'){
            prefix = 'prefixTriple';
        }
        if( context == 'valueName'){
            prefix = 'prefixValue';
        }
        return prefix;
    }

    render(){

        const prefix = this.getPrefixContex()

        return  <div className='row col-sm'>
                    <select className={prefix+' col-sm form-control'}/>
                    <input  className={this.props.shape.type.value+' form-control col-sm'} 
                            context="text" 
                            value={this.props.shape.type.value} />      
                </div>
              
    
                                   
    }


}


    

export default PrefixedComp;

