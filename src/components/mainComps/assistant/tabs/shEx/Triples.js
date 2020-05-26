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
    const {entity,isSlotOpen,isOtherOpen,customize2,isTriplesOpen,disabled,body,addClass,header,container,styles} = props;
    const otherStyles = Properties.getInstance().getOtherStyle();

    const [triples,setTriples] = useState(entity.triples);

   
    const [extras,setExtras] = useState(entity.extraProperties?.values);
    

    const addTriple = function(){
        const id = entity.triplesCount;
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        entity.addTriple(triple);
        //A ShapeRef cannot coexist with a inlineShape
        //entity.shapeRef.entity = null;
        context.emit();       
    }

    const deleteTriple = function(tripleId){
        const newTriples = entity.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        entity.triples = newTriples;
        context.emit();
        
    }




    return (

                    <Collapse  isOpen={isSlotOpen} >
                        <div className="tripleSlot">
                            <div className={body}>
                                <div className={header}>
                                    <label>ShapeAtom</label>
                                    <button className="slotBtn tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                                            onClick={customize2}
                                            style={styles.custom}
                                            title="Customize Triple Constraint">
                                            settings
                                    </button>

                                </div>
                                {triples[0]?.triples.map(triple =>
                                
                                    <TripleComponent key={triple.id}
                                                    triple={triple}
                                                    deleteTriple={deleteTriple}
                                                    styles={styles}/> 
                                )}
                            
                                <button className={addClass}
                                        style={styles.addTriple} 
                                        onClick={addTriple} 
                                        disabled={disabled}
                                        title="Add Triple">
                                        + Triple Constraint
                                </button>   
                             </div>     
                        </div>
                    </Collapse> 
             
    );
                                   
    
}


export default Triples;
