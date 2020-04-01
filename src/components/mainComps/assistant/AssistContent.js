import React,{useContext,useState} from 'react';
import {AssistContext} from '../Assistant';
import { Collapse } from 'reactstrap';
import Shapes from './tabs/Shapes';
import Prefixes from './tabs/Prefixes';
import Colors from './tabs/Colors';

function AssistContent (props) {

    const asssistContext = useContext(AssistContext);

    return ( 
    <div className='showAsist'>
        <div id='assistant-container' className='assistantContainer'> 
                <Collapse isOpen={asssistContext.isShapesOpen}>
                    <Shapes/>
                </Collapse>
                <Collapse isOpen={asssistContext.isPrefixesOpen}>
                    <Prefixes/>
                </Collapse>
                <Collapse isOpen={asssistContext.isConfigOpen}>
                    <Colors/>
                </Collapse>
                
            </div>
        </div>);
}


export default AssistContent;

