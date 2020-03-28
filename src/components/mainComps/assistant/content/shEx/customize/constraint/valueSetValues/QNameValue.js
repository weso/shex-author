import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../../App';
import { Collapse } from 'reactstrap';

function QNameValue (props) {
    
    const {type,isOpen} = props;
    const context = useContext(AppContext);
    const [prefix,setPrefix]=useState('example');

    const handlePrefixChange = function(e){
       let newPrefix = e.target.value;
       setPrefix(newPrefix);
    }

    return (<Collapse isOpen={isOpen} className='qnameSetCollapse'>
                    <select className="customSelector" value={prefix} onChange={handlePrefixChange}>
                    <option value="example">example</option>
                        { 
                        context.prefixes.map((pre) =>{
                            if(pre.prefixName!=''){
                                return <option key={pre.id} value={pre.prefixValue}>{pre.prefixName}</option>
                            }                        
                        })
                    }
                    </select>
                    
                    <input  type="text" 
                        className="name"
                        />

                </Collapse>);                          
}



export default QNameValue;
