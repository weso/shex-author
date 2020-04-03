import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import CodeMirror from 'codemirror';
import Editor from '../../../entities/editor';

function AssistConvert (props) {

    const context = useContext(AppContext);

    const handle = function(){
        let yashe = Editor.getInstance().getYashe();
        CodeMirror.signal(yashe,'convert');
    }

    return (<div className='hideConvert'>
                <button className='convertBtn' onClick={handle}>Convert</button>
            </div>);
}


export default AssistConvert;
