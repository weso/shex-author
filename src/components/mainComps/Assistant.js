import React,{useContext,useState} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from './assistant/AssistTitle';
import AssistContent from './assistant/AssistContent';
import AssistLoader from './assistant/AssistLoader';
import '../../css/Assistant.css';

export const AssistContext = React.createContext();

function AssistantComp (props) {

        const context = useContext(AppContext);
        return (
        <Collapse isOpen={context.isAssistantOpen} className='row assistCollapse'>
                <Resizable  className="col row resizable"
                        size={{ width: context.width }}                    
                        onResizeStop={context.makeItResponsive}              
                        enable={{right:true}}>
        
                        <div className='col containerAssist'>                                    
                                <div className="globalAssis">
                                        <AssistTitle/>
                                        <AssistContent/>
                                        <AssistLoader/>
                                </div>
                        </div>
                </Resizable>     
        </Collapse>);
}

/*

   <div className={context.valid}>
                        <p><strong>[Error]</strong> This Shape is very complex for me...</p>
                </div>
*/

export default AssistantComp;
