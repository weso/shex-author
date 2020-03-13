import TypesFactory from './types/typesFactory';

import PrefixedIri from './types/concreteTypes/prefixedIri';
import BlankKind from './types/concreteTypes/kinds/blankKind';
import Prefix from './shexUtils/prefix';

class Shape {

  constructor(id,type=new PrefixedIri('shapeName',new Prefix('','http://example.org/')),triples = [],qualifier=new BlankKind()) {
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
        this.type = this.factory.createType(type,'shapeName');
     }

 
    toString(){
      let str = this.type+' '+this.qualifier+' {\n'
      this.triples.forEach(triple => {
        str+=triple;
      });

      str+="}\n\n"
      return str

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