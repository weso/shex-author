class CardinalityExactly{

    constructor(value=1){
        this.value = value;
    }

    getCardType(){
        return 'exactly';
    }

    toString(){
        return '{'+this.value+'}';
    }

}

export default CardinalityExactly;