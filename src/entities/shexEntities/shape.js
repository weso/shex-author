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
          let longestTriple = this.getLongestElement('type');
          let longestConstraint = this.getLongestElement('constraint');
          let longestRef = this.getLongestElement('shapeRef');
          this.triples.forEach(triple => {
            let tripleLength = triple.type.toString().length;
            let constLength = triple.constraint.toString().length;
            let refLength = triple.shapeRef.toString().length;

            let tripleDiference = longestTriple - tripleLength;
            let constDiference = longestConstraint - constLength;
            let refDiference = longestRef - refLength;


            str+=triple.toString( this.getSeparator(tripleDiference),
                                  this.getSeparator(constDiference),
                                  this.getSeparator(refDiference));
          });
          str+="}\n\n"
        }
       }

      
      return str

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