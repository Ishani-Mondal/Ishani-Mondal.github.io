# RDF Generation Using Dependency Parsing and Spotlight+Lexicalization:

In the first week of the coding period, I implemented the method to extract out the triplets using dependency parse tree and also integrate the results into DBPedia Spotlight
The dependency parse tree method is ClauseIE. ClausIE exploits linguistic knowledge about the grammar of the English language to first detect clauses
in an input sentence and to subsequently identify the type of each clause according to the grammatical function of its constituents.

For the purpose of extracting out the triplets I have used the input data from [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/Obama_abstract.txt) , code from [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions.ipynb).
The details of setting up the environment for extracting out the triplets can be found [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/Pyclausie). 

# Details of the algorithm 

A clause is a part of a sentence that expresses some coherent piece of information; it consists of one subject (S), one
verb (V), and optionally of an indirect object (O), a direct object (O), a complement (C), and one or more adverbials (A).

The algorithm used consists of using different patterns:

Details of the algorithm implemented by the [pyclausie tool](https://github.com/AnthonyMRios/pyclausie) described in the [paper](http://resources.mpi-inf.mpg.de/d5/clausie/clausie-www13.pdf) has been summarized below:





# Step-by-step RDF Generation Procedure:

Input Data [Link]()
Code [Link]()
Results [Link]()

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

Take a white-list of the lexical information which maps the verb into DBpedia ontologies, link to the white-list data can be found [here] and [here]. 
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
    <Obama> <http://dbpedia.org/ontology/occupation> <a civil rights attorney>
```
    
## STEP 3:
### Linking Named Entities using DBPedia Spotlight:

The results of extracting out the triples without using spotlight has been provided [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/ClauseIE_Results.txt)

Then I have finally mapped the subjects and objects of the extracted triples to the DBPedia resources using SpotLight API.

```markdown
Using DBpedia Spotlight API:
curl -X GET "https://api.dbpedia-spotlight.org/en/annotate?text=Barack%20Hussein%20Obama%20II%20is%20an%20American%20politician%20who%20is%20the%2044th%20and%20current%20President%20of%20the%20United%20States.%20He%20is%20the%20first%20African%20American%20to%20hold%20the%20office%20and%20the%20first%20president%20born%20outside%20the%20continental%20United%20States.%20Born%20in%20Honolulu%2C%20Hawaii%2C%20Obama%20is%20a%20graduate%20of%20Columbia%20University%20and%20Harvard%20Law%20School%2C%20where%20he%20was%20president%20of%20the%20Harvard%20Law%20Review.%20He%20was%20a%20community%20organizer%20in%20Chicago%20before%20earning%20his%20law%20degree.%20He%20worked%20as%20a%20civil%20rights%20attorney%20and%20taught%20constitutional%20law%20at%20the%20University%20of%20Chicago%20Law%20School%20between%201992%20and%202004.%20While%20serving%20three%20terms%20representing%20the%2013th%20District%20in%20the%20Illinois%20Senate%20from%201997%20to%202004%2C%20he%20ran%20unsuccessfully%20in%20the%20Democratic%20primary%20for%20the%20United%20States%20Hou" -H "accept: application/json"
```

Code to subsitute the results can be found [here](). Intermediate JSON File obtained from DBPedia SpotLight can be found [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/Obama_Json.json). We subsitute the named entities with the DBPedia Spotlight generated resources. For example, the triple <Obama> <worked> <as a civil rights attorney> will be substitued as:

```markdown
    <http://dbpedia.org/resource/Barack_Obama> <http://dbpedia.org/ontology/occupation> <a a http://dbpedia.org/resource/Civil_and_political_rights attorney>
```
## STEP 4:
### RDF Generation:

The final results of RDF generated from this approach can be found as a result [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions_to_RDF.ipynb)

Thanks for your time in going through this !!


