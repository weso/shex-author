import React,{useContext,useState} from 'react';
import PrefixView from './views/PrefixView';
import ColorComp from './utils/ColorComp';
import {PREFIX_PICKERS} from '../../../../../conf/pickers';
import {PREFIX_COLORS} from '../../../../../conf/colors';
import Styles from '../../../../../conf/styles';

function PrefixColors (props) {

        const styles = Styles.getInstance().getPrefixStyle();
   
        return (<div>
                    <PrefixView/>
                    

                    <div className="addCont">
                    <button className="addPrefixBtn" 
                            style={styles.add}
                            title="Add Prefix">
                            + Prefix
                    </button>
                    </div>   
                    <ColorComp  namespace={PREFIX_COLORS} 
                                pickers={PREFIX_PICKERS} 
                                labelType={styles.specialLabel}
                                bodyType={styles.body}/> 
                </div>);
}

export default PrefixColors;
