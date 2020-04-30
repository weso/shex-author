class Facet{

    constructor(id,type='length',value=0){
        this.id = id;
        this.type = type;
        this.value = value;
    }

    toString(){
        return this.type+" "+this.value;
    }


}

export default Facet;