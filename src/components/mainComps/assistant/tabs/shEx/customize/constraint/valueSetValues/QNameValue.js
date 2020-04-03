import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../../App';
import { Collapse } from 'reactstrap';
import {getPrefix} from '../../../../../../../../utils/prefixUtils';

function QNameValue (props) {
    
    const {type,isOpen} = props;
    const context = useContext(AppContext);

    let initialPrefix = 'example';
    if(type.prefix!=undefined){
        initialPrefix = type.prefix.prefixValue;
    }
    const [prefix,setPrefix]=useState(initialPrefix);
    const [name,setName]=useState(type.value);


    const handlePrefixChange = function(e){
        let prefixName = e.target.value;
        let newPrefix = getPrefix(prefixName);
        console.log(prefix)
        type.setPrefix(newPrefix);
        context.emit();
        setPrefix(prefixName);
    }

    const handleNameChange = function(e){
        let newName = e.target.value;
        setName(newName);
        type.setValue(newName);
        context.emit();
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
                        value={name}
                        onChange={handleNameChange}
                        />

                </Collapse>);                          
}



export default QNameValue;
