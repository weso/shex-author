import Type from '../../type';

class Literal extends Type{

    getTypeName(){
        return 'literal';
    }

    toString(){
        return 'Literal';
    }



}

export default Literal;