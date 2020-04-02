import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import {AssistContext} from '../Assistant';
import {activeTab} from '../../../utils/cssUtils';

function AssistTitle (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);

    const handleShapes = function(evt){
        asssistContext.setShapesOpen(true);
        asssistContext.setPrefixesOpen(false);
        asssistContext.setConfigOpen(false);
        activeTab(evt);
    }

    const handlePrefixes = function(evt){
        asssistContext.setShapesOpen(false);
        asssistContext.setPrefixesOpen(true);
        asssistContext.setConfigOpen(false);
        activeTab(evt);
    }

    const handleConfig = function(evt){
        asssistContext.setShapesOpen(false);
        asssistContext.setPrefixesOpen(false);
        asssistContext.setConfigOpen(true);
        activeTab(evt);
    }

    
   
    return (<div className="tabs">
                <button className="tablink activeTab" 
                        title="ShEx Assistant Tab" 
                        onClick={(e)=>handleShapes(e)}>
                        ShEx Assistant
                </button>
                <button className="tablink" 
                        title="Prefixes Tab" 
                        onClick={(e)=>handlePrefixes(e)}>
                        Prefixes 
                </button>
                <button className="tablink material-icons" 
                        title="Colors Tab" 
                        onClick={(e)=>handleConfig(e)}>
                        format_paint
                </button>
       
                <div className="asisTitleClose">
                    <button className="closeAsisBtn" 
                            title="Close Assistant" 
                            onClick={context.assistantToggle}>x</button>
                </div>
            </div>);
}


export default AssistTitle;

