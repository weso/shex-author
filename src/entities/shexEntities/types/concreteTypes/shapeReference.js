import Type from '../type';
import TypesFactory from '../typesFactory';
import BlankKind from './kinds/blankKind';


class ShapeReference extends Type{

    constructor(value='',qualifier=new BlankKind()){
        super(value);
        this.qualifier = qualifier;
        this.factory = new TypesFactory();
    }

    getTypeName(){
        return 'shape';
    }

    setValue(value){
        this.value=value;
    }

    setQualifier(qualifier){
        this.qualifier = this.factory.createType(qualifier,'shapeName');
    }


    toString(){
        if(this.value=='shape'){
            return this.qualifier;
        }
        return this.value+' '+this.qualifier;
    }


}


export default ShapeReference;