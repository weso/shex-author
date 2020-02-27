import React from 'react';

function AssistTitle (props) {

    return (<div className="assisTitle">
                <div className="title">ShEx Assistant</div>
                <div className="asisTitleClose">
                    <button className="closeAsisBtn" title="Close Assistant" onClick={assistantToggle}>x</button>
                </div>
            </div>);
}


export default AssistTitle;

