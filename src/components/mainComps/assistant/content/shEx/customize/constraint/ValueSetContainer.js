import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import shexUtils from '../../../../../../../utils/shexUtils';
import ValueSetComp from './ValueSetComp';

function ValueSetContainer (props) {
    const {triple,valueSet} = props;
    const context = useContext(AppContext);
    const [values,setValues]=useState(valueSet);

    const deleteValue= function(id){
        const newValues = valueSet.filter(v => v.id != id);
        setValues(newValues);
        triple.constraint.setValues(newValues);
        context.emit(); 
    }

    const addValue = function(){
        const value = shexUtils.addValueSetValue(valueSet);
        setValues([...values,value]);
        triple.constraint.addValue(value);
        context.emit(); 
    }

    return (<div className='customConstraint'>
                <label >ValueSet</label>
                <div className="valueSetsCont">
                    {values.map(v =>{                                        
                            return (<ValueSetComp 
                                    key={v.id}
                                    valueSetValue={v}
                                    deleteValue={deleteValue} 
                                    />)
                    })}
                    
                    <button className="addFacet" title="Add Value" onClick={addValue}>+ Value</button>      
                </div>
            </div>);                          
}



export default ValueSetContainer;
