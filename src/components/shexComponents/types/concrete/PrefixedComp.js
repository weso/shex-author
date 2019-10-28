
import React,{Component} from 'react';


class PrefixedComp extends Component {

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

    change = e =>{
          this.setState({value:e.target.value})
          if(this.props.type == 'shape'){
            this.props.changeShapeValue(this.props.shape.id,e.target.value);
          }else{
            this.props.changeTripleValue(this.props.shape.id,this.props.triple.id,e.target.value);
          }
    }

    render(){

        return  <div className='row col-sm'>
                    <select className={this.getPrefixContex()+' col-sm form-control'}/>
                    <input  className={this.props.shape.type.value+' form-control col-sm'} 
                            context="text" 
                            value={this.state.value}
                            onChange={this.change.bind(this)} />      
                </div>
              
                               
    }

}


    

export default PrefixedComp;

