import Node from './node';

import PrefixedIri from './types/concreteTypes/prefixedIri';
import BlankKind from './types/concreteTypes/kinds/blankKind';
import Prefix from './others/prefix';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './others/shapeRef';

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
        let str='';
        let longestType = this.getLongestElement('type');
        let longestConstraint = this.getLongestElement('constraint');
        let longestFacet = this.getLongestFacet('facet');
        let longestRef = this.getLongestElement('shapeRef');
        let longestCard = this.getLongestElement('cardinality');
        let longestBody = this.getLongestBody();
        this.triples.forEach(triple => {
          let typeLength = triple.type.toString().length;
          let constLength = triple.constraint.toString().length;
          let facetLength = this.getFacetsString(triple.facets).length;
          let refLength = triple.shapeRef.toString().length;
          let cardLength = triple.cardinality.toString().length;
          let bodyLength = constLength+facetLength+refLength;
          if(triple.constraint.toString()=='.')bodyLength-=2;

          let typeDiference = longestType - typeLength;
          let bodyDiference = longestBody - bodyLength;
          let cardDiference = longestCard - cardLength;

          str+=triple.toString( 
                      this.getSeparators(typeDiference,bodyDiference,cardDiference));
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


     getFacetsString(facets){
       return facets.reduce((acc,f)=>{
         return acc+=f.toString()+' ';
       },'')+' ';
     }


    getLongestElement(element){
      let size=0;
      this.triples.forEach(triple => {
          let value = triple[element].toString().length;
          if(value>size)size = value;
      });
      return size;
    }

    getLongestFacet(){
      let size=0;
      this.triples.forEach(triple => {
          let value = this.getFacetsString(triple.facets).length;
          if(value>size)size = value;
      });
      return size;
    }
 
    getLongestBody(){
      let size=0;
      this.triples.forEach(triple => {
          let cValue = triple.constraint.toString().length;
          let fValue = this.getFacetsString(triple.facets).length;
          let rValue = triple.shapeRef.toString().length;
          let value = cValue+fValue+rValue;
          if(value>size)size = value;
      });
      return size;
    }




    getSeparators(tripleSize,bodySize,cardSize){
      return{
        type:this.getSeparator(tripleSize),
        body:this.getSeparator(bodySize),
        card:this.getSeparator(cardSize),
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

    getEntityName(){
      return 'Shape';
    }


  }

export default Shape;