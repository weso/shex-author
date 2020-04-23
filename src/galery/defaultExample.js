export const defaultExample = 

'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+
'  schema:name          xsd:string   ;\n'+
'  schema:birthDate     xsd:date   ? ;\n'+
'  schema:birthPlace    xsd:string + ;\n'+
'  schema:knows         @:User     *  \n'+
'}\n';
