import React from 'react';
import PrefixSelector from './PrefixSelector';
import {ALL_PREFIXES} from '../../utils/rdfUtils';


function Nav (props) {

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

                                <PrefixSelector namespaces={ALL_PREFIXES}/>
                                  
                            </div>
                        </li>
                    </ul>
                </div>
            </div>);
    
    
}


export default Nav;
