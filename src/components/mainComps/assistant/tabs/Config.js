import React,{useContext,useState} from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import '../../../../css/conf/config.css';

function Config (props) {

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
                            <Toggle checked icons={false}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Save Color Preferences</span>
                        <div className='togleContainer'>
                            <Toggle checked icons={false}/>
                        </div>
                    </div>
                    <div className='option'>
                        <span>Restore Default Colors</span>
                        <div className='togleContainer'>
                             <button className='aplyBtn'>Apply</button>
                        </div>
                    </div>
                    
                </div>);
}

export default Config;

