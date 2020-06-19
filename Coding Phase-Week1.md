# Triples Generation Using Dependency Parsing and Spotlight+Lexicalization:

In the first week of the coding period, I implemented the method to extract out the triplets using dependency parse tree and also integrate the results into DBPedia Spotlight
The dependency parse tree method is ClauseIE. ClausIE exploits linguistic knowledge about the grammar of the English language to first detect clauses
in an input sentence and to subsequently identify the type of each clause according to the grammatical function of its constituents.

For the purpose of extracting out the triplets I have used the input data from [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/input_data/Obama_abstract.txt) , code from [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Final_RDF_Creation.py).
The details of setting up the environment for extracting out the triplets can be found [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/Pyclausie). 

# Details of the algorithm 

A clause is a part of a sentence that expresses some coherent piece of information; it consists of one subject (S), one
verb (V), and optionally of an indirect object (O), a direct object (O), a complement (C), and one or more adverbials (A).

The algorithm used consists of using different patterns:

Details of the algorithm described in the [paper](http://resources.mpi-inf.mpg.de/d5/clausie/clausie-www13.pdf) has been summarized below:

STEP 1: Compute the dependency Parse (DP) Tree of the Sentence.

STEP 2: Determine the set of clauses using the DP.

We first identify the clauses in the input sentence, obtain the head word of all the constituents of each clause. First, we construct a clause for every subject dependency in the DP (e.g., nsubj); the dependant constitutes the subject (S) and the governor the verb (V). 4 All other constituents of the clause are dependants of the verb: objects (O) and complements (C) via relations such as: dobj (direct object), iobj (indirect object), xcomp, or ccomp; and adverbials (A) via dependency relations such as advmod, advcl, or prep_in. 

STEP 3: Determine the type of clauses using Pattern of the dependency relations. There are seven basic patterns which are as follows:


```markdown
Clause Type                                         Examples                                  Derived Clauses
============================================================================================================================
Subject-Verb                                        He ran                                     (He,ran)
Subject-Verb-Adverbial                         He taught at Harvard                     (He, taught, at Harvard) 
Subject-Verb-Complement                        He is a politician                       (He, is, a politician)
Subject-Verb-Object                          He taught constitutional law           (He, taught, constitutional law)
Subject-Verb-Object-Adverb         He taught constitutional law at Harvard    (He, taught, constitutional law, at Harvard)
Subject-Verb-iObject-dobject                 He gave her the Nobel Prize.             (He, gave, her, the Nobel Prize)
Subject-Verb-Object-Complement              AE declared the meeting open.           (AE, declared, the meeting, open)
```

Once clauses have been detected, we generate one or more propositions for each clause based on the type of the clause.
For example : when we have more than one object phrases, in case of SVOA(Subject-Verb-Object-Adverb), we generate two triples such as : SVO and SVOA therefore, in example of (He, taught, constitutional law, at Harvard), we will have two Triples <He, taught, constitutional law at Harvard> and another one as <He, taught, constitutional law>

Moreover, in case of Subject-Verb-iObject-dobject, we generate the triples in similar way with more focus on the direct object, therefore, in case of (He, gave, her, the Nobel Prize), we get two triples such as: <He, gave, her the Nobel Prize> and another one as <He, gave, the Nobel Prize>

In case of (AE, declared, the meeting, open), we create one triple as : <AE, declared, the meeting open>.

At the end of the first week, I have generated the triples [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/ClauseIE_Results.txt). 



