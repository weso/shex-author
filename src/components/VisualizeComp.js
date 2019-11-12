import React,{useContext} from 'react';
import '../App.css';
import {ShapesContext} from '../App';

function VisualizeComp (props) {

    const {svg,colapse} = props;

    return (<div ref={colapse} className="visualize">  
                        <h1>Visualize</h1>
                        <div dangerouslySetInnerHTML={{__html:svg}}/>         
            </div>
            );

    
}

export default VisualizeComp;