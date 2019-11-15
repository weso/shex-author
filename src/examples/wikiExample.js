
export const wikiExample = 
'PREFIX wd: <http://www.wikidata.org/entity/>\n'+
'PREFIX wdt:  <http://www.wikidata.org/prop/direct/>\n'+
'PREFIX p:    <http://www.wikidata.org/prop/>\n'+
'PREFIX prov:    <http://www.w3.org/ns/prov#>\n'+
'PREFIX pq:    <http://www.wikidata.org/prop/qualifier/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n'+
'PREFIX prv:    <http://www.wikidata.org/prop/reference/value/>\n'+
'PREFIX pr:    <http://www.wikidata.org/prop/reference/>\n'+
'PREFIX ps:    <http://www.wikidata.org/prop/statement/>\n'+
'PREFIX interpro:    <http://micel.io/genewiki/interpro/>\n\n'+

'<#wikidata-human-protein>  {\n'+
  'p:P703           @<#P703_found_in_taxon_human>  ;\n'+
  'p:P352           @<#P352_uniprot_id>+  ;\n'+
  'p:P527           @<#P527_has_part>*  ;\n'+
  'p:P637           @<#P637_RefSeq_Protein_ID>*  ;\n'+
  'p:P639           @<#P639_RefSeq_RNA_ID>*  ;\n'+
'}\n\n'+

'<#P703_found_in_taxon_human>  {\n'+
  'ps:P703          wd:Q15978631   ;\n'+
  'prov:wasDerivedFrom          IRI +  ;\n'+
'}\n\n'+

'<#P352_uniprot_id>  {\n'+
  'ps:P352          Literal   ;\n'+
  'prov:wasDerivedFrom          IRI   ;\n'+
'}\n\n'+

'<#P527_has_part>  {\n'+
  'ps:P527          IRI   ;\n'+
  'prov:wasDerivedFrom          IRI   ;\n'+
'}\n\n'+

'<#P637_RefSeq_Protein_ID>  {\n'+
  'ps:P637          Literal   ;\n'+
  'prov:wasDerivedFrom          IRI   ;\n'+
'}\n\n'+

'<#P639_RefSeq_RNA_ID>  {\n'+
  'ps:P637          Literal   ;\n'+
  'prov:wasDerivedFrom          IRI   ;\n'+
'}\n\n';

