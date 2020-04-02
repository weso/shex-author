import React,{useContext,useState} from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import '../../../../css/conf/config.css';
import {DEFAULTS} from '../../../../conf/config';
import Properties from '../../../../conf/properties';
import {AppContext} from '../../../../App';
import { useCookies } from 'react-cookie';

function Config (props) {

        const context = useContext(AppContext);
        const [sinc, setSinc] = useState(true);
        const [pretty, setPretty] = useState(DEFAULTS.pretty);
        const [saveColors, setSaveColors] = useState(DEFAULTS.saveColors);
        const [cookies, setCookies] = useCookies('cookies');

        const handleSincChange = function(e){
            //TO-DO
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
                setPretty(DEFAULTS.pretty);
                setSaveColors(DEFAULTS.saveColors);
            }
        }

        return ( <div>
                    <div className='option'>
                        <span>Sincronize Editor (In progress...)</span>
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
                                <option value='pretty3'>Pretty3</option>
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