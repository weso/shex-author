import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {ShapesContext} from '../../App';
import PrefixSelector from './PrefixSelector';
import {ALL_PREFIXES} from '../../utils/rdfUtils';
import  Editor from '../../entities/editor';

import {defaultExample} from '../../examples/defaultExample';
import {wikiExample} from '../../examples/wikiExample';

function Nav (props) {

    const {assistanToggle,visualizeToggle} = props;
    const context = useContext(ShapesContext);

    const  handle = function(){
        if(window.confirm('Are you sure?')){
            context.replaceShapes([]);
            // We can't do emit() because it takes 
            // like another call to change shapes state
            // I don't know exactly the reaseon...
            // It's something about react state
            Editor.getInstance().getYashe().setValue('');
        }
    }

    const loadExample = function(example){ 
        let yashe = Editor.getInstance().getYashe();
        if(example=='default'){
            yashe.setValue(defaultExample)
        }else{
            yashe.setValue(wikiExample)
        }
         Codemirror.signal(yashe,'keyHandled');
    }

    return (<div>
    
                    <button className="col mdc-icon-button material-icons btns"
                            type="button"
                            onClick={assistanToggle}>
                            info
                    </button>
                    <br/>

                    <button className="col mdc-icon-button material-icons btns"type="button"
                        onClick={visualizeToggle}>
                        remove_red_eye
                    </button> 
                
                     <br/>
                  
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle  
                                        mdc-icon-button material-icons 
                                         btns prefixSelector" type="button" data-toggle="dropdown">folder_open
                        <span className="caret"></span></button>
                        <ul className='dropdown-menu'>
                            <li>
                                <div id='prefixesDropdown' className='prefixes'>  
                                    <button className="form-control"onClick={()=>loadExample('default')}>User</button>
                                    <button className="form-control" onClick={()=>loadExample('wiki')}>Wikidata</button>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>



                    <br/>
                     <button className="col mdc-icon-button material-icons  btns"
                             onClick={handle}>
                            delete_outline
                     </button>
                    <br/>

                    

                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle  
                                        mdc-icon-button material-icons 
                                        btns prefixSelector" type="button" data-toggle="dropdown">local_parking
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
