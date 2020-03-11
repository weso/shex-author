import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComponent from './ConstraintComponent';
import Cardinality from './customize/Cardinality';


function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [isCardinalityOpen,setCardinalityOpen] = useState(false);
    const [rounded,setRounded] = useState('roundme');

    const customizeTriple = function(){
        setConstraintsOpen(false);
        setCardinalityOpen(false);
        setTripleCustomOpen(!isTripleCustomOpen);
    }

    const collapseConstraints = function(){
        setTripleCustomOpen(false);
        setCardinalityOpen(false);
        setConstraintsOpen(!isConstraintsOpen);
    }

    const customizeCardinality = function(){
        setConstraintsOpen(false);
        setTripleCustomOpen(false);
        setCardinalityOpen(!isCardinalityOpen);
        
    }

    const forceCollapse = function(collapse){
        setTripleCustomOpen(false);
        setCardinalityOpen(false);
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
                          customizeCardinality={customizeCardinality}
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

            <Collapse   isOpen={isCardinalityOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <Cardinality triple={triple}/>
                            
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

