import Editor from '../entities/editor';

function getBodyFormData() {
    let bodyFormData = new FormData();
    bodyFormData.set('schema', getSchema());
    bodyFormData.set('schemaFormat', 'ShExC');
    bodyFormData.set('schemaEngine', 'SHEX');
    return bodyFormData;
}

function getSchema () {
    let yashe = Editor.getYashe();
    if(yashe){
        return yashe.getValue();
    }
    return '';
}

export function getRequestOptions(){
    return(
    {
        method: 'post',
        url: 'http://rdfshape.weso.es:8080/api/schema/visualize',
        data: getBodyFormData(),
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    });
}
