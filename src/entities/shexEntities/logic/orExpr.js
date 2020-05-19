class OrExpr {

    constructor(triples){
        this.triples = triples;
    }

    getType(){
        return 'or';
    }

}

export default OrExpr;