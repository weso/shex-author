import React,{useContext,useState} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from '../mainComps/assistant/AssistTitle';
import '../../css/shexComponents/headers/PrefixHeader.css';

function PrefixComp (props) {

        const context = useContext(AppContext);
        let open = '<';
        let close = '>';
        return (
                <div>
                    <div className='prefixHeader'>            
                        <input  type="text" 
                                className="name"
                                placeholder="eg: schema"
                                title="Alias"/>
                        <label  className={context.shapeLabel+" shapeNameLabel"}>:</label>
                        <label  className={context.shapeLabel+" shapeNameLabel"}>{open}</label>
                        <input  type="text" 
                                className="name"
                                placeholder="eg: http://schema.org/"
                                title="IRI"/>
                        <label  className={context.shapeLabel+" shapeNameLabel"}>{close}</label>
                        <button className="deletePrefix mdc-icon-button material-icons" 
                                title="Delete Prefix">
                                delete
                        </button>
                    </div>
                     <div className="addCont">
                    <button className={context.addBtns+" addShapeButton"} 
                            onClick={context.addShape}
                            title="Add Shape">
                            + Prefix
                    </button>
                </div>
                </div>
);
}

export default PrefixComp;
