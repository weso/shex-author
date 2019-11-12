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

    return (<div className="row editor-nav">
                <button className="btn btn-default assistantBtn " 
                        type="button"
                        onClick={assistanToggle}>
                        Assistant
                </button>


                <button className="btn btn-default " 
                        type="button"
                        onClick={visualizeToggle}>
                        Visualize
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

                 <button className="deleteALL material-icons "
                                onClick={handle}>
                                delete_outline
                        </button>
            </div>);
    
    
}


export default Nav;
