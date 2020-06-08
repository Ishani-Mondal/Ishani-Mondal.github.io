# Week - 1 :- Getting Started.

In the first week of the coding period, I implemented the method to extract out the triplets using dependency parse tree and also integrate the results into DBPedia Spotlight
The dependency parse tree method is ClauseIE. ClausIE exploits linguistic knowledge about the grammar of the English language to first detect clauses
in an input sentence and to subsequently identify the type of each clause according to the grammatical function of its constituents.

For the purpose of extracting out the triplets I have used the code [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/Pyclausie/Clause_IE_Predictions.ipynb)
The details of extracting out the triplets can be found [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/Pyclausie). 

# Details of the algorithm 

A clause is a part of a sentence that expresses some coherent piece of information; it consists of one subject (S), one
verb (V), and optionally of an indirect object (O), a direct object (O), a complement (C), and one or more adverbials (A).

The algorithm used consists of using seven different patterns:

1. Find out the dependency parse tree of the sentence
2. Converting the dependencies to clauses using the patterns 
Pattern Clause type Example Derived clauses
Basic patterns

Pattern             Clause type            Example                                 Derived clauses
S1: SVi                SV                  AE died.                                 (AE, died)
S2: SVeA               SVA           AE remained in Princeton.             (AE, remained, in Princeton)
S3: SVcC SVC AE is smart. (AE, is, smart)
S4: SVmtO SVO AE has won the Nobel Prize. (AE, has won, the Nobel Prize)
S5: SVdtOiO SVOO RSAS gave AE the Nobel Prize. (RSAS, gave, AE, the Nobel Prize)
S6: SVctOA SVOA The doorman showed AE to his office. (The doorman, showed, AE, to his office)
S7: SVctOC SVOC AE declared the meeting open. (AE, declared, the meeting, open)

