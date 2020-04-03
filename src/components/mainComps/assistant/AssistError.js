import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import CodeMirror from 'codemirror';
import Editor from '../../../entities/editor';

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
                <button className='convertBtn' onClick={handle}>Convert</button>
            </div>);
}


export default AssistError;
