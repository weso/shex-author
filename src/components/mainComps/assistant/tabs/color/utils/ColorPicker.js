import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import {AssistContext} from '../../../../Assistant';
import '../../../../../../css/shexComponents/customize/Custom.css'
import '../../../../../../css/color/colors.css'
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';
import {SHAPE_COLORS,TRIPLE_COLORS} from '../../../../../../conf/properties';

function ColorPicker (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);
    const {customClass,element,type} = props;
    let NAMESPACE = type=='customShape' ? SHAPE_COLORS : TRIPLE_COLORS;
    const [color,setColor] = useState(NAMESPACE[element]);
    const [isDisplay,setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay(!isDisplay);
    };

    const handleClose = () => {
         setDisplay(false);
    };

    const handle = (e) => {
      setColor(e.hex);
      asssistContext.handleChange(e.hex,element,NAMESPACE)
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
          zIndex: '2',
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
                        <ChromePicker color={color} onChange={handle} onChangeComplete={handleClose} />
                    </div> 
                    
                    : null 
                }
            </div>       
    );
                                   
    
}


export default ColorPicker;

