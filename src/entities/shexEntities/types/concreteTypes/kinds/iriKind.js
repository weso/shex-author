let Type = require('../../type.js');

class IriKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'iriKind';
    }

    toString(){
        return 'IRI';
    }



}

module.exports = IriKind;