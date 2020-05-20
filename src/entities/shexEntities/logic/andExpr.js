class AndExpr {

    constructor(triples){
        this.triples = triples;
        this.triplesCount = this.triples.length;
    }

    addTriple(triple){
        this.triples.push(triple);
        this.triplesCount++;
    }

    removeTriple(tripleId){
      this.triples = this.triples.filter(function( obj ) {
        return obj.id != tripleId
      });
    }

    getType(){
        return 'and';
    }

}

export default AndExpr;