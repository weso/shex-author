import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';


const primitives = ['String','Integer','Date','Boolean'];

function ConstraintHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,customizeConstraint} = props;

 
   
    return (
       <div className={context.constraintClass+" constraintHeader"}>

        </div>
    );
                                   
    
}


export default ConstraintHeader;

