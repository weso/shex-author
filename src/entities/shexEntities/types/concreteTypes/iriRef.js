import Type from '../type';
import Editor from'../../../editor';

class IriRef extends Type{

    constructor(context,value=''){
        super(value);
        this.context = context;
    }

    getTypeName(){
        if(this.context=='shapeName'){
            return 'iriShape'
        }else if(this.context=='tripleName'){
            return 'iriTriple';
        }
        return 'iriValue';
    }


    toString(){
        return '<'+this.getValue()+'>';
    }


}

export default IriRef;