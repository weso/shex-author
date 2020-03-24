import React,{useContext} from 'react';
import {AppContext} from '../../../App';

function AssistTitle (props) {

    const context = useContext(AppContext);

    return (<div className="tabs">
                <button className="tablink" title="ShEx Assistant" onClick={()=>context.setPrefixesOpen(false)}>ShEx Assistant</button>
                <button className="tablink" title="Prefixes" onClick={()=>context.setPrefixesOpen(true)}>Prefixes</button>
                <div className="asisTitleClose">
                    <button className="closeAsisBtn" title="Close Assistant" onClick={context.assistantTshapesToggleoggle}>x</button>
                </div>
            </div>);
}


export default AssistTitle;

