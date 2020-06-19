# RDF Generation Using Dependency Parsing and Spotlight and Lexicalization:

At the end of week2, I have generated the triples from the textual document and mapped them to the Spotlight. Then, Mariano asked me to include more rich information of the verb properties into the whitelist, so I went on doing that further. In the remaining post, I will discuss about the implementation of my algorithm for the rest of the blog.

# Step-by-step RDF Generation Procedure:

## STEP 1:
### Triples in Text Format Extraction:

Obtain the textual triplets by running the pyclausie Algorithm. It generates the triples in the form of <subject, predicate, object>. For example, the sentence will "Barack Hussein Obama II is an American politician" will be parsed to generate the triple as follows:

Example1:

```markdown
<Barack Hussein Obama ii> <is> <an American politician>
```

Example2:

The sentence "Obama worked as a civil rights attorney" will be parsed as:
```markdown
<Obama> <worked> <as a civil rights attorney>
```

## STEP 2:
### Post-Processing the Triples for Lexicalization:

Take a white-list of the lexical information which maps the verb into DBpedia ontologies, link to the white-list data can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/white_dict.json) and [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/type_dict.json)

Contents in typedict whitelist:

```markdown
{"be a": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", 
"be the": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", 
"be an": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"}
```

Contents in whitelist:

```markdown
{"graduate of": "http://dbpedia.org/ontology/college",
"work as": "http://dbpedia.org/ontology/occupation",
"be born in": "http://dbpedia.org/ontology/birthPlace", 
"be born outside": "http://dbpedia.org/ontology/birthPlace"}

```

Suppose, there is a verb 'work as' in the white-list, we perform the following steps:

Since, in Example2, 'work' is present in past-tense and 'as' is present in the object part, we do a post-processing of the triples and modify the triples by converting the verbs into infinitive forms and search whether the verb along with first letter in the object is present in the white-list of verb-mappings and then perform lexicalization of those verbs. We also repeat this search in case if the white-list verbs are present in the objects. We have used the [nltk.lemmatizer](https://www.nltk.org/) for converting the verbs into infinite form.

```markdown
    modified_p=lemmatizer.lemmatize(p, 'v')+" "+str(o.split(" ")[0])
    if(modified_p in white_dict.keys() or modified_p in type_dict.keys()):
        p=modified_p
        o=" ".join(o.split(" ")[1:])
    
```

This will convert the triple <Obama> <worked> <as a civil rights attorney> into 

```markdown
    <Obama> <http://dbpedia.org/ontology/occupation> <http://dbpedia.org/resource/Civil_and_political_rights>
```
    
## STEP 3:
### Linking Named Entities using DBPedia Spotlight:

The results of extracting out the triples without using spotlight has been provided [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/ClauseIE_Results.txt)

Then I have finally mapped the subjects and objects of the extracted triples to the DBPedia resources using SpotLight API.

```markdown
Using DBpedia Spotlight API:
curl -X GET "https://api.dbpedia-spotlight.org/en/annotate?text=Barack%20Hussein%20Obama%20II%20is%20an%20American%20politician%20who%20is%20the%2044th%20and%20current%20President%20of%20the%20United%20States.%20He%20is%20the%20first%20African%20American%20to%20hold%20the%20office%20and%20the%20first%20president%20born%20outside%20the%20continental%20United%20States.%20Born%20in%20Honolulu%2C%20Hawaii%2C%20Obama%20is%20a%20graduate%20of%20Columbia%20University%20and%20Harvard%20Law%20School%2C%20where%20he%20was%20president%20of%20the%20Harvard%20Law%20Review.%20He%20was%20a%20community%20organizer%20in%20Chicago%20before%20earning%20his%20law%20degree.%20He%20worked%20as%20a%20civil%20rights%20attorney%20and%20taught%20constitutional%20law%20at%20the%20University%20of%20Chicago%20Law%20School%20between%201992%20and%202004.%20While%20serving%20three%20terms%20representing%20the%2013th%20District%20in%20the%20Illinois%20Senate%20from%201997%20to%202004%2C%20he%20ran%20unsuccessfully%20in%20the%20Democratic%20primary%20for%20the%20United%20States%20Hou" -H "accept: application/json"
```

Code to subsitute the results can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Final_RDF_Creation.py). Intermediate JSON File obtained from DBPedia SpotLight can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/Obama_Json.json). We subsitute the named entities with the DBPedia Spotlight generated resources. For example, the triple <Obama> <worked> <as a civil rights attorney> will be substitued as:

```markdown
    <http://dbpedia.org/resource/Barack_Obama> <http://dbpedia.org/ontology/occupation> <a http://dbpedia.org/resource/Civil_and_political_rights attorney>
```
## STEP 4:
### RDF Generation:

The final results of RDF generated from this approach can be found as a result [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/ObamaRDF)

Thanks for your time in going through this !!
