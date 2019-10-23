import YASHE  from  'yashe';

//Singleton
let Editor = (()=> {

    function EditorClass(){

        this.yashe = YASHE(document.getElementById("showcase"),
        {
            persistent:false,
            lineNumbers: true,
            viewportMargin: Infinity
        });

    
        this.getYashe = function () {
            return this.yashe;
        }


    }


    let instance;

    return{
        getInstance: ()=>{
            if(!instance){
                instance = new EditorClass();
            }
            return instance;
        }

    
    }

})();


function getInstance(){
    return 'hey';
}

export { Editor , getInstance};