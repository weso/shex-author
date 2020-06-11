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
            setTimeout(() => {
              resolve();  
            }, 300);
            
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
         /* beforeShowPromise: function() {
          return new Promise(function(resolve) {
          
           let pref = context.prefixes;
           let p = pref.pop();
           pref.unshift(p);
           context.replacePrefixes(pref);
           context.emitPref();
            setTimeout(() => {
              resolve();  
            }, 100);
            
          });
        } */
        
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


