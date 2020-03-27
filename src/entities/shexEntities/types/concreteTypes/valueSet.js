import Type from '../type';

class ValueSet extends Type{

     constructor(value,values=[]){
        super(value);
        this.values =values;
    }

    addValue(value){
        this.values.push(value);
    }

    setValues(values){
        this.values = values;
    }

    getTypeName(){
        return 'valueSet';
    }

    toString(){
        let str ='[';
        this.values.map(v=>{
            str+=v.value+' ';
        })

        str+=']';
        return str;
    }



}

export default ValueSet;