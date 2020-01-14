import TypesFactory from './types/typesFactory';

class Value {

    constructor(type) {
        this.type = type;
        this.factory = new TypesFactory();
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


    toString(){
        return this.type.toString();
    }
      
}

export default Value;