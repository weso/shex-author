import React,{useContext,useState} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import AssistTitle from './assistant/AssistTitle';
import AssistContent from './assistant/AssistContent';
import AssistLoader from './assistant/AssistLoader';
import AssistError from './assistant/AssistError';
import '../../css/Assistant.css';
import '../../css/react-resizable.css';

import { Resizable, ResizableBox } from 'react-resizable';

function AssistantComp (props) {

        const context = useContext(AppContext);
        return (
        <Collapse isOpen={context.isAssistantOpen} className='assistCollapse'>
                <ResizableBox width={700} onResize={(e,data)=>context.handleResize(e,data)}
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

/*


import { Resizable } from "re-resizable";
 <Collapse isOpen={context.isAssistantOpen} className='row assistCollapse'>
                <Resizable  className="col row resizable"
                        size={{ width: context.width }}                    
                        onResize={context.handleResize}              
                        enable={{right:true}}>
        
                        <div className='col containerAssist'>                                    
                                <div className="globalAssis">
                                        <AssistTitle/>
                                        <AssistContent/>
                                        <AssistLoader/>
                                        <AssistError/>
                                </div>
                        </div>
                </Resizable>     
        </Collapse>);


        */