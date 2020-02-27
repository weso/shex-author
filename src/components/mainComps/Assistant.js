import React,{useContext} from 'react';
import { Collapse } from 'reactstrap';
import AssistTitle from './assistantComps/AssistTitle';
import AssistContent from './assistantComps/AssistContent';
import AssistLoader from './assistantComps/AssistLoader';

import {ShapesContext} from '../App';

import '../css/Assistant.css';

function AssistantComp (props) {

    const context = useContext(ShapesContext);

    return (
        <Collapse isOpen={isAssistantOpen} className='row assistCollapse'>
                <Resizable  className="col row resizable"
                            size={{ width: width }}                    
                            onResizeStop={makeItResponsive}              
                            enable={{right:true}}>
        
                        <div className='col containerAssist'>                                    
                                <div className="globalAssis">
                                        <AssistTitle/>
                                        <AssistContent/>
                                        <AssistLoader/>
                                </div>
                        </div>
                </Resizable>     
        </Collapse>    
        );

    
}

/*

   <div className={context.valid}>
                        <p><strong>[Error]</strong> This Shape is very complex for me...</p>
                </div>
*/

export default AssistantComp;
