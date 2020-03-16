import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from '../mainComps/assistant/AssistTitle';
import Editor from '../../entities/editor';
import Prefix from '../../entities/shexEntities/shexUtils/prefix';

import '../../css/shexComponents/headers/PrefixHeader.css';

function PrefixComp (props) {

        const context = useContext(AppContext);
        
        let open = '<';
        let close = '>';
        const defaultPrefixes = [
                new Prefix('','http://example.org/'),
                new Prefix('schema','http://schema.org/'),
                new Prefix('xsd','http://www.w3.org/2001/XMLSchema#')
        ]
        const [prefixes,setPrefixes]=useState(defaultPrefixes);

        const addPrefix = function(){
                setPrefixes([...prefixes,new Prefix('','')]);
        }
      
        useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
       // prefixes.push()
                
        });
      
        return (
                <div>
                {prefixes.map(prefix =>{
                        return(<div  key={prefix.prefixName} className='prefixHeader'>            
                                        <input  type="text" 
                                                className="name"
                                                placeholder="eg: schema"
                                                value={prefix.prefixName}
                                                title="Alias"/>
                                        <label  className={context.shapeLabel+" prefixLabel"}>:</label>
                                        <label  className={context.shapeLabel+" prefixLabel"}>{open}</label>
                                        <input  type="text" 
                                                className="name"
                                                value={prefix.prefixValue}
                                                placeholder="eg: http://schema.org/"
                                                title="IRI"/>
                                        <label  className={context.shapeLabel+" prefixLabel"}>{close}</label>
                                        <button className="deletePrefix mdc-icon-button material-icons" 
                                                title="Delete Prefix">
                                                delete
                                        </button>                              
                                </div>)
                })}
                        <div className="addCont">
                        <button className={context.addBtns+" addPrefix"} 
                                onClick={addPrefix}
                                title="Add Prefix">
                                + Prefix
                        </button>
                        </div>   
                </div>
);
}

export default PrefixComp;
