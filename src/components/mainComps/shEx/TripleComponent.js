import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../../App';

import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComponent from './ConstraintComponent';


function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [rounded,setRounded] = useState('roundme');

    const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
        setConstraintsOpen(false);
    }

    const collapseConstraints = function(){
        setTripleCustomOpen(false);
        setConstraintsOpen(!isConstraintsOpen);
    }

    const forceCollapse = function(collapse){
        setTripleCustomOpen(false);
        setConstraintsOpen(collapse);
    }

    const rounder =()=>{
         if(rounded=='roundme'){
            setRounded('un-roundme');
        }else{
            setRounded('roundme');
        }

    }

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple} 
                          customizeTriple={customizeTriple}
                          collapseConstraints={collapseConstraints}
                          forceCollapse={forceCollapse}
                          rounded={rounded}/>

            <CustomComp   entity={triple} 
                          isCustomOpen={isTripleCustomOpen}
                          rounder={rounder}
                          qualifier={false}
                          bnode={false}
                          customClass="customTriple"/>

            <Collapse   isOpen={isConstraintsOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <ConstraintComponent triple={triple} collapseConstraints={collapseConstraints}/>
                            
            </Collapse> 
           
        </div>);                          
}

/*
<Collapse isOpen={isConstraintsOpen} >
                <div className="constraints">
                    <ConstraintComponent triple={triple}/>
                    <button className="addTripleButton">+ Constraint</button>        
                </div>                    
            </Collapse> 
*/

export default TripleComponent;

