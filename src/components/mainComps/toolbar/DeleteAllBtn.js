import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {AppContext} from '../../../App';
import  Editor from '../../../entities/editor';

function DeleteAllBtn () {

    const context = useContext(AppContext);

    const  deleteShapes = function(){
        if(window.confirm('Are you sure?')){
            //Needed for visualize
            setTimeout(() => {
                context.replaceShapes([]);    
            }, 10);
            // We can't do emit() because it takes 
            // like another call to change shapes state
            // I don't know exactly the reason...
            // It's something about react state
            let yashe = Editor.getInstance().getYashe();
            yashe.setValue('');
            Codemirror.signal(yashe,'delete');
        }
    }


    return (
         <button className="mdc-icon-button material-icons btns" 
                 title="Delete all"
                 onClick={deleteShapes}>
                 delete_outline
            </button>  );
    
  
}

export default DeleteAllBtn;


