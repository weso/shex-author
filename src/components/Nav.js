

import React, {Component} from 'react';
import PrefixSelector from './shexComponents/prefix/PrefixSelector';

let rdfUtils = require('../utils/rdfUtils.js');

class Nav extends Component {

    constructor(props) {
        super(props);
        this.namespaces = rdfUtils.ALL_PREFIXES;
    }

  
    render(){
      return <div className="row editor-nav">
                <button className="btn btn-default assistantBtn" type="button" >Assistant</button>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Prefixes
                    <span className="caret"></span></button>
                    <ul className='dropdown-menu'>
                        <li>
                            <div id='prefixesDropdown' className='prefixes'>  

                                <PrefixSelector namespaces={this.namespaces}/>
                                  
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
    }
    
}


export default Nav;
