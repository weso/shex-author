import Type from '../../type';

class NumberLiteral extends Type{

    constructor(value=0){
        super(value);
    }

    getTypeName(){
        return 'numberLiteral';
    }

    toString(){
        return this.value;
    }



}

export default NumberLiteral;