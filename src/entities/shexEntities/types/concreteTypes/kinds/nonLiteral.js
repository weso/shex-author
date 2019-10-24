let Type = require('../../type.js');

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

module.exports = NonLiteral;