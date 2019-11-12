import React,{useContext} from 'react';
import {ShapesContext} from '../../App';
import PrefixSelector from './PrefixSelector';
import {ALL_PREFIXES} from '../../utils/rdfUtils';


function Nav (props) {

    const {toggle} = props;
    const context = useContext(ShapesContext);


    return (<div className="row editor-nav">
                <button className="btn btn-default assistantBtn " 
                        type="button"
                        onClick={toggle}>
                        Assistant
                </button>


                <button className="btn btn-default assistantBtn " 
                        type="button"
                        onClick={context.visualize()}>
                        Peticion
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
