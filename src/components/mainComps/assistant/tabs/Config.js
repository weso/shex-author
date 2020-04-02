import React,{useContext,useState} from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import '../../../../css/conf/config.css';
import {DEFAULTS} from '../../../../conf/config';

function Config (props) {

        const [pretty, setPretty] = useState(DEFAULTS.pretty)
        const [saveColors, setSaveColors] = useState(DEFAULTS.saveColors)
        const handlePrettyChange = function(){
            DEFAULTS.pretty = !pretty;
            setPretty(!pretty);
        }

        const handleSaveColorsChange = function(){
            DEFAULTS.saveColors = !saveColors;
            setSaveColors(!saveColors);
        }

        return ( <div>
                    
                    <div className='option'>
                        <span>Sincronize Editor</span>
                        <div className='togleContainer'>
                            <Toggle checked icons={false}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Pretty Print</span>
                        <div className='togleContainer'>
                            <Toggle checked={pretty} icons={false}  onChange={handlePrettyChange}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Save Color Preferences</span>
                        <div className='togleContainer'>
                            <Toggle checked={saveColors}  icons={false} onChange={handleSaveColorsChange}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Restore Default Colors</span>
                        <div className='togleContainer'>
                             <button className='aplyBtn'>Apply</button>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Restore Default Config</span>
                        <div className='togleContainer'>
                             <button className='aplyBtn'>Apply</button>
                        </div>
                    </div>
                    
                </div>);
}

export default Config;

