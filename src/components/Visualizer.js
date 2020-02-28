import React,{useState} from 'react';
import {Collapse} from 'reactstrap';

function Visualizer (props) {

    const {svg,isVisualizeOpen} = props;

    return (
    <Collapse isOpen={isVisualizeOpen} >
        <div className="visualize"> 
            <div className="umlContainer">   
                <div className='uml' dangerouslySetInnerHTML={{__html:svg}}/> 
            </div>
        </div>
    </Collapse>);

    
}

export default Visualizer;