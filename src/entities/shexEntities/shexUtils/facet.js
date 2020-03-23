class Facet{

    constructor(type,value){
        this.type = type;
        this.value = value;
    }

    getType(){
        return this.type;
    }

    getValue(){
        return this.value;
    }

    setType(type){
        this.type = type;
    }

    setValue(value){
        this.value = value;
    }


    toString(){
        return this.type+" "+this.value;
    }


}

export default Facet;