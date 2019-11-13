import Type from '../type';

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



export default BNode;