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

/*

`PREFIX p: <http://www.wikidata.org/prop/> PREFIX ps: <http://www.wikidata.org/prop/statement/> PREFIX pq: <http://www.wikidata.org/prop/qualifier/> PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> <#operating_system> { p:P275 { ps:P275 xsd:string + ; ps:P275 IRI + ; ps:P275 xsd:stringdsfsd + ; ps:P275 IRI + ; ps:P275 IRI + ; } ; p:P178 { ps:P178 IRI ; ps:P275 IRI + ; ps:P275 IRI + ; }? ; p:P176 { ps:P176 IRI ; ps:P275 IRI + ; ps:P275 IRI + ; }? ; p:P910 { ps:P910 IRI ; ps:P275 IRI + ; ps:P275 IRI + ; }? ; p:P373 { ps:P373 xsd:string * ; ps:P275 IRI + ; ps:P275 IRI + ; }? ; }
` */