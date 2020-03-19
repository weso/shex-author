import TypesFactory from './types/typesFactory';
import CardinalityFactory from './shexUtils/cardinality/cardinalityFactory';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './shexUtils/shapeRef';
import Prefix from './shexUtils/prefix';

class Triple {


    constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/')),value=new Primitive(),shapeRef=new ShapeRef(),cardinality='') {
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
       this.type = this.factory.createType(type);
     }

    setValue(value){
        this.value = this.factory.createType(value);
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



    toString(separator){
        let str=''
        if(this.getType().value!=''){
        return '  '+this.getType().toString()+separator+
                this.getValue().toString() +' '+
                this.getInlineShape().toString()+' '+
                this.getCardinality()+'  ;\n';
        }
        return '';
       

    }




}

export default Triple;