let Type = require('../type.js');

class BNode extends Type{

    constructor(context,value='example'){
        super(value);
        this.context = context;
    }


    getTypeName(){
        return 'bnode';
    }


    toString(){
        return '_:'+this.getValue();
    }

}



module.exports = BNode;