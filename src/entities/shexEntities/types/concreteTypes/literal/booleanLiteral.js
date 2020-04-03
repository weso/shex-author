import Type from '../../type';

class BooleanLiteral extends Type{

    constructor(value='true'){
        super(value);
    }

    getTypeName(){
        return 'booleanLiteral';
    }

    toString(){
        return this.value;
    }



}

export default BooleanLiteral;