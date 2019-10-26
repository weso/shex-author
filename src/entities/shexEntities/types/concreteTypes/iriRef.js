let Type = require('../type.js');
let Editor = require('../../../editor.js')


class IriRef extends Type{

    constructor(context,value=''){
        super(value);
        this.context = context;
    }


    getHtml(){
        return '<input class="'+this.context+' form-control col-sm" context="text" value="'+this.value+'">';
    }

    getTypeName(){
        return 'iriRef';
    }


    toString(){
        return '<'+this.getValue()+'>';
    }


}

module.exports = IriRef;