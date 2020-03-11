class CardinalityMinLimit{

    constructor(min){
        this.min = min;
    }

    toString(){
        return '{'+this.min+',*}';
    }

}

export default CardinalityMinLimit;