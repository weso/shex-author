import Type from '../type';

class BooleanValue extends Type{

    constructor(value='true'){
        this.value = value;
    }

    getTypeName(){
        return 'booleanValue';
    }

    toString(){
        return this.value;
    }



}

export default BooleanValue;