

import React from 'react';
import PrefixSelector from './PrefixSelector';

let rdfUtils = require('../../utils/rdfUtils.js');

function Nav (props) {

    const namespaces = rdfUtils.ALL_PREFIXES;
    const {toggle} = props;

    
    return (<div className="row editor-nav">
                <button className="btn btn-default assistantBtn " 
                        type="button"
                        onClick={toggle}>
                        Assistant
                </button>

                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Prefixes
                    <span className="caret"></span></button>
                    <ul className='dropdown-menu'>
                        <li>
                            <div id='prefixesDropdown' className='prefixes'>  

                                <PrefixSelector namespaces={namespaces}/>
                                  
                            </div>
                        </li>
                    </ul>
                </div>
            </div>);
    
    
}


export default Nav;
