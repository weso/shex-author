import React,{useContext,useState} from 'react';

function VisualizeComp (props) {

    const {svg} = props;

    return (<div className="visualize">  
               
                <div className='row bottom'>
                    <div className='col'/>
                    <div className='col' dangerouslySetInnerHTML={{__html:svg}}/> 
                    <div className='col'/>        
                 </div>
            </div>
            );

    
}

export default VisualizeComp;