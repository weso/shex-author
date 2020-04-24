import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComp from './customize/ConstraintComp';
import ShapeRefComp from './customize/ShapeRefComp';
import FacetContainer from './customize/FacetContainer';
import CardinalityComp from './customize/CardinalityComp';
import Properties from '../../../../../conf/properties';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleOpen,setTripleOpen] = useState(false);
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [isRefOpen,setRefOpen] = useState(false);
    const [isFacetOpen,setFacetOpen] = useState(false);
    const [isCardinalityOpen,setCardinalityOpen] = useState(false);
    const [allCollased,setAllCollapsed] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu');

    const tripleStyles = Properties.getInstance().getTripleStyle();
    const constStyles = Properties.getInstance().getConstraintStyle();
    const facetStyles = Properties.getInstance().getFacetStyle();
    const refStyles = Properties.getInstance().getShapeRefStyle();
    const cardStyles = Properties.getInstance().getCardinalityStyle();

    const customize  = function(){
        setTripleOpen(!isTripleOpen);
    }

    const customizeTriple = function(){
        collapseAll(false);
        setTripleCustomOpen(!isTripleCustomOpen);
        setAllCollapsed(false);

        if(allCollased){
            setTripleCustomOpen(true);
            changeCollapseBtn();
        }

    }

    const customizeContraints = function(){
        collapseAll(false);
        setConstraintsOpen(!isConstraintsOpen);
        setAllCollapsed(false);

        if(allCollased){
            setConstraintsOpen(true);
            changeCollapseBtn();
        }
    }

    const customizeRef = function(){
        collapseAll(false);
        setRefOpen(!isRefOpen);
        setAllCollapsed(false);

        if(allCollased){
            setRefOpen(true);
            changeCollapseBtn();
        }  
    }

      const customizeFacet = function(){
        collapseAll(false);
        setFacetOpen(!isFacetOpen);
        setAllCollapsed(false);

        if(allCollased){
            setFacetOpen(true);
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


    const collapseAll = function(collapse){
        setTripleCustomOpen(collapse);
        setConstraintsOpen(collapse);
        setRefOpen(collapse);
        setFacetOpen(collapse);
        setCardinalityOpen(collapse);
    }

    const collapseToggle = function(){
        collapseAll(!allCollased);
        setAllCollapsed(!allCollased);
        changeCollapseBtn();
    }

    const changeCollapseBtn = function(){
        if(colapseBtn=='menu'){
            setColapseBtn('-------------');
        }else{
            setColapseBtn('menu');
        }
    }

    

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple}
                          customize={customize}
                          collapseToggle={collapseToggle}
                          colapseBtn={colapseBtn}/>

            <Collapse   isOpen={isTripleOpen}> 

                <div className='zone'style={tripleStyles.body}> 
                    <button className='type-zone btnZone'
                            onClick={customizeTriple}>Triple </button>
                </div>             

                <CustomComp  entity={triple} 
                            isCustomOpen={isTripleCustomOpen}
                            qualifier={false}
                            bnode={false}
                            customClass="customTriple"/>

                <div className='zone' style={constStyles.body}>
                    <button className='constraint-zone btnZone'
                            onClick={customizeContraints}>Constraint </button>  
                </div>

                <Collapse   isOpen={isConstraintsOpen}>
                    <ConstraintComp  triple={triple} />           
                </Collapse> 
                
                <div className='zone' style={facetStyles.body}>
                    <button className='facet-zone btnZone'
                    onClick={customizeFacet}>Facet </button>  
                </div>

                <Collapse   isOpen={isFacetOpen}>
                    <FacetContainer triple={triple}/> 
                </Collapse> 

                <div className='zone' style={refStyles.body}>
                    <button className='ref-zone btnZone'
                            onClick={customizeRef}>Shape Reference </button>  
                </div>
                <Collapse  isOpen={isRefOpen}>
                    <ShapeRefComp triple={triple}/>      
                </Collapse> 

                <div className='zone' style={cardStyles.body}>
                    <button className='cardinality-zone btnZone'
                            onClick={customizeCardinality}>Cardinality </button>  
                </div>
                <Collapse  isOpen={isCardinalityOpen}>
                    <CardinalityComp triple={triple}/>      
                </Collapse>

            </Collapse>  
           
        </div>);                          
}


export default TripleComponent;

