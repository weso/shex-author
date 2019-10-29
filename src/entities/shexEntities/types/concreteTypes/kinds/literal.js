let Type = require('../../type.js');

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

module.exports = Literal;