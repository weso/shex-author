class ExtraSet{

    constructor(values=[]){
        this.values = values;
    }

    addValue(value){
        this.values.push(value);
    }

    setValues(values){
        this.values = values;
    }

    toString(){
        return this.values.reduce((acc,v)=>{
            return acc+=v.toString()+' ';
        },'EXTRA ');
    }

}

export default ExtraSet;