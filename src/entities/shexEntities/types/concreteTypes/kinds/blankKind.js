let Type = require('../../type.js');

class BlankKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'blank';
    }

    toString(){
        return '';
    }



}

module.exports = BlankKind;