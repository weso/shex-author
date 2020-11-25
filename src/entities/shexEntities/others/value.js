import TypesFactory from '../types/typesFactory';
import PrefixedIri from '../types/concreteTypes/prefixedIri';
import Prefix from './prefix';

class Value {

     constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/'))){
        this.id = id;
        this.type = type;
        this.factory = new TypesFactory();
    }

    setType(type){
       this.type = this.factory.createType(type);
     }

    toString(){
        return this.type.toString();
    }

}

export default Value;