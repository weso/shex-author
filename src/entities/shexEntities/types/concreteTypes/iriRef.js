import Type from '../type';
import Editor from'../../../editor';

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

export default IriRef;