import React from 'react';
import PrefixSelector from '../PrefixSelector';

function PrefixesBtn (props) {


    return (        
        <div className="dropdown" title="Prefixes">
            <button className="mdc-icon-button material-icons btns btn dropdown-toggle selector" type="button" data-toggle="dropdown">local_parking
            <span className="caret"></span></button>
            <ul className='dropdown-menu'>
                <li>
                    <div id='prefixesDropdown'>  
                        <PrefixSelector/>                                    
                    </div>
                </li>
            </ul>
        </div>);
    
    
}

export default PrefixesBtn;