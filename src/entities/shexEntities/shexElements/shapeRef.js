import Shape from'../shape';

class ShapeRef{

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

export default ShapeRef;