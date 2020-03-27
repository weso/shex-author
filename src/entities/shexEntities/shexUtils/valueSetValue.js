class ValueSetValue {

     constructor(id,value=''){
        this.id = id;
        this.value = value;
    }

    getValue(){
        return this.value;
    }

    setValue(value){
        this.value = value;
    }

    toString(){
        return this.value;
    }



}

export default ValueSetValue;