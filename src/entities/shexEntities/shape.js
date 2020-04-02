import TypesFactory from './types/typesFactory';

import PrefixedIri from './types/concreteTypes/prefixedIri';
import BlankKind from './types/concreteTypes/kinds/blankKind';
import Prefix from './shexUtils/prefix';

class Shape {

  constructor(id,type=new PrefixedIri(new Prefix('','http://example.org/')),triples = [],qualifier=new BlankKind()) {
      this.id = id;
      this.type = type;
      this.triples = triples;
      this.triplesCount = this.triples.length;
      this.factory = new TypesFactory();
      this.qualifier = qualifier;
    }

    addTriple(triple){
        this.triples.push(triple);
        this.triplesCount++;
    }

    removeTriple(tripleId){
      this.triples = this.triples.filter(function( obj ) {
        return obj.id != tripleId
      });
    }

    setQualifier(qualifier){
      this.qualifier = this.qualifier;
    }
    

    setType(type){
        this.type = this.factory.createType(type);
     }

 
    toString(){
      let str='';
      if(this.type.value!=''){
        str+=this.type+' '+this.qualifier;
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
        let longestCRef = this.getLongestCR();//constraint+shapeRef
        this.triples.forEach(triple => {
          let tripleLength = triple.type.toString().length;
          let constLength = triple.constraint.toString().length;
          let refLength = triple.shapeRef.toString().length;
          let CRefLength = constLength + refLength;

          let tripleDiference = longestTriple - tripleLength;
          let constDiference = longestConstraint - constLength;
          let refDiference = longestRef - refLength;
          let CRefDiference = longestCRef - CRefLength;

          str+=triple.toString( 
            this.getSeparators(tripleDiference,constDiference,refDiference,CRefDiference));
        });
        return str;
     }

     //Checks if there is any triple with content
     checkContent(){
       let isContent = false;
       this.triples.forEach(triple => {
          if(triple.getType().value!=''){
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




    getSeparators(tripleSize,constraintSize,refSize,CRefSize){
      return{
        triple:this.getSeparator(tripleSize),
        constraint:this.getSeparator(constraintSize),
        ref:this.getSeparator(refSize),
        CRef:this.getSeparator(CRefSize),
      }
    }

    getSeparator(size){
      let space = ' ';
      let separator = '  ';
      for(let i=0;i<size;i++){
        separator+=space;
      }
      return separator;
    }

    //Getters and setters
    getId(){
      return this.id;
    }

    setId(id){
      this.id=id;
    }

    getType(){
      return this.type;
    }

    getTriples(){
      return this.triples;
    }

    setTriples(triples){
      this.triples = triples;
    }

    getTriplesCount(){
      return this.triplesCount;
    }

    setTriplesCount(triplesCount){
      this.triplesCount = triplesCount;
    }

    getQualifier(){
      return this.qualifier;
    }

    setQualifier(qualifier){
      this.qualifier = qualifier;
    }

  }

export default Shape;