let Type = require('../../type.js');

class NonLiteral extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'nonLiteral';
    }

    toString(){
        return 'NONLITERAL';
    }



}

module.exports = NonLiteral;