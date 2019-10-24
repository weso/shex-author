let Type = require('../../type.js');

class IriKind extends Type{

     constructor(value=''){
        super(value);
    }


    getHtml(){
        return null;
    }

    getTypeName(){
        return 'iriKind';
    }

    toString(){
        return 'IRI';
    }



}

module.exports = IriKind;