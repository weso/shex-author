let Shape = require('../shape.js');

class InlineShape{

    constructor(shape=null){
        this.shape = shape;
    }


    getShape(){
        return this.shape;
    }

    setShape(shape){
        this.shape = shape;
    }


    toString(){
        if(this.shape){
           let shapeRef = this.shape.getType().toString();
            return '@'+shapeRef;
        }

        return '';
    }


}

module.exports = InlineShape;