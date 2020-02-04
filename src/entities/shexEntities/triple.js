import TypesFactory from './types/typesFactory';
import IrirRef from './types/concreteTypes/iriRef';
import InlineShape from './shexUtils/inlineShape';
import Value from './value';

class Triple {


    constructor(id,type=new IrirRef('tripleName'),value=new Value(new IrirRef()),inlineShape=new InlineShape(),cardinality='') {
        this.id = id;
        this.type = type;
        this.value = new Value(value);
        this.cardinality = cardinality;
        this.inlineShape = inlineShape;
        this.factory = new TypesFactory();
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

    setCardinality(cardinality){
        this.cardinality = cardinality;
    }

    getInlineShape(){
        return this.inlineShape;
    }

    setInlineShape(inlineShape){
        this.inlineShape = inlineShape;
    }


    getCardinality(){
        return this.cardinality;
    }

    getValue(){
        return this.value;
    }


    
    getInitialValue(){
        return this.type.value;
    }

    getInitialPrefix(){
        return this.type.prefix.prefixValue;
    }

    setTypeValue(value){
        this.type.setValue(value);
    }

    setPrefix(prefix){
         this.type.setPrefix(prefix);
    }



    toString(){
        return '  '+this.getType().toString()+'          '+
        this.getValue().toString() +' '+
        this.getInlineShape().toString()+
        this.getCardinality()+'  ;\n';

    }


}

export default Triple;