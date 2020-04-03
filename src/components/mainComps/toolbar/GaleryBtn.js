import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import {loadExample} from '../../../utils/toolbarUtils';

function GaleryBtn () {

    const context = useContext(AppContext);

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
                    <div id='prefixesDropdown'>  
                        <button className="form-control"
                                onClick={()=>loadExample('default')}>
                                User
                        </button>
                       
                    </div>
                </li>
            </ul>
        </div>  );
    
  
}

export default GaleryBtn;


/*

 <button className="form-control" 
                                onClick={()=>loadExample('wiki')}>
                                Wikidata
                        </button>*/