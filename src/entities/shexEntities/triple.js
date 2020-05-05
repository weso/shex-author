import Node from './node';

import CardinalityFactory from './others/cardinality/cardinalityFactory';
import CardinalitySimple from './others/cardinality/cardinalitySimple';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './others/shapeRef';
import Prefix from './others/prefix';
import {DEFAULTS} from '../../conf/config.js';

class Triple extends Node{

    constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/')),constraint=new Primitive(),facets=[],shapeRef=new ShapeRef(),cardinality=new CardinalitySimple(),triples=[]) {
        super(id,type,constraint,facets,shapeRef,triples);
        this.cardinality = cardinality;
        this.cardFactory = new CardinalityFactory();
    }
      

    setCardinality(cardinality,min,max){
        this.cardinality = this.cardFactory.createCardinality(cardinality,min,max);
    }


    subString(){
        let str = ''+this.type+' '+this.checkConstraint()+' '+this.facets+' '+this.shapeRef+' '+this.cardinality+"";
        if(this.triples.length>0){
                str+=' {';
                this.triples.forEach(subTriple => {
                    str+=subTriple.subString();
                });
                str+='}';
            }

        str+=';';
        return str;
    }


    toString(separators){
        let str='';
        let type=this.type;
        let constraint = this.constraint;
        let facets = this.facets;
        let shapeRef = this.shapeRef;
        let cardinality = this.cardinality;
        separators = this.checkPrettyOptions(separators);
        let tripleSeparator = separators.type; 
        let bodySeparator = separators.body;
        let cardSeparator = separators.card;
 
        if(type.value!=''){
            str+= '  '+type+tripleSeparator;
            str+= this.checkConstraint();
            if(facets){
                facets.map(f=>{
                    str+=' '+f+' ';
                })
            }

            str+=shapeRef+bodySeparator;
    
            if(this.triples.length>0){
                str+=' {';
                this.triples.forEach(subTriple => {
                    str+=subTriple.subString();
                });
                str+='} ';
            }

            str+=cardinality+cardSeparator+';\n';

        }

        return str;

    }




    checkPrettyOptions(separators){

        if(DEFAULTS.pretty=='none'){
            separators.type=' ';
            separators.body=' ';
        }
        if(DEFAULTS.pretty=='pretty1'){
            separators.body=' ';
        }
        //default pretty2
        return separators;
    }

    checkConstraint(){
    
        // If there is no constraint
        if(this.constraint.getTypeName()=='primitive' 
                && this.constraint.value=='none'){
        
            // If there are facets don't print the '.'
            if(this.facets.length>0)return '';
            // If there is a shapeRef don't print the '.'
            if(this.shapeRef.shape != null) return '';    
            // If there is a inline shape don't print the '.'
            if(this.triples.length>0)return '';
        
        }


        return this.constraint+' ';
    }


    getEntityName(){
      return 'Triple';
    }


}

export default Triple;