import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import {activeTab} from '../../../utils/cssUtils';

function AssistTitle (props) {

    const context = useContext(AppContext);

    const handleAssist = function(evt){
        context.setPrefixesOpen(false);
        activeTab(evt);
    }

    const handlePrefixes = function(evt){
        context.setPrefixesOpen(true);
        activeTab(evt);
    }

    
   
    return (<div className="tabs">
                <button className="tablink activeTab" 
                        title="ShEx Assistant Tab" 
                        onClick={(e)=>handleAssist(e)}>
                        ShEx Assistant
                </button>
                <button className="tablink" 
                        title="Prefixes Tab" 
                        onClick={(e)=>handlePrefixes(e)}>
                        Prefixes
                </button>
                <div className="asisTitleClose">
                    <button className="closeAsisBtn" 
                            title="Close Assistant" 
                            onClick={context.assistantTshapesToggleoggle}>x</button>
                </div>
            </div>);
}


export default AssistTitle;

