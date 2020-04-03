import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import AssistNav from './assistant/AssistNav';
import AssistContent from './assistant/AssistContent';
import { Resizable, ResizableBox } from 'react-resizable';
import Properties from '../../conf/properties';
import '../../css/Assistant.css';
import '../../css/resizable/react-resizable.css';

export const AssistContext = React.createContext();

function Assistant (props) {

        const context = useContext(AppContext);
        const [isAssistOpen, setAssistOpen] = useState(true);
        const [isPrefixesOpen, setPrefixesOpen] = useState(false);
        const [isColorsOpen, setColorsOpen] = useState(false);
        const [isConfigOpen, setConfigOpen] = useState(false);
        const [color,setColor] = useState('#fffff')

        const handleChange = function(color,element,NAMESPACE){
            setColor(color);//NECESSARY TO  FORCE RENDER
            NAMESPACE[element] = color;
        }

        return (
                <AssistContext.Provider
                value={
                        {
                        isAssistOpen:isAssistOpen,
                        isPrefixesOpen:isPrefixesOpen,
                        isColorsOpen:isColorsOpen,                  
                        isConfigOpen:isConfigOpen,
                        setAssistOpen:setAssistOpen,
                        setPrefixesOpen:setPrefixesOpen,
                        setColorsOpen:setColorsOpen,
                        setConfigOpen:setConfigOpen,
                        handleChange:handleChange
                        }
                }>
                        <Collapse isOpen={context.isAssistantOpen} className='assistCollapse'>
                        <ResizableBox   width={context.width} 
                                        height={100} //Just to avoid console errors, but ignore it
                                        onResize={(e,data)=>context.handleResize(e,data)}
                                        resizeHandles={['e']}  
                                        minConstraints={[470, 100]} maxConstraints={[1000, 1000]}>
                                
                                <div className='containerAssist'>                                    
                                        <AssistNav/>
                                        <AssistContent/>              
                                </div>
                                
                        </ResizableBox>
                        </Collapse>      
                </AssistContext.Provider>);
}


export default Assistant;