import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../../../App';
import PrefixComp from './PrefixComp';

import '../../../../css/shexComponents/headers/PrefixHeader.css';

function Prefixes (props) {

        const context = useContext(AppContext);
        return (
                <div>
                        {context.prefixes.map(prefix =>{
                                return(<PrefixComp key={prefix.id} prefix={prefix}/>)
                        })}
                        <div className="addCont">
                        <button className={context.addBtns+" addPrefixBtn"} 
                                onClick={context.addPrefix}
                                title="Add Prefix">
                                + Prefix
                        </button>
                        </div>   
                </div>
                );
}

export default Prefixes;
