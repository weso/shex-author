

import React, {Component} from 'react';

class PrefixSelector extends Component {


    constructor(props){
        super(props);
        this.namespaces = this.props.namespaces;
    }
   
    render(){
      return <div>
                {
                    Object.keys(this.namespaces).map( (key) =>{
                            return <div key={key}>
                                        <select  className='form-control'>
                                            <option>{key}</option>
                                            { 
                                                Object.keys(this.namespaces[key]).map( (prefix) =>{
                                                    return <option key={prefix}>{prefix}</option>
                                                })  
                                            }
                                        </select>
                                    </div>
                                    
                    }) 
                }
            </div>
                 
                
    }
    
}


export default PrefixSelector;
