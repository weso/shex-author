import TypesFactory from './types/typesFactory';
import IrirRef from './types/concreteTypes/iriRef';
import InlineShape from './shexUtils/inlineShape';

class Triple {


    constructor(id,type=new IrirRef('tripleName'),value=new IrirRef(),inlineShape=new InlineShape(),cardinality='') {
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

export default Triple;