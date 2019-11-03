let TypesFactory = require('./types/typesFactory.js');
let PrefixedIri = require('./types/concreteTypes/prefixedIri.js');
let Primitive = require('./types/concreteTypes/primitive.js');
let InlineShape = require('./shexUtils/inlineShape.js');

class Triple {


    constructor(id,type=new PrefixedIri('tripleName'),value=new Primitive(),inlineShape=new InlineShape(),cardinality='') {
        this.id = id;
        this.type = type;
        this.value = value;
        this.cardinality = cardinality;
        this.inlineShape = inlineShape;
        this.factory = new TypesFactory();
      }
      
    addValue(value){
        this.values.push(value);
        this.valuesCount++;
    }

    getId(){
        return this.id;
    }

    getType(){
      return this.type; 
    }

    setType(type){
       this.type = this.factory.createType(type,'tripleName');
     }

    setValue(value){
        this.value = this.factory.createType(value,'valueName');;
    }

    setCardinality(cardinality){
        this.cardinality = cardinality;
    }

    getInlineShape(){
        return this.inlineShape;
    }

    setInlineShape(inlineShape){
        this.inlineShape = inlineShape;
    }


    getValue(){
       return this.value;
    }


    getCardinality(){
        return this.cardinality;
    }



    toString(){
        return '  '+this.getType().toString()+'          '+
        this.getValue().toString() +' '+
        this.getInlineShape().toString()+
        this.getCardinality()+'  ;\n';

    }


   

}

module.exports  = Triple;