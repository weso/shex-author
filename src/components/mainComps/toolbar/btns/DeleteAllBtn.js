import React,{useContext} from 'react';
import {ShapesContext} from '../../../../App';
import  Editor from '../../../../entities/editor';

function DeleteAllBtn () {

    const context = useContext(ShapesContext);

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
            Editor.getInstance().getYashe().setValue('');
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


