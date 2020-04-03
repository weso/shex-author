import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import CodeMirror from 'codemirror';
import Editor from '../../../entities/editor';
import '../../../css/btn/button.css';

function AssistError (props) {

    const context = useContext(AppContext);

    const handle = function(){
        let yashe = Editor.getInstance().getYashe();
        CodeMirror.signal(yashe,'convert');
    }

    return (<div className='hideConvert'>
                <div className='hideError'>
                    <div className='shapeErrorCont'>
                        <div className='shapeError'></div>
                        <p className='errorMsg'></p>
                    </div>
                </div>
                
                 <a class="button">
                    <span onClick={handle}>Convert</span>
                </a>
            </div>);
}


export default AssistError;
/*
<button className='convertBtn' onClick={handle}>Convert</button>*/