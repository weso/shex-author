let Type = require('../type.js');
let Editor = require('../../../editor.js')


class IriRef extends Type{

    constructor(context,value=''){
        super(value);
        this.context = context;
    }

    getTypeName(){
        return 'iriRef';
    }


    toString(){
        return '<'+this.getValue()+'>';
    }


}

module.exports = IriRef;