import Codemirror from 'codemirror';
import Editor from '../entities/editor';

import {defaultExample} from '../galery/defaultExample';
import {wikiExample} from '../galery/wikiExample';

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
        Editor.getYashe().setValue(event.target.result)
    };

    reader.readAsText(file);
    Codemirror.signal(Editor.getYashe(),'upload');
}

export function downloadFile(){
    var textFileAsBlob = new Blob([ Editor.getYashe().getValue() ], { type: 'text/shex' });
    var fileNameToSaveAs = "document.shex";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

//Sorry about this
export function changeTheme(){
    let yashe = Editor.getYashe();
    var themeValue = 'author-dark'
    var color = 'black'
    if(yashe.getOption('theme') == 'author-dark'){
        themeValue='wiki'
        document.getElementById("editorComp").classList.add('white-fill');
        document.getElementById("shareBtn").classList.add('light');
        document.getElementById("downloadBtn").classList.add('light');
        document.getElementById("copyBtn").classList.add('light');
        document.getElementById("deleteBtn").classList.add('light');
        document.getElementById("smallBtn").classList.add('light');
        document.getElementById("fullBtn").classList.add('light');
        document.getElementById("uploadBntLabel").classList.add('light');
    }else{
        document.getElementById("editorComp").classList.remove('white-fill');
        document.getElementById("shareBtn").classList.remove('light');
        document.getElementById("downloadBtn").classList.remove('light');
        document.getElementById("copyBtn").classList.remove('light');
        document.getElementById("deleteBtn").classList.remove('light');
        document.getElementById("smallBtn").classList.remove('light');
        document.getElementById("fullBtn").classList.remove('light');
        document.getElementById("uploadBntLabel").classList.remove('light');
    }
    
    yashe.setOption("theme",themeValue)
    Codemirror.signal(yashe,'themeChange');

}

export function loadExample(example){
    let yashe = Editor.getYashe();
    if(example=='default'){
        yashe.setValue(defaultExample)
    }else{
        yashe.setValue(wikiExample)
    }
    setTimeout(() => {//needed
        Codemirror.signal(yashe,'galery');
    }, 10); 
}

export function scrollTop(){
    window.scrollTo(0, 0);
}


export function undo(){
    let yashe = Editor.getYashe();
    yashe.undo();
}

export function redo(){
    let yashe = Editor.getYashe();
    yashe.redo();
}
