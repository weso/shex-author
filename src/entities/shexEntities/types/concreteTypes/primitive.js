import Type from '../type';

const PRIMITIVES = ['String','Integer','Date','Boolean'];

class Primitive extends Type{

     constructor(value='string'){
        super(value);
    }

    getTypeName(){
        return 'primitive';
    }

    toString(){
        return 'xsd:'+this.getValue();
    }



}

export default Primitive;