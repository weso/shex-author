import React,{useContext,useState} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import AssistTitle from './assistant/AssistTitle';
import AssistContent from './assistant/AssistContent';
import AssistLoader from './assistant/AssistLoader';
import AssistError from './assistant/AssistError';
import '../../css/Assistant.css';
import '../../css/resizable/react-resizable.css';

import { Resizable, ResizableBox } from 'react-resizable';

function AssistantComp (props) {

        const context = useContext(AppContext);
        return (
        <Collapse isOpen={context.isAssistantOpen} className='assistCollapse'>
                <ResizableBox   width={context.width} 
                                height={100} //Just to avoid console errors, but ignore it
                                onResize={(e,data)=>context.handleResize(e,data)}
                                resizeHandles={['e']}  
                                minConstraints={[470, 100]} maxConstraints={[1000, 1000]}>
                        
                        <div className='containerAssist'>                                    
                                <AssistTitle/>
                                <AssistContent/>
                                <AssistLoader/>
                                <AssistError/>                               
                        </div>
                </ResizableBox>
        </Collapse>);
}


export default AssistantComp;
