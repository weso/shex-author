import React from 'react';
import Codemirror from 'codemirror';
import Editor from '../../entities/editor';

import {addPrefix} from '../../utils/prefixUtils';
import {ALL_PREFIXES} from '../../utils/rdfUtils';

function PrefixSelector (props){

    const handleChange = (e) =>{
       addPrefix(e.target.value);
    }

    return (
        <div>
            <button className='form-control'
                    onClick={handleChange}>
                    Example Prefix
            </button>
            {Object.keys(ALL_PREFIXES).map( (key) =>{
                return( 
                    <div key={key}>
                        <select className='form-control'
                                onChange={handleChange}>
                            <option>{key}</option>
                            { 
                                Object.keys(ALL_PREFIXES[key]).map( (prefix) =>{
                                    return <option key={prefix} value={prefix}>{prefix}</option>
                                })  
                            }
                        </select>
                    </div>)           
            })}
        </div>);
                     
}


export default PrefixSelector;
