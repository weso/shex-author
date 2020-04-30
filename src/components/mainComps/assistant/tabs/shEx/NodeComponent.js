import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComp from './customize/ConstraintComp';
import ShapeRefComp from './customize/ShapeRefComp';
import FacetContainer from './customize/FacetContainer';
import CardinalityComp from './customize/CardinalityComp';
import Properties from '../../../../../conf/properties';

function NodeComponent (props) {
    
    const {entity,isCustomOpen} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(true);
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
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

    

    return ( 
            <Collapse  isOpen={isCustomOpen}> 

                <div className='zone' style={tripleStyles.body}>
                    <button className='btnZone'style={tripleStyles.body}
                    onClick={customizeTriple}>Triple</button>
                   <button className='btnZone'style={constStyles.body}
                    onClick={customizeContraints}>Constraint</button>
                    <button className='btnZone'style={facetStyles.body}
                    onClick={customizeFacet}>Facet</button>
                    <button className='btnZone'style={refStyles.body}
                    onClick={customizeRef}>ShapeReference</button>
                    <button className='btnZone'style={cardStyles.body}
                    onClick={customizeCardinality}>Cardinality</button>

                    <button className="collapseBtn-triple mdc-icon-button material-icons" 
                    style={tripleStyles.collapse}
                    onClick={collapseToggle}
                    title="ShowAll">
                    {colapseBtn}
                    </button>
                </div> 

                <CustomComp  entity={entity} 
                        isCustomOpen={isTripleCustomOpen}
                        bnode={false}
                        customClass="customTriple"/>

                <Collapse   isOpen={isConstraintsOpen}>
                    <ConstraintComp  entity={entity} />           
                </Collapse> 

                <Collapse   isOpen={isFacetOpen}>
                    <FacetContainer entity={entity}/> 
                </Collapse> 

                <Collapse  isOpen={isRefOpen}>
                    <ShapeRefComp entity={entity}/>      
                </Collapse> 
     

            </Collapse>  );                          
}


export default NodeComponent;
