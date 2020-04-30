import Node from './node';

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


    subString(){
        return ''+this.type+' '+this.constraint+' '+this.facets+' '+this.shapeRef+' '+this.cardinality+";";
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
            str+= this.checkConstraint();
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
                +cardSeparator;
       

            if(this.triples.length>0){
                str+=' {';
                this.triples.forEach(subTriple => {
                    str+=subTriple.subString();
                });
                str+='}';
            }

            str+=';\n';

        }

        return str;

    }


    getLongestElement(element){
      let size=0;
      this.triples.forEach(triple => {
          let value = triple[element].toString().length;
          if(value>size)size = value;
      });
      return size;
    }

    /**
    * Get the longest Constraint+ShapeRef
    * */
    getLongestCR(){
      let size=0;
      this.triples.forEach(triple => {
          let cValue = triple.constraint.toString().length;
          let rValue = triple.shapeRef.toString().length;
          let value = cValue+rValue;
          if(value>size)size = value;
      });
      return size;
    }




    getSeparators(tripleSize,constraintSize,refSize,cardSize,CRefSize){
      return{
        triple:this.getSeparator(tripleSize),
        constraint:this.getSeparator(constraintSize),
        ref:this.getSeparator(refSize),
        card:this.getSeparator(cardSize),
        CRef:this.getSeparator(CRefSize),
      }
    }

    getSeparator(size){
      let space = ' ';
      let separator = ' ';
      for(let i=0;i<size;i++){
        separator+=space;
      }
      return separator;
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