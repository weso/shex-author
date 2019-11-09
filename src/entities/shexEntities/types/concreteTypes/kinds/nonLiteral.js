import Type from '../../type';

class NonLiteral extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'nonliteralKind';
    }

    toString(){
        return 'NONLITERAL';
    }



}

export default NonLiteral;