import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import {AssistContext} from '../../../../Assistant';
import '../../../../../../css/shexComponents/customize/Custom.css'
import '../../../../../../css/color/colors.css'
import { ChromePicker,SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { useCookies } from 'react-cookie';
import {SHAPE_COLORS} from '../../../../../../conf/colors';
import {DEFAULTS} from '../../../../../../conf/config';

function ColorPicker (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);
    const {namespace,element,cookie} = props;
    const [color,setColor] = useState(namespace[element]);
    const [isDisplay,setDisplay] = useState(false);
    const [cookies, setCookie] = useCookies('colors');
    
    const handleClick = () => {
      setDisplay(!isDisplay);
    };

    const handleClose = () => {
      //setDisplay(false);
     // setCookie('shapeColors', SHAPE_COLORS, { path: '/' });
    };

    const handle = (e) => {
      setColor(e.hex);
      asssistContext.handleChange(e.hex,element,namespace)
      if(DEFAULTS.saveColors){
        setCookie(cookie, namespace, { path: '/' });     
      }
    };

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color,
        },
        swatch: {
          padding: '3px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          transform: 'translateX(-80%)',
          zIndex: '5000',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });


    return (
            <div>
                <div style={ styles.swatch } onClick={ handleClick }>
                    <div style={ styles.color } />
                </div>
                { isDisplay ? 
                    <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={handleClose}/>
                        <ChromePicker  color={color} onChange={handle} onChangeComplete={handleClose}/>
                    </div> 
                    
                    : null 
                }
            </div>       
    );
                                   
    
}


export default ColorPicker;

