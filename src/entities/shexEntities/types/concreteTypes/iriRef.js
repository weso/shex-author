import Type from '../type';
import Editor from'../../../editor';

class IriRef extends Type{

    constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'iriRef';
    }


    toString(){
        return '<'+this.getValue()+'>';
    }


}

export default IriRef;