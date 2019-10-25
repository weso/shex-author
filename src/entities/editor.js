'use strict';

let YASHE = require('yashe');

//Singleton
const Editor = (()=> {

    function EditorClass(){

    
        this.getYashe = function () {
            return this.yashe;
        }

        this.setYashe =  function (yashe) {
            this.yashe = yashe;
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


module.exports = Editor;