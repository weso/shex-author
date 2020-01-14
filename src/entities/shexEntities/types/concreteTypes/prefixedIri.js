import Type from '../type';
import Prefix from '../../shexUtils/prefix';

class PrefixedIri extends Type{

    constructor(context,prefix=new Prefix(),value=''){
        super(value);
        this.context = context;
        this.prefix = prefix;
    }

    getPrefix(){
        return this.prefix;
    }

    setPrefix(prefix){
        this.prefix = prefix;
    }

   
    getTypeName(){
        if(this.context=='shapeName'){
            return 'prefixedShape'
        }else if(this.context=='tripleName'){
            return 'prefixedTriple';
        }
        return 'prefixedValue';
    }


    toString(){
        return this.getPrefix().getPrefixName()+':'+this.getValue();
    }

}

export default PrefixedIri;