import YASHE from 'yashe';

//Singleton Pattern
const Editor = (()=> {

    function EditorClass(){

    
        this.getYashe = function () {
            return this.yashe;
        }

        this.setYashe =  function (yashe) {
            this.yashe = yashe;
        }


         this.getPrefixes = function () {
                let yashe = Editor.getInstance().getYashe();
                let definedPrefixes = yashe.getDefinedPrefixes();
                let prefixes='';
                for(let pre in definedPrefixes){
                    prefixes+='PREFIX '+pre+':    <'+definedPrefixes[pre]+'>\n';
                }
                prefixes+='\n';
                return prefixes;
        }

        this.draw = function(shapes){
            let newContent = this.getPrefixes();
            shapes.forEach(element =>{
                newContent += element.toString()
            });
            this.getYashe().setValue(newContent);
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


export default Editor;