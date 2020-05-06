import Node from './node';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import BlankKind from './types/concreteTypes/kinds/blankKind';
import Prefix from './others/prefix';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './others/shapeRef';
import {getLongestElements,getSeparators} from '../../utils/printUtils';

class Shape extends Node{

  constructor(id,type=new PrefixedIri(new Prefix('','http:/example.org/')),constraint=new Primitive(),facets=[],shapeRef=new ShapeRef(),triples=[]) {
      super(id,type,constraint,facets,shapeRef,triples);
    }

 
    toString(){
      let str='\n';
      if(this.type.value!=''){
        str+=this.type;
        if(this.checkContent()){
          str+=' {\n';
          str+= this.getTriplesString();
          str+="}\n\n"
        }
      }
      return str
     }


     getTriplesString(){
        return this.triples.reduce((acc,t) => {
          return acc+=t.toString(getSeparators(t,getLongestElements(this.triples)));
        },'');
     }


     //Checks if there is any triple with content
     checkContent(){
       let isContent = false;
       this.triples.forEach(triple => {
          if(triple.type.value!=''){
            isContent = true;
          }
        });
        return isContent;
     }



    getEntityName(){
      return 'Shape';
    }


  }

export default Shape;