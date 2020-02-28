import Codemirror from 'codemirror';
import Editor from '../entities/editor';

import {defaultExample} from '../shapes/defaultExample';
import {wikiExample} from '../shapes/wikiExample';

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

export function downloadFile(){
    var textFileAsBlob = new Blob([ Editor.getInstance().getYashe().getValue() ], { type: 'text/shex' });
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

export function changeTheme(){
    let yashe = Editor.getInstance().getYashe();
    var themeValue = 'wiki'
    var color = 'black'
    if(yashe.getOption('theme') == 'wiki'){
        themeValue='dark'
        color = 'white'
        document.getElementById("downloadBtn").classList.add('light');
        document.getElementById("copyBtn").classList.add('light');
        document.getElementById("deleteBtn").classList.add('light');
        document.getElementById("themeBtn").classList.add('light');
        document.getElementById("smallBtn").classList.add('light');
        document.getElementById("fullBtn").classList.add('light');
        document.getElementById("uploadBntLabel").classList.add('light');
    }else{
        document.getElementById("downloadBtn").classList.remove('light');
        document.getElementById("copyBtn").classList.remove('light');
        document.getElementById("deleteBtn").classList.remove('light');
        document.getElementById("themeBtn").classList.remove('light');
        document.getElementById("smallBtn").classList.remove('light');
        document.getElementById("fullBtn").classList.remove('light');
        document.getElementById("uploadBntLabel").classList.remove('light');
    }
    
    yashe.setOption("theme",themeValue)
    Codemirror.signal(yashe,'themeChange');

}

export function loadExample(example){
    let yashe = Editor.getInstance().getYashe();
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
    let yashe = Editor.getInstance().getYashe();
    yashe.undo();
}

export function redo(){
    let yashe = Editor.getInstance().getYashe();
    yashe.redo();
}
