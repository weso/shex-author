import React,{useContext,useState} from 'react';

function VisualizeComp (props) {

    const {svg} = props;

    return (<div className="globalContainer visu">  
                <div className='row visualize'>
                    <div className='col'/>
                    <div className='col' dangerouslySetInnerHTML={{__html:svg}}/> 
                    <div className='col'/>        
                 </div>
            </div>
            );

    
}

export default VisualizeComp;