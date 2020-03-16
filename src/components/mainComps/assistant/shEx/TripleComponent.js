import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComponent from './ConstraintComponent';
import ShapeRefComp from './customize/ShapeRefComp';
import Cardinality from './customize/Cardinality';


function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [isCardinalityOpen,setCardinalityOpen] = useState(false);
    const [isInlineOpen,setInlineOpen] = useState(false);
    const [allCollased,setAllCollapsed] = useState(false);
    const [rounded,setRounded] = useState('roundme');
    const [colapseBtn,setColapseBtn] = useState('menu');

    const customizeTriple = function(){
        collapseAll(false);
        setTripleCustomOpen(!isTripleCustomOpen);
        setAllCollapsed(false);

        if(allCollased){
            setTripleCustomOpen(true);
            changeCollapseBtn();
        }
    }

    const collapseConstraints = function(){
        collapseAll(false);
        setConstraintsOpen(!isConstraintsOpen);
        setAllCollapsed(false);

        if(allCollased){
            setConstraintsOpen(true);
            changeCollapseBtn();
        }
    }

    const customizeInline = function(){
        collapseAll(false);
        setInlineOpen(!isInlineOpen);
        setAllCollapsed(false);

        if(allCollased){
            setInlineOpen(true);
            changeCollapseBtn();
        }  
    }

    const customizeCardinality = function(){
        collapseAll(false);
        setCardinalityOpen(!isCardinalityOpen);
        setAllCollapsed(false);

        if(allCollased){
            setCardinalityOpen(true);
            changeCollapseBtn();
        } 
        
    }

    const forceCollapse = function(collapse){
       // collapseAll();
        setConstraintsOpen(collapse);
    }

    const collapseAll = function(collapse){
        setTripleCustomOpen(collapse);
        setConstraintsOpen(collapse);
        setCardinalityOpen(collapse);
        setInlineOpen(collapse);
    }

    const collapseToggle = function(){
        collapseAll(!allCollased);
        setAllCollapsed(!allCollased);
        changeCollapseBtn();
    }

    const changeCollapseBtn = function(){
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
                          collapseConstraints={collapseConstraints}
                          customizeInline={customizeInline}
                          customizeCardinality={customizeCardinality}
                          forceCollapse={forceCollapse}
                          collapseToggle={collapseToggle}
                          colapseBtn={colapseBtn}
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

                <ConstraintComponent triple={triple}/>
                            
            </Collapse> 

             <Collapse  isOpen={isInlineOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <ShapeRefComp triple={triple}/>
                            
            </Collapse> 

            <Collapse   isOpen={isCardinalityOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <Cardinality triple={triple}/>
                            
            </Collapse> 

           
           
        </div>);                          
}


export default TripleComponent;

