# Week - 1 :- Getting Started.

In the first week of the coding period, I implemented the method to extract out the triplets using dependency parse tree and also integrate the results into DBPedia Spotlight
The dependency parse tree method is ClauseIE. ClausIE exploits linguistic knowledge about the grammar of the English language to first detect clauses
in an input sentence and to subsequently identify the type of each clause according to the grammatical function of its constituents.

For the purpose of extracting out the triplets I have used the code [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions.ipynb)
The details of setting up the environment for extracting out the triplets can be found [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/Pyclausie).

# Details of the algorithm 

A clause is a part of a sentence that expresses some coherent piece of information; it consists of one subject (S), one
verb (V), and optionally of an indirect object (O), a direct object (O), a complement (C), and one or more adverbials (A).

The algorithm used consists of using seven different patterns:

Find out the dependency parse tree of the sentence
Converting the dependencies to clauses using the patterns 

```markdown
    Pattern           Clause type            Example                                Derived clauses
   
1.  [SVi]               SV                  AE died.                                 (AE, died)
2   SVeA                SVA             AE remained in Princeton.             (AE, remained, in Princeton)
3.  SVcC                SVC                AE is smart.                             (AE, is, smart)
4.  SVmtO               SVO             AE has won the Nobel Prize.             (AE, has won, the Nobel Prize)

The notations are: 
S: Subject, V: Verb, C: Complement, O: Direct object, Oi: Indirect object, A: Adverbial, Vi: Intransitive verb, Vc: Copular verb,
Vc: Extended-copular verb, Vmt: Monotransitive verb
```

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

Intermediate JSON File obtained from DBPedia can be found [here]()
