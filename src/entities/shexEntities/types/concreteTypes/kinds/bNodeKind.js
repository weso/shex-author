let Type = require('../../type.js');

class BNodeKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'bnodeKind';
    }

    toString(){
        return 'BNODE';
    }



}

module.exports = BNodeKind;