import React,{useState,useContext} from 'react';

import {ShapesContext} from '../../App';
import { Collapse } from 'reactstrap';

import ConstraintHeader from './headers/ConstraintHeader';
import CustomConstraint from './customize/CustomConstraint';


const primitives = ['String','Integer','Date','Boolean'];

function ConstraintComponent (props) {
    
    const context = useContext(ShapesContext);
    const {triple} = props;
    const [isCustomOpen,setCustomOpen] = useState(false);
  

    const customizeConstraint = function(){
        setCustomOpen(!isCustomOpen);
    }

    return (   

        <CustomConstraint triple={triple} isCustomOpen={isCustomOpen}/>

        );
                                   

}


export default ConstraintComponent;

