import React,{useContext,useState} from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import '../../../../css/conf/config.css';
import {DEFAULTS} from '../../../../conf/config';
import Properties from '../../../../conf/properties';
import {AppContext} from '../../../../App';
import { useCookies } from 'react-cookie';
import Editor from '../../../../entities/editor';
import CodeMirror from 'codemirror';

function Config (props) {

        const context = useContext(AppContext);
        const [sinc, setSinc] = useState(DEFAULTS.sincronize);
        const [pretty, setPretty] = useState(DEFAULTS.pretty);
        const [saveColors, setSaveColors] = useState(DEFAULTS.saveColors);
        const [cookies, setCookies] = useCookies('cookies');

        const handleSincChange = function(e){
            setSinc(!sinc);
            DEFAULTS.sincronize = !sinc;
            setCookies('conf', DEFAULTS, { path: '/' }); 
            let yashe = Editor.getYashe();    
            CodeMirror.signal(yashe,'sinc',!sinc);
        }

        const handlePrettyChange = function(e){
            let newPretty = e.target.value;
            DEFAULTS.pretty = newPretty;
            setPretty(newPretty);
            setCookies('conf', DEFAULTS, { path: '/' });     
            context.emit();
        }

        const handleSaveColorsChange = function(){
            DEFAULTS.saveColors = !saveColors;
            setCookies('conf', DEFAULTS, { path: '/' });
            setSaveColors(!saveColors);
        }

        const restoreColors = function(){
            let confirm = window.confirm('Are you sure?');
            if(confirm)Properties.getInstance().restoreDefaultColors();
        }

        const restoreConfig = function(){
            let confirm = window.confirm('Are you sure?');
            if(confirm){
                Properties.getInstance().restoreDefaultConfig();
                setSinc(DEFAULTS.sincronize);
                setSaveColors(DEFAULTS.saveColors);
                setPretty(DEFAULTS.pretty);
            }
        }

        return ( <div>
                    <div className='option'>
                        <span>Sincronize Editor</span>
                        <div className='togleContainer'>
                            <Toggle  checked={sinc}  icons={false} onChange={handleSincChange}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Save Color Preferences</span>
                        <div className='togleContainer'>
                            <Toggle checked={saveColors}  icons={false} onChange={handleSaveColorsChange}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Pretty Print</span>
                        <div className='togleContainer'>
                            <select className='customPretty'
                                value={pretty}
                                onChange={handlePrettyChange}>
                                <option value='none'>None</option>
                                <option value='pretty1'>Pretty1</option>
                                <option value='pretty2'>Pretty2</option>
                            </select>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Restore Default Colors</span>
                        <div className='togleContainer'>
                             <button className='aplyBtn' onClick={restoreColors}>Apply</button>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Restore Default Config</span>
                        <div className='togleContainer'>
                             <button className='aplyBtn' onClick={restoreConfig}>Apply</button>
                        </div>
                    </div>
                    
                </div>);
}

export default Config;