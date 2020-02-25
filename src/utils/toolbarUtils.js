import Codemirror from 'codemirror';
import Editor from '../entities/editor';

export function readFile(files){
    //Only one file allowed
    if(files.length>1){
        return;
    }

    var file = files[0];
    //Only ShEx files allowed
    if(!file.name.endsWith('.shex')){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(event) {
        Editor.getInstance().getYashe().setValue(event.target.result)
    };

    reader.readAsText(file);
    Codemirror.signal(Editor.getInstance().getYashe(),'upload');
}


