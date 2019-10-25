
import React,{Component} from 'react';

import ValueTypeComp from './types/ValueTypeComp';

class ValueComponent extends Component {

  
    render(){           
        return <div className="col-12 valuesCol"  >
                    <div className="row values-container">
                        <div className="col-10 triplesVal ">
                            <div className="row">
                                <label className="col-3 valueLabel">Value</label>
                               
                                <ValueTypeComp triple={this.props.triple}/>

                                <select className="col-4 form-control valueInlineShape"/>

                            </div>
                       </div>
                    </div>
                </div>
                                   
    }

}

export default ValueComponent;

