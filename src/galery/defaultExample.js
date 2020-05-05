/* export const defaultExample = 

'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+
'  schema:name          { xsd:1 { xsd:2 { xsd:3 . }}} + ;\n'+
'  schema:birthDate     xsd:date   ? ;\n'+
'  schema:birthPlace    xsd:string + ;\n'+
'  schema:knows         @:User     *  \n'+
'}\n'; */

export const defaultExample = 

'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+
'  schema:0 xsd:string {schema:1 . ; schema:2 .} +\n '+
'}\n';
