import Type from '../../type.js';

class BNodeKind extends Type{

     constructor(value=''){
        super(value);
    }


    getHtml(){
        return null;
    }

    getTypeName(){
        return 'bnodeKind';
    }

    toString(){
        return 'BNODE';
    }



}

export default BNodeKind;