import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {AppContext} from '../../../App';
import {ShepherdTour, ShepherdTourContext} from 'react-shepherd';
import Editor from '../../../entities/editor';
import shexUtils from '../../../utils/shexUtils';
import {defaultExample} from '../../../galery/defaultExample';
import 'shepherd.js/dist/css/shepherd.css';
import '../../../css/tour/tour.css';

function TourBtn () {

    const context = useContext(AppContext);
    const tourOptions = {
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        }
      },
      useModalOverlay: true,
      classes: 'shadow-md bg-purple-dark',
      scrollTo: true,
    };

     const newSteps =  [
       {
        id: 'welcome',
        text: [
          `
          <p>
          Welcome to ShEx Author <br> 
          Create your Shapes leaning on the ShEx Assistant
          </p>
          `
        ],
       
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            type: 'next',
            text: 'Start'
          }
        ]
        
      },
      {
        id: 'welcome',
        text: [
          `
          <p>
          This is the ShEx Assistant
          </p>
          `
        ],
        attachTo: { element: '.assistCollapse', on: 'right' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            type: 'next',
            text: 'Start'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            
            let yashe = Editor.getYashe();
            yashe.setValue(defaultExample);
            Codemirror.signal(yashe,'forceReplacement');

            let wait = 0;
            if(!context.isAssistantOpen){
              wait = 500;// if the assist is closed we need to wait before create the modal
              context.setAssistantOpen(true);
            }

            setTimeout(() => {
              resolve();  
            }, wait);
            
          });
        },
        
      },
      {
        id: 'createShape',
        text: [
          `
          <p>
         Create a new Shape
          </p>
          `
        ],
        attachTo: { element: '.xs-addShapeButton', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
        when: {
          show: () => {
            console.log('show step');
            context.replaceShapes([]);
           // Editor.getYashe().setValue("");
          },
          hide: () => {
            console.log('hide step');
            console.table(context.shapes.triples)
            context.addShape();
          }
        }
      },
      {
        id: 'shape',
        text: [
          `
          <p>
         This is a new Shape
          </p>
          `
        ],
        attachTo: { element: '.shape', on: 'left' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'shapeName',
        text: [
          `
          <p>
         Give it a name
          </p>
          `
        ],
        attachTo: { element: '#shapeNameInput', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            console.table(context.shapes)
            resolve();
          });
        },
      }];


function Button() {
  const tour = useContext(ShepherdTourContext);

  return (
   <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Tour"
                onClick={tour.start}>
                tour
        </button>
  );
}


    return (
        <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
        <Button/> 
      </ShepherdTour>  );  
    
}


export default TourBtn;


