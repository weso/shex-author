import React,{useContext,useState} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from './assistant/AssistTitle';
import AssistContent from './assistant/AssistContent';
import AssistLoader from './assistant/AssistLoader';
import AssistError from './assistant/AssistError';
import '../../css/Assistant.css';


function AssistantComp (props) {

        const context = useContext(AppContext);
        return (
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
}


export default AssistantComp;
