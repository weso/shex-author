class AndExpr {

    constructor(triples){
        this.triples = triples;
    }

    getType(){
        return 'and';
    }

}

export default AndExpr;