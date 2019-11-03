let Type = require('../../type.js');

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

module.exports = NonLiteral;