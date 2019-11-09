import Type from '../../type';

class Literal extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'literal';
    }

    toString(){
        return 'Literal';
    }



}

export default Literal;