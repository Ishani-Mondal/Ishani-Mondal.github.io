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
 
'''
