let Type = require('../type.js');
let Prefix = require('../../shexUtils/prefix.js');

class PrefixedIri extends Type{

    constructor(context,prefix=new Prefix(),value=''){
        super(value);
        this.context = context;
        this.prefix = prefix;
    }

    getPrefix(){
        return this.prefix;
    }

    setPrefix(prefix){
        this.prefix = prefix;
    }


    getTypeName(){
        return 'prefixedIri';
    }


    toString(){
        return this.getPrefix().getPrefixName()+':'+this.getValue();
    }

}

module.exports = PrefixedIri;