import React,{useContext} from 'react';
import {AppContext} from '../../../App';

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

    const activeTab = function(evt){
        let i;
        let tablinks;

        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" activeTab", "");
        }
        evt.currentTarget.className += " activeTab";
    }
   
    return (<div className="tabs">
                <button className="tablink activeTab" 
                        title="ShEx Assistant" 
                        onClick={(e)=>handleAssist(e)}>
                        ShEx Assistant
                </button>
                <button className="tablink" 
                        title="Prefixes" 
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

