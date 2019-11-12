import React,{useContext,useState} from 'react';

function VisualizeComp (props) {

    const {svg} = props;

    return (<div className="visualize">  
                <h1>Visualize</h1>
                <div dangerouslySetInnerHTML={{__html:svg}}/>         
            </div>
            );

    
}

export default VisualizeComp;