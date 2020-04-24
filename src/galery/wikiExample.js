
export const wikiExample = 
'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n'+
'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n'+
'PREFIX wd: <http://www.wikidata.org/entity/>\n'+
'PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n\n'+

'start = @<human>\n\n'+

'<human> EXTRA wdt:P31 {\n'+
'  wdt:P31    [wd:Q5];\n'+
'  wdt:P21    [wd:Q6581097 wd:Q6581072 wd:Q1097630 wd:Q1052281 wd:Q2449503 wd:Q48270]?;\n'+
'  wdt:P19    . ? ;\n'+
'  wdt:P569   . ? ;\n'+
'  wdt:P735   . * ;\n'+
'  wdt:P734   . * ;\n'+
'  wdt:P106   . * ;\n'+
'  wdt:P27    @<country> *;\n'+
'  wdt:P22    @<human> *;\n'+
'  wdt:P25    @<human> *;\n'+
'  wdt:P3373  @<human> *;\n'+
'  wdt:P26    @<human> *;\n'+
'  wdt:P40    @<human> *;\n'+
'  wdt:P1038  @<human> *;\n'+
'  wdt:P103   @<language> *;\n'+
'  wdt:P1412  @<language> *;\n'+
'  wdt:P6886  @<language> *;\n'+
'  rdfs:label rdf:langString+;\n'+
'}\n\n'+

'<country> EXTRA wdt:P31 {\n'+
'  wdt:P31 [wd:Q6256 wd:Q3024240 wd:Q3624078] +;\n'+
'}\n\n'+

'<language> EXTRA wdt:P31 {\n'+
'  wdt:P31 [wd:Q34770 wd:Q1288568] +;\n'+
'}';
