class CardinalityRange{

    constructor(min,max){
        this.min = min;
        this.max = max;
    }

    toString(){
        return '{'+min+','+max+'}';
    }

}

export default CardinalityRange;