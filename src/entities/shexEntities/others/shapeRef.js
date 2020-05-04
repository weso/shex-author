import Shape from'../shape';

class ShapeRef{

    constructor(shape=null){
        this.shape = shape;
    }

    toString(){
        if(this.shape){
           let shapeRef = this.shape.type.toString();
           return '@'+shapeRef;
        }

        return '';
    }


}

export default ShapeRef;