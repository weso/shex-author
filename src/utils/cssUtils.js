export function makeItResponsive(width){
        
        //TimeOut need to take all the elements after render the DOM
        setTimeout(() => {
        let tabs = document.getElementsByClassName("tabs")[0];
        let shapeHeaders = document.getElementsByClassName("header");
        let tripleHeaders = document.getElementsByClassName("tripleHeader");
        let addTripleBtns = document.getElementsByClassName("addTripleButton");
        let addShapeBtns = document.getElementsByClassName("addShapeButton");
        let grids = document.getElementsByClassName("gridBox");
        let prefixes = document.getElementsByClassName("prefixHeader");

        let tabClass = 'tabs';
        let shClass = 'header';
        let thClass = 'tripleHeader';
        let adTClass = 'addTripleButton';
        let adSClass = 'addShapeButton';
        let grClass = 'gridBox';
        let prClass = 'prefixHeader';
        if(width<600){
            tabClass += ' xs-tabs';
            shClass += ' xs-header';
            thClass += ' xs-tripleHeader';
            adTClass += ' xs-addTripleButton';
            adSClass += ' xs-addShapeButton';
            grClass += ' xs-gridBox';
            prClass += ' xs-prefixHeader';
        }else{
            //Why this is needed?
            tabClass = 'tabs';
            shClass = 'header';
            thClass = 'tripleHeader';
            adTClass = 'addTripleButton';
            adSClass = 'addShapeButton';
            grClass = 'gridBox';
            prClass = 'prefixHeader';
        }

        
        tabs.className = tabClass;
        for(let i=0;i<shapeHeaders.length;i++){
            shapeHeaders[i].className = shClass;
        }

        for(let i=0;i<tripleHeaders.length;i++){
            tripleHeaders[i].className = thClass;
        }

        for(let i=0;i<addTripleBtns.length;i++){
            addTripleBtns[i].className = adTClass;
        }

        for(let i=0;i<addShapeBtns.length;i++){
            addShapeBtns[i].className = adSClass;
        }

        for(let i=0;i<grids.length;i++){
            grids[i].className = grids[i].className.replace('gridBox',grClass);
        }

        for(let i=0;i<prefixes.length;i++){
            prefixes[i].className = prClass;
        }

    }, 0);
        
}

export function activeTab(evt){
        let i;
        let tablinks;

        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" activeTab", "");
        }
        evt.currentTarget.className += " activeTab";
}


export function checkShapeName(shape){
    let name = shape.type.value;
    let type = shape.type.getTypeName();
    let id = shape.id;  
    setTimeout(() => {
        /*
        if(!name.match(new RegExp('^[a-zA-Z0-9_.-]*$')) && type == 'prefixedIri'){
            return changeClass('sTriples'+id,'hidden');
        }
        */

        if(name =='')return changeClass('addTriple'+id,'disabled');
        

        changeClass('addTriple'+id,'addTripleButton');

    }, 0);
        
}


function changeClass(before,after){
    let triples = document.getElementsByClassName(before)[0];
    if(triples)triples.className = before+' '+after;
    
}

