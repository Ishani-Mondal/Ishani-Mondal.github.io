## Introduction & Community Bonding Period - Part-1

The following blog is an account of the GSoC project taken by me under DBpedia. I would like to thank Mariano Rico for mentoring and who will be following me through this journey. A few details about this project :- The main idea of this project is use syntactic methods (syntax parsers) coupled with other linguistic based algorithms in order to help generate triples from information abstracts. DBpedia has created a large web graph using the following data which can be found on their website. We wish to provide a sort of automation to finding triples which can be added to this webgraph. The other details can be found in my proposal.

The firt phase of GSoC is the Community bonding period which extends till late May. In this phase, prelimnaries to that project are taken care of. Given I have reached the halfway point of this phase, I thought of talking about what all I have done and what I will work on in the near future.

### Task-1 Spotlight

The first prelimnary tasks include understanding DBpedia Spotlight. [Spotlight](https://pypi.org/project/pyspotlight/) is an annotating tool, which when given an abstract or a sentence can annotate words, given their presence in the DBpedia web graph or an instance of it is present. Understanding this would be important, given that this tool will be necessary for generating triples and mapping these words to the already existant forms present in the DBpedia web graph.

### Task-2 Familiarization with Dbpedia Classes and Ontologies:

Another warm-up task included having some hands-on experience in understanding several Ontology Classes and the properties in Dbpedia. My mentor gave a suitable example on the DBpedia Resource of [Donald Trump](http://dbpedia.org/page/Donald_Trump). For example: for the sentence “The president of the US told that covid19 disease is fake news”, we could get these triples:
      
```markdown
      
      - <http://dbpedia.org/page/Donald_Trump> <verb:say> <directObject_1>
      - <directObject_1> <owl:class> <dbpedia:Disease>
      - <covid19> <owl:class> <dbpedia:Disease>
      - <covid19> <rdf:is_a> <dbpedia:FakeNews>

```

### Task 3: Conll parsing

Another important thing which was to be taken care at the earliest would be identifying tree query languages, given that the syntactic parsers generally give the parse output in the form of a .conll file. Given most of these libraies are present in other languages such as Java and that python libraries don’t offer much flexibility, it was important to find a suitable library for the project. After going through Universal Dependencies and Github for such packages, I finally managed to find [a python library](https://github.com/EmilStenstrom/conllu) for the following. This library is now being modified to suit the needs of the project.


### Task 3: Pattern-based Triple Extraction 

The next step was to get some grip on the pattern-based rules to extract the <Subject-verb-object> triples from the DBpedia abstracts. I started exploring the POS-tag based Hearst pattern-matching approach to extraction of triples. Apart from exploring the naive POS-tag based Hearst-pattern approach to triple extraction, it has been observed that a tree-based pattern matcher is required, given the complexity of the English sentences. Some intuitive insights can be inferred from the transitivity of the verbs in determining object types, as well as, relative position of the prepositions with respect to verbs and modifiers. Therefore, Mariano asked me to have a close look on the Tregex-based pattern matching algorithm developed by Stanford.


### Task 4: Introduction to SyntaxNet and Lexicalization
Mariano has introduced to m the verb lexical information is key for better triple extraction. We have understood that lexical information about verbs like transitivity, collocation, etc plays an important role. Perhaps we can identify the semantics of the verb using Wordnet and its synsets. Also [Babelnet](https://babelnet.org) and [Babelfy](http://babelfy.org/index)(similar to spotlight but is not open source) has lexical information.

We looked into the interesting properties of DBpedia lexicalization made using the [Lemon Model](ceur-ws.org/Vol-1064/Unger_lemon.pdf). We looked into the code and api used for [verb lexicalization](https://github.com/ag-sc/lemon.dbpedia), most importantly the lemon patterns used in the English language.
      
The Code-base of this project will be hosted on Github shortly. Details of Spotlight, conll modifications, Tregex-based triple extraction and ClauseIE based triple extraction  will be put in the next blog post. Do check out my other blog posts!

Let us see you in the next week for [second part of the community bonding phase](https://ishani-mondal.github.io/Community-Bonding-Part-2).

You can follow my work in Coding Phase Week 1 [here](https://ishani-mondal.github.io/Coding%20Phase-Week1)

You can follow my work in Coding Phase Week 2 [here](https://ishani-mondal.github.io/Coding-Phase-Week2.md)

You can follow my work in Coding Phase Week 3 [here](https://ishani-mondal.github.io/Coding-Phase-Week3.md)

Cheers!

