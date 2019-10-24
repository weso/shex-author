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

    getHtml(){
       
        let str = '<select class="col-sm form-control '+this.getPrefixContex()+'"><input class="'+this.context+' form-control col-sm" context="text" value="replaceName">';
        return str.replace('replaceName',this.getValue());
    }

    getTypeName(){
        return 'prefixedIri';
    }


    getPrefixContex(){
        let prefix = 'prefixShape';
        if(this.context == 'tripleName'){
            prefix = 'prefixTriple';
        }
        if(this.context == 'valueName'){
            prefix = 'prefixValue';
        }
        return prefix;
    }


    toString(){
        return this.getPrefix().getPrefixName()+':'+this.getValue();
    }

}

module.exports = PrefixedIri;