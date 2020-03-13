import TypesFactory from './types/typesFactory';
import CardinalityFactory from './shexUtils/cardinality/cardinalityFactory';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './shexUtils/shapeRef';
import Prefix from './shexUtils/prefix';

class Triple {


    constructor(id,type=new PrefixedIri('tripleName',new Prefix('schema','http://schema.org/')),value=new Primitive(),shapeRef=new ShapeRef(),cardinality='') {
        this.id = id;
        this.type = type;
        this.value = value;
        this.cardinality = cardinality;
        this.shapeRef = shapeRef;
        this.factory = new TypesFactory();
        this.cardFactory = new CardinalityFactory();
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

    setCardinality(cardinality,min,max){
        this.cardinality = this.cardFactory.createCardinality(cardinality,min,max);
    }

    getInlineShape(){
        return this.shapeRef;
    }

    setInlineShape(shapeRef){
        this.shapeRef = shapeRef;
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

export default Triple;