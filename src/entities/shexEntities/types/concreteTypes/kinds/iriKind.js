import Type from '../../type';

class IriKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'iri';
    }

    toString(){
        return 'IRI';
    }



}

export default IriKind;