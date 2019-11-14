import React,{useContext} from 'react';
import {ShapesContext} from '../../App';
import PrefixSelector from './PrefixSelector';
import {ALL_PREFIXES} from '../../utils/rdfUtils';
import  Editor from '../../entities/editor';

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

    return (<div className='lateralNav col-xs-1'>
    
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
