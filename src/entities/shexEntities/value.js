import TypesFactory from './types/typesFactory';

class Value {

    constructor(type) {
        this.type = type;
    }

    setVal(type){
        this.type = this.factory.createType(type,'valueName');
    }

    getVal(){
        return this.type;
    }
}

export default Value;