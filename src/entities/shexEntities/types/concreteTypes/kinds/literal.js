import Type from '../../type.js';

class Literal extends Type{

     constructor(value=''){
        super(value);
    }


    getHtml(){
        return null;
    }

    getTypeName(){
        return 'literal';
    }

    toString(){
        return 'Literal';
    }



}

export default Literal;