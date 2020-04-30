import Node from '../node';

import CardinalityFactory from './others/cardinality/cardinalityFactory';
import CardinalitySimple from './others/cardinality/cardinalitySimple';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './others/shapeRef';
import Prefix from './others/prefix';
import {DEFAULTS} from '../../conf/config.js';

class Triple extends Node{

    constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/')),constraint=new Primitive(),shapeRef=new ShapeRef(),facets=[],cardinality=new CardinalitySimple(),triples=[]) {
        super(id,type,constraint,facets,shapeRef,triples);
        this.cardinality = cardinality;
        this.cardFactory = new CardinalityFactory();
    }
      

    setCardinality(cardinality,min,max){
        this.cardinality = this.cardFactory.createCardinality(cardinality,min,max);
    }



    toString(separators){
        let str='';
        let type=this.type;
        let constraint = this.constraint;
        let facets = this.facets;
        let shapeRef = this.shapeRef;
        let cardinality = this.cardinality;
        separators = this.checkPrettyOptions(separators);
        let tripleSeparator = separators.triple; 
        let constSeparator = separators.constraint; 
        let refSeparator = separators.ref;
        let cardSeparator = separators.card;
 
        if(type.value!=''){
            str+= '  '+type+tripleSeparator;
            str+= this.checkFacets();
            if(facets){
                facets.map(f=>{
                    str+=' '+f+' ';
                })
            }
            if(constraint.value=='' && DEFAULTS.pretty!='pretty3' ){
                constSeparator='';
                refSeparator+=' ';
            }
            str+=constSeparator+shapeRef
                +refSeparator+cardinality
                +cardSeparator+';\n';
        }
        return str;

    }

    checkPrettyOptions(separators){

        if(DEFAULTS.pretty=='none'){
            separators.triple=' ';
            separators.constraint=' ';
            separators.ref=' ';
        }
        if(DEFAULTS.pretty=='pretty1'){
            separators.constraint=' ';
            separators.ref=' ';
        }
        if(DEFAULTS.pretty=='pretty2'){
            separators.constraint=' ';
            separators.ref=separators.CRef;
        }
        
        //default pretty3
        return separators;
    }

    /**
    * If none constraint and there are facets don't print the '.'
     */
    checkFacets(){
        if(this.facets.length>0){
             if(this.constraint.getTypeName()!='Primitive' 
                && this.constraint.value!='none'){
                    return this.constraint+' ';
                }
            return '';
        }
        return this.constraint;
    }



}

export default Triple;