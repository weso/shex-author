import Node from './node';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import BlankKind from './types/concreteTypes/kinds/blankKind';
import Prefix from './others/prefix';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './others/shapeRef';
import {getLongestElements,getSeparators} from '../../utils/printUtils';
import ValueSet from './types/concreteTypes/valueSet';

class Shape extends Node{

  constructor(id,type=new PrefixedIri(new Prefix('','http:/example.org/')),constraint=new Primitive(),facets=[],shapeRef=new ShapeRef(),triples=[],extraProperties=new ValueSet(),isClosed) {
      super(id,type,constraint,facets,shapeRef,triples,extraProperties,isClosed);
    }

 
    toString(){
      let str='\n';
      if(this.type.value!=''){
        str+=this.type+' '+this.checkConstraint();
        str+=this.facets?.reduce((acc,f)=>{
                return acc+=' '+f+' ';
        },'');
        str+=this.shapeRef+' ';
        if(this.extraProperties.values.length>0){
          str+='EXTRA ';
          str+=this.extraProperties.values.reduce((acc,e)=>{
                return acc+=' '+e+' ';
          },'');
        }

        if(this.isClosed)str+='CLOSED '
        
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
          return acc+=t.toString(getSeparators(t,getLongestElements(this.triples)),1);
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
      return 'Shape';
    }


  }

export default Shape;