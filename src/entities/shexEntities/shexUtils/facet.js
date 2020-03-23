class Facet{

    constructor(id,type='',value=''){
        this.id = id;
        this.type = type;
        this.value = value;
    }

    getId(){
        return this.id;
    }

    getType(){
        return this.type;
    }

    getValue(){
        return this.value;
    }

    setId(id){
        this.id = id;
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