import Type from '../../type';

class NonLiteral extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'nonliteral';
    }

    toString(){
        return 'NONLITERAL';
    }



}

export default NonLiteral;