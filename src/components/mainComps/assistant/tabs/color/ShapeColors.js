import React,{useContext,useState} from 'react';
import {AssistContext} from '../../../Assistant';
import ShapeView from './views/ShapeView';
import TripleView from './views/TripleView';
import ColorComp from './utils/ColorComp';

function ShapeColors (props) {

        const assistContext = useContext(AssistContext);
        const shapePickers = [
        {
            tag:'Labels',
            element:'label'
        },
        {
            tag:'Header',
            element:'header'
        },
        {
            tag:'Custom',
            element:'custom'
        },
        {
            tag:'Custom Fill',
            element:'customFill'
        },
         {
            tag:'Delete',
            element:'delete'
        },
        {
            tag:'Delete Fill',
            element:'deleteFill'
        },
        {
            tag:'Collapse',
            element:'collapse'
        },
       
        {
            tag:'Shape Body',
            element:'body'
        },
        {
            tag:'+Triple',
            element:'addTriple'
        },
        {
            tag:'+Triple Fill',
            element:'addTripleFill'
        }
        
        
        ];

        const asd = [
        {
            tag:'Header',
            element:'custom'
        },
        {
            tag:'Custom',
            element:'custom'
        },
        {
            tag:'Custom Fill',
            element:'customFill'
        },
        {
            tag:'Constraint',
            element:'custom'
        },
        {
            tag:'Constraint Fill',
            element:'customFill'
        },

        {
            tag:'Facet',
            element:'custom'
        },
        {
            tag:'Facet Fill',
            element:'customFill'
        },

        {
            tag:'ShapeRef',
            element:'custom'
        },
        {
            tag:'ShapeRef Fill',
            element:'customFill'
        },

        {
            tag:'Cardinality',
            element:'custom'
        },
        {
            tag:'Cardinality Fill',
            element:'customFill'
        },
         {
            tag:'Delete',
            element:'delete'
        },
        {
            tag:'Delete Fill',
            element:'deleteFill'
        },
        {
            tag:'Collapse',
            element:'collapse'
        },
       
        {
            tag:'Triple Body',
            element:'body'
        },
       
        
        
        ];

        return ( <div className="shape" style={assistContext.styles.header}>
                    <ShapeView/>
                    <TripleView/>
                    <ColorComp customClass='customShape' pickers={shapePickers}/>
                    
                    <ColorComp customClass='customTriple' pickers={asd}/>
                    <div className="triples" style={assistContext.styles.body}>
                        <button className="addTripleButton"
                                style={assistContext.styles.triple} 
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                </div>);
}

export default ShapeColors;
