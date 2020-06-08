# Week - 1 :- Getting Started.

In the first week of the coding period, I implemented the method to extract out the triplets using dependency parse tree and also integrate the results into DBPedia Spotlight
The dependency parse tree method is ClauseIE. ClausIE exploits linguistic knowledge about the grammar of the English language to first detect clauses
in an input sentence and to subsequently identify the type of each clause according to the grammatical function of its constituents.

For the purpose of extracting out the triplets I have used the input data from [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/Obama_abstract.txt) , code from [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions.ipynb).
The details of setting up the environment for extracting out the triplets can be found [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/Pyclausie). 

# Details of the algorithm 

A clause is a part of a sentence that expresses some coherent piece of information; it consists of one subject (S), one
verb (V), and optionally of an indirect object (O), a direct object (O), a complement (C), and one or more adverbials (A).

The algorithm used consists of using different patterns:

Details of the algorithm implemented by the [pyclausie tool](https://github.com/AnthonyMRios/pyclausie) can be seen from the [paper](http://resources.mpi-inf.mpg.de/d5/clausie/clausie-www13.pdf).

Finally extracting out the triples as a code:


```markdown
sents=[]

for sent in doc.sents:
    sents.append(sent.text)

triples = cl.extract_triples(sents)
for triple in triples:
    print(str(triple).split(",")[0].split("=")[1], str(triple).split(",")[1].split("=")[1],str(triple).split(",")[2].split("=")[1], str(triple).split(",")[3].split("=")[1])
```

The results of extracting out the triples without using spotlight has been provided [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/ClauseIE_Results.txt)

Then I have finally mapped the subjects and objects of the extracted triples to the DBPedia resources using SpotLight API.

```markdown
Using DBpedia Spotlight API:
curl -X GET "https://api.dbpedia-spotlight.org/en/annotate?text=Barack%20Hussein%20Obama%20II%20is%20an%20American%20politician%20who%20is%20the%2044th%20and%20current%20President%20of%20the%20United%20States.%20He%20is%20the%20first%20African%20American%20to%20hold%20the%20office%20and%20the%20first%20president%20born%20outside%20the%20continental%20United%20States.%20Born%20in%20Honolulu%2C%20Hawaii%2C%20Obama%20is%20a%20graduate%20of%20Columbia%20University%20and%20Harvard%20Law%20School%2C%20where%20he%20was%20president%20of%20the%20Harvard%20Law%20Review.%20He%20was%20a%20community%20organizer%20in%20Chicago%20before%20earning%20his%20law%20degree.%20He%20worked%20as%20a%20civil%20rights%20attorney%20and%20taught%20constitutional%20law%20at%20the%20University%20of%20Chicago%20Law%20School%20between%201992%20and%202004.%20While%20serving%20three%20terms%20representing%20the%2013th%20District%20in%20the%20Illinois%20Senate%20from%201997%20to%202004%2C%20he%20ran%20unsuccessfully%20in%20the%20Democratic%20primary%20for%20the%20United%20States%20Hou" -H "accept: application/json"
```

Intermediate JSON File obtained from DBPedia SpotLight can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/Obama_Json.json). The parsing of JSON file to substitute the entities to the resources can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/mapping/Parse_Dbpedia_Resource.ipynb).

```markdown
resource_dict={}
with open('Obama_Json.json') as f:
    data = json.load(f)
    for elem in (data['Resources']):
        resource_dict[elem['@surfaceForm'].lower()]= elem['@URI'].lower()
```

Finally we also incorporate the verb lexicalization by using the white-list of the verbs provided by Mariano. The input file of the lexicalized verbs can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/lexicalized_verbs.pkl), the code to parse the entire file into RDF has been specified [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions_to_RDF.ipynb)

```markdown
The verbs mostly used are:
'graduate of' : 'http://dbpedia.org/ontology/college'
'study at' : 'http://dbpedia.org/ontology/college'
'work as' : 'http://dbpedia.org/ontology/occupation'
```

The final results of RDF generated from this approach can be found as a result [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions_to_RDF.ipynb)

Thanks for your time in going through this !!


