import React from 'react';
import Codemirror from 'codemirror';
import Editor from '../../entities/editor';

import {addPrefix} from '../../utils/prefixUtils';

function PrefixSelector (props){

    const {namespaces} = props;

    const handleChange = (e) =>{
       addPrefix(e.target.value,namespaces);
    }

    return (
        <div>
            <button className='form-control'
                    onClick={handleChange}>
                    Example Prefix
            </button>
            {Object.keys(namespaces).map( (key) =>{
                return( 
                    <div key={key}>
                        <select className='form-control'
                                onChange={handleChange}>
                            <option>{key}</option>
                            { 
                                Object.keys(namespaces[key]).map( (prefix) =>{
                                    return <option key={prefix} value={prefix}>{prefix}</option>
                                })  
                            }
                        </select>
                    </div>)           
            })}
        </div>);
                     
}


export default PrefixSelector;
