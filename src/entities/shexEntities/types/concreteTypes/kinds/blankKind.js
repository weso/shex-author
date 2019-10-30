let Type = require('../../type.js');

class BlankKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'blankKind';
    }

    toString(){
        return '';
    }



}

module.exports = BlankKind;