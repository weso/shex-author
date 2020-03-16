import React,{useContext,useState} from 'react';
import {AppContext} from '../../../App';
import { Collapse } from 'reactstrap';
import ShapeComponent from './shEx/ShapeComponent';
import Prefixes from './content/Prefixes';
import Shapes from './content/Shapes';

function AssistContent (props) {

    const context = useContext(AppContext);

    return ( 
    <div className={context.asist}>
        <div id='assistant-container' className='assistantContainer'> 
                <Collapse isOpen={context.isShapesOpen}>
                    <Shapes/>
                </Collapse>
                <Collapse isOpen={!context.isShapesOpen}>
                    <Prefixes/>
                </Collapse>
            </div>
        </div>);
}


export default AssistContent;

