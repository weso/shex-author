import React,{useContext,useState} from 'react';

function VisualizeComp (props) {

    const {svg} = props;

    return (<div className="visualize"> 
                <div className="umlContainer">   
                    <div className='uml' dangerouslySetInnerHTML={{__html:svg}}/> 
                </div>
            </div>
            );

    
}

export default VisualizeComp;