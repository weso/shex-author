import Type from '../type';

class ValueSet extends Type{

     constructor(values=[],value){
        // If we use 'value' instead of 'values' it doesn't work 
        // I don't know why...
        super(value);
        this.values = values;
    }

    addValue(value){
        this.values.push(value);
    }
       

    getValues(){
        return this.values;
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