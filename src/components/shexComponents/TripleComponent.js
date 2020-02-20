import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../App';

import TripleHeader from './headers/TripleHeader';
import CustomTriple from './customize/CustomTriple';
import ConstraintComponent from './ConstraintComponent';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu_open');
    const [rounded,setRounded] = useState('roundme');

    const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
        setConstraintsOpen(false);
        setColapseBtn('menu');
    }

    const collapseConstraints = function(){
        setTripleCustomOpen(false);
        setConstraintsOpen(!isConstraintsOpen);

        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
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
                          colapseBtn={colapseBtn}
                          collapseConstraints={collapseConstraints}
                          rounded={rounded}/>

            <CustomTriple triple={triple} 
                          isTripleCustomOpen={isTripleCustomOpen}
                          rounder={rounder}/>

            <Collapse   isOpen={isConstraintsOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <div className="constraints">
                    <ConstraintComponent triple={triple}/>
                </div>                    
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

