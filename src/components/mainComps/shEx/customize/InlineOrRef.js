import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';



function InlineOrRef (props) {
    
        const {triple} = props;
        const context = useContext(AppContext);
        const [cardinality,setCardinality] = useState(triple.cardinality);
     
        return ( 
                <div className="inline">
                        <label className='gridLabel'>InlineOrRef</label>
                        <select className="customSelector" 
                                value={cardinality}                                
                                title="Cardinality">
                                <option value="">Exactly one</option>
                                <option value="*">Zero or more</option>
                                <option value="+">One at least</option>
                                <option value="?">One or none</option>
                                <option value="exactly">Exactly value</option>
                                <option value="minLimit">Inferior Limit</option>
                                <option value="range">Range</option>
                        </select> 
                </div>);                          
}



export default InlineOrRef;

