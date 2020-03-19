import Type from '../type';

class BNode extends Type{

    constructor(value='example'){
        super(value);
    }


    getTypeName(){
        return 'bnodeType';
    }


    toString(){
        return '_:'+this.getValue();
    }

}



export default BNode;