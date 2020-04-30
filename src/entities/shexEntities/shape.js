import Node from './node';

import PrefixedIri from './types/concreteTypes/prefixedIri';
import BlankKind from './types/concreteTypes/kinds/blankKind';
import Prefix from './others/prefix';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './others/shapeRef';

class Shape extends Node{

  constructor(id,type=new PrefixedIri(new Prefix('','http:/example.org/')),constraint=new Primitive(),shapeRef=new ShapeRef(),facets=[],triples=[]) {
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
        let str='';
        let longestTriple = this.getLongestElement('type');
        let longestConstraint = this.getLongestElement('constraint');
        let longestRef = this.getLongestElement('shapeRef');
        let longestCard = this.getLongestElement('cardinality');
        let longestCRef = this.getLongestCR();//constraint+shapeRef
        this.triples.forEach(triple => {
          let tripleLength = triple.type.toString().length;
          let constLength = triple.constraint.toString().length;
          let refLength = triple.shapeRef.toString().length;
          let cardLength = triple.cardinality.toString().length;
          let CRefLength = constLength + refLength;

          let tripleDiference = longestTriple - tripleLength;
          let constDiference = longestConstraint - constLength;
          let refDiference = longestRef - refLength;
          let cardDiference = longestCard - cardLength;
          let CRefDiference = longestCRef - CRefLength;

          str+=triple.toString( 
                      this.getSeparators(tripleDiference,
                                          constDiference,
                                          refDiference,
                                          cardDiference,
                                          CRefDiference));
        });
        return str;
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


  }

export default Shape;