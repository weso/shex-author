import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';

import {loadExample} from '../../../utils/toolbarUtils';

function GaleryBtn () {

    const context = useContext(ShapesContext);

    return (
         <div className="dropdown" title="Galery">
            <button className="dropdown-toggle  
                            mdc-icon-button material-icons 
                                btns selector" 
                    type="button" 
                    data-toggle="dropdown">
                    folder_open
                    <span className="caret"></span>
            </button>
            <ul className='dropdown-menu'>
                <li>
                    <div id='prefixesDropdown' className='prefixes'>  
                        <button className="form-control"
                                onClick={()=>loadExample('default')}>
                                User
                        </button>
                        <button className="form-control" 
                                onClick={()=>loadExample('wiki')}>
                                Wikidata
                        </button>
                    </div>
                </li>
            </ul>
        </div>  );
    
  
}

export default GaleryBtn;


