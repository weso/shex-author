import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from '../AssistTitle';
import Editor from '../../../../entities/editor';
import Prefix from '../../../../entities/shexEntities/shexUtils/prefix';
import {addPrefixComp,deletePrefixComp} from '../../../../utils/prefixUtils';
import PrefixComp from './PrefixComp';

import '../../../../css/shexComponents/headers/PrefixHeader.css';

function Prefixes (props) {

        const context = useContext(AppContext);
        const defaultPrefixes = [
                new Prefix('','http://example.org/',0),
                new Prefix('schema','http://schema.org/',1),
                new Prefix('xsd','http://www.w3.org/2001/XMLSchema#',2)
        ]
        const [prefixes,setPrefixes]=useState(defaultPrefixes);
        const addPrefix = function(){
                setPrefixes([...prefixes,addPrefixComp(prefixes)]);
        }
      
        const deletePrefix = function(prefixId){
                setPrefixes(deletePrefixComp(prefixes,prefixId));
        }

        const emit = function(){
                context.emitPref(prefixes);
        }
      
        return (
                <div>
                        {prefixes.map(prefix =>{
                                return(<PrefixComp key={prefix.id} prefix={prefix} emit={emit} deletePrefix={deletePrefix}/>)
                        })}
                        <div className="addCont">
                        <button className={context.addBtns+" addPrefixBtn"} 
                                onClick={addPrefix}
                                title="Add Prefix">
                                + Prefix
                        </button>
                        </div>   
                </div>
                );
}

export default Prefixes;
