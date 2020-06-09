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
          ShExAuthor is a ShEx Assistant
          </p>
          `
        ],
        attachTo: { element: '.cm-shape', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            let yashe = Editor.getYashe();
            yashe.setValue(defaultExample);
            Codemirror.signal(yashe,'forceReplacement');
            resolve();
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
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            context.replaceShapes([]);
            Editor.getYashe().setValue("");
            resolve();
          },500);
        },
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
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            context.replaceShapes([shexUtils.addShape(context.shapes,context.width)]);
            resolve();
          },500);
        },
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
        ]
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


