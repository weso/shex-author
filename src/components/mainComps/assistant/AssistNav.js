import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import {AssistContext} from '../Assistant';
import {activeTab} from '../../../utils/cssUtils';

function AssistTitle (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);

    const handleShapes = function(evt){
        closeAll();
        asssistContext.setAssistOpen(true);
        activeTab(evt);
    }

    const handlePrefixes = function(evt){
        closeAll();
        asssistContext.setPrefixesOpen(true);
        activeTab(evt);
    }

    const handleColors = function(evt){
        closeAll();
        asssistContext.setColorsOpen(true);
        activeTab(evt);
    }

    const handleConfig = function(evt){
        closeAll();
        asssistContext.setConfigOpen(true);
        activeTab(evt);
    }

    const closeAll = function(){
        asssistContext.setAssistOpen(false);
        asssistContext.setPrefixesOpen(false);
        asssistContext.setColorsOpen(false);
        asssistContext.setConfigOpen(false);
    }

    
   
    return (<div className="xs-tabs">
                <button className="tablink activeTab" 
                        title="ShEx Assistant" 
                        onClick={(e)=>handleShapes(e)}>
                        ShEx Assistant
                </button>
                <button className="tablink prefixTab" 
                        title="Prefixes" 
                        onClick={(e)=>handlePrefixes(e)}>
                        Prefixes 
                </button>
                <button className="tablink material-icons" 
                        title="Colors" 
                        onClick={(e)=>handleColors(e)}>
                        format_paint
                </button>

                <button className="tablink material-icons" 
                        title="Config" 
                        onClick={(e)=>handleConfig(e)}>
                        settings
                </button>
       
                <div className="asisTitleClose">
                    <button className="closeAsisBtn" 
                            title="Close Assistant" 
                            onClick={context.assistantToggle}>x</button>
                </div>
                
            </div>);
}


export default AssistTitle;

