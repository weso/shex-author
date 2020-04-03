import React,{useContext,useState} from 'react';
import {AssistContext} from '../Assistant';
import { Collapse } from 'reactstrap';
import Shapes from './tabs/Shapes';
import AssistLoader from './AssistLoader';
import AssistError from './AssistError';
import Prefixes from './tabs/Prefixes';
import Colors from './tabs/Colors';
import Config from './tabs/Config';

function AssistContent (props) {

    const asssistContext = useContext(AssistContext);

    return ( 
    <div>
        <div id='assistant-container' className='assistantContainer'> 
                
                <Collapse isOpen={asssistContext.isAssistOpen}>
                    <Shapes/>
                    <AssistLoader/>
                    <AssistError/>
                </Collapse>
                <Collapse isOpen={asssistContext.isPrefixesOpen}>
                    <Prefixes/>
                </Collapse>
                <Collapse isOpen={asssistContext.isColorsOpen}>
                    <Colors/>
                </Collapse>
                <Collapse isOpen={asssistContext.isConfigOpen}>
                    <Config/>
                </Collapse>
                
            </div>
        </div>);
}


export default AssistContent;

