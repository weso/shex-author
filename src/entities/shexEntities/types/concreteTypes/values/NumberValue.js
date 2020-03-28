import Type from '../type';

class NumberValue extends Type{

    constructor(value=0){
        this.value = value;
    }

    getTypeName(){
        return 'numberValue';
    }

    toString(){
        return this.value;
    }



}

export default NumberValue;