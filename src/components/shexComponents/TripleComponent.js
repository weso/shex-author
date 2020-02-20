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



    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple} 
                          customizeTriple={customizeTriple}
                          colapseBtn={colapseBtn}
                          collapseConstraints={collapseConstraints}/>

            <CustomTriple triple={triple} isTripleCustomOpen={isTripleCustomOpen}/>

            <Collapse isOpen={isConstraintsOpen} >
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

