
//Singleton
const ShapeStore = (()=> {

    function ShapeStoreClass(){

        this.shapes = [];
        this.shapeCount = 0;

         this.addShape = function(shape) {
            this.shapes.push(shape);
            this.shapeCount++;
        }

        this.getShapeCount = function() {
            return this.shapeCount;
        }

        this.setShapesCount = function(index) {
            this.shapeCount = index;
        }

        this.getShapes = function () {
            return this.shapes;
        }

        this.setShapes = function (shapes) {
            this.shapes = shapes
        }

    }


    let instance;

    return{
        getInstance: ()=>{
            if(!instance){
                instance = new ShapeStoreClass();
            }
            return instance;
        }

    }

})();


function getInstance(){
    return 'hey';
}

export { ShapeStore , getInstance};