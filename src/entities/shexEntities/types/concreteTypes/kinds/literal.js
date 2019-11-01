let Type = require('../../type.js');

class Literal extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'literalKind';
    }

    toString(){
        return 'Literal';
    }



}

module.exports = Literal;