import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';

import {ALL_PREFIXES} from '../../../utils/rdfUtils';
import PrefixSelector from '../PrefixSelector';

function PrefixesBtn (props) {

    const context = useContext(ShapesContext);

    return (        
        <div className="dropdown" title="Prefixes">
            <button className="mdc-icon-button material-icons btns btn dropdown-toggle selector" type="button" data-toggle="dropdown">local_parking
            <span className="caret"></span></button>
            <ul className='dropdown-menu'>
                <li>
                    <div id='prefixesDropdown' className='prefixes'>  
                        <PrefixSelector namespaces={ALL_PREFIXES}/>                                    
                    </div>
                </li>
            </ul>
        </div>);
    
    
}

export default PrefixesBtn;