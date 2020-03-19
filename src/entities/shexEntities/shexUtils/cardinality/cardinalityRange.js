class CardinalityRange{

    constructor(min=1,max=10){
        this.min = min;
        this.max = max;
    }

    getCardType(){
        return 'range';
    }

    toString(){
        return '{'+this.min+','+this.max+'}';
    }

}

export default CardinalityRange;