/*
let htmlUtils = require('../../utils/htmlUtils.js');
*/
let TypesFactory = require('./types/typesFactory.js');

let IrirRef = require('./types/concreteTypes/iriRef.js');
let PrefixedIri = require('./types/concreteTypes/prefixedIri.js');

class Shape {

constructor(id,type=new IrirRef('shapeName'),triples = []) {
      this.id = id;
      this.type = type;
      this.triples = triples;
      this.triplesCount = this.triples.length;
      this.factory = new TypesFactory();
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

    getTriplesCount(){
      return this.triplesCount;
    }


    getId(){
      return this.id;
    }

    getType(){
      return this.type; 
    }


    getTriples() {
        return this.triples;
     }

    setTriples(triples){
      this.triples = triples;
    }

    setType(type){
        this.type = this.factory.createType(type,'shapeName');
     }


     getHtml(){
      // return htmlUtils.getShapeHtml(this);
     }


     toString(){
    
       //CAMBIAR
      let str = this.type.toString()+" IRI {\n"
      this.triples.forEach(triple => {
        str+=triple.toString()
      });

      str+="}\n\n"
      return str

     }


  }

  module.exports = Shape;