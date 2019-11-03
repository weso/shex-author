let Type = require('../../type.js');

class IriKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'iri';
    }

    toString(){
        return 'IRI';
    }



}

module.exports = IriKind;