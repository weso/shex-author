
export const wikiExample = 
'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n'+
'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n'+
'PREFIX wd: <http://www.wikidata.org/entity/>\n'+
'PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n\n'+

'start = @<human>\n\n'+

'<human> EXTRA wdt:P31 {\n'+
'  wdt:P31    [wd:Q5];\n'+
'  wdt:P21    [wd:Q6581097 wd:Q6581072 wd:Q1097630 wd:Q1052281 wd:Q2449503 wd:Q48270]?;   # gender\n'+
'  wdt:P19    . ?;                     # place of birth\n'+
'  wdt:P569   . ? ;                 # date of birth\n'+
'  wdt:P735   . * ;                 # given name\n'+
'  wdt:P734   . * ;                 # family name\n'+
'  wdt:P106   . * ;                 # occupation\n'+
'  wdt:P27    @<country> *;  # country of citizenship\n'+
'  wdt:P22    @<human> *;           # father\n'+
'  wdt:P25    @<human> *;           # mother\n'+
'  wdt:P3373  @<human> *;         # sibling\n'+
'  wdt:P26    @<human> *;           # husband/wife\n'+
'  wdt:P40    @<human> *;           # children\n'+
'  wdt:P1038  @<human> *;         # relatives\n'+
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
