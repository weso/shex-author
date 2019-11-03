let Type = require('../type.js');

class BNode extends Type{

    constructor(context,value='example'){
        super(value);
        this.context = context;
    }


    getTypeName(){
        return 'bnodeType';
    }


    toString(){
        return '_:'+this.getValue();
    }

}



module.exports = BNode;