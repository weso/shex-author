import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {AppContext} from '../../../../App';
import {AssistContext} from '../../Assistant';
import {ShepherdTour, ShepherdTourContext} from 'react-shepherd';
import Editor from '../../../../entities/editor';
import shexUtils from '../../../../utils/shexUtils';
import {defaultExample} from '../../../../galery/defaultExample';
import 'shepherd.js/dist/css/shepherd.css';
import '../../../../css/tour/tour.css';
import {addPrefixComp} from '../../../../utils/prefixUtils';

function Tour () {

    const context = useContext(AppContext);
    const assistContext = useContext(AssistContext);
    const tour = useContext(ShepherdTourContext);

    const newSteps =  [
     {
        id: 'welcome',
        text: [
          `
          <p>
          Welcome to ShExAuthor, a playground where 
          you can create Shapes in a much more visual way <br>
          </p>
          `
        ],
       
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.cancel();
            },
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Start Tutorial'
          }
        ]
        
      },
      {
        id: 'assistant',
        text: [
          `
          <p>
          This is the ShEx Assistant
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.assistCollapse', on: 'right' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            
            let yashe = Editor.getYashe();
            yashe.setValue(defaultExample);
            Codemirror.signal(yashe,'forceReplacement');

            assistContext.closeAll();

            setTimeout(() => {
              assistContext.setAssistOpen(true);
              resolve();  
            }, 550);
            
          });
        },
        
      },
      {
        id: 'createShape',
        text: [
          `
          <p>
         Let's create a new Shape
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.xs-addShapeButton', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        when: {
          show: () => {
            context.replaceShapes([]);
            Editor.getYashe().setValue("");
          },
          hide: () => {
            let shape = shexUtils.addShape(context.shapes,context.width);
            context.replaceShapes([shape]);
            Codemirror.signal(Editor.getYashe(),'humanEvent',[shape],context.width);
          }
        }
      },
      {
        id: 'shape',
        text: [
          `
          <p>
         This is your new Shape. A shape defines the constraints that a node must satisfy
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.shape', on: 'left' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
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
         Let's give it a name
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#shapeNameInput', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        when: {
          hide: () => {
            let shape = shexUtils.addShape(context.shapes,context.width);
            shape.type.value = 'User';
            context.replaceShapes([shape]);
            Codemirror.signal(Editor.getYashe(),'humanEvent',[shape],context.width);
          }
        }
      },
      {
        id: 'shapeName',
        text: [
          `
          <p>
          Check your new Shape in the Editor. <br>
          A Shape must be an <a href='https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier'>IRI.</a>
          (string of characters that unambiguously identifies a particular resource)<br> 
          There is two ways of represent IRIs in ShEx. As a Qname setting the IRI betwen '<...>' or
          using a prefix previously defined. By default, new shapes use the example prefix
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.cm-shape', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'prefixes',
        text: [
          `
          <p>
          Click in the Prefixes tab in order to define a new prefix. 
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.prefixTab', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'addPrefix',
        text: [
          `
          <p>
         Press this button in order to define a new Prefix 
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.addPrefixBtn', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            assistContext.setAssistOpen(false);
            assistContext.setPrefixesOpen(true);

            setTimeout(() => {
              resolve();  
            }, 300);
            
          });
        }
      },
      {
        id: 'prefixHeader',
        text: [
          `
          <p>
         Here is your new Prefix
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#pheader4', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
         beforeShowPromise: function() {
          return new Promise(function(resolve) {
            context.addPrefix();
            resolve();  
            
          });
         }
        
      }
      ,
      {
        id: 'prefixAlias',
        text: [
          `
          <p>
         First of all, define an alias
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#alias4', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        when:{
          hide:() =>{
            let prefs = context.prefixes;
            let p = addPrefixComp(context.prefixes,context.width);
            p.prefixName = "myprefix";
            prefs.push(p);
            context.replacePrefixes(prefs);
            context.emitPref();
           
          }
        }
      },
      {
        id: 'prefixAlias',
        text: [
          `
          <p>
         Now define the IRI
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#iri5', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        when:{
          hide:() =>{
            context.prefixes[3].prefixValue = 'http://www.myprefix.com/';
            context.replacePrefixes(context.prefixes);
            context.emitPref();
            console.log( context.prefixes)
            //console.log(context.prefixes)
          }
        }
      },
       {
        id: 'prefixEditor',
        text: [
          `
          <p>
         Check your new prefix in the editor
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: 'div[style="position: relative;"]:nth-child(4)', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ]
      },
       {
        id: 'shexTab',
        text: [
          `
          <p>
         Click on the ShEx Assistan tab to return to our shapes.
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.shapesTab', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'changePrefix',
        text: [
          `
          <p>
         Now, let's give our Shape the new prefix
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.cm-shape', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],

      beforeShowPromise: function() {
          return new Promise(function(resolve) {
            assistContext.setAssistOpen(true);
            assistContext.setPrefixesOpen(false);

            setTimeout(() => {
              resolve();  
            }, 300);
            
          });
        }
      },
      {
        id: 'customShape',
        text: [
          `
          <p>
         Press in the Build button to customze the Shape
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.buildBtn', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ]
      }];

  tour.addSteps(newSteps);
 
  return (
   <button className="tablink material-icons " 
              
                title="Tour"
                onClick={tour.start}>
                tour
        </button>
  );
}


export default Tour;


