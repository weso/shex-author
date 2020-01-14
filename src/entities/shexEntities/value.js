import TypesFactory from './types/typesFactory';
import BlankKind from './types/concreteTypes/kinds/blankKind';

class Value {

    constructor(type,qualifier=new BlankKind()) {
        this.type = type;
        this.factory = new TypesFactory();
        this.qualifier = qualifier;
    }

    setType(type){
        this.type = this.factory.createType(type,'valueName');
    }

    getType(){
        return this.type;
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

    setQualifier(qualifier){
        this.qualifier = this.factory.createType(qualifier,'shapeName');
    }

    toString(){
        return this.type.toString()+' '+this.qualifier;
    }
      
}

export default Value;