class Prefix {

    constructor(prefixName='',prefixValue='http://example.org/',id){
        this.prefixName = prefixName;
        this.prefixValue = prefixValue;
        this.id = id;
    }


    getPrefixName(){
        return this.prefixName;
    }

    getPrefixValue(){
        return this.prefixValue;
    }

}

export default Prefix;