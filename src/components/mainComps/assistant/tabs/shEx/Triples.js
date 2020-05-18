import React,{useContext,useState} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import ShapeHeader from  './headers/ShapeHeader';
import CustomComp from './customize/CustomComp';
import TripleComponent from './TripleComponent';
import Triple from '../../../../../entities/shexEntities/triple';
import Properties from '../../../../../conf/properties';


import OtherContainer from './customize/OtherContainer';

export const ShapeContext = React.createContext();

function Triples (props) {

    const context = useContext(AppContext);
    const {shape,isTriplesOpen} = props;
    const styles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    
    const [triples,setTriples] = useState(shape.triples);

    let initialDisabled = false;
    if(shape.type.value == '')initialDisabled = true;
    const [disabled,setDisabled] = useState(initialDisabled);

    const [isSlotOpen,setSlotOpen] = useState(true);
    const [isOtherOpen,setOtherOpen] = useState(false);
    const [extras,setExtras] = useState(shape.extraProperties.values);
    const otherStyles = Properties.getInstance().getOtherStyle();

    const addTriple = function(){
        const id = shape.triplesCount;
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        shape.addTriple(triple);
        //A ShapeRef cannot coexist with a inlineShape
        shape.shapeRef.shape = null;
        context.emit();       
    }

    const deleteTriple = function(tripleId){
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        shape.triples = newTriples;
        context.emit();
        
    }

    const customize = function(){
        setSlotOpen(!isSlotOpen);
        setOtherOpen(!isOtherOpen);

    }



    return (<Collapse  isOpen={isTriplesOpen}>
                <div className="triples" style={styles.body}>
                    <div className="slotHeader">
                        <label>Triples</label>
                        <button className=" aux tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                                onClick={customize}
                                style={styles.custom}
                                title="Customize Triple Constraint">
                                settings
                        </button>

                    </div>

                    <Collapse  isOpen={isOtherOpen}>
                        <OtherContainer  entity={shape} extras={extras} setExtras={setExtras} />           
                    </Collapse> 

                    <Collapse  isOpen={isSlotOpen}>
                        <div className="tripleSlot">
                            {triples.map(triple =>
                                <TripleComponent key={triple.id}
                                                triple={triple}
                                                deleteTriple={deleteTriple}
                                                styles={tripleStyles}/> 
                            )}
                        
                            <button className="xs-addTripleButton"
                                    style={styles.addTriple} 
                                    onClick={addTriple} 
                                    disabled={disabled}
                                    title="Add Triple">
                                    + Triple Constraint
                            </button>        
                        </div>
                    </Collapse> 
                </div>
                        
        </Collapse> 
    );
                                   
    
}


export default Triples;
