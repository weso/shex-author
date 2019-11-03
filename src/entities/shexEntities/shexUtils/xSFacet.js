class XSFacet(){

    constructor(facet='lenght',value){
        this.facet = facet;
        this.value = value;
    }

    setFacet(facet){
        this.facet=facet;
    }


    setValue(value){
        this.value = value;
    }

    toString(){
        return this.facet.toUpperCase()+' '+value;
    }

}

module.exports = XSFacet;