export function makeItResponsive(width){
        
        //TimeOut need to take all the elements after render the DOM
        setTimeout(() => {
        let tabs = document.getElementsByClassName("xs-tabs")[0];
        let shapeHeaders = document.getElementsByClassName("xs-header");
        let tripleHeaders = document.getElementsByClassName("xs-tripleHeader");
        let addTripleBtns = document.getElementsByClassName("xs-addTripleButton");
        let addShapeBtns = document.getElementsByClassName("xs-addShapeButton");
        let grids = document.getElementsByClassName("xs-gridBox");
        let customs = document.getElementsByClassName("xs-customConstraint");
        let prefixes = document.getElementsByClassName("xs-prefixHeader");
        let prefixesColors = document.getElementsByClassName("xs-prefixHeaderColors");
        let pickers = document.getElementsByClassName("xs-pickers");

        let tabClass = 'xs-tabs';
        let shClass = 'xs-header';
        let thClass = 'xs-tripleHeader';
        let adTClass = 'xs-addTripleButton';
        let adSClass = 'xs-addShapeButton';
        let grClass = 'xs-gridBox';
        let ccClass = 'xs-customConstraint';
        let prClass = 'xs-prefixHeader';
        let prcClass = 'xs-prefixHeaderColors';
        let picClass = 'xs-pickers';
        if(width>600){
            tabClass += ' tabs';
            shClass += ' header';
            thClass += ' tripleHeader';
            adTClass += ' addTripleButton';
            adSClass += ' addShapeButton';
            grClass  += ' gridBox';
            ccClass += ' customConstraint';
            prClass += ' prefixHeader';
            prcClass += ' prefixHeaderColors';
            picClass += ' pickers';
        }

        
        tabs.className = tabClass;


        getKeys(shapeHeaders).forEach(element => {
            shapeHeaders[element].className = shClass;
        });
        
        getKeys(tripleHeaders).forEach(element => {
            tripleHeaders[element].className = thClass;
        });

        getKeys(addTripleBtns).forEach(element => {
            addTripleBtns[element].className = adTClass;
        });

        getKeys(addShapeBtns).forEach(element => {
            addShapeBtns[element].className = adSClass;
        });

        getKeys(grids).forEach(element => {
            grids[element].className = grClass;
        });

        getKeys(customs).forEach(element => {
            customs[element].className = ccClass;
        });

        getKeys(prefixes).forEach(element => {
            prefixes[element].className = prClass;
        });

        getKeys(prefixesColors).forEach(element => {
            prefixesColors[element].className = prcClass;
        });

        getKeys(pickers).forEach(element => {
            pickers[element].className = picClass;
        });


    }, 0);
        
}


function getKeys(collection){
    return Object.keys(collection);
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

