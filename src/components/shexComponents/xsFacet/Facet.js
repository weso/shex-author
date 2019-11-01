
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';


function Facet (props) {

    const context = useContext(ShapesContext);
 
    return (<select className="col form-control valueInlineShape">
                    <option value='shape'></option>
                    <option value='iriKind'>IRI</option>
                    <option value="literal">Literal</option>
                    <option value="nonLiteral">NonLiteral</option>
                    <option value="bnodeKind">BNODE</option>
                </select>

    );
    
}

export default Facet;

