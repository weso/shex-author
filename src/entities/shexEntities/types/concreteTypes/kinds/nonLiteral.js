import Type from '../../type.js';

class NonLiteral extends Type{

     constructor(value=''){
        super(value);
    }


    getHtml(){
        return null;
    }

    getTypeName(){
        return 'nonLiteral';
    }

    toString(){
        return 'NONLITERAL';
    }



}

export default NonLiteral;